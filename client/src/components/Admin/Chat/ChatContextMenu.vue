<template>
    <div class="chat__context-menu" :style="{ left: clientX + 'px', top: clientY + 'px' }">
        <button class="chat-context-menu-btn">Добавить файлы</button>
        <button class="chat-context-menu-btn">Ответить</button>
        <button class="chat-context-menu-btn">Редактировать</button>
        <button class="chat-context-menu-btn">Удалить</button>
    </div>
</template>

<script setup lang="ts">

const props = defineProps(['clientX', 'clientY']);

</script>

<style lang="scss" scoped>
.chat__context-menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 120px;
    border: 1px solid $muted;

    .chat-context-menu-btn {
        border: none;
        text-align: left;
        padding: 10px 5px;
        cursor: pointer;
    }

    .chat-context-menu-btn:hover {
        background-color: $muted;
    }
}
</style>
