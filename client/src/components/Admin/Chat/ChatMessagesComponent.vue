<template>
    <div class="chat" ref="chatBlock">
        <div class="chat__messages" v-for="(messages, date) in sortedChatByDate" :key="messages[0].id">
            <ChatMessageComponent :messages="messages" :date="date" :authStoreUserId="authStoreUserId"
                @context-menu="contextMenu"></ChatMessageComponent>
        </div>
        <ChatContextMenu :clientX="clientX" :clientY="clientY" v-if="isContextMenu.isActive"
            v-clickoutside="closeContextMenu">
        </ChatContextMenu>
    </div>
</template>

<script setup lang="ts">

import { computed, onMounted, ref } from 'vue';
import ChatMessageComponent from './ChatMessageComponent.vue';
import ChatContextMenu from './ChatContextMenu.vue'
import { vClickoutside } from "@/directives/clickoutside";
import { useChatStore } from '@/stores/chatStore'

const chatStore = useChatStore();
const isContextMenu = ref({ isActive: false, id: null });
const clientX = ref(0);
const clientY = ref(0);
const chatBlock = ref();

onMounted(() => chatStore.getChat(props.routeId, props.authStoreUserId));

function contextMenu(event: any, id) {
    if (isContextMenu.value.isActive === false) {
        setPositionToContextMenu(event);
        isContextMenu.value.isActive = !isContextMenu.value.isActive;
    } else {
        setPositionToContextMenu(event);
    }
    isContextMenu.value.id = id;
}

function closeContextMenu() {
    if (isContextMenu.value.isActive) {
        isContextMenu.value.isActive = !isContextMenu.value.isActive;
    }
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
    const res = chatStore.getChatData()?.reduce((acc, message) => {
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
.chat {
    width: 100%;
    margin: auto;
    position: relative;
    height: 10%;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column-reverse;
    justify-content: start;
    /* flex-flow: column-reverse; */
    gap: 20px;
    overflow: auto;
    overflow-x: hidden;
    background-color: #eee;
    border-radius: 10px;

    .chat__messages {
        overflow-y: auto;
    }

}
</style>
