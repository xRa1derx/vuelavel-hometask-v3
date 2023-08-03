<template>
    <!-- <router-link :to="{ name: 'login' }">Login</router-link>
    <router-link :to="{ name: 'get.index' }">GET</router-link> -->
   <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
            <component :is="slotProps.Component"></component>
        </transition>
    </router-view>
</template>
<script setup lang="ts"></script>

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
}</style>
