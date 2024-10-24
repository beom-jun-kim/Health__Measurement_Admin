<script setup>
import GconContainer from '@/api/GconContainer';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import throttle from 'lodash/throttle';


const router = useRouter();
const getGconInfoDetail = ref({
    cctvId: "",
    cctvName: "",
    address: "",
    detailAddress: "",
    latitude: "",
    longitude: "",
    state: "",
    codeDetailSid:"",
})
const isAvailable = ref(true)
const lat = ref(false)
const long = ref(false)
const getCityList = ref([])
const getThisCity = ref('')

const getCityes = async () => {
    try {
        const response = await GconContainer.getCityes()
        getCityList.value = response.data;
    } catch (error) {
        console.log("지역리스트 조회 실패", error);
    }
}

const postGconDetail = async () => {
    if (confirm("추가하시겠습니까?")) {
        try {
            const data = {
                cctvId: getGconInfoDetail.value.cctvId,
                cctvName: getGconInfoDetail.value.cctvName,
                address: getGconInfoDetail.value.address,
                detailAddress: getGconInfoDetail.value.detailAddress,
                latitude: getGconInfoDetail.value.latitude,
                longitude: getGconInfoDetail.value.longitude,
                state: getGconInfoDetail.value.state,
                codeDetailSid: getGconInfoDetail.value.codeDetailSid,
            }
            await GconContainer.postCctvDetail(data)
            alert("추가되었습니다");
            router.push("/cctv-manage");
        } catch (error) {
            console.log("배회감지 카메라 상세 정보 등록 실패", error);
        }
    }
}

const handleChangeCctvId = throttle(async (cctvId) => {
    try {
        const response = await GconContainer.getCctvIdCommonChk(cctvId)
        isAvailable.value = response.data.isAvailable
    } catch (e) {
        console.log("cctv ID 중복 체크 실패", e)
    }
}, 500);

const openPostcode = () => {
    new daum.Postcode({
        oncomplete: function (data) {
            const addr = data.roadAddress || data.jibunAddress;
            getGconInfoDetail.value.address = addr;
        }
    }).open();
}

watch(() => getGconInfoDetail.value.address, (newAddr) => {
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
})
</script>

<template>
    <div>
        <div>
            <VCard class="auth-card" :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'">
                <VCardText>
                    <h2 class="mb-1">
                        배회감지 카메라 추가
                    </h2>
                </VCardText>
                <VCardText class="text-right position-absolute" style="top: 40px; right: 0;">
                    <VBtn @click="postGconDetail">추가</VBtn>
                </VCardText>
                <VCardText>
                    <VRow>
                        <VCol cols="6">
                            <div class="my-2">카메라명</div>
                            <VTextField v-model="getGconInfoDetail.cctvName" :value="getGconInfoDetail.cctvName" />
                        </VCol>

                        <VCol cols="6">
                            <div class="d-flex justify-space-between">
                                <div class="my-2">카메라 ID</div>
                                <span v-if="!isAvailable" class="mt-2">이미 있는 ID 입니다</span>
                            </div>
                            <VTextField v-model="getGconInfoDetail.cctvId" :value="getGconInfoDetail.cctvId"
                                @input="handleChangeCctvId(getGconInfoDetail.cctvId)" />
                        </VCol>

                        <VCol cols="6">
                            <div class="my-2">상태</div>
                            <select v-model="getGconInfoDetail.state" class="select">
                                <option value="NOT_INSTALLED">미설치</option>
                                <option value="OPERATION">운영중</option>
                                <option value="INSPECTION">점검중</option>
                            </select>
                        </VCol>

                        <VCol cols="6">
                            <div class="my-2">지역</div>
                            <select v-model="getGconInfoDetail.codeDetailSid">
                                <option :value="getCity.detailSid" v-for="(getCity, index) in getCityList" :key="index">
                                    {{ getCity.name }}</option>
                            </select>
                        </VCol>

                        <VCol cols="6">
                            <div class="my-2">주소</div>
                            <VTextField v-model="getGconInfoDetail.address" :value="getGconInfoDetail.address"
                                @click="openPostcode" />

                            <div class="mt-4">
                                <span>위도</span>
                                <VTextField class="my-2" readonly>{{ getGconInfoDetail.latitude }}</VTextField>
                                <span>경도</span>
                                <VTextField class="my-2" readonly>{{ getGconInfoDetail.longitude }}</VTextField>
                            </div>
                        </VCol>

                        <VCol cols="6">
                            <div class="my-2">상세주소</div>
                            <VTextField v-model="getGconInfoDetail.detailAddress"
                                :value="getGconInfoDetail.detailAddress" />
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