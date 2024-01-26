<template>
    <section class="admin-page admin-page__container">
        <div class="admin-page__sidebar-open-btn" @click="openSidebar()">
            <img class="admin-page__sidebar-image" src="/assets/images/sidebar-open.svg" alt="" />
        </div>
        <div class="admin-page__sidebar" ref="adminSidebar">
            <ChatSidebarComponent v-if="$route.meta.sidebar === 'chat'">
            </ChatSidebarComponent>
            <AdminSidebarComponent v-else> </AdminSidebarComponent>
        </div>
        <div class="admin-page__content">
            <router-view v-slot="slotProps">
                <transition :name="$route.meta.transition">
                    <component :is="slotProps.Component" :key="$route.fullPath">
                    </component>
                </transition>
            </router-view>
        </div>
    </section>
</template>

<script setup lang="ts">
import AdminSidebarComponent from "../components/Admin/AdminSidebarComponent.vue";
import ChatSidebarComponent from "../components/Admin/ChatSidebarComponent.vue";
import { ref } from "vue";

const adminSidebar = ref<HTMLInputElement | null>(null);
const adminSidebarIsOpen = ref(true);

function openSidebar() {
    adminSidebar.value!.classList.toggle("sidebar--open");
    adminSidebarIsOpen.value = !adminSidebarIsOpen.value;
}

</script>

<style scoped lang="scss">
.admin-page {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    height: calc(100vh - 52px);
    position: relative;

    .admin-page__sidebar-open-btn {
        width: 30px;
        position: absolute;
        left: 0.5rem;
        top: 0.8rem;
    }

    .admin-page__sidebar {
        flex: 0 0 0%;
        height: fit-content;
        transition: all 0.5s ease;
        overflow: hidden;
        opacity: 0;
        word-break: normal;
        // margin-right: 0.4rem;
    }

    .admin-page__content {
        flex: auto;
        height: calc(100vh - 116px);
        overflow: hidden;
    }

    .sidebar--open {
        flex: 0 0 100px;
        // margin-right: 0.5rem;
        opacity: 1;
        word-break: break-word;
    }
}

.admin-page__container {
    max-width: 1000px;
    display: flex;
    margin: auto;
    padding-top: 3rem;
}

@media (min-width: 601px) {
    .admin-page {
        height: calc(100vh - 72px);
        padding: 1rem;

        .admin-page__sidebar-open-btn {
            display: none;
        }

        .admin-page__content {
            height: calc(100vh - 104px);
        }

        .admin-page__sidebar {
            flex: 0 0 auto;
            // margin-right: 0.5rem;
            opacity: 1;
        }
    }
}
</style>
