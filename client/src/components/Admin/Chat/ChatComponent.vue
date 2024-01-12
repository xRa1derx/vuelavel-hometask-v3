<template>
    <section class="chat-wrapper">
        <div class="chat-header">{{ student.name }}</div>
        <ChatMessagesComponent :student="student"></ChatMessagesComponent>
        <ChatTextareaComponent></ChatTextareaComponent>
    </section>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ChatMessagesComponent from "@/components/Admin/Chat/ChatMessagesComponent.vue";
import ChatTextareaComponent from "@/components/Admin/Chat/ChatTextareaComponent.vue";

interface Student {
    name: string;
}

const route = useRoute();
const student = ref<Student>({ name: "" });
onMounted(() => getUser());

function getUser() {
    axios
        .get(`/api/admin/user/${route.params.id}`)
        .then((res) => (student.value = res.data));
}
</script>

<style lang="scss" scoped>
.chat-wrapper {
    // position: absolute;
    // left: 0;
    // top: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    gap: 10px;
    padding: 10px 0;
}
</style>
