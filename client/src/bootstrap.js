window._ = require('lodash');
import router from './router';
import { useAuthStore } from './stores/authStore';

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;
window.axios.interceptors.response.use({}, err => {
    if (err.response.status === 401 || err.response.status === 419) {
        const userLocalStorage = localStorage.getItem('user');
        const authStore = useAuthStore();
        if (userLocalStorage) {
            localStorage.removeItem('user');
        }
        authStore.user = {
            id: null,
            username: '',
            isAuth: false,
            isAdmin: false
        };
        router.push('/');
    }

    return Promise.reject(err);
})