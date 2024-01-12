<template>
    <div class="admin-page__post-container">
        <BlogPostsComponent>
            <template #edit="slotProps">
                <RouterLink
                    class="blog-post__post-link"
                    :to="{
                        name: 'admin.post.edit',
                        params: { id: slotProps.postId },
                    }"
                    ><img
                        class="blog-post__post-link-image"
                        src="/assets/images/edit.svg"
                        alt=""
                /></RouterLink>
            </template>
        </BlogPostsComponent>
    </div>
</template>

<script setup lang="ts">
import BlogPostsComponent from "@/components/Blog/BlogPostsComponent.vue";
// import { ref } from "vue";

// interface Pagination {
//     total: number;
//     current_page: number;
//     last_page: number;
//     prev_page_url: string;
//     next_page_url: string;
// }

// const pagination = ref<Pagination>({
//     total: 0,
//     current_page: 0,
//     last_page: 0,
//     prev_page_url: "",
//     next_page_url: "",
// });

// function paginationData(val: Pagination) {
//     pagination.value = val;
// }
</script>

<style lang="scss" scoped>
.admin-page__post-container {
    overflow: auto;
    height: 100%;
    .blog-post__post-link{
        align-self: center;
        flex: 0 0 15px;
        height: 15px;
        margin: 0.8rem;
    }
}
</style>
