<script setup>
import CustSupMana from '@/api/CustSupMana';
import { useRouter, useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useCUDDate } from '@/utilityFunc/getCudDate';

const { loadCudDate, getCudDate } = useCUDDate();

const router = useRouter();
const route = useRoute();

const getGconInfoDetail = ref({})

const loadUserDetail = async (id) => {
    try {
        const response = await CustSupMana.getCustSupManaDetail(id)
        getGconInfoDetail.value = response.data;
    } catch (error) {
        console.log("오픈소스 라이센스 상세 조회 실패", error);
    }
}

const gconDetailSave = async (id) => {
    if (confirm("수정하시겠습니까?")) {
        try {
            const data = {
                boardSid: id,
                title: getGconInfoDetail.value.title,
                status: getGconInfoDetail.value.status,
                content: getGconInfoDetail.value.content,
            }
            await CustSupMana.patchCustSupManaDetail(data)
            alert("수정되었습니다");
        } catch (error) {
            console.log("오픈소스 라이센스 상세 정보 수정 실패", error);
        }
    }
}

const gconDetailDel = async () => {
    if (confirm("삭제하시겠습니까?")) {
        try {
            await CustSupMana.delCustSupManaDetail(route.params.id)
            alert("삭제되었습니다");
            router.push("/open-source");
        } catch (error) {
            console.log("오픈소스 라이센스 상세 정보 삭제 실패", error);
        }
    }
}

onMounted(async () => {
    await loadUserDetail(route.params.id);
    await getCudDate();
})
</script>

<template>
    <div>
        <div>
            <VCard class="auth-card" :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'">
                <VCardText>
                    <h2 class="mb-1">
                        오픈소스 라이센스 상세
                    </h2>
                </VCardText>
                <VCardText v-if="loadCudDate.update" :class="{ 'role': loadCudDate.delete }" class="text-right position-absolute roleBtn">
                    <VBtn @click="gconDetailSave(getGconInfoDetail.boardSid)">수정</VBtn>
                </VCardText>
                <VCardText v-if="loadCudDate.delete" class="text-right position-absolute roleBtn">
                    <VBtn @click="gconDetailDel">삭제</VBtn>
                </VCardText>
                <VCardText>
                    <VRow>
                        <VCol cols="12">
                            <div class="my-2">제목</div>
                            <VTextField v-model="getGconInfoDetail.title" :value="getGconInfoDetail.title" autofocus />
                        </VCol>
                        <VCol cols="4">
                            <div class="my-2">상태</div>
                            <div class="d-flex">
                                <div class="d-flex">
                                    <div class="status">
                                        <input type="radio" id="man" v-model="getGconInfoDetail.status"
                                            :value="false" />
                                        <label for="man" class="custom-radio"
                                            :class="{ 'active-tab': getGconInfoDetail.status === false }">대기</label>
                                    </div>

                                    <div class="status">
                                        <input type="radio" id="women" v-model="getGconInfoDetail.status"
                                            :value="true" />
                                        <label for="women" class="custom-radio"
                                            :class="{ 'active-tab': getGconInfoDetail.status === true }">게시</label>
                                    </div>
                                </div>
                            </div>
                        </VCol>
                        <VCol cols="12">
                            <div class="my-2">내용</div>
                            <VTextarea v-model="getGconInfoDetail.content" :value="getGconInfoDetail.content"
                                autofocus />
                        </VCol>
                    </VRow>
                </VCardText>
            </VCard>
        </div>
    </div>
</template>

<style scoped>
.status input[type="radio"] {
    display: none;
}

.status .custom-radio::before {
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

.status input[type="radio"]:checked+.custom-radio::before {
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

.status .custom-radio {
    margin-right: 20px;
}

.roleBtn {
    top: 40px;
    right: 0;
}

.role {
    right: 80px;
}
</style>