<template>
    <!-- <teleport to="body"> -->
    <div class="modal">
        <div class="overlay" @click="$emit('closeModal')"></div>
        <div class="modal__body" :style="cssStyle">
            <slot name="header"></slot>
            <slot name="body"></slot>
            <slot name="footer"></slot>
        </div>
    </div>
    <!-- </teleport> -->
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useBodyOverflowHidden } from "@/composables/bodyOverflowHidden";

onMounted(() => useBodyOverflowHidden());
onUnmounted(() => useBodyOverflowHidden());

export interface Props {
    cssStyle?: any
}

defineProps<Props>();
</script>

<style scoped lang="scss">
.modal {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 4;

    .modal__body {
        position: relative;
        background-color: $bg-grey;
        width: 300px;
        padding: 15px 35px;
        border-radius: 20px;
        font-size: 18px;
        z-index: 4;
        margin: 0 1rem;
    }
}
</style>
