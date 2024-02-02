<template>
    <section class="chat-wrapper">
        <div v-show="!adminStore.adminSidebar.isOpen" class="chat-name">{{ route.query.name }}</div>
        <ChatListComponent :routeId="+route.params.id" :authStoreUserId="authStore.getAuthUser().id">
        </ChatListComponent>
        <ChatTextareaComponent :routeId="+route.params.id" :authStoreUserId="authStore.getAuthUser().id">
        </ChatTextareaComponent>
    </section>
</template>

<script setup lang="ts">

import ChatListComponent from "@/components/Admin/Chat/ChatListComponent.vue";
import ChatTextareaComponent from "@/components/Admin/Chat/ChatTextareaComponent.vue";
import { useRoute } from "vue-router";
import { useAuthStore } from '@/stores/authStore';
import { useAdminStore } from '@/stores/adminStore';

const route = useRoute();
const authStore = useAuthStore();
const adminStore = useAdminStore();

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

    .chat-name {
        color: #fff;
    }
}

@media (min-width: 601px) {
    .chat-wrapper {
        .chat-name {
            visibility: hidden;
        }
    }
}
</style>
