<script setup>
import UserDataService from '@/api/UserDataService'
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({
    userId: '',
    username: '',
    phoneNumber: '',
    email: '',
    authCode: '',
})

const pwdChan = ref({
    password: '',
    confirmPassword: '',
})

const isPasswordVisible = ref(false)
const isAuthCodeSent = ref(false)
const isAuthCodeSentVisible = ref(false)
const isAuthCodeSentTextTrans = ref(false)
const passwordChange = ref(false)
const timer = ref(300)
const interval = ref(null)

const findPassword = async () => {
    clearInterval(interval.value);
    startTimer();
    try {
        const data = {
            userId: form.value.userId,
            name: form.value.username,
            phoneNumber: form.value.phoneNumber,
        }
        const response = await UserDataService.findpassword(data);
        isAuthCodeSentTextTrans.value = true;
        isAuthCodeSentVisible.value = true;
    } catch (error) {
        console.log("전송 실패", error);
        if (error.response.status === 400 || error.response.status === 404) {
            alert("사용자 정보를 다시 확인하여주세요");
        }
        if (error.response.status === 429) {
            alert("인증번호 발급 요청 횟수를 초과했습니다. (하루 최대 5회) 24시간 후에 다시 시도해주세요");
        }
    }

}

const sendAuthEmailCode = async () => {
    try {
        const data = {
            email: form.value.userId,
            verificationCode: form.value.authCode,
        }
        const response = await UserDataService.verificationEmailChk(data);
        if (response.data.verified === false) {
            alert("인증번호가 일치하지 않습니다");
        } else if (response.data.codeRefresh === true) {
            alert("인증번호를 3회이상 틀리셨습니다 인증번호를 재발급 받아주세요");
        } else {
            alert("인증번호가 확인되었습니다");
            isAuthCodeSent.value = true;
            passwordChange.value = true;
            clearInterval(interval.value);
        }
    } catch (error) {
        console.log("인증번호 확인 실패", error);
    }
}

const pwdReset = async () => {
    if (pwdChan.value.password !== pwdChan.value.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다")
    } else if (pwdChan.value.password.length < 6 || pwdChan.value.password.length > 16) {
        alert("비밀번호는 6자리 이상 16자리 이하로 입력하여주세요");
    } else if (!/^(?=.*[A-Za-z])(?=.*\d).{6,16}$/.test(pwdChan.value.password)) {
        alert("비밀번호는 영문과 숫자를 필수로 포함해야 합니다");
    } else if (!/^[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+$/.test(pwdChan.value.password)) {
        alert(`!@#$%^&*()_+-=[]{};':"\\|,.<>/?의 특수문자만 포함할 수 있습니다`)
    } else {
        if (confirm("비밀번호를 변경하시겠습니까?")) {
            try {
                const data = {
                    name: form.value.username,
                    userId: form.value.userId,
                    password: pwdChan.value.password,
                    phoneNumber: form.value.phoneNumber,
                }
                await UserDataService.resetPwd(data);
                alert("비밀번호가 변경되었습니다")
                router.push("/login");
            } catch (error) {
                console.log("비밀번호 변경 실패", error);
            }
        }
    }
}

// 타이머 시작 함수
const startTimer = () => {
    if (interval.value) clearInterval(interval.value)
    interval.value = setInterval(() => {
        if (timer.value > 0) {
            timer.value--
        } else {
            clearInterval(interval.value)
            alert("인증 시간이 만료되었습니다. 인증번호를 다시 요청해주세요.");
            isAuthCodeSent.value = true;
        }
    }, 1000)
}

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}
</script>

<template>
    <div class="auth-wrapper d-flex align-center justify-center pa-4">
        <div class="position-relative my-sm-16 w-100">
            <VCard class="auth-card mx-auto" max-width="460"
                :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'">
                <VCardText>
                    <h2 class="mb-1 text-center">
                        비밀번호 찾기
                    </h2>
                </VCardText>
                <VCardText>
                    <VForm @submit.prevent="findPassword">
                        <VRow>
                            <VCol cols="12">
                                <VTextField v-model="form.userId" autofocus label="아이디" type="email"
                                    :disabled="isAuthCodeSent" />
                            </VCol>
                            <VCol cols="12">
                                <VTextField v-model="form.username" autofocus label="이름" :disabled="isAuthCodeSent" />
                            </VCol>

                            <VCol cols="12">
                                <VTextField v-model="form.phoneNumber" label="전화번호" placeholder="'-'없이 입력"
                                    :disabled="isAuthCodeSent" />
                                <div class="mt-4">
                                    <VBtn block type="submit" :disabled="isAuthCodeSent">
                                        {{ isAuthCodeSentTextTrans
                                            ===
                                            false ? "인증번호 전송" : "재전송" }}
                                    </VBtn>
                                </div>
                            </VCol>
                        </VRow>
                        <VRow v-if="isAuthCodeSentVisible">
                            <VCol cols="12">
                                <VTextField v-model="form.authCode" label="인증번호" required :disabled="isAuthCodeSent" />
                            </VCol>

                            <VCol class="py-0" cols="12">
                                <p class="mb-0">인증번호가 이메일로 전송되었습니다. 남은시간 {{ formatTime(timer) }}</p>
                            </VCol>

                            <VCol class="pt-4" cols="12">
                                <VBtn @click="sendAuthEmailCode" block :disabled="isAuthCodeSent">인증번호 확인</VBtn>
                            </VCol>
                        </VRow>
                        <VRow v-if="passwordChange">
                            <VCol cols="12">
                                <VTextField v-model="pwdChan.password" label="새 비밀번호"
                                    :type="isPasswordVisible ? 'text' : 'password'"
                                    :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                                    @click:append-inner="isPasswordVisible = !isPasswordVisible" maxlength="16"
                                    minlength="6" />
                            </VCol>
                            <VCol cols="12">
                                <VTextField v-model="pwdChan.confirmPassword" label="새 비밀번호 확인"
                                    :type="isPasswordVisible ? 'text' : 'password'"
                                    :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                                    @click:append-inner="isPasswordVisible = !isPasswordVisible" />
                            </VCol>
                            <VCol cols="12">
                                <VBtn @click="pwdReset" block>비밀번호 수정</VBtn>
                            </VCol>
                        </VRow>
                    </VForm>
                    <div class="text-center mt-5">
                        <a class="text-primary" href="/login">
                            로그인 |
                        </a>
                        <a class="text-primary" href="/findId">
                            아이디 찾기
                        </a>
                    </div>
                </VCardText>
            </VCard>
        </div>
    </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
