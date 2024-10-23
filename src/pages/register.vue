<script setup>
// import logo from '@images/logo.svg?raw'
// import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?url'
// import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?url'
import UserDataService from '@/api/UserDataService';
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({
  email: '',
  authCode: '',
  password: '',
  confirmPassword: '',
  username: '',
  phoneNumber: '',
  privacyPolicies: false,
})

const isPasswordVisible = ref(false)
const isAuthCodeSent = ref(false)
const isAuthCodeSentVisible = ref(false)
const isAuthCodeSentTextTrans = ref(false)
const signupBtn = ref(true)
const timer = ref(300)
const interval = ref(null)

const sendAuthCode = async () => {
  clearInterval(interval.value);
  startTimer();
  if (!form.value.email.includes("@")) {
    alert("현재 사용하고 계시는 이메일로 입력하여 주세요");
  }
  try {
    const data = {
      email: form.value.email,
    }
    await UserDataService.verificationEmail(data);
    isAuthCodeSentVisible.value = true;
    isAuthCodeSentTextTrans.value = true;
  } catch (error) {
    console.log("인증번호 전송 실패", error);
    if (error.response.status === 429) {
      alert("인증번호 발급 요청 횟수를 초과했습니다. (하루 최대 5회) 24시간 후에 다시 시도해주세요");
    }
  }
}

const sendAuthEmailCode = async () => {
  try {
    const data = {
      email: form.value.email,
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
      signupBtn.value = false;
      clearInterval(interval.value);
    }
  } catch (error) {
    console.log("인증번호 확인 실패", error);
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
      isAuthCodeSentVisible.value = false;
    }
  }, 1000)
}

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

const handleSignUp = async () => {
  const phoneNumber = Number(form.value.phoneNumber);
  if (form.value.password !== form.value.confirmPassword) {
    alert("비밀번호가 일치하지 않습니다");
  } else if (isNaN(phoneNumber)) {
    alert("전화번호를 올바르게 입력하여주세요");
  } else if (
    form.value.email === '' ||
    form.value.password === '' ||
    form.value.username === '' ||
    form.value.phoneNumber === ''
  ) {
    alert("입력칸에 정보를 모두 입력하여주세요");
  } else if (form.value.password.length < 6 || form.value.password.length > 16) {
    alert("비밀번호는 6자리 이상 16자리 이하로 입력하여주세요");
  } else if (!/^(?=.*[A-Za-z])(?=.*\d).{6,16}$/.test(form.value.password)) {
    alert("비밀번호는 영문과 숫자를 필수로 포함해야 합니다");
  } else if (!/^[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+$/.test(form.value.password)) {
    alert(`!@#$%^&*()_+-=[]{};':"\\|,.<>/?의 특수문자만 포함할 수 있습니다`);
  } else {
    if (confirm("회원가입 하시겠습니까?")) {
      try {
        await UserDataService.createUser({
          userId: form.value.email,
          password: form.value.password,
          name: form.value.username,
          phoneNumber: form.value.phoneNumber,
        });
        alert("회원가입이 완료되었습니다");
        router.push("/login");
      } catch (error) {
        console.error('회원가입 실패:', error);
      }
    }
  }
};

</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape
      <VImg :src="authV1TopShape" class="text-primary auth-v1-top-shape d-none d-sm-block" />

      👉 Bottom shape
      <VImg :src="authV1BottomShape" class="text-primary auth-v1-bottom-shape d-none d-sm-block" /> -->

      <!-- 👉 Auth card -->
      <VCard class="auth-card" max-width="460" :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'">
        <VCardText>
          <h2 class="mb-1 text-center">
            회원가입
          </h2>
        </VCardText>
          <!-- <VCardItem class="justify-center">
          <RouterLink to="/" class="app-logo">
            eslint-disable vue/no-v-html
            <div class="d-flex" v-html="logo" />
            <h1 class="app-logo-title">
              sneat
            </h1>
          </RouterLink>
        </VCardItem>

        <VCardText>
          <h4 class="text-h4 mb-1">
            Adventure starts here 🚀
          </h4>
          <p class="mb-0">
            Make your app management easy and fun!
          </p>
        </VCardText> -->

          <VCardText>
            <VForm @submit.prevent="handleSignUp">
              <VRow>
                <VCol cols="12">
                  <VTextField v-model="form.email" label="아이디" type="email" placeholder="example@email.com" autofocus
                    :disabled="isAuthCodeSent" required />
                </VCol>

                <VCol cols="12">
                  <VBtn @click="sendAuthCode" block :disabled="isAuthCodeSent">{{ isAuthCodeSentTextTrans === false ?
                    "인증번호 전송" : "재전송" }}</VBtn>
                </VCol>

                <VCol cols="12" v-if="isAuthCodeSentVisible">
                  <VTextField v-model="form.authCode" label="인증번호" required :disabled="isAuthCodeSent" />
                </VCol>

                <VCol cols="12" class="py-0" v-if="isAuthCodeSentVisible">
                  <p class="mb-0">인증번호가 이메일로 전송되었습니다. 남은시간 {{ formatTime(timer) }}</p>
                </VCol>

                <VCol cols="12" v-if="isAuthCodeSentVisible">
                  <VBtn @click="sendAuthEmailCode" block :disabled="isAuthCodeSent">인증번호 확인</VBtn>
                </VCol>

                <VCol cols="12">
                  <VTextField v-model="form.password" label="비밀번호" placeholder="6~16자의 영문 혹은 영문+숫자 조합"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible" required maxlength="16"
                    minlength="6" />
                </VCol>

                <VCol cols="12">
                  <VTextField v-model="form.confirmPassword" label="비밀번호 확인"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible" required />
                </VCol>

                <VCol cols="12">
                  <VTextField v-model="form.username" label="이름" placeholder="홍길동" required />
                </VCol>

                <VCol cols="12">
                  <VTextField v-model="form.phoneNumber" label="전화번호" placeholder="'-'없이 입력" required />
                </VCol>

                <!-- <VCol cols="12">
                <VSelect v-model="form.department" label="소속" :items="['본사 개발부', '지사 영업부', '마케팅팀']" required />
              </VCol> -->

                <!-- <VCol cols="12">
                <div class="d-flex align-center">
                  <VCheckbox id="privacy-policy" v-model="form.privacyPolicies" inline />
                  <VLabel for="privacy-policy" style="opacity: 1;">
                    <span class="me-1 text-high-emphasis">동의함</span>
                    <a href="javascript:void(0)" class="text-primary">개인정보 보호정책 및 약관</a>
                  </VLabel>
                </div>
              </VCol> -->

                <VCol cols="12">
                  <VBtn block type="submit" :disabled="signupBtn">회원가입</VBtn>
                </VCol>

                <VCol cols="12" class="text-center text-base">
                  <span>이미 계정이 있으신가요?</span>
                  <RouterLink class="text-primary ms-1" to="/login">
                    로그인
                  </RouterLink>
                </VCol>

                <!-- <VCol cols="12" class="d-flex align-center">
                <VDivider />
                <span class="mx-4">or</span>
                <VDivider />
              </VCol>

              <VCol cols="12" class="text-center">
                <AuthProvider />
              </VCol> -->
              </VRow>
            </VForm>
          </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
