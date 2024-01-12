<template>
    <section class="chat-sidebar">
        <div v-for="student in students">
            <router-link
                :to="{
                    name: 'admin.chat.id',
                    params: { id: student.id },
                }"
                >{{ student.name }}</router-link
            >
        </div>
    </section>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";

interface Students {
    student: { name: string; id: number };
}
const students = ref<Students>();

onMounted(() => getUsers());

function getUsers() {
    axios.get("/api/admin/users").then((res) => (students.value = res.data));
}
</script>

<style lang="scss" scoped>
.chat-sidebar {
    display: flex;
    flex-direction: column;
}
</style>
