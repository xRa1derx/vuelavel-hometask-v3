import { createRouter, createWebHistory } from "vue-router";
import VueGet from "./components/VueGet.vue";
import HomePage from "./layouts/HomePage.vue";
import AdminPage from "./layouts/AdminPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: HomePage,
            name: "home",
        },
        {
            path: "/admin",
            component: AdminPage,
            name: "admin",
            children: [
                {
                    path: "get",
                    name: "get.index",
                    component: VueGet,
                },
            ],
        },
    ],
});

export default router;
