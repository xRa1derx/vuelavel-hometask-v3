import axios from 'axios';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export const useChatStore = defineStore('chatStore', () => {

    interface Data {
        chat: { message: String };
        unshift: any;
        filter: any;
        reduce: any;
    }

    interface Action {
        uuid: string[],
        action: null | string
    }

    const chat = ref<Data>();
    const isModal = ref(false);
    const actionWithMessage = ref<Action>({ uuid: [], action: null });
    const route = useRoute();

    const openModal = (action: string | null = null, uuid: string | null = null) => {
        isModal.value = true;
        if (action === 'delete') {
            setMessageAction(action, uuid);
        }
    }

    const closeModal = () => {
        if (actionWithMessage.value.action === 'delete') {
            setMessageAction();
        }
        isModal.value = false;
    }
    const getModalState = () => {
        return isModal.value;
    }

    const getChat = async (routeId: number, authStoreUserId: number) => {
        await axios.get(`/api/chat/${routeId || authStoreUserId}`).then(res => {
            chat.value = res.data;
        });
    }

    const getChatData = () => {
        return chat.value;
    }

    const addMessage = (data: object) => {
        chat.value?.unshift(data);
        resetSelectedMessages();
    }

    const deleteMessage = () => {
        getMessageAction().uuid.forEach(eUuid => {
            axios.delete(`/api/chat/${eUuid}`).then(uuid => {
                chat.value = chat.value?.filter(
                    (message: any) => message.uuid != uuid.data
                );
            });
            setMessageAction(); // null?
        })
        closeModal();
    }

    const getMessageAction = () => {
        return actionWithMessage.value;
    }

    const setMessageAction = (action: null | string = null, uuid: string | null = null) => {
        if (uuid === null) {
            resetSelectedMessages();
        } else if (action === 'massDelete') {
            if (!actionWithMessage.value.uuid.includes(uuid)) {
                actionWithMessage.value.uuid.push(uuid);
            } else {
                actionWithMessage.value.uuid.splice(actionWithMessage.value.uuid.indexOf(uuid), 1);
            }
        } else {
            actionWithMessage.value.uuid = [];
            actionWithMessage.value.uuid.push(uuid);
        }
        actionWithMessage.value.action = action;
    }

    const resetSelectedMessages = () => {
        const btn = document.querySelectorAll<HTMLElement>('.chat__message-content');
        [...btn].forEach(e => {
            if (e.classList.contains('selected')) {
                e.classList.remove('selected')
            }
        })
        actionWithMessage.value.action = null;
        actionWithMessage.value.uuid = [];
    }

    watch(() => actionWithMessage, () => {
        if (actionWithMessage.value.uuid.length === 0) {
            actionWithMessage.value.action = null;
        }

        const btn = document.querySelector<HTMLElement>('.textarea__chat-mass-del-btn');
        if (btn) {
            if (actionWithMessage.value.action === 'massDelete') {
                btn!.style.width = '40px';
                btn!.style.marginRight = '5px';
            } else {
                btn!.style.width = '0px';
                btn!.style.marginRight = '0px';
            }
        }
    }, { deep: true })

    watch(route, () => {
        actionWithMessage.value.action = null;
        actionWithMessage.value.uuid = [];
    });

    return { getChatData, getChat, addMessage, deleteMessage, setMessageAction, getMessageAction, getModalState, closeModal, openModal, actionWithMessage };
});