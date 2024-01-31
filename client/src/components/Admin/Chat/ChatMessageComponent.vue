<template>
    <div class="chat__message-day">{{ date }}</div>
    <div class="chat__message-container">
        <template v-for="message in messages" :key="message.id">
            <div @click.stop="contextMenu($event, message.uuid)" class="chat__message" :class="[
                authStoreUserId === message.sender.id
                    ? 'sender'
                    : 'receiver'
            ]">
                <div class="chat-message-text">
                    {{ message.message }}
                </div>
            </div>
        </template>
    </div>
</template>
   
<script setup lang="ts">

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
    margin: 5px;

    .chat__message {
        position: relative;
        max-width: 500px;
        overflow-wrap: break-word;
        padding: 10px;
        border-radius: 10px;
        min-width: 30px;
        color: black;
        cursor: pointer;
        white-space: pre-wrap;
        transition: margin 0.2s linear;
        z-index: 0;
        box-shadow: 0px 0px 3px 0px $muted;
        margin-bottom: 5px;

    }

    .sender {
        align-self: flex-end;
        /* background-color: #ffa04f; */
        background-color: #fff;
        margin-left: 50px;
    }

    .receiver {
        align-self: flex-start;
        background-color: #ffe083;
    }

    .sender:hover {
        /* background-color: #ff9437; */
        background-color: rgb(223, 222, 222);
    }

    .receiver:hover {
        align-self: flex-start;
        background-color: #ffd965;
    }
}
</style>