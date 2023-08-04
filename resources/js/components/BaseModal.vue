<template>
    <div class="modal">
        <div class="overlay" @click="$emit('closeModal')"></div>
        <div class="modal__body">
            <slot name="header"></slot>
            <slot name="body"></slot>
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useBodyOverflowHidden } from "../composables/bodyOverflowHidden";

onMounted(() => useBodyOverflowHidden());
onUnmounted(() => useBodyOverflowHidden());
</script>

<style scoped lang="scss">
.modal {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal__body {
        position: relative;
        background-color: $bg-dark;
        width: 300px;
        padding: 15px 35px;
        border-radius: 20px;
        font-size: 18px;
        z-index: 1;
    }
}
</style>
