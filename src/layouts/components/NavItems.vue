<script setup>
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import { onMounted } from 'vue'
import Nav from '@/api/Nav'

const navDate = ref([])
const CUDDate = ref({})

const loadNavList = async () => {
  try {
    const response = await Nav.getNav()
    navDate.value = response.data
  } catch (e) {
    console.log("네비 메뉴 조회 실패", e)
  }
}

const loadCUD = async (id) => {
  try {
    const response = await Nav.getCUD(id)
    CUDDate.value = response.data
    localStorage.setItem("CUDData", id)
  } catch (e) {
    console.log("CUD 권한 조회 실패", e)
  }
}

onMounted(async () => {
  await loadNavList()
})

</script>

<template>
  <div v-if="navDate.length !== 0">
    <VerticalNavGroup v-for="(nav, index) in navDate" :key="index" class="top-menu" :item="{
      title: `${nav.menuName}`,
      icon: `${nav.menuIcon}`,
    }">
      <VerticalNavLink @click="loadCUD(sub.menuSid, sub.menuUrl)" v-for="(sub, i) in nav.children" :key="i" :item="{
        title: `${sub.menuName}`,
        to: `${sub.menuUrl}`,
      }" />
    </VerticalNavGroup>
  </div>
  <div v-else>
    <p style="padding: 0 2rem;">카테고리 노출 권한이 설정되어 있지 않습니다<br /><b>슈퍼 어드민 계정</b>으로 권한을 설정하여 주세요</p>
  </div>
</template>

<style scoped>
.top-menu {
  margin: 25px 0;
}
</style>