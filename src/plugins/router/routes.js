export const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/pages/dashboard.vue"),
      },
      {
        path: "/user/profile",
        name: "UserProfile",
        component: () => import("@/views/pages/user/profile.vue"),
      },
      {
        path: "account-settings",
        name: "AccountSettings",
        component: () => import("@/pages/account-settings.vue"),
      },
      {
        path: "typography",
        component: () => import("@/pages/typography.vue"),
      },
      {
        path: "icons",
        component: () => import("@/pages/icons.vue"),
      },
      {
        path: "cards",
        component: () => import("@/pages/cards.vue"),
      },
      {
        path: "tables",
        component: () => import("@/pages/tables.vue"),
      },
      {
        path: "form-layouts",
        component: () => import("@/pages/form-layouts.vue"),
      },
      {
        path: "/user/gcon-user-manage",
        name: "GconUserManage",
        component: () => import("@/views/pages/user/gcon-user-manage.vue"),
      },
      {
        path: "/user/gcon-user-detail/:id",
        name: "GconUserDetail",
        component: () => import("@/views/pages/user/gocn-user-detail.vue"),
      },
      {
        path: "/gcon-container",
        name: "GconContainer",
        component: () => import("@/views/pages/gcon-container/container.vue"),
      },
      {
        path: "/gcon-container-add",
        name: "GconContainerAdd",
        component: () =>
          import("@/views/pages/gcon-container/gcon-container-add.vue"),
      },
      {
        path: "/gcon-container/:id",
        name: "GconContainerEdit",
        component: () =>
          import("@/views/pages/gcon-container/gcon-container-edit.vue"),
      },
      {
        path: "/cctv-manage-add",
        name: "CctvManageAdd",
        component: () =>
          import("@/views/pages/gcon-container/cctv-manage-add.vue"),
      },
      {
        path: "/cctv-manage/:id",
        name: "CctvManageEdit",
        component: () =>
          import("@/views/pages/gcon-container/cctv-manage-edit.vue"),
      },
      {
        path: "/smart-shoes-manage",
        name: "SmartShoesManage",
        component: () =>
          import("@/views/pages/gcon-container/smart-shoes-manage.vue"),
      },
      {
        path: "/camera-manage",
        name: "CameraManage",
        component: () =>
          import("@/views/pages/gcon-container/camera-manage.vue"),
      },
      {
        path: "/mat-manage",
        name: "MatManage",
        component: () => import("@/views/pages/gcon-container/mat-manage.vue"),
      },
      {
        path: "/cctv-manage",
        name: "CctvManage",
        component: () => import("@/views/pages/gcon-container/cctv-manage.vue"),
      },
      {
        path: "/manage/admin-management",
        name: "AdminManagement",
        component: () => import("@/views/pages/manage/admin-management.vue"),
      },
      {
        path: "/manage/admin-role-management",
        name: "AdminRoleManagement",
        component: () =>
          import("@/views/pages/manage/admin-role-management.vue"),
      },
      {
        path: "/manage/admin-menu-management",
        name: "AdminMenuManagement",
        component: () =>
          import("@/views/pages/manage/admin-menu-management.vue"),
      },
      {
        path: "/labeling-before",
        name: "LabelingBefore",
        component: () => import("@/views/pages/labeling/labeling-before.vue"),
      },
      {
        path: "/labeling-after",
        name: "LabelingAfter",
        component: () => import("@/views/pages/labeling/labeling-after.vue"),
      },
      {
        path: "/cust-sup-mana",
        name: "CustSupMana",
        component: () =>
          import("@/views/pages/cust-sup-mana/customer-support-management.vue"),
      },
      {
        path: "/cust-sup-mana/add",
        name: "CustSupManaAdd",
        component: () =>
          import("@/views/pages/cust-sup-mana/cust-sup-mana-add.vue"),
      },
      {
        path: "/cust-sup-mana/:id",
        name: "CustSupManaEdit",
        component: () =>
          import("@/views/pages/cust-sup-mana/cust-sup-mana-edit.vue"),
      },
      {
        path: "/open-source",
        name: "OpenSource",
        component: () => import("@/views/pages/cust-sup-mana/open-source.vue"),
      },
      {
        path: "/open-source/add",
        name: "OpenSourceAdd",
        component: () =>
          import("@/views/pages/cust-sup-mana/open-source-add.vue"),
      },
      {
        path: "/open-source/:id",
        name: "OpenSourceEdit",
        component: () =>
          import("@/views/pages/cust-sup-mana/open-source-edit.vue"),
      },
      {
        path: "/terms-of-use",
        name: "TermsOfUse",
        component: () => import("@/views/pages/cust-sup-mana/terms-of-use.vue"),
      },
      {
        path: "/terms-of-use/add",
        name: "TermsOfUseAdd",
        component: () =>
          import("@/views/pages/cust-sup-mana/terms-of-use-add.vue"),
      },
      {
        path: "/terms-of-use/:id",
        name: "TermsOfUseEdit",
        component: () =>
          import("@/views/pages/cust-sup-mana/terms-of-use-edit.vue"),
      },
      {
        path: "/monitoring/admin-log-man",
        name: "AdminLogMan",
        component: () => import("@/views/pages/monitoring/adminLogMan.vue"),
      },
      {
        path: "/monitoring/user-log-man",
        name: "UserLogMan",
        component: () => import("@/views/pages/monitoring/userLogMan.vue"),
      },
      {
        path: "/common-code",
        name: "CommonCode",
        component: () => import("@/views/pages/code/common-code.vue"),
      },
      {
        path: "/control/control-mana",
        name: "Control",
        component: () => import("@/views/pages/control/control-mana.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/blank.vue"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("@/pages/login.vue"),
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("@/pages/register.vue"),
      },
      {
        path: "/findId",
        name: "FindId",
        component: () => import("@/pages/findId.vue"),
      },
      {
        path: "/findPassword",
        name: "FindPassword",
        component: () => import("@/pages/findPassword.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "Error",
        component: () => import("@/pages/[...error].vue"),
      },
    ],
  },
];
