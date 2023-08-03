<template>
    <div class="login">
        <div class="modal login__wrapper">
            <div class="overlay" @click="emit('closeLogin')"></div>
            <div class="modal__body">
                <transition name="errors">
                    <div class="errors" v-if="errors.value != ''">
                        <div v-for="(error, index) in errors" :key="index">
                            {{ error[0] }}
                        </div>
                    </div>
                </transition>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" v-model="email" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" v-model="password" />
                </div>
                <div class="form-group">
                    <button class="login-btn btn" @click="login()" v-if="isLoading === false">Login</button>
                    <div class="login-spinner" :class="{ activated: isLoading }"></div>
                </div>
                <!-- <router-link :to="{ name: 'admin' }">Get</router-link> -->

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

interface Props {
    isLoginOpen: boolean,
}

const email = ref<string>('');
const password = ref<string>('');
const errors = ref<any>({ value: '' });
const isLoading = ref<boolean>(false);

const login = () => {
    isLoading.value = true;
    axios.get("/sanctum/csrf-cookie").then(() => {
        axios
            .post("/login", { email: email.value, password: password.value })
            .then(() => { isLoading.value = false; emit('closeLogin') })
            .catch((err) => errors.value = err.response.data.errors
            ).finally(() => isLoading.value = false);
    });
};
const emit = defineEmits<{
    (e: 'closeLogin'): void;
}>();
defineProps<Props>();
</script>

<style lang="scss">
.login {
    z-index: 1;

    .login__wrapper {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .modal {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

        .modal__body {
            position: relative;
            background-color: $bg-dark;
            width: 300px;
            padding: 15px 35px;
            border-radius: 20px;
            font-size: 18px;
            z-index: 1;

            .errors {
                color: $attention;
                font-size: 16px;
                padding: 1rem 0;

                div {
                    padding: 0.5rem 0;
                }

                div:nth-child(2) {
                    border-top: 1px solid $muted;
                }
            }

            .form-group {
                padding: 0.5rem 0;
                position: relative;

                label {
                    color: $muted;
                }

                input {
                    width: 100%;
                }

                .login-btn {
                    position: relative;
                    font-size: 18px;
                    float: right;
                }

                .login-spinner {
                    position: absolute;
                    right: 30px;
                    top: 12px;
                    width: 15px;
                    height: 15px;
                    border-radius: 50%;
                    background-color: #fff;
                    z-index: -1;
                    // transition: all 0.1s ease-out;
                }

                .activated {
                    animation: bumping 0.1s ease infinite alternate;
                }

                @keyframes bumping {
                    0% {
                        top: 14px;
                        width: 16px;
                        height: 14px;
                    }

                    100% {
                        top: -8px;
                        width: 16px;
                        height: 14px;
                    }
                }

            }


        }
    }
}


// animations
.errors-enter-from {
    opacity: 0;
    transform: scale(1.5);
}

.errors-enter-active {
    transition: all 0.2s ease-in;
}

.errors-leave-active {
    transition: all 0.3s ease-in-out;
}

.errors-leave-to {
    opacity: 0;
    transform: scale(0);
}
</style>
