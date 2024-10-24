<script setup>
import GconContainer from '@/api/GconContainer';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useCUDDate } from '@/utilityFunc/getCudDate';

const router = useRouter();
const route = useRoute();

const getGconInfoDetail = ref({})
const getCityList = ref([])
const getThisCity = ref({})
const equipment = ref([]);

const { loadCudDate, getCudDate } = useCUDDate();

const smaeCityCode = async () => {
    getThisCity.value = getCityList.value.find((item) => item.detailSid === getGconInfoDetail.value.detailSid);
}

const getCityes = async () => {
    try {
        const response = await GconContainer.getCityes()
        getCityList.value = response.data;
    } catch (error) {
        console.log("지역리스트 조회 실패", error);
    }
}

const loadUserDetail = async (id) => {
    try {
        const response = await GconContainer.getGconDetail(id)
        getGconInfoDetail.value = response.data;
        await getCityes()
    } catch (error) {
        console.log("지콘 상세조회 실패", error);
    }
}

const gconDetailSave = async (detailSid) => {
    if (confirm("저장하시겠습니까?")) {
        try {
            const data = {
                containerSid: route.params.id,
                detailSid,
                containerName: getGconInfoDetail.value.containerName,
                latitude: getGconInfoDetail.value.latitude,
                longitude: getGconInfoDetail.value.longitude,
                telno: getGconInfoDetail.value.telno,
                rdAdr: getGconInfoDetail.value.rdAdr,
                remark: getGconInfoDetail.value.remark,
                status: getGconInfoDetail.value.status
            }
            await GconContainer.patchGconDetail(data)
            alert("저장되었습니다");
        } catch (error) {
            console.log("지콘 상세 정보 수정 실패", error);
        }
    }
}

const gconDetailDel = async () => {
    if(equipment.value.length > 0){
        alert("현재 컨테이너에는 장비가 있어 삭제할 수 없습니다.\n'자원관리'에서 장비를 삭제하여 주세요")
    } else {
        if (confirm("삭제하시겠습니까?")) {
            try {
                await GconContainer.delGconDetail(route.params.id)
                alert("삭제되었습니다");
                router.push("/gcon-container");
            } catch (error) {
                console.log("지콘 상세 정보 삭제 실패", error);
            }
        }
    }
}

const getEquipment = async (id) => {
    try {
        const response = await GconContainer.getEquipment(id)
        equipment.value = response.data;
    } catch (error) {
        console.log("장비 관리 조회 실패", error);
    }

}

const openPostcode = () => {
    new daum.Postcode({
        oncomplete: function (data) {
            const addr = data.roadAddress || data.jibunAddress;
            getGconInfoDetail.value.rdAdr = addr;
        }
    }).open();
}

watch(() => getGconInfoDetail.value.rdAdr, (newAddr) => {
    if (newAddr) {
        handleAddressUpdate(newAddr);
    }
});

const handleAddressUpdate = async (addr) => {
    try {
        const response = await GconContainer.getLatAndLon(addr)

        getGconInfoDetail.value.latitude = response.data.latitude
        getGconInfoDetail.value.longitude = response.data.longitude
    } catch (error) {
        console.log("경도 위도 조회 실패", error);
    }
};

onMounted(async () => {
    await loadUserDetail(route.params.id);
    await smaeCityCode();
    await getEquipment(route.params.id);
    await getCudDate();
})
</script>

<template>
    <div>
        <div>
            <VCard class="auth-card" :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'">
                <VCardText>
                    <h2 class="mb-1">
                        GCON 상세
                    </h2>
                </VCardText>
                <VCardText v-if="loadCudDate.update" :class="{ 'role': loadCudDate.delete }"
                    class="text-right position-absolute roleBtn">
                    <VBtn @click="gconDetailSave(getThisCity.detailSid)">저장</VBtn>
                </VCardText>
                <VCardText v-if="loadCudDate.delete" class="text-right position-absolute roleBtn">
                    <VBtn @click="gconDetailDel">삭제</VBtn>
                </VCardText>
                <VCardText>
                    <VRow>
                        <VCol cols="4">
                            <div class="my-2">컨테이너명</div>
                            <VTextField v-model="getGconInfoDetail.containerName"
                                :value="getGconInfoDetail.containerName" autofocus />
                        </VCol>

                        <VCol cols="4">
                            <div class="my-2">지역</div>
                            <select v-model="getThisCity.detailSid">
                                <option :value="getCity.detailSid" v-for="(getCity, index) in getCityList" :key="index">
                                    {{ getCity.name }}</option>
                            </select>
                        </VCol>

                        <VCol cols="4">
                            <div class="my-2">상태</div>
                            <select v-model="getGconInfoDetail.status" class="select">
                                <option value="active">운영중</option>
                                <option value="inactive">납품 진행중</option>
                                <option value="pending">예약</option>
                            </select>
                        </VCol>

                        <VCol cols="6">
                            <div class="my-2">주소</div>
                            <VTextField v-model="getGconInfoDetail.rdAdr" :value="getGconInfoDetail.rdAdr"
                                @click="openPostcode" />

                            <div class="mt-4">
                                <span>위도</span>
                                <VTextField class="my-2" readonly>{{ getGconInfoDetail.latitude }}</VTextField>
                                <span>경도</span>
                                <VTextField class="my-2" readonly>{{ getGconInfoDetail.longitude }}</VTextField>
                            </div>
                        </VCol>

                        <VCol cols="6">
                            <div class="my-2">전화번호</div>
                            <VTextField v-model="getGconInfoDetail.telno" :value="getGconInfoDetail.telno" />
                        </VCol>

                        <VCol cols="12">
                            <div class="my-2">장비관리</div>
                            <VTable>
                                <thead>
                                    <tr>
                                        <th scope="col" class="text-center">번호</th>
                                        <th scope="col" class="text-center">장비구분</th>
                                        <th scope="col" class="text-center">장비</th>
                                        <th scope="col" class="text-center">비고</th>
                                    </tr>
                                </thead>

                                <tbody v-if="equipment.length !== 0" class="text-center">
                                    <tr v-for="(equ, i) in equipment" :key="i">
                                        <td>{{ i + 1 }}</td>
                                        <td> {{ equ.equipmentType }}</td>
                                        <td>{{ equ.name }}</td>
                                        <td>{{ equ.remark }}</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="4">관리되고 있는 장비가 없습니다</td>
                                    </tr>
                                </tbody>
                            </VTable>
                        </VCol>
                    </VRow>
                </VCardText>
            </VCard>
        </div>
    </div>
</template>

<style scoped>
select {
    border: 1px solid rgba(34, 48, 62, 0.217);
    padding: 0 10px;
    width: 100%;
    height: 38px;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800px' height='800px' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z' fill='%230F0F0F'/%3E%3C/svg%3E") no-repeat right 10px center;
    background-size: 16px 16px;
}

.roleBtn {
    top: 40px;
    right: 0px;
}

.role {
    right: 80px;
}
</style>