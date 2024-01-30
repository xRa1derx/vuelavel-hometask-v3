import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatStore = defineStore('chatStore', () => {

    interface Data {
        chat: { message: String };
        unshift: any
    }

    const chat = ref<Data>();

    const getChat = async (routeId: number, authStoreUserId: number) => {
        await axios.get(`/api/chat/${routeId || authStoreUserId}`).then(res => {
            chat.value = res.data;
        });
    }

    const addMessage = async (data: object) => {
        chat.value?.unshift(data);
    }

    const getChatData = () => {
        return chat.value;
    }

    return { getChatData, getChat, addMessage };
});