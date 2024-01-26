<template>
    <template v-for="post in posts">
        <BlogPostComponent :post="post"
            ><template #edit="slotProps">
                <slot name="edit" :postId="slotProps.postId"></slot>
            </template>
            <template #textarea>
                <slot name="textarea"></slot>
            </template>
        </BlogPostComponent>
    </template>
</template>

<script setup lang="ts">
import BlogPostComponent from "@/components/Blog/BlogPostComponent.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

const emit = defineEmits(["paginationData"]);

interface Post {
    data: [];
    links: [];
    current_page: number;
}

const posts = ref<Post[]>();

onMounted(() => {
    getPosts();
    
});

function getPosts(page_url = "/api/posts") {
    axios
        .get(page_url)
        .then((res) => {
            posts.value = res.data.data;
            makePagination(res.data);
        })
        .catch((err) => console.log(err));
}

function makePagination(response: any) {
    let createPagination = {
        current_page: response.current_page,
        last_page: response.last_page,
        prev_page_url: response.prev_page_url,
        next_page_url: response.next_page_url,
        // current_page_url: `${response.path}?page=${response.current_page}`,
        total: response.total,
        // totalCountOnCurrentPage: response.data.length,
    };
    emit("paginationData", createPagination);
}
defineExpose({ getPosts });
</script>

<style lang="scss" scoped></style>
