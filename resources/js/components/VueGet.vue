<template>
    <div>{{ data }}</div>
</template>

<script>
import TheHeader from "../components/TheHeader.vue";
import axios from "axios";
export default {
    components: { TheHeader },
    data() {
        return {
            data: "",
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            axios.get("/api/dashboard").then((res) => (this.data = res.data));
        },
    },
};
</script>

<style></style>
