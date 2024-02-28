<template>
    <div class="chat-start">
        <ChatNewMessageComponent
            v-if="$route.meta.status !== 'active'"
        ></ChatNewMessageComponent>
        <router-view v-slot="slotProps">
            <transition>
                <component
                    :is="slotProps.Component"
                    :key="$route.fullPath"
                ></component>
            </transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import ChatNewMessageComponent from "./ChatNewMessageComponent.vue";
onMounted(() => {
    document.body.style.position = "fixed";
});

onUnmounted(() => {
    document.body.style.position = "static";
});
</script>

<style lang="scss" scoped>
.chat-start {
    height: 100%;
}
</style>
