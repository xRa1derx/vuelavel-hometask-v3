<template>
    <router-link
        :to="{ name: 'get.index' }"
        class="btn"
        style="border: 1px solid #000; color: black"
        >Get</router-link
    >
    <router-view></router-view>
</template>

<script>
export default {};
</script>

<style scoped></style>
