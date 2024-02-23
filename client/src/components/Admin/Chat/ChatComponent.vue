<template>
    <section class="chat-wrapper">
        <div v-show="!adminStore.adminSidebar.isOpen" class="chat-name">{{ route.query.name }}</div>
        <ChatListComponent :routeId="+route.params.id" :authStoreUserId="authStore.getAuthUser().id">
        </ChatListComponent>
        <div :class="`textarea__chat-edit-preview${chatStore.editActionsWithMessage.action === 'edit' ? '--active' : ''}`">
            <p class="textarea__chat-edit-title">Редактировать</p>
            <p class="textarea__chat-edit-text">{{ textEditing }}</p>
            <div @click="closeEdit()" class="close-cross close-edit-info"></div>
        </div>
        <ChatTextareaComponent ref="chatTextarea" :routeId="+route.params.id" :authStoreUserId="authStore.getAuthUser().id">
        </ChatTextareaComponent>
    </section>
</template>

<script setup lang="ts">

import ChatListComponent from "@/components/Admin/Chat/ChatListComponent.vue";
import ChatTextareaComponent from "@/components/Admin/Chat/ChatTextareaComponent.vue";
import { useRoute } from "vue-router";
import { useAuthStore } from '@/stores/authStore';
import { useAdminStore } from '@/stores/adminStore';
import { useChatStore } from "@/stores/chatStore";
import { computed, ref } from "vue";

const route = useRoute();
const authStore = useAuthStore();
const adminStore = useAdminStore();
const chatStore = useChatStore();
const chatTextarea = ref();

const textEditing = computed(() => {
    if (chatStore.editActionsWithMessage.initialText) {
        return chatStore.editActionsWithMessage.initialText.length > 23 ?
            chatStore.editActionsWithMessage.initialText.slice(0, 25) + '...' :
            chatStore.editActionsWithMessage.initialText
    }
})

function closeEdit() {
    chatTextarea.value.closeEdit();
}

</script>

<style lang="scss" scoped>
.chat-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;

    .chat-name {
        color: #fff;
    }
}


.textarea__chat-edit-preview {
    padding: 0 34px 0 10px;
    height: 0;
    position: relative;
    transition: height ease 0.2s;
    background-color: #fff;

    &--active {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
        width: 100%;
        height: 40px;
        transition: height ease 0.2s;
        background-color: #fff;
        padding: 0 34px 0 10px;
        border-bottom: 1px solid $muted;

        .close-edit-info {
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            right: 10px;
        }

        .close-edit-info::after,
        .close-edit-info::before {
            background-color: $muted;
        }
    }


}

.textarea__chat-edit-title {
    color: $accent-primary;
    font-weight: bold;
    font-size: 12px;
}

.textarea__chat-edit-text {
    font-size: 12px;
}

@media (min-width: 601px) {
    .chat-wrapper {
        .chat-name {
            visibility: hidden;
        }
    }
}
</style>
