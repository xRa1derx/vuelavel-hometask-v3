<template>
    <!-- <router-link :to="{ name: 'login' }">Login</router-link>
    <router-link :to="{ name: 'get.index' }">GET</router-link> -->
    <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
            <component :is="slotProps.Component"></component>
        </transition>
    </router-view>
</template>
<script setup lang="ts">
import axios from 'axios';
import { useAuthStore } from './stores/authStore';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(async () => {
    await axios.get('api').then(res => {
        // не авторизован, но с localStorage
        if (localStorage.getItem('user') && res.data == false) {
            authStore.user = {
                id: null,
                username: '',
                isAuth: false,
                isAdmin: false
            };
            localStorage.removeItem('user');
        }
        // авторизован, но без localStorage
        if (!localStorage.getItem('user') && res.data !== false) {
            localStorage.setItem('user', JSON.stringify(authStore.user = {
                id: res.data.id,
                username: res.data.name,
                isAuth: true,
                isAdmin: false
            }));
        }
    })

});
</script>

<style lang="scss">
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
</style>
