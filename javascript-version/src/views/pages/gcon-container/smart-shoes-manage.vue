<script setup>
import GconContainer from '@/api/GconContainer';
import { onMounted } from 'vue';

const smartShoesEquArr = ref([])
const page = ref(0)
const size = ref(10)
const chkArr = ref([])
const allSelected = ref('')
const indexPage = ref(1)
const gconSelectList = ref([])

const getAllUser = async () => {
    try {
        const response = await GconContainer.shoesManage(page.value, size.value)
        smartShoesEquArr.value = response.data;
        await loadGconSelect();
        console.log(smartShoesEquArr)
    } catch (error) {
        console.log("스마트신발 관리 조회 실패", error);
    }
}

const loadGconSelect = async () => {
    try {
        const response = await GconContainer.gconSelect()
        gconSelectList.value = response.data;
        console.log(gconSelectList)
    } catch (error) {
        console.log("지콘 리스트 조회 실패", error);
    }
}

const selectAll = () => {
    if (allSelected.value) {
        chkArr.value = smartShoesEquArr.value.content.map(user => user.userSid);
    } else {
        chkArr.value = [];
    }
};

const toggleSelection = () => {
    chkArr.value = [...chkArr.value];
};

const indexPageLoadAllUser = async (page) => {
    indexPage.value = page;
    page.value = page - 1;
    await getAllUser();
}

const statusSave = async () => {
    if (confirm("저장하시겠습니까?")) {
        try {
            const data = smartShoesEquArr.value.content
                .filter(user => chkArr.value.includes(user.userSid))
                .map(user => ({
                    userSid: user.userSid,
                    active: user.active
                }));
            await GconUserManage.patchUserStatus(data)
            alert("저장되었습니다");
            await getAllUser();
        } catch (error) {
            console.log("유저 상태 저장 실패", error);
        }
    }
}


onMounted(async () => {
    await getAllUser();
})

</script>

<template>
    <div>
        <VCard title="스마트 신발 관리" class="position-relative">
            <VCardText class="text-right position-absolute" style="top: 27px; right: 40px;">
                <span>저장</span>
            </VCardText>
            <VCardText class="text-right position-absolute" style="top: 27px; right: 0;">
                <span>삭제</span>
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
                        <th scope="col" class="text-center">스마트 신발명</th>
                        <th scope="col" class="text-center">왼쪽 센서 ID</th>
                        <th scope="col" class="text-center">오른쪽 센서 ID</th>
                        <th scope="col" class="text-center">배치</th>
                        <th scope="col" class="text-center">비고</th>
                    </tr>
                </thead>

                <tbody v-if="smartShoesEquArr.totalElements !== 0" class="text-center">
                    <tr v-for="(getAllUser, index) in smartShoesEquArr.content" :key="index">
                        <td>
                            <input style="cursor: pointer;" type="checkbox" v-model="chkArr" :value="getAllUser.userSid"
                                @change="toggleSelection" />
                        </td>
                        <td>
                            <RouterLink :to="`/user/gcon-user-detail/${getAllUser.userSid}`" class="detailMove">
                                {{ index + 1 }}
                            </RouterLink>
                        </td>
                        <td>
                            <RouterLink :to="`/user/gcon-user-detail/${getAllUser.userSid}`" class="detailMove">
                                {{ getAllUser.shoesName }}
                            </RouterLink>
                        </td>
                        <td>
                            <RouterLink :to="`/user/gcon-user-detail/${getAllUser.userSid}`" class="detailMove">
                                {{ getAllUser.leftSensorId }}
                            </RouterLink>
                        </td>
                        <td>
                            <RouterLink :to="`/user/gcon-user-detail/${getAllUser.userSid}`" class="detailMove">
                                {{ getAllUser.rightSensorId }}
                            </RouterLink>
                        </td>
                        <td>
                            <select v-model="getAllUser.containerSid" class="select">
                                <option :value="getAllUser.containerSid" v-for="(gList, i) in gconSelectList" :key="i">
                                    {{ gList.containerName }}</option>
                            </select>
                        </td>
                        <td>
                            {{ getAllUser.remark !== null ? getAllUser.remark : "-" }}
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="7">투입된 장비가 없습니다</td>
                    </tr>
                </tbody>
            </VTable>
            <div class="d-flex justify-center w-100 my-4">
                <nav>
                    <ul class="d-flex">
                        <li class="border mx-1 text-center li" v-for="page in smartShoesEquArr.totalPages" :key="page"
                            :class="{ active: indexPage === page }">
                            <span @click.prevent="indexPageLoadAllUser(page)" style="display: block;">{{ page }}</span>
                        </li>
                    </ul>
                </nav>
            </div>
        </VCard>
    </div>
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
</style>