<script setup>
import CustSupMana from '@/api/CustSupMana';
import { useRouter } from 'vue-router';

const router = useRouter();
const getGconInfoDetail = ref({
    title:'',
    postStatus:'',
    content:'',
})
const category = ref('TERMS_OF_SERVICE')

const gconDetailSave = async () => {
    if (confirm("저장하시겠습니까?")) {
        try {
            const data = {
                category: category.value,
                title: getGconInfoDetail.value.title,
                status: getGconInfoDetail.value.postStatus,
                content: getGconInfoDetail.value.content,
            }
            await CustSupMana.postCustSupManaDetail(data)
            alert("저장되었습니다");
            router.push("/cust-sup-mana");
        } catch (error) {
            console.log("개인정보처리방침 상세 정보 수정 실패", error);
        }
    }
}
</script>

<template>
    <div>
        <div>
            <VCard class="auth-card" :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'">
                <VCardText>
                    <h2 class="mb-1">
                        개인정보처리방침 등록
                    </h2>
                </VCardText>
                <VCardText class="text-right position-absolute" style="top: 40px; right: 20px;">
                    <VBtn @click="gconDetailSave">저장</VBtn>
                </VCardText>
                <VCardText>
                    <VRow>
                        <VCol cols="12">
                            <div class="my-2">제목</div>
                            <VTextField v-model="getGconInfoDetail.title" autofocus />
                        </VCol>
                        <VCol cols="4">
                            <div class="my-2">상태</div>
                            <div class="d-flex">
                                <div class="d-flex">
                                    <div class="statusBox">
                                        <input type="radio" id="man" v-model="getGconInfoDetail.postStatus"
                                            :value="false" />
                                        <label for="man" class="custom-radio">대기</label>
                                    </div>

                                    <div class="statusBox">
                                        <input type="radio" id="women" v-model="getGconInfoDetail.postStatus"
                                            :value="true" />
                                        <label for="women" class="custom-radio">게시</label>
                                    </div>
                                </div>
                            </div>
                        </VCol>
                        <VCol cols="12">
                            <div class="my-2">내용</div>
                            <VTextarea v-model="getGconInfoDetail.content" />
                        </VCol>
                    </VRow>
                </VCardText>
            </VCard>
        </div>
    </div>
</template>

<style scoped>
.statusBox input[type="radio"] {
    display: none;
}

.statusBox .custom-radio::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 17px;
    border: 2px solid #cfcfcf;
    border-radius: 50%;
    margin-right: 8px;
    vertical-align: middle;
}

.statusBox input[type="radio"]:checked+.custom-radio::before {
    border-color: #696CFF;
    content: '';
    color: #696CFF;
    accent-color: #696CFF;
    text-align: center;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2336b1a7"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 20.59 7.41 19.17 6l-10 10.17z"/></svg>');
}

.active-tab {
    color: #696CFF;
}

.statusBox .custom-radio {
    margin-right: 20px;
}
</style>