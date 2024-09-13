<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>

  <!-- 👉 home -->
  <!-- <VerticalNavLink :item="{
    title: 'home',
    icon: 'bx-home-smile',
    to: '/dashboard',
  }">
  </VerticalNavLink> -->

  <!-- 모니터링 -->
  <VerticalNavSectionTitle :item="{
    heading: 'Monitor',
  }" />
  <VerticalNavGroup :item="{
    title: '모니터링',
    badgeContent: '1',
    badgeClass: 'bg-error',
    icon: 'bx-layout',
  }">
    <VerticalNavLink :item="{
      title: '메인 대시보드',
      to: '/user/ddd',
    }" />
  </VerticalNavGroup>

  <!-- 자원관리 -->
  <VerticalNavSectionTitle :item="{
    heading: 'Resources',
  }" />
  <VerticalNavGroup :item="{
    title: '자원관리',
    badgeContent: '5',
    badgeClass: 'bg-error',
    icon: 'bx-command',
  }">
    <VerticalNavLink :item="{
      title: 'GCON 관리',
      to: '/gcon-container',
    }" />
    <VerticalNavLink :item="{
      title: '스마트 신발 관리',
      to: '/smart-shoes-manage',
    }" />
    <VerticalNavLink :item="{
      title: '카메라 관리',
      to: '/user/ddd',
    }" />
    <VerticalNavLink :item="{
      title: '검지매트 관리',
      to: '/user/ddd',
    }" />
    <VerticalNavLink :item="{
      title: '배회감지 장비 관리',
      to: '/user/ddd',
    }" />
  </VerticalNavGroup>


  <!-- 사물인식 모델링 관리 -->
  <VerticalNavSectionTitle :item="{
    heading: 'Object Recognition',
  }" />
  <VerticalNavGroup :item="{
    title: '사물인식 모델링 관리',
    badgeContent: '1',
    badgeClass: 'bg-error',
    icon: 'bx-analyse',
  }">
    <VerticalNavLink :item="{
      title: '사물인식 라벨링',
      to: '/user/ddd',
    }" />
  </VerticalNavGroup>


  <!-- 회원관리 -->
  <VerticalNavSectionTitle :item="{
    heading: 'User',
  }" />
  <VerticalNavGroup :item="{
    title: '회원관리',
    badgeContent: '4',
    badgeClass: 'bg-error',
    icon: 'bx-user',
  }">
    <VerticalNavLink :item="{
      title: 'GCON 회원관리',
      to: '/user/gcon-user-manage',
    }" />
    <VerticalNavLink :item="{
      title: '관제 회원 관리',
      to: '/user/work',
    }" />
    <VerticalNavLink :item="{
      title: '배회 감지 회원 관리',
      to: '/user/dfd',
    }" />
    <VerticalNavLink :item="{
      title: '회원 로그 관리',
      to: '/user/sds',
    }" />
  </VerticalNavGroup>


  <!-- 관리자 관리 -->
  <VerticalNavSectionTitle :item="{
    heading: 'Admin Manage',
  }" />
  <VerticalNavGroup :item="{
    title: '관리자 관리',
    badgeContent: '4',
    badgeClass: 'bg-error',
    icon: 'bx-atom',
  }">
    <VerticalNavLink :item="{
      title: '관리자 관리',
      to: '/user/ddd',
    }" />
    <VerticalNavLink :item="{
      title: '관리자 권한 관리',
      to: '/user/ddd',
    }" />
    <VerticalNavLink :item="{
      title: '관리자 권한 메뉴 관리',
      to: '/user/ddd',
    }" />
    <VerticalNavLink :item="{
      title: '관리자 로그 관리',
      to: '/user/ddd',
    }" />
  </VerticalNavGroup>


  <!-- 고객지원 관리 -->
  <VerticalNavSectionTitle :item="{
    heading: 'Customer Support',
  }" />
  <VerticalNavGroup :item="{
    title: '고객지원 관리',
    badgeContent: '3',
    badgeClass: 'bg-error',
    icon: 'bx-file',
  }">
    <VerticalNavLink :item="{
      title: '개인정보처리방침 관리',
      to: '/user/ddd',
    }" />
    <VerticalNavLink :item="{
      title: '오픈소스 라이센스 관리',
      to: '/user/ddd',
    }" />
    <VerticalNavLink :item="{
      title: '서비스 이용약관 관리',
      to: '/user/ddd',
    }" />
  </VerticalNavGroup>


  <!-- 👉 Apps & Pages -->
  <!-- <VerticalNavSectionTitle :item="{
    heading: 'Apps & Pages',
  }" />
  <VerticalNavLink :item="{
    title: 'Email',
    icon: 'bx-envelope',
    href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/apps/email',
    target: '_blank',
    badgeContent: 'Pro',
    badgeClass: 'bg-light-primary text-primary',
  }" />
  <VerticalNavLink :item="{
    title: 'Chat',
    icon: 'bx-chat',
    href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/apps/chat',
    target: '_blank',
    badgeContent: 'Pro',
    badgeClass: 'bg-light-primary text-primary',
  }" />
  <VerticalNavLink :item="{
    title: 'Calendar',
    icon: 'bx-calendar',
    href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/apps/calendar',
    target: '_blank',
    badgeContent: 'Pro',
    badgeClass: 'bg-light-primary text-primary',
  }" />
  <VerticalNavLink :item="{
    title: 'Kanban',
    icon: 'bx-grid',
    href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/apps/kanban',
    target: '_blank',
    badgeContent: 'Pro',
    badgeClass: 'bg-light-primary text-primary',
  }" />

  <VerticalNavLink :item="{
    title: 'Account Settings',
    icon: 'bx-user',
    to: '/account-settings',
  }" />

  <VerticalNavLink :item="{
    title: 'Login',
    icon: 'bx-log-in',
    to: '/login',
  }" />
  <VerticalNavLink :item="{
    title: 'Register',
    icon: 'bx-user-plus',
    to: '/register',
  }" />
  <VerticalNavLink :item="{
    title: 'Error',
    icon: 'bx-info-circle',
    to: '/no-existence',
  }" /> -->

  <!-- 👉 User Interface -->
  <!-- <VerticalNavSectionTitle :item="{
    heading: 'User Interface',
  }" />
  <VerticalNavLink :item="{
    title: 'Typography',
    icon: 'bx-text',
    to: '/typography',
  }" />
  <VerticalNavLink :item="{
    title: 'Icons',
    icon: 'bx-package',
    to: '/icons',
  }" />
  <VerticalNavLink :item="{
    title: 'Cards',
    icon: 'bx-credit-card',
    to: '/cards',
  }" /> -->

  <!-- 👉 Forms & Tables -->
  <!-- <VerticalNavSectionTitle :item="{
    heading: 'Forms & Tables',
  }" />
  <VerticalNavLink :item="{
    title: 'Form Layouts',
    icon: 'bx-layout',
    to: '/form-layouts',
  }" />
  <VerticalNavLink :item="{
    title: 'Form Validation',
    icon: 'bx-check-circle',
    href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/forms/form-validation',
    target: '_blank',
    badgeContent: 'Pro',
    badgeClass: 'bg-light-primary text-primary',
  }" />
  <VerticalNavLink :item="{
    title: 'Form Wizard',
    icon: 'bx-align-middle',
    href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/forms/form-wizard-numbered',
    target: '_blank',
    badgeContent: 'Pro',
    badgeClass: 'bg-light-primary text-primary',
  }" />
  <VerticalNavLink :item="{
    title: 'Tables',
    icon: 'bx-table',
    to: '/tables',
  }" /> -->

  <!-- 👉 Others -->
  <!-- <VerticalNavSectionTitle :item="{
    heading: 'Others',
  }" />
  <VerticalNavLink :item="{
    title: 'Access Control',
    icon: 'bx-command',
    href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/demo-1/access-control',
    target: '_blank',
    badgeContent: 'Pro',
    badgeClass: 'bg-light-primary text-primary',
  }" />
  <VerticalNavLink :item="{
    title: 'Documentation',
    icon: 'bx-file',
    href: 'https://demos.themeselection.com/sneat-vuetify-vuejs-admin-template/documentation/',
    target: '_blank',
  }" />
  <VerticalNavLink :item="{
    title: 'Raise Support',
    href: 'https://github.com/themeselection/sneat-vuetify-vuejs-admin-template-free/issues',
    icon: 'bx-phone',
    target: '_blank',
  }" /> -->
</template>
