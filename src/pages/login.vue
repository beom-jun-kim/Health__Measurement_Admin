<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
// import logo from '@images/logo.svg?raw'
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?url'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?url'
import UserDataService from '@/api/UserDataService'
import { useRouter } from 'vue-router';

const router = useRouter();

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const errorMessageCnt = ref('')

const errorMessageCntBox = ref(false)

const userLogin = async () => {
  try {
    const data = {
      userId: form.value.email,
      password: form.value.password,
    }
    await UserDataService.login(data);
    router.push("/home");
  } catch (error) {
    console.log("로그인 실패", error);
    if (error.response.data.errorMessage) {
      errorMessageCnt.value = error.response.data.errorMessage;
      errorMessageCntBox.value = true;
    }
  }
}

const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape
      <VImg :src="authV1TopShape" class="text-primary auth-v1-top-shape d-none d-sm-block" />

      👉 Bottom shape
      <VImg :src="authV1BottomShape" class="text-primary auth-v1-bottom-shape d-none d-sm-block" /> -->

      <!-- 👉 Auth Card -->
      <VCard class="auth-card" max-width="460" :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'">
        <VCardText>
          <h2 class="mb-1 text-center">
            로그인
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
            Welcome to Sneat! 👋🏻
          </h4>
          <p class="mb-0">
            Please sign-in to your account and start the adventure
          </p>
        </VCardText> -->

        <VCardText>
          <VForm @submit.prevent="userLogin">
            <VRow>
              <VCol cols="12">
                <VTextField v-model="form.email" autofocus label="아이디" type="email" />
              </VCol>
              <VCol cols="12">
                <VTextField v-model="form.password" label="비밀번호" :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible" />
                <p v-if="errorMessageCntBox">{{ errorMessageCnt }}</p>
                <div class="d-flex align-center justify-space-between flex-wrap my-6">
                  <VCheckbox v-model="form.remember" label="아이디 저장" />
                  <div>
                    <a class="text-primary" href="/findId">
                      아이디 찾기 |
                    </a>
                    <a class="text-primary" href="/findPassword">
                      비밀번호 찾기
                    </a>
                  </div>
                </div>
                <VBtn block type="submit">
                  Login
                </VBtn>
              </VCol>
              <VCol cols="12" class="text-body-1 text-center">
                <span class="d-inline-block">
                  계정이 없으신가요?
                </span>
                <RouterLink class="text-primary ms-1 d-inline-block text-body-1" to="/register">
                  회원가입
                </RouterLink>
              </VCol>
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
