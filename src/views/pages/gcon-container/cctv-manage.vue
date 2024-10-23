<script setup>
import GconContainer from '@/api/GconContainer';
import { onMounted } from 'vue';
import { useCUDDate } from '@/utilityFunc/getCudDate';

const getCityList = ref([])
const getGconDate = ref([])
const gConPage = ref(0)
const gConSize = ref(10)
const gConIndexPage = ref(1)
const selectedCityCode = ref(null)

const { loadcudDate, getCudDate } = useCUDDate();

const getCityes = async () => {
    try {
        const response = await GconContainer.getCityes()
        getCityList.value = response.data;
        if (getCityList.value.length > 0) {
            selectedCityCode.value = getCityList.value[0].detailSid;
            await getGconList(selectedCityCode.value);
        }
    } catch (error) {
        console.log("지역리스트 조회 실패", error);
    }
}

const getGconList = async (code) => {
    if (selectedCityCode.value !== code) {
        gConPage.value = 0;
        gConIndexPage.value = 1;
    }
    try {
        selectedCityCode.value = code;
        const response = await GconContainer.getCctvList(selectedCityCode.value, gConPage.value, gConSize.value)
        getGconDate.value = response.data;
        console.log("getGconDate.value", getGconDate.value)
    } catch (error) {
        console.log("cctv 리스트 조회 실패", error);
    }
}

const indexPageLoadGcon = async (page) => {
    gConIndexPage.value = page;
    gConPage.value = page - 1;
    await getGconList(selectedCityCode.value);
}

onMounted(async () => {
    await getCityes();
    await getCudDate();
})


</script>

<template>
    <VRow>
        <VCol cols="2">
            <VCard title="지역">
                <VTable style="border-radius: 0;">
                    <tbody v-if="getCityList !== 0" class="text-center">
                        <tr v-for="(city, index) in getCityList" :key="index">
                            <td @click="getGconList(city.detailSid)" class="cityes"
                                :class="{ 'active-tab': selectedCityCode === city.detailSid }">
                                {{ city.name }}
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="1">추가된 지역이 없습니다</td>
                        </tr>
                    </tbody>
                </VTable>
            </VCard>
        </VCol>
        <VCol cols="10">
            <VCard title="배회감지 카메라 리스트">
                <div class="position-relative">
                    <VCardText v-if="loadcudDate.create" class="text-right position-absolute"
                        style="top: -70px; right: 0;">
                        <RouterLink to="/cctv-manage-add">추가</RouterLink>
                    </VCardText>
                    <VTable>
                        <thead>
                            <tr>
                                <th scope="col" class="text-center">번호</th>
                                <th scope="col" class="text-center">카메라명</th>
                                <th scope="col" class="text-center">주소</th>
                                <th scope="col" class="text-center">상태</th>
                            </tr>
                        </thead>

                        <tbody v-if="getGconDate.totalElements !== 0" class="text-center">
                            <tr v-for="(gcon, index) in getGconDate.content" :key="index">
                                <td>
                                    <RouterLink :to="`/cctv-manage/${gcon.cctvSid}`" class="detailMove">
                                        {{ index + 1 }}
                                    </RouterLink>
                                </td>
                                <td>
                                    <RouterLink :to="`/cctv-manage/${gcon.cctvSid}`" class="detailMove">
                                        {{ gcon.cctvName }}
                                    </RouterLink>
                                </td>
                                <td>
                                    <RouterLink :to="`/cctv-manage/${gcon.cctvSid}`" class="detailMove">
                                        {{ gcon.address }}
                                    </RouterLink>
                                </td>
                                <td>
                                    <RouterLink :to="`/cctv-manage/${gcon.cctvSid}`" class="detailMove">
                                        {{ gcon.state === "OPERATION" ? "운영중" : gcon.state === "INSPECTION" ? "점검중" :
                                            gcon.state === "NOT_INSTALLED" ? "미설치" : null }}
                                    </RouterLink>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="4">추가된 카메라가 없습니다</td>
                            </tr>
                        </tbody>
                    </VTable>
                    <div class="d-flex justify-center w-100 my-4" v-if="getGconDate.totalPages > 0">
                        <nav>
                            <ul class="d-flex">
                                <li class="border mx-1 text-center li" v-for="page in getGconDate.totalPages"
                                    :key="page" :class="{ active: gConIndexPage === page }">
                                    <span @click.prevent="indexPageLoadGcon(page)" style="display: block;">{{ page
                                        }}</span>
                                </li>
                            </ul>
                        </nav>
                    </div>
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

.td,
.cityes {
    cursor: pointer;
}

.cityes:hover {
    background: #e9e9e9ba;
}

.active-tab {
    background: #e9e9e9ba;
}

.detailMove {
    display: block;
    height: 100%;
    line-height: 49px;
}
</style>