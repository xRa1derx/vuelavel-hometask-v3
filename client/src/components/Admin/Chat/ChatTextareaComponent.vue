<template>
    <div class="textarea-wrapper">
        <textarea @keyup.ctrl.enter="addMessage($event)" @keydown.tab.exact.prevent="tabLeft($event)" v-model="text"
            class="textarea__chat"></textarea>
        <button class="textarea__chat-send-btn" @click="addMessage">Отправить</button>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { v4 as uuidv4 } from "uuid";
import { useAuthStore } from '@/stores/authStore';
import { useChatStore } from '@/stores/chatStore';

const text = ref('');
const authStore = useAuthStore();
const chatStore = useChatStore();

function addMessage(event: any) {
    if (text.value.trim() !== ""
        //  || selectedFile.value != null
    ) {
        if (event.ctrlKey || event.type == "click") {
            const config = {
                "Content-Type": "multipart/form-data",
            };
            const uuid = uuidv4();
            const replyMessage = "";
            const message = text.value;
            const formData = new FormData();
            formData.append("uuid", uuid);
            formData.append("to", props.routeId || 1);
            formData.append("from", props.authStoreUserId);
            formData.append("replyMessage", replyMessage);
            formData.append("message", message);
            axios.post(`/api/chat`, formData).then(res => console.log(res));
            const data = {
                uuid,
                message: message || null,
                replyMessage,
                created_at: new Date().toISOString(),
                new: 1,
                created_at_for_humans: "sending",
                sender: {
                    id: authStore.user.id,
                    name: authStore.user.username,
                    admin: authStore.user.isAdmin ? 1 : 0,
                },
                files: [],
                images: [],
            };
            chatStore.addMessage(data);
            text.value = "";
        }
        else {
            let caret = event.target.selectionStart;
            event.target.setRangeText("\n", caret, caret, "end");
            text.value = event.target.value;
        }
    }
}

function tabLeft(event: any) {
    let message = text.value;
    let originalSelectionStart = event.target.selectionStart,
        textStart = message.slice(0, originalSelectionStart),
        textEnd = message.slice(originalSelectionStart);

    text.value = `${textStart}\t${textEnd}`;
    event.target.value = text.value;
    event.target.selectionEnd = event.target.selectionStart =
        originalSelectionStart + 1;
};

const props = defineProps({
    routeId: { type: Number, required: true },
    authStoreUserId: { type: Number, required: true }
});

</script>

<style lang="scss" scoped>
.textarea-wrapper {
    width: 100%;
    display: flex;
    gap: 5px;

    .textarea__chat {
        width: 100%;
        resize: none;
        border-radius: 5px;
    }

    .textarea__chat-send-btn {
        border-radius: 5px;
        border: none;
    }
}
</style>
