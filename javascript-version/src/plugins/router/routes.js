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
        component: () => import("@/views/pages/gcon-container/gcon-container-add.vue"),
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
