<script setup>
import GconUserManage from '@/api/GconUserManage';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();

const getGconUserDetail = ref({})

const loadUserDetail = async (id) => {
    try {
        const response = await GconUserManage.getGconUserDetail(id)
        getGconUserDetail.value = response.data;
        console.log("1234", getGconUserDetail.value)
    } catch (error) {
        console.log("유저 전체조회 실패", error);
    }
}

onMounted(async () => {
    await loadUserDetail(route.params.id);
})

</script>

<template>
    <div>
        <div>
            <VCard class="auth-card" :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'">
                <VCardText>
                    <h2 class="mb-1">
                        GCON 회원 상세
                    </h2>
                </VCardText>
                <VCardText style="max-width: 500px;">
                    <VRow>
                        <VCol cols="12">
                            <div class="my-2">이름</div>
                            <VTextField v-model="getGconUserDetail.name" readonly />
                        </VCol>

                        <VCol cols="12">
                            <div class="my-2">ID</div>
                            <VTextField v-model="getGconUserDetail.userId" readonly />
                        </VCol>

                        <VCol cols="12">
                            <div class="my-2">연락처</div>
                            <VTextField v-model="getGconUserDetail.phoneNumber" readonly />
                        </VCol>

                        <VCol cols="12">
                            <div class="my-2">성별</div>
                            <VTextField v-model="getGconUserDetail.gender"
                                :value="getGconUserDetail.gender === 'M' ? '남자' : '여자'" readonly />
                        </VCol>

                        <VCol cols="12">
                            <div class="my-2">로그인 유형</div>
                            <div class="d-flex">
                                <div class="d-flex align-center sns-login">
                                    <div class="chk-box" :class="{ 'active-tab': getGconUserDetail.general === true }">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"
                                            viewBox="0 0 24 24" fill="none" class="icon">
                                            <path class="path":class="{ 'active-path': getGconUserDetail.general === true }"
                                                d="M9 12L10.5 13.5V13.5C10.7761 13.7761 11.2239 13.7761 11.5 13.5V13.5L15 10"
                                                stroke="#696CFF" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div :class="{ 'active-tab': getGconUserDetail.general === true }">
                                        일반로그인
                                    </div>
                                </div>
    
                                <div class="d-flex align-center sns-login">
                                    <div class="chk-box" :class="{ 'active-tab': getGconUserDetail.naverId !== null }">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"
                                            viewBox="0 0 24 24" fill="none" class="icon">
                                            <path class="path":class="{ 'active-path': getGconUserDetail.naverId === true }"
                                                d="M9 12L10.5 13.5V13.5C10.7761 13.7761 11.2239 13.7761 11.5 13.5V13.5L15 10"
                                                stroke="#696CFF" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div :class="{ 'active-tab': getGconUserDetail.naverId !== null }">
                                        네이버 로그인
                                    </div>
                                </div>
    
                                <div class="d-flex align-center sns-login">
                                    <div class="chk-box" :class="{ 'active-tab': getGconUserDetail.kakaoId !== null }">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"
                                            viewBox="0 0 24 24" fill="none" class="icon">
                                            <path class="path":class="{ 'active-path': getGconUserDetail.kakaoId !== null }"
                                                d="M9 12L10.5 13.5V13.5C10.7761 13.7761 11.2239 13.7761 11.5 13.5V13.5L15 10"
                                                stroke="#696CFF" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div :class="{ 'active-tab': getGconUserDetail.kakaoId !== null }">
                                        카카오 로그인
                                    </div>
                                </div>
                            </div>
                        </VCol>

                        <VCol cols="12">
                            <div class="my-2">카카오 ID</div>
                            <VTextField v-model="getGconUserDetail.kakaoId"
                                :value="getGconUserDetail.kakaoId !== null ? getGconUserDetail.kakaoId : '등록된 ID가 없습니다'"
                                readonly />
                        </VCol>

                        <VCol cols="12">
                            <div class="my-2">NAVER ID</div>
                            <VTextField v-model="getGconUserDetail.naverId"
                                :value="getGconUserDetail.naverId !== null ? getGconUserDetail.naverId : '등록된 ID가 없습니다'"
                                readonly />
                        </VCol>
                    </VRow>
                </VCardText>
            </VCard>
        </div>
    </div>
</template>

<style scoped>
.chk-box {
    border: 1px solid #696cff3d;
    border-radius: 50%;
    margin-right: 5px;
}

.sns-login {
    margin-right: 20px;
}

.chk-box svg {
    vertical-align: middle;
}

.path {
    stroke: rgba(34, 48, 62, 0.217);
}

.chk-box.active-tab {
    background-color: #696cff3d;
    border: 1px solid #696cff3d;
}
</style>