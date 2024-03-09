<template>
    <section class="chat-wrapper">
        <div v-if="contextMenu" class="chat-wrapper__backdrop"></div>
        <div class="chat-textarea-container" v-if="chatStore.massDeleteMessage.action === 'massDelete'">
            <div class="textarea__chat-mass-del-btn" @click="chatStore.openModal()">
                <svg xmlns="http://www.w3.org/2000/svg" clip-rule="evenodd" fill-rule="evenodd"
                    shape-rendering="geometricPrecision" text-rendering="geometricPrecision"
                    image-rendering="optimizeQuality" viewBox="0 0 456 511.82">
                    <path
                        d="M48.42 140.13h361.99c17.36 0 29.82 9.78 28.08 28.17l-30.73 317.1c-1.23 13.36-8.99 26.42-25.3 26.42H76.34c-13.63-.73-23.74-9.75-25.09-24.14L20.79 168.99c-1.74-18.38 9.75-28.86 27.63-28.86zM24.49 38.15h136.47V28.1c0-15.94 10.2-28.1 27.02-28.1h81.28c17.3 0 27.65 11.77 27.65 28.01v10.14h138.66c.57 0 1.11.07 1.68.13 10.23.93 18.15 9.02 18.69 19.22.03.79.06 1.39.06 2.17v42.76c0 5.99-4.73 10.89-10.62 11.19-.54 0-1.09.03-1.63.03H11.22c-5.92 0-10.77-4.6-11.19-10.38 0-.72-.03-1.47-.03-2.23v-39.5c0-10.93 4.21-20.71 16.82-23.02 2.53-.45 5.09-.37 7.67-.37zm83.78 208.38c-.51-10.17 8.21-18.83 19.53-19.31 11.31-.49 20.94 7.4 21.45 17.57l8.7 160.62c.51 10.18-8.22 18.84-19.53 19.32-11.32.48-20.94-7.4-21.46-17.57l-8.69-160.63zm201.7-1.74c.51-10.17 10.14-18.06 21.45-17.57 11.32.48 20.04 9.14 19.53 19.31l-8.66 160.63c-.52 10.17-10.14 18.05-21.46 17.57-11.31-.48-20.04-9.14-19.53-19.32l8.67-160.62zm-102.94.87c0-10.23 9.23-18.53 20.58-18.53 11.34 0 20.58 8.3 20.58 18.53v160.63c0 10.23-9.24 18.53-20.58 18.53-11.35 0-20.58-8.3-20.58-18.53V245.66z">
                    </path>
                </svg>
                <p v-if="chatStore.massDeleteMessage.action === 'massDelete'" class="textarea__chat-mass-del-count">
                    <b>{{ chatStore.massDeleteMessage.uuid?.length }}</b>
                </p>
            </div>
            <div class="close-cross reset-mass-del" @click="chatStore.resetSelectedMessages()"></div>
        </div>
        <div v-show="!adminStore.adminSidebar.isOpen" class="chat-name">
            {{ route.query.name }}
        </div>
        <ChatListComponent :routeId="+route.params.id" @isContextMenu="contextMenu = !contextMenu">
        </ChatListComponent>
        <div :class="`textarea__chat-edit-preview${chatStore.editActionsWithMessage.action === 'edit'
            ? '--active'
            : ''
            }`">
            <p class="textarea__chat-edit-title">Редактировать</p>
            <p class="textarea__chat-edit-text">
                {{
                    cutReplyAndEditText(
                        chatStore.editActionsWithMessage.initialText
                    )
                }}
            </p>
            <div @click="function closeEdit() {
                        chatStore.resetEditingMessage();
                    }
                    " class="close-cross close-edit-info"></div>
        </div>
        <div :class="`textarea__chat-reply-preview${chatStore.replyActionsWithMessage.action === 'reply'
            ? '--active'
            : ''
            }`">
            <p class="textarea__chat-reply-title">Ответить на сообщение</p>
            <p class="textarea__chat-reply-text">
                {{
                    cutReplyAndEditText(
                        chatStore.replyActionsWithMessage.replyMessage
                    )
                }}
            </p>
            <div @click="function closeReply() {
                        chatStore.resetReplyMessage();
                    }
                    " class="close-cross close-reply-info"></div>
        </div>
        <ChatTextareaComponent :routeId="+route.params.id">
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
import { ref } from "vue";

const route = useRoute();
const authStore = useAuthStore();
const adminStore = useAdminStore();
const chatStore = useChatStore();
const contextMenu = ref(false);

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

    .chat-textarea-container {
        position: absolute;
        display: flex;
        justify-content: space-between;
        align-items: center;
        left: 0;
        right: 0;
        margin: auto;
        top: 30px;
        width: 80%;
        height: 50px;
        background-color: #b9b9b9d0;
        z-index: 1;
        border-radius: 10px;
        padding: 0 5px;
        border: 1px solid #eee;

        .reset-mass-del {
            position: relative;
        }

        .textarea__chat-mass-del-btn {
            width: 0px;
            border-radius: 10px;
            border: none;
            background-color: transparent;
            cursor: pointer;
            transition: width 0.3s ease;
            display: flex;
            justify-content: space-between;
            align-items: center;

            svg {
                width: 40px;
                height: 40px;
                fill: $attention;
            }

            svg:hover {
                fill: black;
            }
        }
    }



    .chat-wrapper__backdrop {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: $bg-dark;
        opacity: 0.1;
        z-index: 1;
    }

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
