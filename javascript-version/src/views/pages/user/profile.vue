<script setup>
import UserDataService from '@/api/UserDataService'
import { onMounted } from 'vue'

const form = ref({
    name: '',
    password: '',
    passwordChange: '',
    confirmPassword: '',
    phoneNumber: '',
})

const getUser = ref({})

const getUserInfo = async () => {
    try {
        const response = await UserDataService.getUserInfo();
        getUser.value = response.data;
    } catch (error) {
        console.log(error);
    }
}

const patchUserInfo = async () => {
    if (confirm("정보를 수정하시겠습니까?")) {
        try {
            if (form.value.name === '') {
                form.value.name = getUser.value.name;
            }
            if (form.value.phoneNumber === '') {
                form.value.phoneNumber = getUser.value.phoneNumber;
            }
            const data = {
                name: form.value.name,
                phoneNumber: form.value.phoneNumber,
            }
            await UserDataService.patchUserInfo(data);
            alert("수정되었습니다");
            await getUserInfo();
        } catch (error) {
            console.error("내정보 수정 실패", error)
        }
    }
}

const patchUserPassword = async () => {
    if (form.value.password === '' || form.value.passwordChange === '' || form.value.confirmPassword === '') {
        alert("입력칸을 다 채워주세요")
    } else if (form.value.passwordChange !== form.value.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다")
    } else if (form.value.passwordChange.length < 6 || form.value.passwordChange.length > 16) {
        alert("비밀번호는 6자리 이상 16자리 이하로 입력하여주세요");
    } else if (!/^(?=.*[A-Za-z])(?=.*\d).{6,16}$/.test(form.value.passwordChange)) {
        alert("비밀번호는 영문과 숫자를 필수로 포함해야 합니다");
    } else if (!/^[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+$/.test(form.value.passwordChange)) {
        alert(`!@#$%^&*()_+-=[]{};':"\\|,.<>/?의 특수문자만 포함할 수 있습니다`);
    } else {
        if (confirm("비밀번호를 수정하시겠습니까?")) {
            try {
                const data = {
                    password: form.value.password,
                    newPassword: form.value.passwordChange,
                    confirmPassword: form.value.confirmPassword,
                }
                await UserDataService.patchUserPwd(data);
                alert("수정되었습니다");
                await getUserInfo();
            } catch (error) {
                console.error("내정보 수정 실패", error)
            }
        }
    }
}

onMounted(() => {
    getUserInfo();
})

const isPasswordVisible = ref(false)

</script>

<template>
    <div>
        <div>
            <VCard class="auth-card" :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'">
                <VCardText>
                    <h2 class="mb-1">
                        내 정보 관리
                    </h2>
                </VCardText>
                <VCardText style="max-width: 500px;">
                    <VForm @submit.prevent="patchUserInfo">
                        <VRow>
                            <VCol cols="12">
                                <VTextField v-model="form.name" :label="getUser.name" autofocus />
                            </VCol>

                            <VCol cols="12">
                                <VTextField v-model="form.phoneNumber" :label="getUser.phoneNumber"
                                    placeholder="'-'없이 입력" required />
                            </VCol>
                            <VCol cols="12">
                                <VBtn type="submit" block>내 정보 저장</VBtn>
                            </VCol>
                        </VRow>
                    </VForm>
                    <VForm class="mt-6" @submit.prevent="patchUserPassword">
                        <VRow>
                            <VCol cols="12">
                                <VTextField v-model="form.password" label="현재 비밀번호" placeholder="6~16자의 영문 혹은 영문+숫자 조합"
                                    :type="isPasswordVisible ? 'text' : 'password'"
                                    :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                                    @click:append-inner="isPasswordVisible = !isPasswordVisible" required maxlength="16"
                                    minlength="6" />
                            </VCol>

                            <VCol cols="12">
                                <VTextField v-model="form.passwordChange" label="수정 비밀번호"
                                    placeholder="6~16자의 영문 혹은 영문+숫자 조합" :type="isPasswordVisible ? 'text' : 'password'"
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
                                <VBtn block type="submit">비밀번호 수정</VBtn>
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
