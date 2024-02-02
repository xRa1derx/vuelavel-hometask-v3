<template>
    <div class="chat__message-day">{{ date }}</div>
    <div class="chat__message-container">
        <template v-for="message in messages" :key="message.id">
            <ChatMessageComponent @contextMenu="contextMenu" :message="message" :authStoreUserId="authStoreUserId">
            </ChatMessageComponent>
        </template>
    </div>
</template>
   
<script setup lang="ts">
import ChatMessageComponent from './ChatMessageComponent.vue';

const props = defineProps({ messages: { type: Object }, date: { type: String }, authStoreUserId: { type: Number, required: true } });

function contextMenu(event: any, uuid: string) {
    emit('contextMenu', event, uuid);
}

const emit = defineEmits(["contextMenu"]);
</script>
   
<style lang="scss" scoped>
.chat__message-day {
    text-align: center;
    color: $muted;
    padding: 5px;
}

.chat__message-container {
    display: flex;
    flex-direction: column-reverse;
}
</style>