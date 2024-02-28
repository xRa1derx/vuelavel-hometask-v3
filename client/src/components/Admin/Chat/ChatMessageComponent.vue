<template>
    <div
        class="chat__message-content"
        ref="message"
        @click="addToDelete(props.message?.uuid)"
    >
        <div
            @click.stop="contextMenu($event, props.message?.uuid)"
            class="chat__message"
            :class="[
                authStoreUserId === props.message?.sender.id
                    ? 'sender'
                    : 'receiver',
            ]"
        >
            <p v-if="props.message?.replyMessage" class="chat__quote">{{ props.message?.replyMessage }}</p>
            <p class="chat-message-text">
                {{ props.message?.message }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useChatStore } from "@/stores/chatStore";

const message = ref();
const chatStore = useChatStore();

function addToDelete(uuid: string) {
    chatStore.setMessageAction("massDelete", uuid);
    message.value.classList.toggle("selected");
}

function contextMenu(event: any, uuid: string) {
    chatStore.setMessage(props.message!.message, props.message!.uuid);
    emit("contextMenu", event, uuid);
}

const props = defineProps({
    message: { type: Object },
    authStoreUserId: { type: Number, required: true },
});
const emit = defineEmits(["contextMenu"]);
</script>

<style lang="scss" scoped>
.chat__message-content {
    display: flex;
    flex-direction: column-reverse;
    padding: 5px 0;
    .chat__quote{
        background-color: rgb(241, 241, 241);
        padding: 10px;
        border-radius: 10px;
        border-left: 3px solid $accent-primary;
    }

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

        // margin-bottom: 5px;
    }

    .sender {
        align-self: flex-end;
        /* background-color: #ffa04f; */
        background-color: #fff;
        margin-left: 80px;
        margin-right: 10px;
    }

    .receiver {
        align-self: flex-start;
        background-color: #ffe083;
        margin-left: 10px;
    }

    .sender:hover {
        background-color: rgb(223, 222, 222);
    }

    .receiver:hover {
        align-self: flex-start;
        background-color: #ffd965;
    }
}

.chat__message-content:hover:not(:has(*:hover)) {
    background-color: #d2d2d2;
}

.selected {
    background-color: $muted !important;
}

@media (hover: none) {
    .chat__message-content:hover:not(:has(*:hover)) {
        background-color: inherit;
    }
}
</style>
