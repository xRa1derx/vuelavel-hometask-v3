<template>
    <div class="chat">
        <div class="chat__messages" v-for="message in data">
            {{ message.message }}
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

interface Data {
    messages: { message: string };
}

const data = ref<Data>();
const currentReciever = ref();

onMounted(() => getChat());

function getChat() {
    axios.get(`/api/chat/${props.routeId || props.authStoreUserId}`).then(res => {
        console.log(res.data);

        data.value = res.data;
        currentReciever
    }
    )
}

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
