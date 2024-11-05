<script setup>
import { useDeleteModalStore } from "~/stores/useDeleteModalStore"

defineProps({
  data: {
    type: Object,
  },
});

const modalStore = useDeleteModalStore()
</script>

<template>
  <div class="d-modal" v-if="modalStore.isActive">
    <div class="d-modal__content">
      <h2 class="d-modal__content-title">Delete</h2>
      <form class="d-modal__form" @submit.prevent>
        <h3 class="d-modal__form-question">Удалить ученика: {{ data.name }}?</h3>
        <div class="d-modal__form-btns">
            <button @click="modalStore.isActive = false" class="bg-red-500 text-white px-2 py-1 mr-2">Отмена</button>
            <button @click="" class="bg-blue-500 text-white px-2 py-1 ">Удалить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.d-modal {
  background: #00000056;
  backdrop-filter: blur(15px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &__content {
    background: #232323;
    max-width: 400px;
    width: 100%;
    padding: 20px;
    border-radius: 5px;
    text-align: center;

    &-title {
        color: white;
        font-size: 25px;
        font-weight: 700;
    }
  }

  &__form {
    &-question {
        font-size: 18px;
        margin: 20px 0;
    }
  }
}
</style>