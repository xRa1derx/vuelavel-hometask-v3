<template>
    <div class="textarea-wrapper">
        <textarea @keyup.ctrl.enter="addMessage($event)" @keydown.tab.exact.prevent="tabLeft($event)" v-model="text"
            class="chat-textarea"></textarea>
        <button @click="addMessage">Отправить</button>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { v4 as uuidv4 } from "uuid";

const text = ref('');

function addMessage(event) {
    if (text.value.trim() !== ""
        //  || selectedFile.value != null
    ) {
        if (event.ctrlKey || event.type == "click") {
            const config = {
                "Content-Type": "multipart/form-data",
            };
            const uuid = uuidv4();
            // const replyMessage = props.quote.message || "";
            const message = text.value;
            const formData = new FormData();
            formData.append("uuid", uuid);
            formData.append("to", props.routeId || 1);
            formData.append("from", props.authStoreUserId);
            formData.append("message", message);
            // formData.append("replyMessage", replyMessage);
            axios.post(`/api/chat`, formData).then(res => console.log(res));
        }
        else {
            let caret = event.target.selectionStart;
            event.target.setRangeText("\n", caret, caret, "end");
            text.value = event.target.value;
        }
    }
}

function tabLeft(event) {
    let message = text.value;
    let originalSelectionStart = event.target.selectionStart,
        textStart = message.slice(0, originalSelectionStart),
        textEnd = message.slice(originalSelectionStart);

    text.value = `${textStart}\t${textEnd}`;
    event.target.value = text.value;
    event.target.selectionEnd = event.target.selectionStart =
        originalSelectionStart + 1;
};

const props = defineProps({
    routeId: { type: Number, required: true },
    authStoreUserId: { type: Number, required: true }
});

</script>

<style lang="scss" scoped>
.textarea-wrapper {
    width: 100%;
    display: flex;

    .chat-textarea {
        width: 100%;
    }
}
</style>
