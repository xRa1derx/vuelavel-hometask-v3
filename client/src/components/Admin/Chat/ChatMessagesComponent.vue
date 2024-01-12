<template>
    <div class="chat">{{ student }}</div>
</template>

<script setup lang="ts">
const props = defineProps({
    student: { type: Object, require: true },
});
</script>

<style lang="scss" scoped>
.chat {
    width: 598px;
    margin: auto;
    position: relative;
    height: 10%;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column-reverse;
    /* flex-flow: column-reverse; */
    gap: 20px;
    overflow: auto;
    overflow-x: hidden;
    background-color: #eee;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
}
</style>
