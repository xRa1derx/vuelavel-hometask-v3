<template>
    <section class="admin-page admin-page__container">
        <div v-if="!adminStore.adminSidebar.isOpen" class="admin-page__sidebar-open-btn" @click="openSidebar()">
            <img class="admin-page__sidebar-image" src="/assets/images/sidebar-open.svg" alt="" />
        </div>
        <div class="admin-page__sidebar sidebar--open" ref="adminSidebar">
            <ChatSidebarComponent v-if="$route.meta.sidebar === 'chat'">
            </ChatSidebarComponent>
            <AdminSidebarComponent v-else> </AdminSidebarComponent>
        </div>
        <div class="admin-page__content">
            <transition name="opacity">
                <div class="admin-page__content-backdrop" @click="openSidebar" v-if="adminStore.adminSidebar.isOpen
                    " ref="adminBackdrop"></div>
            </transition>
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
import { useAdminStore } from "@/stores/adminStore";
import { onUnmounted, ref } from "vue";

const adminStore = useAdminStore();
const adminSidebar = ref<HTMLInputElement | null>(null);
const adminBackdrop = ref<HTMLInputElement | null>(null);

function openSidebar() {
    adminSidebar.value?.classList.toggle("sidebar--open");
    adminBackdrop.value?.classList.toggle("hide");
    adminStore.adminSidebar.isOpen = !adminStore.adminSidebar.isOpen;
}

onUnmounted(() => {
    if (!adminStore.adminSidebar.isOpen) {
        adminStore.adminSidebar.isOpen = true;
    }
})
</script>

<style scoped lang="scss">
.admin-page {
    height: calc(100vh - 52px);
    position: relative;

    .admin-page__sidebar-open-btn {
        width: 30px;
        position: absolute;
        left: 1rem;
        top: 0.8rem;
        transition: transform 0.6s ease;
    }

    .admin-page__sidebar-open-btn:active {
        transform: rotate(380deg);
    }

    .admin-page__sidebar {
        width: 180px;
        position: absolute;
        height: calc(100% - 120px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: $bg-grey;
        left: -300px;
        top: 0;
        transition: all 0.35s ease;
        border-radius: 1rem;
        // overflow: hidden;
        // opacity: 0;
        border-radius: 0 1rem 1rem 0;
        word-break: normal;
        z-index: 3;
        margin-top: 58px;
    }

    .admin-page__content {
        width: 100%;
        position: relative;
        // flex: auto;
        height: calc(100% - 52px);
        overflow: hidden;

        .admin-page__content-backdrop {
            position: absolute;
            background-color: #eeeeeeb5;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 2;
            margin: auto;
        }
    }

    .sidebar--open {
        // flex: 0 0 170px;
        // margin-right: 0.5rem;
        // opacity: 1;
        left: 0;
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
        padding: 1rem 0.2rem;

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
            position: relative;
            width: 351px;
            // flex: 0 0 auto;
            margin-top: 0;
            // opacity: 1;
            border-radius: 1rem;
            left: 0;
            height: calc(100vh - 104px);
        }
    }
}
</style>
