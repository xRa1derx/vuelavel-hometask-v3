<template>
    <div @click="$emit('close-context-menu')" class="chat__context-menu"
        :style="{ left: clientX + 'px', top: clientY + 'px' }">
        <button class="chat-context-menu-btn">Добавить файлы</button>
        <button class="chat-context-menu-btn">Ответить</button>
        <button @click="editMessage()" class="chat-context-menu-btn">Редактировать</button>
        <button class="chat-context-menu-btn" @click="$emit('modal')">Удалить</button>
    </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@/stores/chatStore';

const chatStore = useChatStore();


function editMessage() {
    chatStore.setMessageAction('edit', chatStore.message.uuid);
}

const props = defineProps(['clientX', 'clientY']);
const emit = defineEmits(['modal', 'close-context-menu']);

</script>

<style lang="scss" scoped>
.chat__context-menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 126px;
    box-shadow: 0px 0px 3px 0px $muted;

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
