import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatStore = defineStore('chatStore', () => {

    interface Data {
        chat: { message: String };
        unshift: any;
        filter: any
    }

    interface Action {
        uuid: null | string,
        action: null | string
    }

    const chat = ref<Data>();
    const actionWithMessage = ref<Action>({ uuid: null, action: null });

    const getChat = async (routeId: number, authStoreUserId: number) => {
        await axios.get(`/api/chat/${routeId || authStoreUserId}`).then(res => {
            chat.value = res.data;
        });
    }

    const addMessage = (data: object) => {
        chat.value?.unshift(data);
    }

    const deleteMessage = (uuid: string) => {
        chat.value = chat.value?.filter(
            (message: any) => message.uuid != uuid
        );
    }

    const getMessageAction = () => {
        return actionWithMessage.value;
    }

    const setMessageAction = (uuid: string, action: string) => {
        actionWithMessage.value.uuid = uuid;
        actionWithMessage.value.action = action;
    }

    const getChatData = () => {
        return chat.value;
    }

    return { getChatData, getChat, addMessage, deleteMessage, setMessageAction, getMessageAction, actionWithMessage };
});