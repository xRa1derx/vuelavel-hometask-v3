<template>
    <transition name="errors" mode="out-in">
        <label v-if="errors?.length" class="error" for="title"
            ><slot name="error"></slot
        ></label>
        <slot v-else name="default"></slot>
    </transition>
</template>

<script setup lang="ts">
defineProps({ errors: { type: Array } });
</script>

<style lang="scss" scoped>
.error {
    color: $attention;
    font-size: 16px;
}
</style>
