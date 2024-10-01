export const routes = [
  { path: "/", redirect: "/dashboard" },
  {
    path: "/",
    component: () => import("@/layouts/default.vue"),
    children: [
      {
        path: "dashboard",
        component: () => import("@/pages/dashboard.vue"),
      },
      {
        path: "/user/profile",
        component: () => import("@/views/pages/user/profile.vue"),
      },
      {
        path: "account-settings",
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
        component: () => import("@/views/pages/user/gcon-user-manage.vue"),
      },
      {
        path: "/user/gcon-user-detail/:id",
        component: () => import("@/views/pages/user/gocn-user-detail.vue"),
      },
      {
        path: "/gcon-container",
        component: () => import("@/views/pages/gcon-container/container.vue"),
      },
      {
        path: "/gcon-container-add",
        component: () =>
          import("@/views/pages/gcon-container/gcon-container-add.vue"),
      },
      {
        path: "/gcon-container/:id",
        component: () =>
          import("@/views/pages/gcon-container/gcon-container-edit.vue"),
      },
      {
        path: "/smart-shoes-manage",
        component: () =>
          import("@/views/pages/gcon-container/smart-shoes-manage.vue"),
      },
      {
        path: "/camera-manage",
        component: () =>
          import("@/views/pages/gcon-container/camera-manage.vue"),
      },
      {
        path: "/mat-manage",
        component: () => import("@/views/pages/gcon-container/mat-manage.vue"),
      },
      {
        path: "/manage/admin-management",
        component: () => import("@/views/pages/manage/admin-management.vue"),
      },
      {
        path: "/manage/admin-role-management",
        component: () =>
          import("@/views/pages/manage/admin-role-management.vue"),
      },
      {
        path: "/manage/admin-menu-management",
        component: () =>
          import("@/views/pages/manage/admin-menu-management.vue"),
      },
      {
        path: "/labeling",
        component: () => import("@/views/pages/labeling/labeling.vue"),
      },
      {
        path: "/cust-sup-mana",
        component: () =>
          import("@/views/pages/cust-sup-mana/customer-support-management.vue"),
      },
      {
        path: "/cust-sup-mana/add",
        component: () =>
          import("@/views/pages/cust-sup-mana/cust-sup-mana-add.vue"),
      },
      {
        path: "/cust-sup-mana/:id",
        component: () =>
          import("@/views/pages/cust-sup-mana/cust-sup-mana-edit.vue"),
      },
      {
        path: "/open-source",
        component: () => import("@/views/pages/cust-sup-mana/open-source.vue"),
      },
      {
        path: "/open-source/add",
        component: () => import("@/views/pages/cust-sup-mana/open-source-add.vue"),
      },
      {
        path: "/open-source/:id",
        component: () =>
          import("@/views/pages/cust-sup-mana/open-source-edit.vue"),
      },
      {
        path: "/terms-of-use",
        component: () => import("@/views/pages/cust-sup-mana/terms-of-use.vue"),
      },
      {
        path: "/terms-of-use/add",
        component: () => import("@/views/pages/cust-sup-mana/terms-of-use-add.vue"),
      },
      {
        path: "/terms-of-use/:id",
        component: () => import("@/views/pages/cust-sup-mana/terms-of-use-edit.vue"),
      },
      {
        path: "/monitoring/admin-log-man",
        component: () => import("@/views/pages/monitoring/adminLogMan.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layouts/blank.vue"),
    children: [
      {
        path: "login",
        component: () => import("@/pages/login.vue"),
      },
      {
        path: "register",
        component: () => import("@/pages/register.vue"),
      },
      {
        path: "findId",
        component: () => import("@/pages/findId.vue"),
      },
      {
        path: "findPassword",
        component: () => import("@/pages/findPassword.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        component: () => import("@/pages/[...error].vue"),
      },
    ],
  },
];
