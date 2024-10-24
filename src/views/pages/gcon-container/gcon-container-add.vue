<script setup>
import GconContainer from '@/api/GconContainer';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();
const route = useRoute();


const getGconInfoDetail = ref({
    detailSid: "",
    containerName: "",
    latitude: "",
    longitude: "",
    telno: "",
    rdAdr: "",
    remark: "",
    status: "",
})

const lat = ref(false)
const long = ref(false)
const getCityList = ref([])
const equipment = ref([]);

const getCityes = async () => {
    try {
        const response = await GconContainer.getCityes()
        getCityList.value = response.data;
    } catch (error) {
        console.log("지역리스트 조회 실패", error);
    }
}



const postGconDetail = async (detailSid) => {
    if (confirm("저장하시겠습니까?")) {
        try {
            const data = {
                detailSid,
                containerName: getGconInfoDetail.value.containerName,
                latitude: getGconInfoDetail.value.latitude,
                longitude: getGconInfoDetail.value.longitude,
                telno: getGconInfoDetail.value.telno,
                rdAdr: getGconInfoDetail.value.rdAdr,
                remark: getGconInfoDetail.value.remark,
                status: getGconInfoDetail.value.status
            }
            await GconContainer.postGconDetail(data)
            alert("저장되었습니다");
            router.push("/gcon-container");
        } catch (error) {
            console.log("지콘 상세 정보 등록 실패", error);
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
        lat.value = true;
        long.value = true;
    } catch (error) {
        console.log("경도 위도 조회 실패", error);
    }
};

onMounted(async () => {
    await getCityes();
    // await smaeCityCode();
    await getEquipment(route.params.id);
})
</script>

<template>
    <div>
        <div>
            <VCard class="auth-card" :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'">
                <VCardText>
                    <h2 class="mb-1">
                        GCON 추가
                    </h2>
                </VCardText>
                <VCardText class="text-right position-absolute" style="top: 40px; right: 0;">
                    <VBtn @click="postGconDetail(getGconInfoDetail.detailSid)">추가</VBtn>
                </VCardText>
                <VCardText>
                    <VRow>
                        <VCol cols="4">
                            <div class="my-2">컨테이너명</div>
                            <VTextField v-model="getGconInfoDetail.containerName"
                                :value="getGconInfoDetail.containerName" autofocus placeholder="예) 사상구청" />
                        </VCol>

                        <VCol cols="4">
                            <div class="my-2">지역</div>
                            <select v-model="getGconInfoDetail.detailSid">
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
                                @click="openPostcode" placeholder="주소검색" readonly />

                            <div class="mt-4" v-if="lat && long">
                                <span>위도</span><VTextField class="my-2" readonly>{{ getGconInfoDetail.latitude }}</VTextField>
                                <span>경도</span><VTextField class="my-2" readonly>{{ getGconInfoDetail.longitude }}</VTextField>
                            </div>
                        </VCol>

                        <VCol cols="6">
                            <div class="my-2">전화번호</div>
                            <VTextField v-model="getGconInfoDetail.telno" :value="getGconInfoDetail.telno"
                                placeholder="'-' 없이 입력" />
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

.addrBtn {
    border: 1px solid #dadada;
    width: 70px;
    height: 30px;
    font-size: 13px;
    outline: none;
}
</style>