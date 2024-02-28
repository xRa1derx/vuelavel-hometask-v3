import axios from "axios";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

export const useChatStore = defineStore("chatStore", () => {
    interface Data {
        chat: { message: String };
        unshift: any;
        filter: any;
        reduce: any;
    }

    interface replyAction {
        replyMessage: string;
        uuid: string;
        action: null | string;
    }

    interface editAction {
        uuid: string;
        action: null | string;
        initialText: string;
    }

    interface deleteAction {
        uuid: null | string[];
        action: null | string;
    }

    const chat = ref<Data>();
    const isModal = ref(false);
    const textarea = ref("");
    const selectedMessage = ref({ text: "", uuid: "" });
    const replyActionsWithMessage = ref<replyAction>({
        replyMessage: "",
        uuid: "",
        action: null,
    });
    const editActionsWithMessage = ref<editAction>({
        uuid: "",
        action: null,
        initialText: "",
    });
    const singleDeleteMessage = ref<deleteAction>({ action: null, uuid: null });
    const massDeleteMessage = ref<deleteAction>({
        action: null,
        uuid: null,
    });
    const route = useRoute();

    const openModal = (action: string | null = null) => {
        isModal.value = true;
        if (action === "delete") {
            singleDeleteMessage.value.action = "delete";
            setMessageAction(action, selectedMessage.value.uuid);
        }
    };

    const closeModal = () => {
        singleDeleteMessage.value = { action: null, uuid: null };
        isModal.value = false;
    };

    const getModalState = () => {
        return isModal.value;
    };

    const getChat = async (routeId: number, authStoreUserId: number) => {
        await axios
            .get(`/api/chat/${routeId || authStoreUserId}`)
            .then((res) => {
                chat.value = res.data;
            });
    };

    const getChatData = () => {
        return chat.value;
    };

    const addMessage = (data: object) => {
        chat.value?.unshift(data);
        resetReplyMessage();
        resetSelectedMessages();
    };

    const editMessage = (messageText: string) => {
        chat.value?.filter((message: any) => {
            if (message.uuid === editActionsWithMessage.value.uuid) {
                message.message = messageText;
            }
        });
        // resetSelectedMessages();
        resetEditingMessage();
        // if (quote.value && quote.value.uuid === messageId) {
        //     quote.value = {};
        // }
    };

    const deleteMessage = () => {
        let singleOrMassDelete =
            singleDeleteMessage.value.uuid ||
            massDeleteMessage.value.uuid;

        singleOrMassDelete?.forEach((eUuid) => {
            axios.delete(`/api/chat/${eUuid}`).then((uuid) => {
                chat.value = chat.value?.filter(
                    (message: any) => message.uuid != uuid.data
                );
            });
            if (eUuid === editActionsWithMessage.value.uuid) {
                console.log('here');
                resetEditingMessage();
            }
        });
        resetSelectedMessages();
        closeModal();
    };

    const setMessage = (text: string, uuid: string) => {
        selectedMessage.value.text = text;
        selectedMessage.value.uuid = uuid;
    };

    const setMessageAction = (action: null | string = null, uuid: string) => {
        // if (uuid === null) {
        //     resetSelectedMessages();
        // } else
        if (action === "massDelete") {
            massDeleteMessage.value.action = "massDelete";
            if (!massDeleteMessage.value?.uuid) {
                massDeleteMessage.value.uuid = [];
            }
            if (!massDeleteMessage.value.uuid?.includes(uuid)) {
                massDeleteMessage.value.uuid?.push(uuid);
            } else {
                massDeleteMessage.value.uuid.splice(
                    massDeleteMessage.value.uuid.indexOf(uuid),
                    1
                );
            }
        } else if (action === "delete") {
            singleDeleteMessage.value.uuid = [];
            singleDeleteMessage.value.uuid.push(uuid);
        } else if (action === "edit") {
            resetReplyMessage();
            editActionsWithMessage.value.uuid = "";
            editActionsWithMessage.value.initialText =
                selectedMessage.value.text;
            editActionsWithMessage.value.uuid = uuid;
            editActionsWithMessage.value.action = "edit";
        } else if (action === "reply") {
            resetEditingMessage();
            replyActionsWithMessage.value = {
                replyMessage: selectedMessage.value.text,
                uuid,
                action,
            };
        }
    };

    const resetSelectedMessages = () => {
        const btn = document.querySelectorAll<HTMLElement>(
            ".chat__message-content"
        );
        [...btn].forEach((e) => {
            if (e.classList.contains("selected")) {
                e.classList.remove("selected");
            }
        });
        massDeleteMessage.value = { uuid: null, action: null };
    };

    const resetEditingMessage = () => {
        editActionsWithMessage.value = {
            initialText: "",
            action: null,
            uuid: "",
        };
        textarea.value = "";
    };

    const resetReplyMessage = () => {
        replyActionsWithMessage.value = {
            replyMessage: "",
            uuid: "",
            action: null,
        };
    };

    watch(
        () => massDeleteMessage,
        () => {
            if (
                !massDeleteMessage.value.uuid?.length &&
                massDeleteMessage.value.action === "massDelete"
            ) {
                massDeleteMessage.value.action = null;
                massDeleteMessage.value.uuid = null;
            }

            const btn = document.querySelector<HTMLElement>(
                ".textarea__chat-mass-del-btn"
            );
            if (btn) {
                if (massDeleteMessage.value.action === "massDelete") {
                    btn!.style.width = "60px";
                    btn!.style.marginLeft = "5px";
                } else {
                    btn!.style.width = "0px";
                    btn!.style.marginLeft = "0px";
                }
            }
        },
        { deep: true }
    );

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
        resetReplyMessage,
        textarea,
        selectedMessage,
        replyActionsWithMessage,
        editActionsWithMessage,
        singleDeleteMessage,
        massDeleteMessage,
    };
});
