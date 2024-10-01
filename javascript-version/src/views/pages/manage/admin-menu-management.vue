<script setup>
import Manage from '@/api/Manage';
import { onMounted } from 'vue';

const getAdminMenuGroupBy = ref([])
const role = ref([])
const selectedRoleId = ref(null)
const allSelected = ref('')
const chkArr = ref([])
const roleSid = ref('')

const loadAdminMenuGroupBy = async (id) => {
    try {
        const response = await Manage.getAdminRoleMenu(id)
        getAdminMenuGroupBy.value = response.data;
        selectedRoleId.value = id;
        roleSid.value = id;
        const selectRole = getAdminMenuGroupBy.value.filter(user => user.isCheck === true)
        const selectRoleFilter = selectRole.map(user => user.menuSid)
        const selectSubRole = getAdminMenuGroupBy.value.filter(role => role.subMenus);
        const resultSelectSubRoleFilter = selectSubRole.flatMap(role =>
            role.subMenus.filter(subMenu => subMenu.isCheck === true)
        );
        const resultSelectSubRoleFilterMenuSid = resultSelectSubRoleFilter.map(role => role.menuSid)
        chkArr.value = [...selectRoleFilter, ...resultSelectSubRoleFilterMenuSid]

    } catch (e) {
        console.log("관리자 권한 리스트 조회 실패", e)
    }
}

const getAllRole = async () => {
    try {
        const response = await Manage.getAdminRole()
        role.value = response.data;
    } catch (error) {
        console.log("관리자 전체조회 실패", error);
    }
}

const selectAll = () => {
    if (allSelected.value) {
        const topMenu = getAdminMenuGroupBy.value.map(user => user.menuSid);
        const selectSubRole = getAdminMenuGroupBy.value.filter(role => role.subMenus);
        const bottomMenu = selectSubRole.flatMap(role =>
            role.subMenus.map(subMenu => subMenu.menuSid)
        );
        chkArr.value = [...topMenu, ...bottomMenu]
    } else {
        chkArr.value = [];
    }
};

const toggleSelection = (menuSid) => {
    chkArr.value = [...chkArr.value];
    const menuItem = getAdminMenuGroupBy.value.find(item => item.menuSid === menuSid);
    if (menuItem) {
        menuItem.isCheck = !menuItem.isCheck;
    }
};

const toggleSelectionSubMenu = (menuSid) => {
    chkArr.value = [...chkArr.value];

    const selectSubRole = getAdminMenuGroupBy.value.filter(role => role.subMenus);
    const menuItem = selectSubRole
        .map(role => role.subMenus.find(item => item.menuSid === menuSid))
        .find(item => item !== undefined);
    if (menuItem) {
        menuItem.isCheck = !menuItem.isCheck;
    }
}

const saveAdminRoleMenu = async () => {
    if (confirm("수정하시겠습니까?")) {
        try {
            // 중복된 menuSid를 제거하기 위한 Map
            const uniqueMenuMap = new Map();

            const currentRoleSid = roleSid.value;

            getAdminMenuGroupBy.value.forEach(user => {
                const menuNode = {
                    menuSid: user.menuSid,
                    menuName: user.menuName,
                    menuUrl: user.menuUrl,
                    menuType: user.menuType,
                    parentSid: user.parentSid,
                    menuSeq: user.menuSeq,
                    menuDepth: user.menuDepth,
                    isActive: user.isActive,
                    subMenus: user.subMenus ? user.subMenus.map(submenu => ({
                        menuSid: submenu.menuSid,
                        menuName: submenu.menuName,
                        menuUrl: submenu.menuUrl,
                        menuType: submenu.menuType,
                        parentSid: submenu.parentSid,
                        menuSeq: submenu.menuSeq,
                        menuDepth: submenu.menuDepth,
                        isActive: submenu.isActive,
                        subMenus: submenu.subMenus,
                        isCheck: submenu.isCheck,
                        isCreate: submenu.isCreate,
                        isUpdate: submenu.isUpdate,
                        isDelete: submenu.isDelete,
                    })) : [],
                    isCheck: user.isCheck,
                    isCreate: user.isCreate,
                    isUpdate: user.isUpdate,
                    isDelete: user.isDelete,
                };

                // menuSid가 이미 있는지 체크
                if (!uniqueMenuMap.has(user.menuSid)) {
                    uniqueMenuMap.set(user.menuSid, menuNode);
                }
            });

            // 고유한 메뉴 노드 배열 생성
            const nodeList = Array.from(uniqueMenuMap.values());

            // 최종 데이터 생성
            const data = {
                roleSid: currentRoleSid,
                nodeList: nodeList
            };
            await Manage.patchAdminRoleMenu(data);
            alert("수정되었습니다");
        } catch (e) {
            console.log("수정 실패", e);
        }
    }
}



onMounted(async () => {
    await getAllRole();
})

</script>

<template>
    <VRow>
        <VCol cols="2">
            <VCard title="권한명">
                <VTable style="border-radius: 0;">
                    <tbody v-if="role !== 0" class="text-center">
                        <tr v-for="(r, index) in role.content" :key="index">
                            <td @click="loadAdminMenuGroupBy(r.roleSid)" class="roles"
                                :class="{ 'active-tab': selectedRoleId === r.roleSid }">
                                {{ r.roleName }}
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
            <VCard title="권한 설정">
                <div class="position-relative">
                    <VBtn class="text-right position-absolute" style="top: -58px; right: 30px;"
                        @click="saveAdminRoleMenu">
                        저장
                    </VBtn>
                    <p class="ps-4 mb-0">※ <b>관리자 계정에 노출</b>시키고자 하는 <b>메뉴를 선택</b>하여 주세요</p>
                    <p class="ps-4">※ 상위 메뉴를 선택하지 않고 하위메뉴만 선택시 해당 메뉴는 <b>노출되지 않습니다</b></p>
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
                                <th scope="col" class="text-center">상위 메뉴</th>
                                <th scope="col" class="text-center">하위 메뉴</th>
                                <th scope="col" class="text-center">수정</th>
                                <th scope="col" class="text-center">쓰기</th>
                                <th scope="col" class="text-center">삭제</th>
                            </tr>
                        </thead>

                        <tbody v-if="getAdminMenuGroupBy.length !== 0" class="text-center">
                            <tr v-for="(getAllUser, index) in getAdminMenuGroupBy" :key="index">
                                <td style="vertical-align: sub;">
                                    <input style="cursor: pointer;" type="checkbox" v-model="chkArr"
                                        :value="getAllUser.menuSid" @change="toggleSelection(getAllUser.menuSid)" />
                                </td>
                                <td style="vertical-align: sub;">{{ index + 1 }}</td>
                                <td style="vertical-align: sub;">
                                    {{ getAllUser.menuName }}
                                </td>
                                <td v-if="getAllUser.subMenus && getAllUser.subMenus.length > 0">
                                    <ul class="ulSubMenuMenuName">
                                        <li v-for="(subMenu, idx) in getAllUser.subMenus" :key="idx"
                                            class="subMenuMenuName">
                                            <input style="cursor: pointer;" type="checkbox" v-model="chkArr"
                                                :value="subMenu.menuSid"
                                                @change="toggleSelectionSubMenu(subMenu.menuSid)"
                                                class="subMenuMenuNameChkBox">
                                            <span>{{ subMenu.menuName }}</span>
                                        </li>
                                    </ul>
                                </td>
                                <td v-else>-</td>
                                <td v-if="getAllUser.subMenus && getAllUser.subMenus.length > 0">
                                    <ul class="ulSubMenuMenuName">
                                        <li v-for="(subMenu, idx) in getAllUser.subMenus" :key="idx"
                                            class="subMenuMenuName">
                                            <select v-model="subMenu.isUpdate" class="select">
                                                <option :value="true">o</option>
                                                <option :value="false">x</option>
                                            </select>
                                        </li>
                                    </ul>
                                </td>
                                <td v-else>-</td>
                                <td v-if="getAllUser.subMenus && getAllUser.subMenus.length > 0">
                                    <ul class="ulSubMenuMenuName">
                                        <li v-for="(subMenu, idx) in getAllUser.subMenus" :key="idx"
                                            class="subMenuMenuName">
                                            <select v-model="subMenu.isCreate" class="select">
                                                <option :value="true">o</option>
                                                <option :value="false">x</option>
                                            </select>
                                        </li>
                                    </ul>
                                </td>
                                <td v-else>-</td>
                                <td v-if="getAllUser.subMenus && getAllUser.subMenus.length > 0">
                                    <ul class="ulSubMenuMenuName">
                                        <li v-for="(subMenu, idx) in getAllUser.subMenus" :key="idx"
                                            class="subMenuMenuName">
                                            <select v-model="subMenu.isDelete" class="select">
                                                <option :value="true">o</option>
                                                <option :value="false">x</option>
                                            </select>
                                        </li>
                                    </ul>
                                </td>
                                <td v-else>-</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="7">수정하려는 권한명을 선택하여주세요</td>
                            </tr>
                        </tbody>
                    </VTable>
                </div>
            </VCard>
        </VCol>
    </VRow>
</template>

<style scoped>
.ulSubMenuMenuName {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 40px
}

.subMenuMenuName {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    white-space: nowrap;
    position: relative;
}

.subMenuMenuNameChkBox {
    position: absolute;
    left: 0;
}

select {
    border: 1px solid rgba(34, 48, 62, 0.217);
    padding: 0 10px;
    width: 95px;
    height: 30px;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800px' height='800px' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z' fill='%230F0F0F'/%3E%3C/svg%3E") no-repeat right 10px center;
    background-size: 16px 16px;
    margin: 5px 0;
}

td {
    padding: 10px 20px !important;
}

.roles:hover {
    background: #e9e9e9ba;
    cursor: pointer;
}

.active-tab {
    background: #e9e9e9ba;
}
</style>