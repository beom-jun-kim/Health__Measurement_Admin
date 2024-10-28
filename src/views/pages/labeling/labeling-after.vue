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
const isLabeled = ref(true)

const { loadCudDate, getCudDate } = useCUDDate();

const loadLabelingImg = async () => {
    try {
        const response = await Labeling.getLabelingImg(labelingPage.value, size.value, isLabeled.value)
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
    <VCard title="사물인식 라벨링 (수정후)" class="position-relative">
        <VBtn v-if="loadCudDate.update" class="text-right position-absolute roleBtn"
            :class="{ 'role': loadCudDate.delete }" @click="saveLabelingDate">
            저장
        </VBtn>
        <VBtn v-if="loadCudDate.delete" class="text-right position-absolute roleBtn" @click="delLabelingDate">
            삭제
        </VBtn>
        <div v-if="labelingImgDate.totalElements !== 0" class="px-6 gap-5 labelingImgDateContentWrap">
            <div v-for="(labelingImg, index) in labelingImgDate.content" :key="index" class="labelingImgDateContent">
                <input style="cursor: pointer; margin: 0 10px 10px 0;" type="checkbox" v-model="chkArr"
                    :value="labelingImg.id" @change="toggleSelection" class="chkLabeling" />
                <span class="idText">ID : {{ labelingImg.id }}</span>
                <div class="labelingDateWrap">
                    <div class="labelingImgDateBox mr-4">
                        <img :src="`http://localhost:8081/uploads/${labelingImg.filename}`" :alt="`라벨링 이미지 ${index + 1}`"
                            class="labelingDateBoxImage">
                    </div>
                    <div class="labelingDateBoxImage w-50">
                        <v-select v-model="labelingImg.accessories" :items="getLabelingSelectData.accessories"
                            class="mb-4" item-title="label" item-value="value" label="악세사리" multiple
                            persistent-hint></v-select>

                        <v-select v-model="labelingImg.lowerColors" :items="getLabelingSelectData.lowerColors"
                            class="mb-4" item-title="label" item-value="value" label="하의 색상" persistent-hint></v-select>

                        <v-select v-model="labelingImg.lowerType" :items="getLabelingSelectData.lowerTypes" class="mb-4"
                            item-title="label" item-value="value" label="하의 종류" persistent-hint></v-select>

                        <v-select v-model="labelingImg.upperColor" :items="getLabelingSelectData.upperColors"
                            class="mb-4" item-title="label" item-value="value" label="상의 색상" persistent-hint></v-select>

                        <v-select v-model="labelingImg.upperType" :items="getLabelingSelectData.upperTypes" class="mb-4"
                            item-title="label" item-value="value" label="상의 종류" persistent-hint></v-select>

                        <v-select v-model="labelingImg.ageGroup" :items="getLabelingSelectData.ageGroups" class="mb-4"
                            item-title="label" item-value="value" label="나이대" persistent-hint></v-select>

                        <v-select v-model="labelingImg.gender" :items="getLabelingSelectData.genders" item-title="label"
                            item-value="value" label="성별" persistent-hint></v-select>
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

.labelingImgDateBox {
    width: 100%;
    height: 360px;
}

.labelingDateBoxImage {
    width: 100%;
    height: 100%;
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