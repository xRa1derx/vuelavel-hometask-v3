<template>
    <div class="textarea-wrapper">
        <button @click.stop="isAttachMenu = true" class="textarea__chat-attach-btn">
            <svg viewBox="0 0 448 512">
                <path
                    d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z">
                </path>
            </svg>
        </button>
        <div class="textarea__attach-image-preview-container">
            <div class="textarea__attach-image-preview" v-for="image in previewImages" :key="image.id">
                <img class="textarea__attach-image" :src="image.image" />
                <svg @click="removeImage(image.id)" class="textarea__attach-image-delete" viewBox="0 0 512 512" fill="white"
                    stroke="black" stroke-width="5">
                    <path
                        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z">
                    </path>
                </svg>
            </div>
        </div>
        <div>
            <input v-on:change="onChangeImageUpload" :key="fileInputKey" type="file" multiple style="display: none"
                id="attach-image" accept="image/x-png,image/gif,image/jpeg" />
        </div>
        <textarea ref="chatTextarea" :placeholder="selectedImage.length ? 'Добавить описание...' : 'Написать сообщение...'"
            @keyup.ctrl.enter="addMessage($event)" @keydown.tab.exact.prevent="tabLeft($event)" v-model="chatStore.textarea"
            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"' class="textarea__chat"></textarea>
        <button v-if="chatStore.editActionsWithMessage.action === 'edit'" class="textarea__chat-edit-btn"
            :class="{ inputDisable: isInputDisabled === true }" :disabled="isInputDisabled" @click="updateMessage"></button>
        <button v-else class="textarea__chat-send-btn" @click="addMessage($event)"
            :class="{ inputDisable: isInputDisabled === true }" :disabled="isInputDisabled">
            Отправить
        </button>

        <transition name="attach">
            <div v-if="isAttachMenu" class="textarea__attach-menu" v-clickoutside="closeAttachMenu">
                <button class="attach-image-btn" @click="attachImages()">
                    <svg viewBox="0 0 512 512">
                        <path
                            d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z">
                        </path>
                    </svg>
                    <p>Прикрепить картинку</p>
                </button>
                <button class="attach-file-btn" @click="attachFiles()">
                    <svg viewBox="0 0 384 512">
                        <path
                            d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z">
                        </path>
                    </svg>
                    <p>Прикрепить файл</p>
                </button>
            </div>
        </transition>

    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useAuthStore } from "@/stores/authStore";
import { useAdminStore } from "@/stores/adminStore";
import { useChatStore } from "@/stores/chatStore";
import { vClickoutside } from "@/directives/clickoutside";

const authStore = useAuthStore();
const chatStore = useChatStore();
const adminStore = useAdminStore();
const isAttachMenu = ref(false);
const isInputDisabled = ref(true);
const fileInputKey = ref(0);
const chatTextarea = ref();
const previewImages = ref([]);
const selectedFile = ref(null);
const selectedImage = ref([]);
const onChangeImageUpload = (e: any) => {
    selectedImage.value = [];
    previewImages.value = [];
    let fileList = e.target.files;
    for (let i = 0; i < fileList.length; i++) {
        let image = fileList[i];
        if (!image.type.match("image.*")) {
            return;
        }
        selectedImage.value.push({ image, id: i });
        let reader = new FileReader();
        reader.onload = function (e) {
            previewImages.value.push({ image: e.target.result, id: i });
        };
        reader.readAsDataURL(image);
    }
    selectedFile.value = null;
};

function closeAttachMenu() {
    isAttachMenu.value = !isAttachMenu.value;
}

function attachImages() {
    document.getElementById("attach-image")?.click();
    console.log('картинка');
}

function removeImage(id: number) {
    selectedImage.value = selectedImage.value.filter(
        (image) => image.id != id
    );
    previewImages.value = previewImages.value.filter(
        (image) => image.id != id
    );
}

function attachFiles() {
    console.log('файл');

}

function addMessage(event: any) {
    if (chatStore.editActionsWithMessage.action !== "edit") {
        if (
            chatStore.textarea.trim() !== "" || selectedImage.value.length
            //  || selectedFile.value != null
        ) {
            if (event.ctrlKey || event.type == "click") {
                const config = {
                    "Content-Type": "multipart/form-data",
                };
                const uuid = uuidv4();
                const replyMessage =
                    chatStore.replyActionsWithMessage.replyMessage || "";
                const message = chatStore.textarea;
                const formData = new FormData();
                formData.append("uuid", uuid);
                formData.append("to", props.routeId || 1);
                formData.append("from", authStore.getAuthUser().id);
                formData.append("replyMessage", replyMessage);
                formData.append("message", message);
                if (selectedImage.value.length) {
                    for (let i = 0; i < selectedImage.value.length; i++) {
                        let image = selectedImage.value[i].image;
                        formData.append(`images[${i}]`, image);
                    }
                }
                axios
                    .post(`/api/chat`, formData)
                    .then((res) => {
                        if (res.data.images.length) {
                            addImages(res.data);
                        }
                    });
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
                selectedImage.value = [];
                previewImages.value = [];
                chatStore.textarea = "";
                chatTextarea.value.style.height = "24px";
            } else {
                let caret = event.target.selectionStart;
                event.target.setRangeText("\n", caret, caret, "end");
                chatStore.textarea = event.target.value;
            }
        }
    } else {
        updateMessage();
    }
}

function addImages(images: any) {
    const currentImage = chatStore.getChatData()?.filter(
        (message: any) => message.uuid === images.uuid
    );
    currentImage[0].images = currentImage[0].images.concat(
        images.images
    );
};

function updateMessage() {
    if (chatStore.textarea.trim() !== "") {
        axios.patch(`/api/chat/${chatStore.editActionsWithMessage.uuid}`, {
            message: chatStore.textarea,
        });
        chatStore.editMessage(chatStore.textarea);
    }
    chatStore.textarea = "";
}

function tabLeft(event: any) {
    let message = chatStore.textarea;
    let originalSelectionStart = event.target.selectionStart,
        textStart = message.slice(0, originalSelectionStart),
        textEnd = message.slice(originalSelectionStart);

    chatStore.textarea = `${textStart}\t${textEnd}`;
    event.target.value = chatStore.textarea;
    event.target.selectionEnd = event.target.selectionStart =
        originalSelectionStart + 1;
}

watch(
    () => chatStore.editActionsWithMessage.uuid,
    () => {
        if (chatStore.editActionsWithMessage.action === "edit") {
            chatStore.textarea = chatStore.selectedMessage.text;
        } else {
            chatStore.textarea = "";
        }
    }
);

watch(
    () => [chatStore.textarea, selectedImage.value],
    () =>
        chatStore.textarea.trim() == "" && !selectedImage.value.length
            ? (isInputDisabled.value = true)
            : (isInputDisabled.value = false)
);

const props = defineProps({
    routeId: { type: Number, required: true },
});
</script>

<style lang="scss" scoped>
.textarea-wrapper {
    width: 100%;
    min-height: 44px;
    position: relative;
    display: flex;
    background-color: #fff;

    .textarea__attach-image-preview-container {
        display: flex;
        position: absolute;
        width: 100%;
        max-width: 598px;
        left: 0;
        right: 0;
        bottom: 55px;
        height: fit-content;
        align-items: flex-end;
        flex-wrap: wrap;
        margin: auto;

        .textarea__attach-image-preview {
            position: relative;
            flex-basis: 25%;
            height: 15vh;
            padding: 2px;
            box-shadow: 0px 0px 3px 0px #b9b9b9;

            .textarea__attach-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .textarea__attach-image-delete {
                width: 50px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                cursor: pointer;

                &:hover {
                    fill: $muted;
                }
            }
        }
    }

    .textarea__chat-attach-btn {
        height: 44px;
        border: none;
        background-color: transparent;
        padding: 5px 10px;
        cursor: pointer;
        border-bottom-left-radius: 10px;
        margin-top: auto;

        svg {
            width: 100%;
            height: 100%;
            fill: #b9b9b9;
        }
    }

    .textarea__chat-attach-btn:hover>svg {
        fill: $bg-dark;
    }

    .textarea__chat {
        width: 100%;
        resize: none;
        border: none;
        outline: none;
        margin: 10px;
        height: 24px;
        max-height: 130px;
    }

    .textarea__chat-send-btn {
        border: none;
        background-color: transparent;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-right: 5px;
        color: black;
    }

    .textarea__chat-edit-btn {
        height: 40px;
        background-color: transparent;
        border: none;
        padding: 0;
        color: $accent-primary;

        &::before {
            content: "\2713";
            display: inline-block;
            font-size: 25px;
            padding: 0 10px;
            cursor: pointer;
        }

        svg {
            height: 40px;
        }
    }

    .inputDisable {
        color: $muted;
    }

    .textarea__chat-edit-btn:hover {
        font-weight: bold;
    }

    .textarea__attach-menu {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: absolute;
        width: 100%;
        overflow: hidden;
        left: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.632);

        .attach-image-btn,
        .attach-file-btn {
            display: flex;
            align-items: center;
            gap: 5px;
            border: none;
            background-color: transparent;
            color: #fff;
            font-size: 18px;

            svg {
                width: 40px;
                height: 40px;
                fill: #fff;
            }
        }
    }
}


.attach-enter-to,
.attach-leave-from {
    height: 84px;
}

.attach-enter-from,
.attach-leave-to {
    height: 0px;
}

.attach-enter-active,
.attach-leave-active {
    transition: height 0.3s ease-in-out;
}



@media (min-width: 601px) {
    .textarea-wrapper {
        border-radius: 0 0 10px 10px;

        .textarea__chat {
            border-radius: 0 0 0 10px;
        }

        .textarea__attach-menu {
            border-radius: 0 0 10px 10px;
        }
    }
}
</style>
