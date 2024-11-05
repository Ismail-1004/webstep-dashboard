import { defineStore } from "pinia";

export const useSideModalStore = defineStore('sideModal', () => {
    const isActive = ref(false)

    return { isActive }
})