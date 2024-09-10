<script setup>
import UserDataService from '@/api/UserDataService'
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({
    username: '',
    phoneNumber: '',
})

const snedMessage = ref('')

const snedMessageBox = ref(false)

const findId = async () => {
    try {
        console.log(form.value.username, form.value.phoneNumber);
        const response = await UserDataService.findId(form.value.username, form.value.phoneNumber);
        snedMessageBox.value = true;
        snedMessage.value = response.data.userId;
        console.log(response, "response");
    } catch (error) {
        console.log("전송 실패", error);
    }
}
</script>

<template>
    <div class="auth-wrapper d-flex align-center justify-center pa-4">
        <div class="position-relative my-sm-16" style="width: 100%;">
            <VCard class="auth-card" max-width="460" style="margin: 0 auto;"
                :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'">
                <VCardText>
                    <h2 class="mb-1 text-center">
                        ID 찾기
                    </h2>
                </VCardText>
                <VCardText>
                    <VForm @submit.prevent="findId">
                        <VRow>
                            <VCol cols="12">
                                <VTextField v-model="form.username" autofocus label="이름"/>
                            </VCol>

                            <VCol cols="12">
                                <VTextField v-model="form.phoneNumber" label="전화번호" placeholder="'-'없이 입력" />
                                <div class="my-6" style="margin-bottom: 0 !important;">
                                    <VBtn block type="submit">
                                        ID 찾기
                                    </VBtn>
                                </div>
                            </VCol>
                        </VRow>
                    </VForm>
                    <div class="d-flex align-center justify-space-between flex-wrap my-6">
                        <div v-if="snedMessageBox === false"></div>
                        <span class="d-inline-block" v-if="snedMessageBox">
                            찾은 아이디 : {{ snedMessage }}
                        </span>
                        <div>
                            <a class="text-primary" href="/login">
                                로그인 |
                            </a>
                            <a class="text-primary" href="/findPassword">
                                비밀번호 찾기
                            </a>
                        </div>
                    </div>
                </VCardText>
            </VCard>
        </div>
    </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
