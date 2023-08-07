import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, watch } from 'vue';

export type AuthState = {
    id: number,
    username: string;
    isAuth: boolean;
    isAdmin: boolean;
};

export const useAuthStore = defineStore('authStore', () => {

    const user = ref<AuthState>({
        id: null,
        username: '',
        isAuth: false,
        isAdmin: false
    });

    const userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
        user.value = JSON.parse(userLocalStorage)._value;
    }

    const login = async (email: string, password: string) => {
        await axios.get("/sanctum/csrf-cookie").then(() => {
            const result = axios.post("/login", { email, password }).then(({ data }) => {
                user.value.id = data.id;
                user.value.username = data.name;
                user.value.isAuth = true;
            });
            return result;
        });
    };

    watch(() => user, (state) => {
        if (state.value.isAuth === true){
            localStorage.setItem('user', JSON.stringify(state));
        }
    }, { deep: true });

    return { login, user };
});