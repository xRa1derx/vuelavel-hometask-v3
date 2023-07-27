<template>
    <div>{{ data }}</div>
</template>

<script>
import axios from "axios";
export default {
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
            axios.get("/api/get").then((res) => (this.data = res.data));
        },
    },
};
</script>

<style></style>
