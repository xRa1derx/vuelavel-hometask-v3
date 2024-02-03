<template>
    <div class="textarea-wrapper">
        <div class="textarea__chat-mass-del-btn" @click="chatStore.openModal()"><svg xmlns="http://www.w3.org/2000/svg"
                clip-rule="evenodd" fill-rule="evenodd" shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision" image-rendering="optimizeQuality" viewBox="0 0 456 511.82">
                <path
                    d="M48.42 140.13h361.99c17.36 0 29.82 9.78 28.08 28.17l-30.73 317.1c-1.23 13.36-8.99 26.42-25.3 26.42H76.34c-13.63-.73-23.74-9.75-25.09-24.14L20.79 168.99c-1.74-18.38 9.75-28.86 27.63-28.86zM24.49 38.15h136.47V28.1c0-15.94 10.2-28.1 27.02-28.1h81.28c17.3 0 27.65 11.77 27.65 28.01v10.14h138.66c.57 0 1.11.07 1.68.13 10.23.93 18.15 9.02 18.69 19.22.03.79.06 1.39.06 2.17v42.76c0 5.99-4.73 10.89-10.62 11.19-.54 0-1.09.03-1.63.03H11.22c-5.92 0-10.77-4.6-11.19-10.38 0-.72-.03-1.47-.03-2.23v-39.5c0-10.93 4.21-20.71 16.82-23.02 2.53-.45 5.09-.37 7.67-.37zm83.78 208.38c-.51-10.17 8.21-18.83 19.53-19.31 11.31-.49 20.94 7.4 21.45 17.57l8.7 160.62c.51 10.18-8.22 18.84-19.53 19.32-11.32.48-20.94-7.4-21.46-17.57l-8.69-160.63zm201.7-1.74c.51-10.17 10.14-18.06 21.45-17.57 11.32.48 20.04 9.14 19.53 19.31l-8.66 160.63c-.52 10.17-10.14 18.05-21.46 17.57-11.31-.48-20.04-9.14-19.53-19.32l8.67-160.62zm-102.94.87c0-10.23 9.23-18.53 20.58-18.53 11.34 0 20.58 8.3 20.58 18.53v160.63c0 10.23-9.24 18.53-20.58 18.53-11.35 0-20.58-8.3-20.58-18.53V245.66z">
                </path>
            </svg></div>
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

    .textarea__chat-mass-del-btn {
        border-radius: 10px;
        border: none;
        width: 0px;
        height: 40px;
        background-color: inherit;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            width: 80%;
            height: 80%;
            fill: $attention;
        }

        svg:hover {
            fill: white;
        }
    }

    .textarea__chat {
        width: 100%;
        resize: none;
        border-radius: 10px;
        margin-right: 5px;
    }

    .textarea__chat-send-btn {
        border-radius: 10px;
        border: none;
    }
}
</style>
