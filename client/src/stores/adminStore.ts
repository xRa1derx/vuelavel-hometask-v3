import { defineStore } from 'pinia';
import { ref } from 'vue';

export type AdminState = {
    isOpen: boolean,
};

export const useAdminStore = defineStore('adminStore', () => {
    const adminSidebar = ref<AdminState>({
        isOpen: false
    });

    return { adminSidebar };
});