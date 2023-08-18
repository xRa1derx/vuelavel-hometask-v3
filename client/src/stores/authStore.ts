import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import axios from 'axios';

export type AuthState = {
    id: any,
    username: string;
    isAuth: boolean;
    isAdmin: boolean;
};

export const useAuthStore = defineStore('authStore', () => {


    const router = useRouter();
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
                console.log(data);

                user.value.id = data.id;
                user.value.username = data.name;
                user.value.isAuth = true;
                data.is_admin ? user.value.isAdmin = true : user.value.isAdmin = false;
                console.log(user.value);

                // router.push({ name: data.is_admin ? 'admin' : 'dashboard' });
            });
            return result;
        });
    };

    watch(() => user, (state) => {
        if (state.value.isAuth === true) {
            localStorage.setItem('user', JSON.stringify(state));
        }
    }, { deep: true });

    return { login, user };
});