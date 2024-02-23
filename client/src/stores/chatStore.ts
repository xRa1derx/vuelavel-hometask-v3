import axios from 'axios';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export const useChatStore = defineStore('chatStore', () => {

    interface Data {
        chat: { message: String },
        unshift: any,
        filter: any,
        reduce: any,
    }

    interface editAction {
        uuid: string[],
        action: null | string,
        initialText: null | string,
    }

    interface deleteAction {
        uuid: string[],
        action: null | string,
    }

    const chat = ref<Data>();
    const isModal = ref(false);
    const message = ref({ text: '', uuid: '' });
    const editActionsWithMessage = ref<editAction>({ uuid: [], action: null, initialText: null });
    const deleteActionsWithMessage = ref<deleteAction>({ action: null, uuid: [] });
    const route = useRoute();

    const openModal = (action: string | null = null, uuid: string | null = null) => {
        isModal.value = true;
        if (action === 'delete') {
            deleteActionsWithMessage.value.action = 'delete';
            setMessageAction(action, uuid);
        }
    }

    const closeModal = () => {
        if (deleteActionsWithMessage.value.action === 'delete') {
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

    const editMessage = (messageText: string) => {


        chat.value?.filter((message: any) => {
            if (message.uuid === editActionsWithMessage.value.uuid[0]) {
                message.message = messageText;
            }
        });
        resetSelectedMessages();
        resetEditingMessage();
        // if (quote.value && quote.value.uuid === messageId) {
        //     quote.value = {};
        // }
    }

    const deleteMessage = () => {
        deleteActionsWithMessage.value.uuid.forEach(eUuid => {
            axios.delete(`/api/chat/${eUuid}`).then(uuid => {
                chat.value = chat.value?.filter(
                    (message: any) => message.uuid != uuid.data
                );
            });
            setMessageAction(); // null?
        })
        closeModal();
    }

    const setMessage = (text: string, uuid: string) => {
        message.value.text = text;
        message.value.uuid = uuid;
    };

    const setMessageAction = (action: null | string = null, uuid: string | null = null) => {
        if (uuid === null) {
            resetSelectedMessages();
        } else if (action === 'massDelete') {
            deleteActionsWithMessage.value.action = 'massDelete';
            if (!deleteActionsWithMessage.value.uuid.includes(uuid)) {
                deleteActionsWithMessage.value.uuid.push(uuid);
            } else {
                deleteActionsWithMessage.value.uuid.splice(deleteActionsWithMessage.value.uuid.indexOf(uuid), 1);
            }
        } else if (action === 'delete') {
            deleteActionsWithMessage.value.uuid = [];
            deleteActionsWithMessage.value.uuid.push(uuid);
        } else if (action === 'edit') {
            editActionsWithMessage.value.uuid = [];
            editActionsWithMessage.value.initialText = message.value.text;
            editActionsWithMessage.value.uuid.push(uuid);
            editActionsWithMessage.value.action = 'edit';
        }
    }

    const resetSelectedMessages = () => {
        const btn = document.querySelectorAll<HTMLElement>('.chat__message-content');
        [...btn].forEach(e => {
            if (e.classList.contains('selected')) {
                e.classList.remove('selected')
            }
        })
        deleteActionsWithMessage.value = { uuid: [], action: null };
    }

    const resetEditingMessage = () => {
        editActionsWithMessage.value = { initialText: null, action: null, uuid: [] };
    }

    watch(() => deleteActionsWithMessage, () => {
        if (deleteActionsWithMessage.value.uuid.length === 0 && deleteActionsWithMessage.value.action === 'massDelete') {
            deleteActionsWithMessage.value.action = null;
        }

        const btn = document.querySelector<HTMLElement>('.textarea__chat-mass-del-btn');
        if (btn) {
            if (deleteActionsWithMessage.value.action === 'massDelete') {
                btn!.style.width = '40px';
                btn!.style.marginLeft = '5px';
            } else {
                btn!.style.width = '0px';
                btn!.style.marginLeft = '0px';
            }
        }
    }, { deep: true });

    watch(route, () => {
        resetSelectedMessages();
        resetEditingMessage();
    });

    return {
        getChatData,
        getChat,
        addMessage,
        deleteMessage,
        setMessageAction,
        getModalState,
        closeModal,
        openModal,
        setMessage,
        editMessage,
        resetEditingMessage,
        message,
        editActionsWithMessage,
        deleteActionsWithMessage
    };
});