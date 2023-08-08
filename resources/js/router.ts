import { createRouter, createWebHistory } from "vue-router";
import VueGet from "./components/VueGet.vue";
import HomePage from "./layouts/HomePage.vue";
import AdminPage from "./layouts/AdminPage.vue";
import BlogPage from './layouts/BlogPage.vue';
import NotFound from './layouts/NotFound.vue';
import { useAuthStore } from "./stores/authStore";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: HomePage,
            name: "home",
            meta: {
                title: 'Home'
            }
        },
        {
            path: "/dashboard",
            component: VueGet,
            name: "dashboard",
            meta: {
                middleware: 'auth',
                title: 'Dashboard'
            }
        },
        {
            path: "/blog",
            component: BlogPage,
            name: "blog",
            meta: {
                title: 'Blog'
            }
        },
        {
            path: "/admin",
            component: AdminPage,
            name: "admin",
            meta: {
                middleware: 'admin',
                title: 'Admin'
            },
            children: [
                {
                    path: "get",
                    name: "get.index",
                    component: VueGet,
                },
            ],
        },
        {
            name: "NotFound",
            component: NotFound,
            path: '/:catchAll(.*)'
        },
    ],
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    document.title = `${to.meta.title} - ${process.env.MIX_APP_NAME}`;
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
    } else if (to.name === 'NotFound') {
        next({ name: 'home' });
    } else {
        next();
    }
});

export default router;
