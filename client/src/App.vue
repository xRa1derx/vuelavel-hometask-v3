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
import router from "./router";
const authStore = useAuthStore();

window.addEventListener(
    "load",
    () => {
        setTimeout(() => {
            const loading = document.getElementById("loading");
            document.getElementById("app")!.style.opacity = "1";
            document.body.style.overflow = "auto";
            loading!.style.opacity = "0";
            setTimeout(() => {
                loading!.style.display = "none";
                loading!.remove();
            }, 300);
        }, 200);
    },
    { once: true }
);

onMounted(async () => {
    await axios.get("/api").then((res) => {
        // не авторизован, но с localStorage
        if (localStorage.getItem("user") && res.data == false) {
            authStore.user = {
                id: null,
                username: "",
                isAuth: false,
                isAdmin: false,
            };
            localStorage.removeItem("user");
            router.push("/");
            return;
        }
        // авторизован, но без localStorage
        if (!localStorage.getItem("user") && res.data !== false) {
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
    opacity: 0;
    transition: opacity 0.3s linear;
    background-color: $bg-dark;
}

.tiptap {
    blockquote {
        border-left: 2px solid $muted;
        padding-left: 1rem;
    }
    hr {
        border: none;
        border-top: 2px solid $muted;
        margin: 2rem 0;
    }
}

@font-face {
    font-family: "Arizonia";
    src: url("./assets/fonts/Arizonia-Regular.ttf");
    font-weight: 400;
}

@font-face {
    font-family: "IBM Plex Sans";
    src: url("./assets/fonts/IBMPlexSans-Regular.ttf");
    font-weight: 400;
}

// scrollbar

::-webkit-scrollbar {
    width: 0.5rem;
    background-color: #242424f6;
}

::-webkit-scrollbar:horizontal {
    height: 12px;
    margin-right: 20px;
}

::-webkit-scrollbar-thumb {
    background-color: #efe4e4;
}

::-webkit-scrollbar-thumb:hover {
    background-color: #d3c9c9;
    border: 1px solid #333333;
}

::-webkit-scrollbar-thumb:active {
    background-color: #999999;
    border: 1px solid #333333;
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

.errors-enter-active,
.errors-leave-active {
  transition: opacity 0.2s ease;
}

.errors-enter-from,
.errors-leave-to {
  opacity: 0;
}

.--fade {
    animation: fade 0.5s linear alternate infinite;
}

@keyframes fade {
    0% {
        opacity: 0.7;
    }

    100% {
        opacity: 1;
    }
}
</style>
