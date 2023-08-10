<template>
    <div class="textarea">
        <div class="textarea-wrap">
            <div v-if="authStore.user.isAuth === true" class="textarea__username">
                {{ authStore.user.username }}:
            </div>
            <div v-else class="textarea__username">
                <button class="textarea__username-button">Guest</button>
            </div>

            <textarea class="textarea__body" ref="commentTextarea">
        </textarea>
            <button class="textarea__send-button">
                <img class="textarea__send-image" src="/assets/images/send-comment.svg" alt="">
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/authStore';
const authStore = useAuthStore();

</script>

<style lang="scss" scoped>
.textarea {
    .textarea-wrap {
        display: flex;
       
        max-width: 100%;
        justify-content: space-between;
        height: 30px;
        background-color: #fff;

        .textarea__username {
            margin-left: 0.8rem;
            align-self: center;
            color: $muted;

            .textarea__username-button {
                background-color: inherit;
                border: none;
                color: $accent-primary;
                padding: 0;
                font-size: 16px;
                font-weight: 700;
                text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                cursor: pointer;
            }
            .textarea__username-button:hover{
                text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.50);
                color: $accent-secondary;
            }
        }

        .textarea__body {
            max-height: 150px;
            width: 100%;
            border: none;
            resize: none;
            padding-left: 5px;
            margin: 0 0.5rem;
            color: #000;
        }

        .textarea__send-button {
            background-color: inherit;
            border: none;
            align-self: center;
            font-size: 20px;
            padding: 0;
            margin-right: 0.8rem;

            .textarea__send-image {
                width: 30px;
                height: 30px;
            }
        }


    }
}
</style>
