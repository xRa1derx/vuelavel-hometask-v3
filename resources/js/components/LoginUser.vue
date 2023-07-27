<template>
    <div>
        <button @click="login()">Login</button>
    </div>
</template>

<script>
import axios from "axios";
export default {
    setup() {
        const login = () => {
            axios.get("/sanctum/csrf-cookie").then(() => {
                axios
                    .post("/login", { email: "user@mail.com", password: "123" })
                    .then((res) => console.log(res))
                    .catch((err) => err.response);
            });
        };
        return { login };
    },
};
</script>

<style lang="scss">
button {
    background-color: $accent;
    border-radius: math.div($base-border-radius, 1);
}
</style>
