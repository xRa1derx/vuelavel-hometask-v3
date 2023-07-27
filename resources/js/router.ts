import { createRouter, createWebHistory } from "vue-router";
import VueGet from "./components/VueGet.vue";
import LoginUser from "./components/LoginUser.vue";
import HomePage from "./components/HomePage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: HomePage,
            name: "home",
        },
        {
            path: "/get",
            component: VueGet,
            name: "get.index",
        },
        {
            path: "/login",
            component: LoginUser,
            name: "login",
        },
    ],
});

export default router;
