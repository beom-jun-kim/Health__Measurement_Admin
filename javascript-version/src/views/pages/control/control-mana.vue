<script setup>
import Control from '@/api/Control';
import Manage from '@/api/Manage';
import { onMounted, onUnmounted } from 'vue';
import debounce from 'lodash/debounce';

const getAllUserArr = ref([])
const pageUser = ref(0)
const size = ref(10)
const searchUser = ref('')
const chkArr = ref([])
const allSelected = ref('')
const indexPage = ref(1)
const searchUsername = ref('')
const role = ref([])
const affiliationCodeList = ref([])

const getAllUser = async () => {
    try {
        const response = await Control.getControlUserList(searchUser.value, pageUser.value, size.value)
        getAllUserArr.value = response.data;
        console.log("getAllUserArr.value", getAllUserArr.value)
        await affiliationCode()
        await getAllRole();
    } catch (error) {
        console.log("관리자 전체조회 실패", error);
    }
}

const affiliationCode = async () => {
    try {
        const response = await Control.getAffiliationeUserList()
        affiliationCodeList.value = response.data
        console.log("affiliationCodeList.value", affiliationCodeList.value)
    } catch (e) {
        console.log('소속코드 조회 실패', e)
    }
}

const getAllRole = async () => {
    try {
        const response = await Control.getRoleTypeUserList()
        role.value = response.data;
        console.log("role.value", role.value)
    } catch (error) {
        console.log("관리자 권한 조회 실패", error);
    }
}

const selectAll = () => {
    if (allSelected.value) {
        chkArr.value = getAllUserArr.value.content.map(user => user.userSid);
    } else {
        chkArr.value = [];
    }
};

const toggleSelection = () => {
    chkArr.value = [...chkArr.value];
};

const indexPageLoadAllUser = async (page) => {
    indexPage.value = page;
    pageUser.value = page - 1;
    await getAllUser();
}

const statusSave = async () => {
    if (chkArr.value.length === 0) {
        alert("수정하시고자 하는 관리자를 체크하여 주세요")
    } else {
        if (confirm("수정하시겠습니까?")) {
            try {
                const data = getAllUserArr.value.content
                    .filter(user => chkArr.value.includes(user.userSid))
                    .map(user => ({
                        userSid: user.userSid,
                        roleSid: user.roleSid,
                        codeDetailSid: user.codeDetailSid
                    }));
                console.log("data",data)
                await Control.patchControlUser(data)
                alert("수정되었습니다");
                await getAllUser();
            } catch (error) {
                console.log("관제 유저 상태 저장 실패", error);
            }
        }
    }
}

const onSearchUsernameChange = debounce(async () => {
    pageUser.value = 0;
    await userSearch(searchUsername.value);
});

const userSearch = async (searchValue) => {
    try {
        const response = await Control.getControlUserList(searchValue, pageUser.value, size.value);
        getAllUserArr.value = response.data;
        indexPage.value = 1;
    } catch (error) {
        console.log("검색 실패", error);
    }
};

onMounted(async () => {
    await getAllUser();
})

onUnmounted(() => {
    onSearchUsernameChange.cancel();
});

</script>

<template>
    <VCard title="관제 유저 리스트">
        <div class="position-relative">
            <div class="d-flex align-center cursor-pointer ms-lg-n3" style="user-select: none;">
                <span class="d-md-flex align-center text-disabled ms-5" style="width:300px;">
                    <VTextField placeholder="회원 이름 검색" v-model="searchUsername" @input="onSearchUsernameChange">
                        <IconBtn>
                            <VIcon icon="bx-search" />
                        </IconBtn>
                    </VTextField>
                </span>
            </div>
            <VCardText class="text-right position-absolute" style="top: -20px; right: 0;">
                <VBtn @click="statusSave">저장</VBtn>
            </VCardText>
            <VTable>
                <thead>
                    <tr>
                        <th scope="col" class="text-center">
                            <label>
                                <input type="checkbox" @change="selectAll" v-model="allSelected"
                                    style="cursor: pointer;" />
                            </label>
                        </th>
                        <th scope="col" class="text-center">번호</th>
                        <th scope="col" class="text-center">소속</th>
                        <th scope="col" class="text-center">관리자명</th>
                        <th scope="col" class="text-center">ID <span style="text-transform: capitalize;">(Email)</span>
                        </th>
                        <th scope="col" class="text-center">전화번호</th>
                        <th scope="col" class="text-center">권한</th>
                    </tr>
                </thead>

                <tbody v-if="getAllUserArr.totalElements !== 0" class="text-center">
                    <tr v-for="(getAllUser, index) in getAllUserArr.content" :key="index">
                        <td>
                            <input style="cursor: pointer;" type="checkbox" v-model="chkArr" :value="getAllUser.userSid"
                                @change="toggleSelection" />
                        </td>
                        <td>
                            {{ index + 1 }}
                        </td>
                        <td>
                            <select v-model="getAllUser.codeDetailSid" class="select">
                                <option :value="r.detailSid" v-for="(r, i) in affiliationCodeList" :key="i">{{ r.name
                                    }}
                                </option>
                            </select>
                        </td>
                        <td>
                            {{ getAllUser.name }}
                        </td>
                        <td>
                            {{ getAllUser.userId }}
                        </td>
                        <td>
                            {{ getAllUser.phoneNumber }}
                        </td>
                        <td>
                            <select v-model="getAllUser.roleSid" class="select">
                                <option :value="r.roleSid" v-for="(r, i) in role" :key="i">{{ r.roleName }}
                                </option>
                            </select>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="8">가입된 유저가 없습니다.</td>
                    </tr>
                </tbody>
            </VTable>
            <div class="d-flex justify-center w-100 my-4">
                <nav>
                    <ul class="d-flex">
                        <li class="border mx-1 text-center li" v-for="page in getAllUserArr.totalPages" :key="page"
                            :class="{ active: indexPage === page }">
                            <span @click.prevent="indexPageLoadAllUser(page)" style="display: block;">{{ page }}</span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </VCard>
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

select {
    border: 1px solid rgba(34, 48, 62, 0.217);
    padding: 0 10px;
    width: 120px;
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
</style>