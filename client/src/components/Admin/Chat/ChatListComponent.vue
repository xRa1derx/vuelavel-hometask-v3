<template>
    <div class="chat" ref="chatBlock">
        <div class="chat__messages" v-for="(messages, date) in sortedChatByDate" :key="messages[0].id">
            <ChatDayComponent :messages="messages" :date="date" :authStoreUserId="authStoreUserId"
                @context-menu="contextMenu"></ChatDayComponent>
        </div>
        <ChatContextMenu :clientX="clientX" :clientY="clientY" v-if="isContextMenu.isActive" :isContextMenu="isContextMenu"
            v-clickoutside="closeContextMenu" @close-context-menu="closeContextMenu" @modal="messageDeleteModal()">
        </ChatContextMenu>
        <transition name="opacity">
            <BaseModal v-if="chatStore.getModalState()" @closeModal="chatStore.closeModal()">
                <template #header>
                    <p class="modal__text-delete">Вы действительно хотите удалить это сообщение?</p>
                </template>
                <template #body>
                    <div class="modal__del-buttons">
                        <button class="btn" @click="chatStore.deleteMessage(isContextMenu.uuid as string)">Да</button>
                        <button class="btn" @click="chatStore.closeModal()">Нет</button>
                    </div>
                </template>
            </BaseModal>
        </transition>
    </div>
</template>

<script setup lang="ts">

import { computed, onMounted, ref } from 'vue';
import ChatDayComponent from './ChatDayComponent.vue';
import ChatContextMenu from './ChatContextMenu.vue'
import BaseModal from '@/components/UI/BaseModal.vue';
import { vClickoutside } from "@/directives/clickoutside";
import { useChatStore } from '@/stores/chatStore'

interface ContextMenu {
    isActive: boolean,
    uuid: null | string
};

const chatStore = useChatStore();
const isContextMenu = ref<ContextMenu>({ isActive: false, uuid: null });
const clientX = ref(0);
const clientY = ref(0);
const chatBlock = ref();

onMounted(() => chatStore.getChat(props.routeId, props.authStoreUserId));

function messageDeleteModal() {
    chatStore.openModal('delete', isContextMenu.value.uuid);
    closeContextMenu();
}

function contextMenu(event: any, uuid: string) {
    isContextMenu.value.uuid = null; // reset context-menu uuid BEFORE
    chatStore.setMessageAction(isContextMenu.value.uuid); // reset mass delete uuid on click
    if (isContextMenu.value.isActive === false) {
        setPositionToContextMenu(event);
        isContextMenu.value.isActive = !isContextMenu.value.isActive;
    } else {
        setPositionToContextMenu(event);
    }
    isContextMenu.value.uuid = uuid;
}

function closeContextMenu() {
    isContextMenu.value.uuid = null;
    isContextMenu.value.isActive = !isContextMenu.value.isActive;
}

function setPositionToContextMenu(event: any) {
    let halfScreenX = document.documentElement.clientWidth / 2;
    let halfScreenY = document.documentElement.clientHeight / 2;

    const sidebarWidth = document.querySelector('.admin-page__sidebar')!.clientWidth;
    let leftRightMargins = window.innerWidth - (chatBlock.value.clientWidth + sidebarWidth);

    if (halfScreenX < event.pageX) {
        clientX.value = Math.floor(event.clientX - (leftRightMargins / 2 + sidebarWidth) - 130);
    } else {
        clientX.value = Math.floor(event.clientX - (leftRightMargins / 2 + sidebarWidth) + 10);
    }

    if (halfScreenY < event.clientY) {
        clientY.value = event.clientY + chatBlock.value.scrollTop - 280;
    } else {
        clientY.value = event.clientY + chatBlock.value.scrollTop - 120;
    }
};

function getFullDate(msg: any) {
    let date = msg.created_at.slice(0, 16).replace("T", " ");
    let t = date.split(/[- :]/);
    let time = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4]));
    return time;
};

const sortedChatByDate = computed(() => {
    const res = chatStore.getChatData()?.reduce((acc: any, message: object) => {
        const dayMonthYear = getFullDate(message)
            .toLocaleString()
            .slice(0, 10);
        acc[dayMonthYear] = acc[dayMonthYear] || [];
        acc[dayMonthYear].push(message);
        return acc;
    }, {});
    return res;
});

const props = defineProps({
    routeId: { type: Number, required: true },
    authStoreUserId: { type: Number, required: true },
});

</script>

<style lang="scss" scoped>
.modal__text-delete {
    color: #fff;
    margin-bottom: 1rem;
}

.modal__del-buttons {
    display: flex;
    justify-content: space-between;
}

.chat {
    display: flex;
    position: relative;
    height: 10%;
    flex: 1 0 auto;
    flex-direction: column-reverse;
    gap: 20px;
    overflow-x: hidden;
    background-color: #eee;
    border-radius: 10px;

    // overflow-y: auto;
    // width: 100%;
    // margin: auto;
    // overflow: auto;
}
</style>
