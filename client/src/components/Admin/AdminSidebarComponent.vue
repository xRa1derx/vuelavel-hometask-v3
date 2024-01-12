<template>
    <section class="admin-sidebar">
        <router-link :to="{ name: 'admin.posts' }">Posts</router-link>
        <router-link :to="{ name: 'admin.post.create' }"
            >Create new</router-link
        >
        <router-link :to="{ name: 'admin.categories' }">Categories</router-link>
        <router-link :to="{ name: 'admin.tags' }">Tags</router-link>
        <router-link :to="{ name: 'admin.comments' }">Comments</router-link>
        <router-link :to="{ name: 'admin.chat' }">Messages</router-link>
        <router-link :to="{ name: 'admin.students' }">Students</router-link>
    </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.admin-sidebar {
    display: flex;
    flex-direction: column;
}
</style>
