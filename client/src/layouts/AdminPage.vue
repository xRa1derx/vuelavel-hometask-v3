<template>
    <div>
        <router-link :to="{ name: 'get.index' }" class="btn" style="border: 1px solid #000; color: black">Get</router-link>
        <router-view v-slot="slotProps">
            <transition name="route" mode="out-in">
                <component :is="slotProps.Component"></component>
            </transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted } from 'vue';

onMounted(() => axios.get('/api/posts').then(res => console.log(res)
).catch(err => console.log(err)
))
</script>

<style scoped></style>
