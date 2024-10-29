<script setup>
import CommonCode from '@/api/CommonCode';
import { onMounted } from 'vue';
import { useCUDDate } from '@/utilityFunc/getCudDate';

const { loadCudDate, getCudDate } = useCUDDate();

const commonCodeDateList = ref([])
const commonCodeDetailDateList = ref([])
const roleDetailTextField = ref({
    id: '',
    headerType: '',
    name: '',
    desc: '',
})

const commonCodeDetailDetailDate = ref({
    detailSid: '',
    code: '',
    desc: '',
    headerType: '',
    name: '',
})

const loadCommonCode = async () => {
    try {
        const response = await CommonCode.getCommonCode()
        commonCodeDateList.value = response.data
    } catch (e) {
        console.log("관리자 권한 리스트 조회 실패", error)
    }
}

const loadCommonCodeDetail = async (id, type, name, desc) => {
    roleDetailTextField.value = { id, type, name, desc }
    try {
        const response = await CommonCode.getCommonCodeDetail(type)
        commonCodeDetailDateList.value = response.data
    } catch (e) {
        console.log("디테일 조회 실패", e)
    }
}

const commonCodeDetailGetBtn = async (id, code, name, desc, type) => {
    commonCodeDetailDetailDate.value = { id, code, name, desc, type }
}

const headerCodeAdd = async () => {
    if (confirm("Header를 추가하시겠습니까?")) {
        try {
            const data = {
                headerType: roleDetailTextField.value.type,
                name: roleDetailTextField.value.name,
                description: roleDetailTextField.value.desc,
            }
            await CommonCode.postCommonCodeDetail(data)
            alert("추가되었습니다")
            await loadCommonCode()
        } catch (e) {
            console.log("추가실패", e)
        }
    }
}

const headerCodeSave = async () => {
    if (confirm("Header를 수정하시겠습니까?")) {
        try {
            const data = {
                headerSid: roleDetailTextField.value.id,
                headerType: roleDetailTextField.value.type,
                name: roleDetailTextField.value.name,
                description: roleDetailTextField.value.desc
            }
            await CommonCode.patchCommonCodeDetail(data)
            alert("수정되었습니다")
            await loadCommonCode()
        } catch (e) {
            console.log("수정실패", e)
        }
    }
}

const detailCodeAdd = async () => {
    if (confirm("Detail를 추가하시겠습니까?")) {
        try {
            const data = {
                headerSid: roleDetailTextField.value.id,
                code: commonCodeDetailDetailDate.value.code,
                name: commonCodeDetailDetailDate.value.name,
                description: commonCodeDetailDetailDate.value.desc,
            }
            await CommonCode.postCommonCodeDetailDetail(data)
            alert("추가되었습니다")
            try {
                const response = await CommonCode.getCommonCodeDetail(roleDetailTextField.value.type)
                commonCodeDetailDateList.value = response.data
            } catch (e) {
                console.log("디테일 조회 실패", e)
            }
        } catch (e) {
            console.log("추가실패", e)
        }
    }
}

const detailCodeSave = async () => {
    if (confirm("Detail를 수정하시겠습니까?")) {
        try {
            const data = {
                detailSid: commonCodeDetailDetailDate.value.id,
                headerSid: roleDetailTextField.value.id,
                code: commonCodeDetailDetailDate.value.code,
                name: commonCodeDetailDetailDate.value.name,
                description: commonCodeDetailDetailDate.value.desc,
            }

            await CommonCode.patchCommonCodeDetailDetail(data)
            alert("수정되었습니다")
            try {
                const response = await CommonCode.getCommonCodeDetail(roleDetailTextField.value.type)
                commonCodeDetailDateList.value = response.data
            } catch (e) {
                console.log("디테일 조회 실패", e)
            }
        } catch (e) {
            console.log("수정실패", e)
        }
    }
}

onMounted(async () => {
    await loadCommonCode();
    await getCudDate();
})

</script>

<template>
    <VRow>
        <VCol cols="12">
            <span class="commonTitle">공통 코드 관리</span>
        </VCol>
        <VCol cols="6">
            <VCard title="Header">
                <VTable class="px-6 adminRoleList commonCodeTable">
                    <thead>
                        <tr>
                            <th scope="col" class="text-center">번호</th>
                            <th scope="col" class="text-center">Header 코드</th>
                            <th scope="col" class="text-center">Header명</th>
                        </tr>
                    </thead>
                    <tbody v-if="commonCodeDateList !== 0" class="text-center">
                        <tr v-for="(commonCode, index) in commonCodeDateList" :key="index">
                            <td
                                @click="loadCommonCodeDetail(commonCode.headerSid, commonCode.headerType, commonCode.name, commonCode.description)">
                                {{ index + 1 }}
                            </td>
                            <td
                                @click="loadCommonCodeDetail(commonCode.headerSid, commonCode.headerType, commonCode.name, commonCode.description)">
                                {{ commonCode.headerType }}
                            </td>
                            <td
                                @click="loadCommonCodeDetail(commonCode.headerSid, commonCode.headerType, commonCode.name, commonCode.description)">
                                {{ commonCode.name }}
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="3">설정된 Header가 없습니다.</td>
                        </tr>
                    </tbody>
                </VTable>
            </VCard>
        </VCol>
        <VCol cols="6">
            <VCard title="Detail">
                <VTable class="px-6 adminRoleList commonCodeTable">
                    <thead>
                        <tr>
                            <th scope="col" class="text-center">번호</th>
                            <th scope="col" class="text-center">Detail 코드</th>
                            <th scope="col" class="text-center">Detail명</th>
                        </tr>
                    </thead>
                    <tbody v-if="commonCodeDetailDateList !== 0" class="text-center">
                        <tr v-for="(commonCodeDetail, index) in commonCodeDetailDateList" :key="index">
                            <td
                                @click="commonCodeDetailGetBtn(commonCodeDetail.detailSid, commonCodeDetail.code, commonCodeDetail.name, commonCodeDetail.description, commonCodeDetail.headerType)">
                                {{ index + 1 }}
                            </td>
                            <td
                                @click="commonCodeDetailGetBtn(commonCodeDetail.detailSid, commonCodeDetail.code, commonCodeDetail.name, commonCodeDetail.description, commonCodeDetail.headerType)">
                                {{ commonCodeDetail.code }}
                            </td>
                            <td
                                @click="commonCodeDetailGetBtn(commonCodeDetail.detailSid, commonCodeDetail.code, commonCodeDetail.name, commonCodeDetail.description, commonCodeDetail.headerType)">
                                {{ commonCodeDetail.description }}
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="3">설정된 Detail이 없습니다.</td>
                        </tr>
                    </tbody>
                </VTable>
            </VCard>
        </VCol>
        <VCol cols="6">
            <VCard title="권한 상세" class="position-relative">
                <VText v-if="loadCudDate.create" :class="{ 'role': loadCudDate.update }" class="roleBtn"
                    @click="headerCodeAdd">추가</VText>
                <VText v-if="loadCudDate.update" class="roleBtn" @click="headerCodeSave">수정</VText>
                <VForm class="mt-6 px-6 pb-6">
                    <VRow>
                        <VCol cols="12">
                            <VTextField label="Header 코드" v-model="roleDetailTextField.type" />
                        </VCol>
                        <VCol cols="12">
                            <VTextField label="Header명" v-model="roleDetailTextField.name" />
                        </VCol>

                        <VCol cols="12" class="pt-0">
                            <VTextarea label="비고내용" v-model="roleDetailTextField.desc" />
                        </VCol>
                    </VRow>
                </VForm>
            </VCard>
        </VCol>
        <VCol cols="6">
            <VCard title="권한 상세" class="position-relative">
                <VText v-if="loadCudDate.create" :class="{ 'role': loadCudDate.update }" class="roleBtn"
                    @click="detailCodeAdd">추가</VText>
                <VText v-if="loadCudDate.update" class="roleBtn" @click="detailCodeSave">수정</VText>
                <VForm class="mt-6 px-6 pb-6">
                    <VRow>
                        <VCol cols="12">
                            <VTextField label="Detail 코드" v-model="commonCodeDetailDetailDate.code" />
                        </VCol>
                        <VCol cols="12">
                            <VTextField label="Detail명" v-model="commonCodeDetailDetailDate.name" />
                        </VCol>

                        <VCol cols="12" class="pt-0">
                            <VTextarea label="비고내용" v-model="commonCodeDetailDetailDate.desc" />
                        </VCol>
                    </VRow>
                </VForm>
            </VCard>
        </VCol>
    </VRow>
</template>

<style scoped>
.commonTitle {
    font-size: 18px;
    font-weight: 500;
}

.commonCodeTable {
    height: 950px;
    overflow-y: auto;
}

th {
    text-transform: capitalize;
}

.adminRoleList td {
    cursor: pointer;
}

select {
    border: 1px solid rgba(34, 48, 62, 0.217);
    padding: 0 10px;
    width: 95px;
    height: 40px;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800px' height='800px' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z' fill='%230F0F0F'/%3E%3C/svg%3E") no-repeat right 10px center;
    background-size: 16px 16px;
}

.detailMove {
    display: block;
    height: 100%;
    line-height: 49px;
}

.roleBtn {
    position: absolute;
    top: 26px;
    right: 20px;
    cursor: pointer;
}

.role {
    right: 60px;
}
</style>