import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../layouts/HomePage.vue";
import BlogPage from "../layouts/BlogPage.vue";
import MaterialsPage from "../layouts/MaterialsPage.vue";
import NotFound from "../layouts/NotFound.vue";
import { useAuthStore } from "../stores/authStore";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: HomePage,
            name: "home",
            meta: {
                title: "Home",
            },
        },
        {
            path: "/dashboard",
            component: () => import("../layouts/DashboardPage.vue"),
            name: "dashboard",
            meta: {
                middleware: "auth",
                title: "Dashboard",
            },
        },
        {
            path: "/blog",
            component: BlogPage,
            name: "blog",
            meta: {
                title: "Blog",
            },
        },
        {
            path: "/materials",
            component: MaterialsPage,
            name: "materials",
            meta: {
                title: "Materials",
            },
        },
        {
            path: "/admin",
            component: () =>
                import(
                    /* webpackChunkName: "admin-page" */ "../layouts/AdminPage.vue"
                ),
            name: "admin",
            meta: {
                middleware: "admin",
                title: "Admin",
                transition: 'route'
            },
            children: [
                {
                    path: "posts",
                    name: "admin.posts",
                    component: () =>
                        import(
                            "../components/Admin/Post/AdminPostComponent.vue"
                        ),
                },
                {
                    path: "post/create",
                    name: "admin.post.create",
                    component: () =>
                        import(
                            "../components/Admin/Post/PostCreateComponent.vue"
                        ),
                },
                {
                    path: "post/:id/edit",
                    name: "admin.post.edit",
                    component: () =>
                        import(
                            "../components/Admin/Post/AdminEditPostComponent.vue"
                        ),
                },
                {
                    path: "categories",
                    name: "admin.categories",
                    component: () =>
                        import(
                            "../components/Admin/Post/PostCategoryComponent.vue"
                        ),
                },
                {
                    path: "tags",
                    name: "admin.tags",
                    component: () =>
                        import("../components/Admin/Post/PostTagComponent.vue"),
                },
                {
                    path: "comments",
                    name: "admin.comments",
                    component: () =>
                        import(
                            "../components/Admin/Post/PostCommentComponent.vue"
                        ),
                },
                {
                    path: "chat",
                    name: "admin.chat",
                    meta: {
                        sidebar: "chat",
                    },
                    component: () =>
                        import(
                            "../components/Admin/Chat/ChatStartComponent.vue"
                        ),
                    children: [
                        {
                            path: ":id",
                            component: () =>
                                import(
                                    "../components/Admin/Chat/ChatComponent.vue"
                                ),
                            name: "admin.chat.id",
                            meta: {
                                sidebar: "chat",
                                status: "active",
                                transition: 'chat'
                            },
                        },
                    ]
                },
                {
                    path: "students",
                    name: "admin.students",
                    component: () =>
                        import("../components/Admin/StudentComponent.vue"),
                },
            ],
        },
        {
            name: "NotFound",
            component: NotFound,
            path: "/:catchAll(.*)",
        },
    ],
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    document.title = `${to.meta.title} - My Hometask`;
    if (to.meta.middleware == "admin") {
        if (authStore.user.isAdmin) {
            next();
        } else {
            next({ name: "home" });
        }
    } else if (to.meta.middleware == "auth") {
        if (authStore.user.isAuth && !authStore.user.isAdmin) {
            next();
        } else {
            next({ name: "home" });
        }
    } else if (to.name === "NotFound") {
        next({ name: "home" });
    } else {
        next();
    }
});

export default router;
