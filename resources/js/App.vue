<template>
    <router-view v-slot="slotProps">
        <TheHeader />
        <transition name="route" mode="out-in">
            <component :is="slotProps.Component"></component>
        </transition>
    </router-view>
</template>
<script setup lang="ts">
import axios from "axios";
import { useAuthStore } from "./stores/authStore";
import { onMounted } from "vue";
import TheHeader from "./components/TheHeader.vue";

const authStore = useAuthStore();

onMounted(async () => {
    await axios.get("api").then((res) => {
        // не авторизован, но с localStorage
        if (localStorage.getItem("user") && res.data == false) {
            authStore.user = {
                id: null,
                username: "",
                isAuth: false,
                isAdmin: false,
            };
            localStorage.removeItem("user");
        }
        // авторизован, но без localStorage
        if (!localStorage.getItem("user") && res.data !== false) {
            console.log(res.data);

            localStorage.setItem(
                "user",
                JSON.stringify(
                    (authStore.user = {
                        id: res.data.id,
                        username: res.data.name,
                        isAuth: true,
                        isAdmin: res.data.is_admin ? true : false, // поправить!!!
                    })
                )
            );
        }
    });
});
</script>

<style lang="scss">
#app {
    background-color: $bg-dark;
}

//route animations

.route-enter-from {
    opacity: 0.1;
    transform: translateY(-30px);
}

.route-enter-active {
    transition: all 0.7s ease-out;
}

.route-leave-active {
    transition: all 0.1s ease-in;
}

.route-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

//opacity

.opacity-enter-from {
    opacity: 0;
}

.opacity-enter-active {
    transition: all 0.2s ease-in;
}

.opacity-leave-active {
    transition: all 0.3s ease-in-out;
}

.opacity-leave-to {
    opacity: 0;
}

// errors

.errors-enter-from {
    opacity: 0;
    transform: scale(1.5);
}

.errors-enter-active {
    transition: all 0.2s ease-in;
}

.errors-leave-active {
    transition: all 0.3s ease-in-out;
}

.errors-leave-to {
    opacity: 0;
    transform: scale(0);
}

.--fade {
    animation: fade 0.5s linear alternate infinite;
}

@keyframes fade {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
