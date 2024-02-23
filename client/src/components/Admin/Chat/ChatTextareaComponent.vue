<template>
    <div class="textarea-wrapper">
        <div class="textarea__chat-mass-del-btn" @click="chatStore.openModal()">
            <svg xmlns="http://www.w3.org/2000/svg" clip-rule="evenodd" fill-rule="evenodd"
                shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality"
                viewBox="0 0 456 511.82">
                <path
                    d="M48.42 140.13h361.99c17.36 0 29.82 9.78 28.08 28.17l-30.73 317.1c-1.23 13.36-8.99 26.42-25.3 26.42H76.34c-13.63-.73-23.74-9.75-25.09-24.14L20.79 168.99c-1.74-18.38 9.75-28.86 27.63-28.86zM24.49 38.15h136.47V28.1c0-15.94 10.2-28.1 27.02-28.1h81.28c17.3 0 27.65 11.77 27.65 28.01v10.14h138.66c.57 0 1.11.07 1.68.13 10.23.93 18.15 9.02 18.69 19.22.03.79.06 1.39.06 2.17v42.76c0 5.99-4.73 10.89-10.62 11.19-.54 0-1.09.03-1.63.03H11.22c-5.92 0-10.77-4.6-11.19-10.38 0-.72-.03-1.47-.03-2.23v-39.5c0-10.93 4.21-20.71 16.82-23.02 2.53-.45 5.09-.37 7.67-.37zm83.78 208.38c-.51-10.17 8.21-18.83 19.53-19.31 11.31-.49 20.94 7.4 21.45 17.57l8.7 160.62c.51 10.18-8.22 18.84-19.53 19.32-11.32.48-20.94-7.4-21.46-17.57l-8.69-160.63zm201.7-1.74c.51-10.17 10.14-18.06 21.45-17.57 11.32.48 20.04 9.14 19.53 19.31l-8.66 160.63c-.52 10.17-10.14 18.05-21.46 17.57-11.31-.48-20.04-9.14-19.53-19.32l8.67-160.62zm-102.94.87c0-10.23 9.23-18.53 20.58-18.53 11.34 0 20.58 8.3 20.58 18.53v160.63c0 10.23-9.24 18.53-20.58 18.53-11.35 0-20.58-8.3-20.58-18.53V245.66z">
                </path>
            </svg>
        </div>
        <textarea @keyup.ctrl.enter="addMessage($event)" @keydown.tab.exact.prevent="tabLeft($event)" v-model="text"
            class="textarea__chat"></textarea>
        <button v-if="chatStore.editActionsWithMessage.action === 'edit'" class="textarea__chat-edit-btn"
            @click="updateMessage">
            <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enable-background="new 0 0 64 64">
                <path d="M32,2C15.431,2,2,15.432,2,32c0,16.568,13.432,30,30,30c16.568,0,30-13.432,30-30C62,15.432,48.568,2,32,2z M25.025,50
	l-0.02-0.02L24.988,50L11,35.6l7.029-7.164l6.977,7.184l21-21.619L53,21.199L25.025,50z" />
            </svg> -->
        </button>
        <button v-else class="textarea__chat-send-btn" @click="addMessage($event)"
            :class="{ inputDisable: isInputDisabled === true }" :disabled="isInputDisabled">
            Отправить
        </button>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref, watch } from 'vue';
import { v4 as uuidv4 } from "uuid";
import { useAuthStore } from '@/stores/authStore';
import { useChatStore } from '@/stores/chatStore';

const authStore = useAuthStore();
const chatStore = useChatStore();
const text = ref('');
const isInputDisabled = ref(true);

function addMessage(event: any) {
    if (chatStore.editActionsWithMessage.action !== 'edit') {
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
    } else {
        updateMessage();
    }

}

function updateMessage() {
    if (text.value.trim() !== "") {
        axios.patch(`/api/chat/${chatStore.message.uuid}`, {
            message: text.value,
        });
        chatStore.editMessage(text.value);
    }
    text.value = '';
}

function closeEdit() {
    chatStore.resetEditingMessage();
    text.value = '';
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

watch(() => chatStore.editActionsWithMessage.uuid, () => {
    if (chatStore.editActionsWithMessage.action === 'edit') {
        text.value = chatStore.message.text;
    }
});

watch(
    () => text.value,
    () =>
        text.value.trim() == ""
            ? (isInputDisabled.value = true)
            : (isInputDisabled.value = false)
);

defineExpose({ closeEdit });

const props = defineProps({
    routeId: { type: Number, required: true },
    authStoreUserId: { type: Number, required: true }
});

</script>

<style lang="scss" scoped>
.textarea-wrapper {
    width: 100%;
    position: relative;
    display: flex;
    background-color: #fff;

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
        border: none;
        outline: none;
        padding: 0 10px;
    }

    .textarea__chat-send-btn {
        border: none;
        background-color: transparent;
        margin-right: 5px;
        color: black;
    }

    .inputDisable {
        color: $muted;
    }

    .textarea__chat-edit-btn {
        height: 40px;
        background-color: transparent;
        border: none;
        padding: 0;

        &::before {
            content: '\2713';
            display: inline-block;
            color: $accent-primary;
            font-size: 25px;
            padding: 0 10px;
            cursor: pointer;
        }


        svg {
            height: 40px;
            fill: $accent-primary;

        }
    }

    .textarea__chat-edit-btn:hover {
        font-weight: bold;
    }
}

@media (min-width: 601px) {
    .textarea-wrapper {
        border-radius: 0 0 10px 10px;

        .textarea__chat {
            border-radius: 0 0 0 10px;
        }
    }


}
</style>
