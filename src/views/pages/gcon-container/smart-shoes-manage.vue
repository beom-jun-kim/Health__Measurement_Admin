<script setup>
import GconContainer from '@/api/GconContainer';
import { onMounted } from 'vue';
import { useCUDDate } from '@/utilityFunc/getCudDate';

const { loadCudDate, getCudDate } = useCUDDate();

const smartShoesPostObj = ref({
    containerSid: "",
    shoesName: "",
    leftSensorId: "",
    rightSensorId: "",
    remark: "",
})
const smartShoesEquArr = ref([])
const pageSmartShoes = ref(0)
const size = ref(10)
const chkArr = ref([])
const allSelected = ref('')
const indexPage = ref(1)
const gconSelectList = ref([])

const conList = async () => {
    try {
        const response = await GconContainer.shoesManage(pageSmartShoes.value, size.value)
        smartShoesEquArr.value = response.data;
        await loadGconSelect();
    } catch (error) {
        console.log("스마트신발 관리 조회 실패", error);
    }
}

const loadGconSelect = async () => {
    try {
        const response = await GconContainer.gconSelect()
        gconSelectList.value = response.data;
    } catch (error) {
        console.log("지콘 리스트 조회 실패", error);
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

const smartShoesLocSave = async () => {
    if (chkArr.value.length === 0) {
        alert("수정하시고자 하는 신발을 체크하여 주세요")
    } else {
        if (confirm("수정하시겠습니까?")) {
            try {
                const data = smartShoesEquArr.value.content
                    .filter(user => chkArr.value.includes(user.shoesSid))
                    .map(user => ({
                        shoesSid: user.shoesSid,
                        shoesName: user.shoesName,
                        leftSensorId: user.leftSensorId,
                        rightSensorId: user.rightSensorId,
                        containerSid: user.containerSid,
                        remark: user.remark,
                    }));
                await GconContainer.shoesPatch(data)
                alert("수정되었습니다");
                await conList();
            } catch (error) {
                console.log("신발 상태 수정 실패", error);
            }
        }
    }
}

const smartShoesLocDel = async () => {
    if (chkArr.value.length === 0) {
        alert("삭제하시고자 하는 신발을 체크하여 주세요")
    } else {
        if (confirm("삭제하시겠습니까?")) {
            try {
                const data = smartShoesEquArr.value.content
                    .filter(user => chkArr.value.includes(user.shoesSid))
                    .map(user => user.shoesSid)
                    .join(',');
                console.log("1", data)
                await GconContainer.shoesDel(data)
                alert("삭제되었습니다");
                await conList();
            } catch (error) {
                console.log("신발 삭제 실패", error);
            }
        }
    }
}

const smartShoesAdd = async () => {
    if (smartShoesPostObj.value.shoesName === '') {
        alert("신발명을 작성하여주세요")
    } else {
        if (confirm("추가하시겠습니까?")) {
            try {
                const data = {
                    shoesName: smartShoesPostObj.value.shoesName,
                    leftSensorId: smartShoesPostObj.value.leftSensorId,
                    rightSensorId: smartShoesPostObj.value.rightSensorId,
                    containerSid: smartShoesPostObj.value.containerSid,
                    remark: smartShoesPostObj.value.remark,
                }
                await GconContainer.shoesPost(data)
                alert("추가되었습니다");
                await conList();
            } catch (error) {
                console.log("신발 추가 실패", error);
            }
        }
    }
}


onMounted(async () => {
    await conList();
    await getCudDate();
})

</script>

<template>
    <div>
        <VCard title="스마트 신발 관리" class="position-relative">
            <VBtn v-if="loadCudDate.update" class="text-right position-absolute roleBtn"
                :class="{ 'role': loadCudDate.delete }" @click="smartShoesLocSave">
                수정
            </VBtn>
            <VBtn v-if="loadCudDate.delete" class="text-right position-absolute roleBtn" @click="smartShoesLocDel">
                삭제
            </VBtn>
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
                    <tr v-for="(conList, index) in smartShoesEquArr.content" :key="index">
                        <td>
                            <input style="cursor: pointer;" type="checkbox" v-model="chkArr" :value="conList.shoesSid"
                                @change="toggleSelection" />
                        </td>
                        <td>
                            {{ index + 1 }}
                        </td>
                        <td>
                            {{ conList.shoesName }}
                        </td>
                        <td>
                            {{ conList.leftSensorId }}
                        </td>
                        <td>
                            {{ conList.rightSensorId }}
                        </td>
                        <td>
                            <select v-model="conList.containerSid" class="select">
                                <option :value="gList.containerSid" v-for="(gList, i) in gconSelectList" :key="i">
                                    {{ gList.containerName }}</option>
                            </select>
                        </td>
                        <td>
                            {{ conList.remark !== null ? conList.remark : "-" }}
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
        <VCard v-if="loadCudDate.create" title="스마트 신발 추가하기" class="position-relative mt-4">
            <VCardText class="text-right position-absolute" style="top: 20px; right: 0;">
                <VBtn @click="smartShoesAdd">추가</VBtn>
            </VCardText>
            <VCardText>
                <VRow>
                    <VCol cols="4">
                        <div class="my-2">스마트 신발명</div>
                        <VTextField v-model="smartShoesPostObj.shoesName" :value="smartShoesPostObj.shoesName" autofocus
                            placeholder="예) Shoes1" />
                    </VCol>

                    <VCol cols="4">
                        <div class="my-2">왼쪽 센서 ID</div>
                        <VTextField v-model="smartShoesPostObj.leftSensorId" :value="smartShoesPostObj.leftSensorId"
                            autofocus placeholder="예) 00:1A:2B:3C:4D:5E" />
                    </VCol>

                    <VCol cols="4">
                        <div class="my-2">오른쪽 센서 ID</div>
                        <VTextField v-model="smartShoesPostObj.rightSensorId" :value="smartShoesPostObj.rightSensorId"
                            autofocus placeholder="예) 00:1A:2B:3C:4D:5E" />
                    </VCol>

                    <VCol cols="6">
                        <div class="my-2">배치</div>
                        <select v-model="smartShoesPostObj.containerSid" class="conAdd">
                            <option :value="gList.containerSid" v-for="(gList, index) in gconSelectList" :key="index">
                                {{ gList.containerName }}</option>
                        </select>
                    </VCol>

                    <VCol cols="6">
                        <div class="my-2">비고</div>
                        <VTextField v-model="smartShoesPostObj.remark" :value="smartShoesPostObj.remark" />
                    </VCol>
                </VRow>
            </VCardText>
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

.roleBtn {
    top: 20px;
    right: 20px;
}

.role {
    right: 100px;
}
</style>