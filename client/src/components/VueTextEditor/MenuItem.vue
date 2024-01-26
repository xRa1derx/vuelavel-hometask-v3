<template>
    <button
        class="menu-item"
        :class="{ 'is-active': isActive ? isActive() : null }"
        @click="action()"
        :title="title"
    >
        <img :src="`/assets/tip-tap-icons/${props.icon}`" alt="" />
    </button>
</template>

<script setup lang="ts">

const props = defineProps({
    icon: {
        type: String,
        required: true,
        default: "",
    },
    title: {
        type: String,
        required: true,
        default: "",
    },
    action: {
        type: Function,
        required: true,
        default: () => {},
    },

    isActive: {
        type: Function,
        default: null,
    },
});
</script>

<style lang="scss" scoped>
.menu-item {
    &.is-active,
    &:hover {
        background-color: #303030;
    }
}
</style>
