<script setup>
import CustSupMana from '@/api/CustSupMana';
import { onMounted } from 'vue';

const smartShoesEquArr = ref([])
const pageSmartShoes = ref(0)
const size = ref(10)
const chkArr = ref([])
const allSelected = ref('')
const indexPage = ref(1)
const startDay = ref('')
const endDay = ref('')
const category = ref('TERMS_OF_SERVICE')

const conList = async () => {
    try {
        const response = await CustSupMana.getCustSupMana(category.value, startDay.value, endDay.value, pageSmartShoes.value, size.value)
        smartShoesEquArr.value = response.data;
        console.log("smartShoesEquArr.value", smartShoesEquArr.value)
    } catch (error) {
        console.log("개인정보처리방침 관리 조회 실패", error);
    }
}

const searchDate = async () => {
    try {
        const response = await CustSupMana.getCustSupMana(category.value, startDay.value, endDay.value, pageSmartShoes.value, size.value)
        smartShoesEquArr.value = response.data;
        console.log("smartShoesEquArr.value", smartShoesEquArr.value)
    } catch (error) {
        console.log("개인정보처리방침 관리 조회 실패", error);
    }
}

const selectAll = () => {
    if (allSelected.value) {
        chkArr.value = smartShoesEquArr.value.content.map(user => user.shoesSid);
    } else {
        chkArr.value = [];
    }
};

const toggleSelection = () => {
    chkArr.value = [...chkArr.value];
};

const indexPageLoadAllUser = async (page) => {
    indexPage.value = page;
    pageSmartShoes.value = page - 1;
    await conList();
}

onMounted(async () => {
    await conList();
})

</script>

<template>
    <div>
        <VCard title="개인정보처리방침 리스트" class="position-relative">
            <div class="px-4">
                <VBtn class="text-right position-absolute" style="top: 20px; right: 20px;" @click="smartShoesLocDel">
                    <RouterLink to="/cust-sup-mana/add">추가</RouterLink>
                </VBtn>
                <div class="input_date_box align-center d-flex gap-2" style="width: 500px;">
                    <VTextField v-model="startDay" type="date" />
                    <span>~</span>
                    <VTextField v-model="endDay" type="date" />
                    <VBtn @click="searchDate">검색</VBtn>
                </div>

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
                            <th scope="col" class="text-center">제목</th>
                            <th scope="col" class="text-center">상태</th>
                            <th scope="col" class="text-center">게시일</th>
                            <th scope="col" class="text-center">업데이트 시간</th>
                        </tr>
                    </thead>

                    <tbody v-if="smartShoesEquArr.totalElements !== 0" class="text-center">
                        <tr v-for="(conList, index) in smartShoesEquArr.content" :key="index">
                            <td>
                                <input style="cursor: pointer;" type="checkbox" v-model="chkArr"
                                    :value="conList.shoesSid" @change="toggleSelection" />
                            </td>
                            <td>
                                <RouterLink :to="`/cust-sup-mana/${conList.boardSid}`" class="detailMove">
                                    {{ index + 1 }}
                                </RouterLink>
                            </td>
                            <td>
                                <RouterLink :to="`/cust-sup-mana/${conList.boardSid}`" class="detailMove">
                                    {{ conList.title }}
                                </RouterLink>
                            </td>
                            <td>
                                <RouterLink :to="`/cust-sup-mana/${conList.boardSid}`" class="detailMove">
                                    {{ conList.status === false ? "대기" : "게시중" }}
                                </RouterLink>
                            </td>
                            <td>
                                <RouterLink :to="`/cust-sup-mana/${conList.boardSid}`" class="detailMove">
                                    {{ conList.createDate }}
                                </RouterLink>
                            </td>
                            <td>
                                <RouterLink :to="`/cust-sup-mana/${conList.boardSid}`" class="detailMove">
                                    {{ conList.updateDate }}
                                </RouterLink>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="6">투입된 장비가 없습니다</td>
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