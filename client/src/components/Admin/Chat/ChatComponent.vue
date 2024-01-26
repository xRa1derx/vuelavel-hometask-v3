<template>
    <section class="chat-wrapper">
        <div class="chat-name">{{ route.query.name }}</div>
        <ChatMessagesComponent :routeId="+route.params.id" :authStoreUserId="authStore.getAuthUser().id">
        </ChatMessagesComponent>
        <ChatTextareaComponent :routeId="+route.params.id" :authStoreUserId="authStore.getAuthUser().id">
        </ChatTextareaComponent>
    </section>
</template>

<script setup lang="ts">

import ChatMessagesComponent from "@/components/Admin/Chat/ChatMessagesComponent.vue";
import ChatTextareaComponent from "@/components/Admin/Chat/ChatTextareaComponent.vue";
import { useRoute } from "vue-router";
import { useAuthStore } from '@/stores/authStore';

const route = useRoute();
const authStore = useAuthStore();

</script>

<style lang="scss" scoped>
.chat-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    // align-items: center;
    height: 100%;
    gap: 10px;
}

@media (min-width: 601px) {
    .chat-wrapper {}
}
</style>
