<template>
    <BaseModal @closeModal="emit('closeModal')">
        <template #header>
        </template>
        <template #body>
            <h4 class="title">Оставьте свой номер телефона и я позвоню Вам</h4>
            <div class="form-group">
                <div v-if="errors.name" class="errors">{{ errors.name[0] }}</div>
                <label v-else for="name">Ваше имя</label>
                <input @focus="reset('name')" :class="{ '--input-error': errors.name }" type="text" id="name"
                    v-model="name">
            </div>
            <div class="form-group">
                <div v-if="errors.phone" class="errors">{{ errors.phone[0] }}</div>
                <label v-else for="phone">Телефон</label>
                <input @keypress="mask($event)" @focus="reset('phone')" :class="{ '--input-error': errors.phone }"
                    type="text" id="phone" v-model="phone">
            </div>
            <div class="form-group">
                <label for="city">Город</label>
                <input type="text" id="city" v-model="city">
            </div>
            <div class="form-group">
                <label for="time">Удобное время для звонка</label>
                <div>
                    <select class="time" v-model="time">
                        <option v-for="time in callTime" :key="time.id" name="" id="">{{ time.time }}</option>
                    </select>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="form-group">
                <button class="mail-btn btn" @click="sendEmail()">Ok</button>
            </div>
        </template>
    </BaseModal>
</template>
<script setup lang="ts">
import BaseModal from "./UI/BaseModal.vue";
import axios from "axios";
import { ref } from "vue";



const errors = ref<any>({ name: '', phone: '' });
const name = ref<string>('');
const phone = ref<string>('+7 ');
const city = ref<string>('');
const time = ref<string>('с 17:00 до 22:00');
const callTime = ref<any>([
    {
        id: 1,
        time: 'с 17:00 до 22:00'
    }, {
        id: 2,
        time: 'с 12:00 до 17:00'
    }, {
        id: 3,
        time: 'с 7:00 до 12:00'
    }
]);
function sendEmail() {
    axios.post('/api/sendMail', {
        name: name.value,
        phone: phone.value,
        time: time.value,
        city: city.value
    }).then(() => emit('closeModal')).
        catch(err => {
            errors.value = err.response.data.errors
        })
}

function reset(errorName: any) {
    errors.value[errorName] = '';
}

function mask(event: KeyboardEvent): void {
    const keysAllowed: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const keyPressed: string = event.key;

    if (!keysAllowed.includes(keyPressed)) {
        event.preventDefault();
    }
    let matrix = "+7 (___) ___-__-_",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = phone.value.replace(/\D/g, "");
    if (def.length >= val.length) {
        val = def;
    }
    phone.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });
}

const emit = defineEmits<{
    (e: 'closeModal'): void;
}>();
</script>

<style lang="scss" scoped>
.title {
    color: #fff;
    font-weight: 300;
}

.form-group {
    padding: 0.5rem 0;
    position: relative;

    label {
        color: $muted;
    }

    input {
        width: 100%;
    }

    .mail-btn {
        position: relative;
        font-size: 18px;
        float: right;
    }
}

.time {
    border: none;
    border-radius: 3px;
}

.errors {
    color: $attention;
    font-size: 14px;
}

.--input-error {
    box-shadow: 0 0 7px 1px $attention;
}
</style>
