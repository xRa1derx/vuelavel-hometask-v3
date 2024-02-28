<template>
    <section class="chat-wrapper">
        <div v-show="!adminStore.adminSidebar.isOpen" class="chat-name">
            {{ route.query.name }}
        </div>
        <ChatListComponent
            :routeId="+route.params.id"
            :authStoreUserId="authStore.getAuthUser().id"
        >
        </ChatListComponent>
        <div
            :class="`textarea__chat-edit-preview${
                chatStore.editActionsWithMessage.action === 'edit'
                    ? '--active'
                    : ''
            }`"
        >
            <p class="textarea__chat-edit-title">Редактировать</p>
            <p class="textarea__chat-edit-text">
                {{
                    cutReplyAndEditText(
                        chatStore.editActionsWithMessage.initialText
                    )
                }}
            </p>
            <div
                @click="
                    function closeEdit() {
                        chatStore.resetEditingMessage();
                    }
                "
                class="close-cross close-edit-info"
            ></div>
        </div>
        <div
            :class="`textarea__chat-reply-preview${
                chatStore.replyActionsWithMessage.action === 'reply'
                    ? '--active'
                    : ''
            }`"
        >
            <p class="textarea__chat-reply-title">Ответить на сообщение</p>
            <p class="textarea__chat-reply-text">
                {{
                    cutReplyAndEditText(
                        chatStore.replyActionsWithMessage.replyMessage
                    )
                }}
            </p>
            <div
                @click="
                    function closeReply() {
                        chatStore.resetReplyMessage();
                    }
                "
                class="close-cross close-reply-info"
            ></div>
        </div>
        <ChatTextareaComponent
            :routeId="+route.params.id"
            :authStoreUserId="authStore.getAuthUser().id"
        >
        </ChatTextareaComponent>
    </section>
</template>

<script setup lang="ts">
import ChatListComponent from "@/components/Admin/Chat/ChatListComponent.vue";
import ChatTextareaComponent from "@/components/Admin/Chat/ChatTextareaComponent.vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useAdminStore } from "@/stores/adminStore";
import { useChatStore } from "@/stores/chatStore";
import { computed, ref } from "vue";

const route = useRoute();
const authStore = useAuthStore();
const adminStore = useAdminStore();
const chatStore = useChatStore();

function cutReplyAndEditText(text: string) {
    return text.length > 23 ? text.slice(0, 25) + "..." : text;
}
</script>

<style lang="scss" scoped>
.chat-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;

    .chat-name {
        margin-left: 10px;
        color: #fff;
    }

    .textarea__chat-edit-preview,
    .textarea__chat-reply-preview {
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

            .close-edit-info,
            .close-reply-info {
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
                right: 10px;
            }

            .close-edit-info::after,
            .close-reply-info::after,
            .close-edit-info::before,
            .close-reply-info::before {
                background-color: $muted;
            }
        }
    }

    .textarea__chat-edit-title,
    .textarea__chat-reply-title {
        color: $accent-primary;
        font-weight: bold;
        font-size: 12px;
    }

    .textarea__chat-edit-text,
    .textarea__chat-reply-text {
        font-size: 12px;
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
