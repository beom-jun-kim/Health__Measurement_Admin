<script setup>
import Manage from '@/api/Manage';
import { onMounted } from 'vue';

const adminRoleListDate = ref([])
const adminRolePage = ref(0)
const adminRoleSize = ref(10)
const indexPage = ref(1)
const roleDetailTextField = ref({
    id: '',
    name: '',
    desc: '',
})

const indexAdminRolePage = ref(0)
const indexAdminRoleSize = ref(10)
const indexIndexPage = ref(1)
const indexAdminRoleDataList = ref([])

const getAdminRoles = async () => {
    try {
        const response = await Manage.getAdminRoleList(adminRolePage.value, adminRoleSize.value)
        adminRoleListDate.value = response.data
    } catch (e) {
        console.log("관리자 권한 리스트 조회 실패", error)
    }
}

const indexPageLoadAllUser = async (page) => {
    indexPage.value = page;
    adminRolePage.value = page - 1;
    await getAdminRoles();
}

const indexAdminRolePageChange = async (page) => {
    indexIndexPage.value = page;
    indexAdminRolePage.value = page - 1;
    await getIndexRole();
}

const clickChangeRoleDetail = async (id, name, desc) => {
    roleDetailTextField.value = { id, name, desc }
    try {
        const response = await Manage.getIndexRole(id, indexAdminRolePage.value, indexAdminRoleSize.value)
        indexAdminRoleDataList.value = response.data
    } catch (e) {
        console("해당 관리자 리스트 조회 실패", e)
    }
}

const roleAdd = async () => {
    if (confirm("권한을 추가하시겠습니까?")) {
        try {
            const data = {
                roleName: roleDetailTextField.value.name,
                description: roleDetailTextField.value.desc,
            }
            await Manage.postAdminRoleChange(data)
            alert("추가되었습니다")
            await getAdminRoles()
        } catch (e) {
            console.log("추가실패", e)
        }
    }
}
const roleSave = async () => {
    if (confirm("권한을 수정하시겠습니까?")) {
        try {
            const data = {
                roleSid: roleDetailTextField.value.id,
                roleName: roleDetailTextField.value.name,
                description: roleDetailTextField.value.desc,
            }
            await Manage.patchAdminRoleChange(data)
            alert("수정되었습니다")
            await getAdminRoles()
        } catch (e) {
            console.log("저장실패", e)
        }
    }
}
const roleDel = async () => {
    if (confirm("권한을 삭제하시겠습니까?")) {
        try {
            await Manage.delAdminRoleChange(roleDetailTextField.value.id)
            alert("삭제되었습니다")
            await getAdminRoles()
        } catch (e) {
            console.log("삭제실패", e)
        }
    }
}

onMounted(async () => {
    await getAdminRoles();
})

</script>

<template>
    <VRow>
        <VCol>
            <VCard title="관리자 권한 리스트">
                <VTable class="px-6 adminRoleList">
                    <thead>
                        <tr>
                            <th scope="col" class="text-center">번호</th>
                            <th scope="col" class="text-center">권한명</th>
                            <th scope="col" class="text-center">비고</th>
                        </tr>
                    </thead>

                    <tbody v-if="adminRoleListDate.totalElements !== 0" class="text-center">
                        <tr v-for="(getAdminRole, index) in adminRoleListDate.content" :key="index">
                            <td
                                @click="clickChangeRoleDetail(getAdminRole.roleSid, getAdminRole.roleName, getAdminRole.description)">
                                {{ index + 1 }}
                            </td>
                            <td
                                @click="clickChangeRoleDetail(getAdminRole.roleSid, getAdminRole.roleName, getAdminRole.description)">
                                {{ getAdminRole.roleName }}
                            </td>
                            <td
                                @click="clickChangeRoleDetail(getAdminRole.roleSid, getAdminRole.roleName, getAdminRole.description)">
                                {{ getAdminRole.description }}
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="3">설정된 권한이 없습니다.</td>
                        </tr>
                    </tbody>
                </VTable>
                <div class="d-flex justify-center w-100 my-4">
                    <nav>
                        <ul class="d-flex">
                            <li class="border mx-1 text-center li" v-for="page in adminRoleListDate.totalPages"
                                :key="page" :class="{ active: indexPage === page }">
                                <span @click.prevent="indexPageLoadAllUser(page)" style="display: block;">{{ page
                                    }}</span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </VCard>
        </VCol>
        <VCol>
            <VCard title="권한 상세" class="position-relative">
                <VText class="crudBtn add" @click="roleAdd">추가</VText>
                <VText class="crudBtn save" @click="roleSave">수정</VText>
                <VText class="crudBtn del" @click="roleDel">삭제</VText>
                <VForm class="mt-6 px-6 pb-6">
                    <VRow>
                        <VCol cols="12" class="d-none">
                            <VTextField label="권한명" v-model="roleDetailTextField.id" />
                        </VCol>
                        <VCol cols="12">
                            <VTextField label="권한명" v-model="roleDetailTextField.name" />
                        </VCol>

                        <VCol cols="12" class="pt-0">
                            <VTextarea label="비고내용" v-model="roleDetailTextField.desc" />
                        </VCol>
                    </VRow>
                </VForm>
            </VCard>
            <VCard title="해당 권한 관리자 리스트" class="mt-4">
                <VTable class="px-6">
                    <thead>
                        <tr>
                            <th scope="col" class="text-center">번호</th>
                            <th scope="col" class="text-center">관리자명</th>
                            <th scope="col" class="text-center">ID <span
                                    style="text-transform: capitalize;">(Email)</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody v-if="indexAdminRoleDataList.totalElements !== 0" class="text-center">
                        <tr v-for="(getAdminRole, index) in indexAdminRoleDataList.content" :key="index">
                            <td>
                                {{ index + 1 }}
                            </td>
                            <td>
                                {{ getAdminRole.name }}
                            </td>
                            <td>
                                {{ getAdminRole.userId }}
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="3">설정된 권한이 없습니다.</td>
                        </tr>
                    </tbody>
                </VTable>
                <div class="d-flex justify-center w-100 my-4">
                    <nav>
                        <ul class="d-flex">
                            <li class="border mx-1 text-center li" v-for="page in indexAdminRoleDataList.totalPages"
                                :key="page" :class="{ active: indexIndexPage === page }">
                                <span @click.prevent="indexAdminRolePageChange(page)" style="display: block;">{{ page
                                    }}</span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </VCard>
        </VCol>
    </VRow>
</template>

<style scoped>
li {
    list-style: none;
    width: 25px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    border-radius: 5px;
}

li.active {
    color: #fff;
    background: #696CFF;
    border: none;
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

.crudBtn {
    position: absolute;
    top: 26px;
    cursor: pointer;
}

.crudBtn.add {
    right: 100px;
}

.crudBtn.save {
    right: 60px;
}

.crudBtn.del {
    right: 20px;
}
</style>