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
            <div class="admin-page__content-backdrop" @click="openSidebar"
                v-if="adminStore.adminSidebar.isOpen && $route.meta.status == 'active'" ref="adminBackdrop">
            </div>
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
import { useAdminStore } from '@/stores/adminStore';
import { ref } from "vue";

const adminStore = useAdminStore();
const adminSidebar = ref<HTMLInputElement | null>(null);
const adminBackdrop = ref<HTMLInputElement | null>(null);

function openSidebar() {
    adminSidebar.value?.classList.toggle("sidebar--open");
    adminBackdrop.value?.classList.toggle('hide');
    adminStore.adminSidebar.isOpen = !adminStore.adminSidebar.isOpen;
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
        transition: all 0.35s ease;
        overflow: hidden;
        opacity: 0;
        word-break: normal;
        height: calc(100vh - 116px);
        justify-content: space-between;
        display: flex;
        flex-direction: column;
    }

    .admin-page__content {
        position: relative;
        flex: auto;
        height: calc(100vh - 116px);
        overflow: hidden;
        border-radius: 10px;

        .admin-page__content-backdrop {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            margin: auto;
            background-color: rgb(0 0 0 / 66%);
            border: 3px #eee outset;
            border-radius: 10px;
        }
    }

    .sidebar--open {
        flex: 0 0 170px;
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

            .admin-page__content-backdrop {
                display: none;
            }
        }

        .admin-page__sidebar {
            flex: 0 0 auto;
            opacity: 1;
            height: calc(100vh - 104px);
        }
    }
}
</style>
