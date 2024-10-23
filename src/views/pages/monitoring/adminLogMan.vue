<script setup>
import Monitoring from '@/api/Monitoring';
import { onMounted,onUnmounted } from 'vue';
import debounce from 'lodash/debounce';

const smartShoesEquArr = ref([])
const pageSmartShoes = ref(0)
const size = ref(10)
const indexPage = ref(1)
const startDay = ref('')
const endDay = ref('')
const searchUsername = ref('')

const conList = async () => {
    try {
        const response = await Monitoring.getManageLog(startDay.value, endDay.value, searchUsername.value, pageSmartShoes.value, size.value)
        smartShoesEquArr.value = response.data;
    } catch (error) {
        console.log("관리자 로그 조회 실패", error);
    }
}

const indexPageLoadAllUser = async (page) => {
    indexPage.value = page;
    pageSmartShoes.value = page - 1;
    await conList();
}

const onSearchUsernameChange = debounce(async () => {
    pageSmartShoes.value = 0;
    await conList(searchUsername.value);
});

onMounted(async () => {
    await conList();
})

onUnmounted(() => {
    onSearchUsernameChange.cancel();
});

</script>

<template>
    <div>
        <VCard title="관리자 로그" class="position-relative">
            <div class="px-4">
                <div class="input_date_box align-center d-flex gap-2" style="width: 700px;">
                    <VTextField v-model="startDay" type="date" @change="conList" />
                    <span>~</span>
                    <VTextField v-model="endDay" type="date" @change="conList" />

                    <span class="d-md-flex align-center text-disabled ms-2" style="width:300px;">
                        <VTextField placeholder="회원 이름 검색" v-model="searchUsername" @input="onSearchUsernameChange">
                            <IconBtn style="height: 26px;">
                                <VIcon icon="bx-search" />
                            </IconBtn>
                        </VTextField>
                    </span>
                </div>

                <VTable>
                    <thead>
                        <tr>
                            <th scope="col" class="text-center">번호</th>
                            <th scope="col" class="text-center">관리자명</th>
                            <th scope="col" class="text-center">관리자 ID</th>
                            <th scope="col" class="text-center">IP</th>
                            <th scope="col" class="text-center">브라우저</th>
                            <th scope="col" class="text-center">상태</th>
                            <th scope="col" class="text-center">시간</th>
                        </tr>
                    </thead>

                    <tbody v-if="smartShoesEquArr.totalElements !== 0" class="text-center">
                        <tr v-for="(conList, index) in smartShoesEquArr.content" :key="index">
                            <td>
                                {{ index + 1 }}
                            </td>
                            <td>
                                {{ conList.name }}
                            </td>
                            <td>
                                {{ conList.userId }}
                            </td>
                            <td>
                                {{ conList.ipAddress }}
                            </td>
                            <td>
                                {{ conList.browserInfo }}
                            </td>
                            <td>
                                {{ conList.loginSuccess ? "로그인 성공" : "로그인 실패" }}
                            </td>
                            <td>
                                {{ conList.loginDate }}
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="7">로그인한 관리자가 없습니다</td>
                        </tr>
                    </tbody>
                </VTable>
                <div class="d-flex justify-center w-100 my-4">
                    <nav>
                        <ul class="d-flex">
                            <li class="border mx-1 text-center li" v-for="page in smartShoesEquArr.totalPages"
                                :key="page" :class="{ active: indexPage === page }">
                                <span @click.prevent="indexPageLoadAllUser(page)" style="display: block;">{{ page
                                    }}</span>
                            </li>
                        </ul>
                    </nav>
                </div>
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
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800px' height='800px' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z' fill='%230F0F0F'/%3E%3C/svg%3E") no-repeat right 10px center;
    background-size: 16px 16px;
}

.select {
    width: 150px;
    height: 40px;
}

.conAdd {
    width: 100%;
    height: 38px;
}

.detailMove {
    display: block;
    height: 100%;
    line-height: 49px;
}
</style>