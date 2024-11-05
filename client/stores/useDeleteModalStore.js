import { defineStore } from "pinia";

export const useDeleteModalStore = defineStore('deleteModal', () => {
    const isActive = ref(false)

    return { isActive }
})