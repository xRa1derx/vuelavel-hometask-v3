<template>
    <div v-if="isLoading" class="loading"><span class="dots">.</span><span class="dots">.</span><span class="dots">.</span>
    </div>

    <section v-else class="chat-sidebar">
        <button @click="$router.push({ name: 'admin' })" class="chat-sidebar__back-button">
            <img class="back-button-icon" src="/assets/images/arrow-back.png" alt="">
        </button>
        <div class="chat-sidebar__students" v-if="students">
            <div v-show="activeItem" id="marker" ref="marker"></div>
            <template v-for="student in students" :key="student.id">
                <router-link @click="selectStudent($event, student.id)" class="chat-sidebar__student"
                    :class="{ active: +$route.params.id === student.id && !activeItem }" :to="{
                        name: 'admin.chat.id',
                        params: { id: student.id },
                        query: { name: student.name },
                    }">{{ student.name }}</router-link>
            </template>
        </div>
        <div v-else>
            нет пользователей
        </div>
    </section>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";

interface Students {
    student: { name: string; id: number };
}

const students = ref<Students>();
const isLoading = ref(false);
const activeItem = ref(null);
const marker = ref();

onMounted(() => getUsers());

function getUsers() {
    isLoading.value = true;
    axios.get("/api/admin/users")
        .then((res) => students.value = res.data)
        .finally(() => isLoading.value = false);
}

function selectStudent(event, id) {
    activeItem.value = id;
    marker.value.style.top = event.target.offsetTop + 'px';
    marker.value.style.height = event.target.offsetHeight + 'px';
}

</script>

<style lang="scss" scoped>
.loading {
    font-family: sans-serif;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 40px;
    letter-spacing: -0.05em;
    font-weight: 500;
    color: #FF7600;
    background-color: #242424;
    transition: opacity 0.3s linear;
}

.chat-sidebar {
    margin-bottom: 1rem;

    .chat-sidebar__back-button {
        width: 50px;
        height: 50px;
        background-color: inherit;
        border: none;
        margin: auto;
    }

    .chat-sidebar__students {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 2rem;

        #marker {
            position: absolute;
            top: 0;
            width: 100%;
            transition: all 0.5s ease;
            background-color: #eee;
            border-radius: 100vw 0 0 100vw;
        }

        #marker::after,
        #marker::before {
            --border-radius: 1rem;
            content: '';
            position: absolute;
            width: var(--border-radius);
            height: var(--border-radius);
            right: 0;
            background-color: $bg-dark;
            border-radius: 100vw;
        }

        #marker::after {
            top: calc(var(--border-radius) * -1);
            border-radius: 0 0 100vw 0;
            box-shadow: 10px 10px 0 10px #eee;
        }

        #marker::before {
            bottom: calc(var(--border-radius) * -1);
            border-radius: 0 100vw 0 0;
            box-shadow: 10px -10px 0 10px #eee;
        }
    }

    .chat-sidebar__student {
        position: relative;
        padding: 0.4rem 0.5rem 0.4rem 1rem;
        display: block;
    }

    .active {
        background-color: #eee;
        border-radius: 100vw 0 0 100vw;
        width: 100%;
    }

    display: flex;
    flex-direction: column;
}

@media (min-width: 601px) {
    .chat-sidebar__students {
        max-width: 15rem;
        font-size: 1.4rem;
    }
}
</style>
