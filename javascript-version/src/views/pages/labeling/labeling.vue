<script setup>
import Labeling from '@/api/Labeling';
import { onMounted } from 'vue';
import { useCUDDate } from '@/utilityFunc/getCudDate';

const labelingImgDate = ref([])
const labelingPage = ref(0)
const indexPage = ref(1)
const size = ref(6)
const getLabelingSelectData = ref({})
const chkArr = ref([])

const { loadcudDate, getCudDate } = useCUDDate();

const loadLabelingImg = async () => {
    try {
        const response = await Labeling.getLabelingImg(labelingPage.value, size.value)
        labelingImgDate.value = response.data
        await loadLabelingSelect()
    } catch (e) {
        console.log("이미지 조회 실패", e)
    }
}

const loadLabelingSelect = async () => {
    try {
        const response = await Labeling.getLabelingSelect()
        getLabelingSelectData.value = response.data
    } catch (e) {
        console.log("셀렉트 데이터 조회 실패", e)
    }
}

const indexPageLoadAllUser = async (page) => {
    indexPage.value = page
    labelingPage.value = page - 1
    await loadLabelingImg()
}

const saveLabelingDate = async () => {
    if (chkArr.value.length === 0) {
        alert("수정하시고자 하는 라벨링을 체크하여 주세요")
    } else {
        if (confirm("수정하시겠습니까?")) {
            try {
                const data = labelingImgDate.value.content
                    .filter(label => chkArr.value.includes(label.id))
                    .map(label => ({
                        id: label.id,
                        gender: label.gender,
                        ageGroup: label.ageGroup,
                        upperType: label.upperType,
                        upperColor: label.upperColor,
                        lowerType: label.lowerType,
                        lowerColor: label.lowerColor,
                        accessories: label.accessories,
                    }))
                await Labeling.patchLabelingSelect(data)
                alert("수정되었습니다")
                await loadLabelingImg()
            } catch (e) {
                console.log("저장 실패", e)
            }
        }
    }
}

const delLabelingDate = async () => {
    if (chkArr.value.length === 0) {
        alert("삭제하시고자 하는 라벨링을 체크하여 주세요")
    } else {
        if (confirm("삭제하시겠습니까?")) {
            try {
                const data = labelingImgDate.value.content
                    .filter(label => chkArr.value.includes(label.id))
                    .map(label => label.id)
                    .join(',')                
                await Labeling.delLabelingSelect(data)
                alert("삭제되었습니다")
                await loadLabelingImg()
            } catch (e) {
                console.log("삭제 실패", e)
            }
        }
    }
}

const toggleSelection = () => {
    chkArr.value = [...chkArr.value];
};

onMounted(async () => {
    await loadLabelingImg()
    await getCudDate();
})


</script>

<template>
    <VCard title="사물인식 라벨링" class="position-relative">
        <VBtn v-if="loadcudDate.update" class="text-right position-absolute roleBtn" :class="{ 'role': loadcudDate.delete }" @click="saveLabelingDate">
            저장
        </VBtn>
        <VBtn v-if="loadcudDate.delete" class="text-right position-absolute roleBtn" @click="delLabelingDate">
            삭제
        </VBtn>
        <div v-if="labelingImgDate.totalElements !== 0" class="px-6 gap-5 labelingImgDateContentWrap">
            <div v-for="(labelingImg, index) in labelingImgDate.content" :key="index" class="labelingImgDateContent">
                <input style="cursor: pointer; margin: 0 10px 10px 0;" type="checkbox" v-model="chkArr"
                    :value="labelingImg.id" @change="toggleSelection" class="chkLabeling" />
                <span class="idText">ID : {{ labelingImg.id }}</span>
                <div class="labelingDateWrap">
                    <div class="labelingImgDateBox mr-4">
                        <img src="http://localhost:8081/uploads/1.png" :alt="`라벨링 이미지 ${index + 1}`"
                            class="labelingDateBoxImage">
                    </div>
                    <div class="labelingSelectDateBox w-100">
                        <select v-model="labelingImg.accessories" multiple size="7" class="accessoriesSelect">
                            <option :value="accessories.value"
                                v-for="(accessories, index) in getLabelingSelectData.accessories" @click=""
                                :key="index">{{
                                    accessories.label }}</option>
                        </select>
                        <select v-model="labelingImg.lowerColor">
                            <option :value="lowerColors.value"
                                v-for="(lowerColors, index) in getLabelingSelectData.lowerColors" :key="index">{{
                                    lowerColors.label }}</option>
                        </select>
                        <select v-model="labelingImg.lowerType">
                            <option :value="lowerTypes.value"
                                v-for="(lowerTypes, index) in getLabelingSelectData.lowerTypes" :key="index">{{
                                    lowerTypes.label }}</option>
                        </select>
                        <select v-model="labelingImg.upperColor">
                            <option :value="upperColors.value"
                                v-for="(upperColors, index) in getLabelingSelectData.upperColors" :key="index">{{
                                    upperColors.label }}</option>
                        </select>
                        <select v-model="labelingImg.upperType">
                            <option :value="upperTypes.value"
                                v-for="(upperTypes, index) in getLabelingSelectData.upperTypes" :key="index">{{
                                    upperTypes.label }}</option>
                        </select>
                        <select v-model="labelingImg.ageGroup">
                            <option :value="ageGroups.value"
                                v-for="(ageGroups, index) in getLabelingSelectData.ageGroups" :key="index">{{
                                    ageGroups.label }}</option>
                        </select>
                        <select v-model="labelingImg.gender">
                            <option :value="genders.value" v-for="(genders, index) in getLabelingSelectData.genders"
                                :key="index">{{
                                    genders.label }}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <span>등록된 이미지가 없습니다</span>
        </div>
        <div class="d-flex justify-center w-100 my-4">
            <nav>
                <ul class="d-flex">
                    <li class="border mx-1 text-center li" v-for="page in labelingImgDate.totalPages" :key="page"
                        :class="{ active: indexPage === page }">
                        <span @click.prevent="indexPageLoadAllUser(page)" style="display: block;">{{ page }}</span>
                    </li>
                </ul>
            </nav>
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

.labelingImgDateContentWrap {
    display: grid;
    grid-template: repeat(3, 1fr) / repeat(2, 1fr);
}

.labelingDateWrap {
    display: flex;
    margin-bottom: 30px;
}

.labelingDateBoxImage {
    height: 491px;
}

.labelingSelectDateBox {
    display: flex;
    flex-direction: column;
}

select {
    border: 1px solid rgba(34, 48, 62, 0.217);
    padding: 0 10px;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800px' height='800px' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z' fill='%230F0F0F'/%3E%3C/svg%3E") no-repeat right 10px center;
    background-size: 16px 16px;
    height: 40px;
    margin-bottom: 10px;
}

.accessoriesSelect {
    height: auto;
    background: none;
    overflow: hidden;
    padding: 0;
}

.accessoriesSelect option {
    padding: 3px 3px 3px 10px;
    /* border-radius: 5px; */
}

.accessoriesSelect option:checked {
    background: #696CFF;
    color: #fff;
}

.chkLabeling {
    width: 17px;
    height: 17px;
}

.idText {
    font-size: 20px;
}

.roleBtn {
    top: 20px;
    right: 20px;
}

.role {
    right: 100px;
}
</style>