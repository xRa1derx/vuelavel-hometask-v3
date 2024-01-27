<template>
    <div class="chat" ref="chatWrap">
        <div class="chat__messages" v-for="(messages, date) in sortedChatByDate" :key="messages[0].id">
            <ChatMessageComponent :messages="messages" :date="date" :authStoreUserId="authStoreUserId"
                @context-menu="contextMenu"></ChatMessageComponent>
        </div>
        <ChatContextMenu :clientX="clientX" :clientY="clientY" v-if="isContextMenu"></ChatContextMenu>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import ChatMessageComponent from './ChatMessageComponent.vue';
import ChatContextMenu from './ChatContextMenu.vue'

interface Data {
    chat: { message: String };
}

const chat = ref<Data>();
const isContextMenu = ref(false);
const clientX = ref(0);
const clientY = ref(0);
const chatWrap = ref();

onMounted(() => getChat());

function getChat() {
    axios.get(`/api/chat/${props.routeId || props.authStoreUserId}`).then(res => {
        console.log(res.data);
        chat.value = res.data;
    });
}

function contextMenu(event: any) {
    isContextMenu.value = !isContextMenu.value;
    setPositionToContextMenu(event);

}

function setPositionToContextMenu(event: any) {
    let halfScreenX = document.documentElement.clientWidth / 2;
    let halfScreenY = document.documentElement.clientHeight / 2;

    // считаем правую часть от чата с паддингами
    let rightSide = window.innerWidth - chatWrap.value.clientWidth - chatWrap.value.offsetLeft - 24;

    if (halfScreenX < event.pageX) {
        clientX.value = Math.floor(event.clientX - chatWrap.value.offsetLeft - rightSide / 2) - 130;
    } else {
        clientX.value = Math.floor(event.clientX - chatWrap.value.offsetLeft - rightSide / 2) + 20;
    }

    if (halfScreenY < event.clientY) {
        clientY.value = event.clientY + chatWrap.value.scrollTop - 280;

    } else {
        clientY.value = event.clientY + chatWrap.value.scrollTop - 120;
    }
};

function getFullDate(msg: any) {
    let date = msg.created_at.slice(0, 16).replace("T", " ");
    let t = date.split(/[- :]/);
    let time = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4]));
    return time;
};

const sortedChatByDate = computed(() => {
    const res = chat.value?.reduce((acc, message) => {
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
    authStoreUserId: { type: Number, required: true }
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
    /* flex-flow: column-reverse; */
    gap: 20px;
    overflow: auto;
    overflow-x: hidden;
    background-color: #eee;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
}
</style>
