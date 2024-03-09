<template>
    <div @click="$emit('close-context-menu')" class="chat__context-menu"
        :style="{ left: clientX + 'px', top: clientY + 'px' }">
        <button class="chat-context-menu-btn">Добавить файлы</button>
        <button @click="replyMessage()" class="chat-context-menu-btn">
            Ответить
        </button>
        <button @click="editMessage()" class="chat-context-menu-btn">
            Редактировать
        </button>
        <button @click="chatStore.openModal('delete')" class="chat-context-menu-btn">
            Удалить
        </button>
    </div>
</template>

<script setup lang="ts">
import { useChatStore } from "@/stores/chatStore";

const chatStore = useChatStore();

function replyMessage() {
    chatStore.setMessageAction("reply", chatStore.selectedMessage.uuid);
}

function editMessage() {
    chatStore.setMessageAction("edit", chatStore.selectedMessage.uuid);
}

const props = defineProps(["clientX", "clientY"]);
const emit = defineEmits(["close-context-menu"]);
</script>

<style lang="scss" scoped>
.chat__context-menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 126px;
    box-shadow: 0px 0px 3px 0px $muted;
    z-index: 1;

    button {
        background-color: #fff;
    }

    .chat-context-menu-btn {
        border: none;
        text-align: left;
        padding: 10px;
        cursor: pointer;
    }

    .chat-context-menu-btn:hover {
        background-color: $muted;
    }
}
</style>
