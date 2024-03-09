<template>
    <div class="chat__message-content" ref="message" @click="addToDelete(props.message?.uuid)">
        <div v-if="props.message?.message && !props.message?.images.length"
            @click.stop="contextMenu($event, props.message?.uuid)" class="chat__message" :class="[
                authStore.getAuthUser().id === props.message?.sender.id
                    ? 'sender'
                    : 'receiver',
            ]">
            <p v-if="props.message?.replyMessage" class="chat__quote">{{ props.message?.replyMessage }}</p>
            <p class="chat-message-text">
                {{ props.message?.message }}
            </p>
        </div>
        <div @click.stop v-if="props.message?.images && props.message?.images.length" class="chat__message-image-container"
            :class="[
                authStore.getAuthUser().id === props.message?.sender.id
                    ? 'sender-images'
                    : 'receiver-images',
                props.message?.images.length <= 4
                    ? `pictures${props.message?.images.length}`
                    : 'picturesSlider',
            ]">
            <template v-for="(image, index) in props.message?.images" :key="image.id">
                <BaseLightBox :index="index" :imagesLength="props.message?.images.length" :images="props.message?.images">
                    <template #image="{ show }">
                        <div v-if="index < 5" :id="`image${index + 1}`" @click.stop="show" class="chat__message-image">
                            <img :style="index + 1 === 5 && props.message?.images.length + 1 > 5
                                ? 'opacity: 0.2; z-index: 1;'
                                : 'opacity: 1'
                                " v-lazyload :data-src="`/${image.preview}`" />
                            <div v-if="index + 1 === 5 && props.message?.images.length + 1 > 5"
                                class="chat__message-image-quantity">
                                <h3>+{{ props.message?.images.length - 5 }}</h3>
                            </div>
                        </div>
                    </template>
                </BaseLightBox>
            </template>
            <p class="chat-message-image-text">
                {{ props.message?.message }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { vLazyload } from "@/directives/lazyload";
import BaseLightBox from '@/components/UI/BaseLightBox.vue';
import { ref } from "vue";
import { useChatStore } from "@/stores/chatStore";
import { useAuthStore } from "@/stores/authStore";

const message = ref();
const chatStore = useChatStore();
const authStore = useAuthStore();

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
});
const emit = defineEmits(["contextMenu"]);
</script>

<style lang="scss" scoped>
.chat__message-content {
    display: flex;
    flex-direction: column-reverse;
    padding: 5px 0;

    .chat__message-image-container {
        position: relative;
        gap: 10px;
        margin-right: 10px;
        box-shadow: 0px 0px 3px 0px #b9b9b9;
        padding: 10px;
        background-color: #fff;
        border-radius: 10px;

        .chat-message-image-text {
            float: right;
        }

        .chat__message-image {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 10px;
            }
        }

        .chat__message-image-quantity {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            color: rgb(51, 51, 51);
        }
    }

    .sender-files,
    .sender-images {
        align-self: flex-end;
        margin-left: 50px;
    }

    .receiver-files,
    .receiver-images {
        align-self: flex-start;
        margin-right: 50px;
    }

    .pictures1 {
        max-width: 500px;
    }

    .pictures2 {
        max-width: 500px;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .pictures3 {
        max-width: 500px;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .pictures3>#image1 {
        max-height: 400px;
        grid-column: 1 /2;
        grid-row: 1 / 3;
    }

    .pictures3>#image2 {
        max-height: 195px;
        grid-column: 2 /3;
    }

    .pictures3>#image3 {
        max-height: 195px;
        grid-column: 2 /3;
        grid-row: 2 / 3;
    }

    .pictures4 {
        max-width: 500px;
        display: grid;
        grid-template-columns: 1.5fr 1fr;
    }

    .pictures4>#image1 {
        max-height: 320px;
        grid-column: 1 /2;
        grid-row: 1 / 4;
    }

    .pictures4>#image2 {
        max-height: 100px;
        grid-column: 2 /3;
        grid-row: 1 / 2;
    }

    .pictures4>#image3 {
        max-height: 100px;
        grid-column: 2 /3;
        grid-row: 2 / 3;
    }

    .pictures4>#image4 {
        max-height: 100px;
        grid-column: 2 /3;
        grid-row: 3 / 4;
    }

    .picturesSlider {
        max-width: 500px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    .picturesSlider>#image1 {
        max-height: 340px;
        grid-column: 1 / -1;
        grid-row: 1 / 3;
    }

    .picturesSlider>#image2 {
        max-height: 110px;
        grid-row: 3;
        grid-column: 1 / 2;
    }

    .picturesSlider>#image3 {
        max-height: 110px;
        grid-row: 3;
        grid-column: 2 / 3;
    }

    .picturesSlider>#image4 {
        max-height: 110px;
        grid-row: 3;
        grid-column: 3 / 4;
    }

    .picturesSlider>#image5 {
        max-height: 110px;
        grid-row: 3;
        grid-column: 4 / 5;
    }

    .chat__quote {
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
