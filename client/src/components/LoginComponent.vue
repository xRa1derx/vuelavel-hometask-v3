<template>
    <div class="login login__body">
        <BaseModal @closeModal="emit('closeLogin')" :cssStyle="cssStyle">
            <template #header>
                <transition name="errors">
                    <div class="errors" v-if="errors.value != ''">
                        <div v-for="(error, index) in errors" :key="index">
                            {{ error[0] }}
                        </div>
                    </div>
                </transition>
            </template>
            <template #body>
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
            </template>
        </BaseModal>
    </div>
</template>

<script setup lang="ts">
import BaseModal from '../components/BaseModal.vue';
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";

interface Props {
    isLoginOpen: boolean,
}

const email = ref<string>('');
const password = ref<string>('');
const errors = ref<any>({ value: '' });
const isLoading = ref<boolean>(false);
const authStore = useAuthStore();

const cssStyle = ref<object>();

const login = () => {
    isLoading.value = true;
    authStore.login(email.value, password.value)
        .then(() => {
            isLoading.value = false;
            emit('closeLogin');
        })
        .catch((err) =>
            errors.value = err.response.data.errors
        )
        .finally(() => isLoading.value = false);
};
const emit = defineEmits<{
    (e: 'closeLogin'): void;
}>();
defineProps<Props>();
</script>

<style scoped lang="scss">
.login {
    z-index: 1;
}

.login__body {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

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
        right: 42px;
        top: 19px;
        width: 6px;
        height: 9px;
        border-radius: 50%;
        background-color: #fff;
        z-index: -1;
    }

    .activated {
        animation: bumping 0.1s ease infinite alternate;
    }

    @keyframes bumping {
        0% {
            top: 24px;
            width: 9px;
            height: 6px;
        }

        100% {
            top: -9px;
            width: 9px;
            height: 6px;
        }
    }

}

</style>
