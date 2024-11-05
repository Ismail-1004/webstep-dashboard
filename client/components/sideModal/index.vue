<script setup>
import { useSideModalStore } from '~/stores/useSideModalStore';

const sideModalStore = useSideModalStore()

const emit = defineEmits(['handleSubmit'])

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  fields: {
    type: Array,
    required: true,
  },
});

const handleSubmit = () => {
    const formData = props.fields.reduce((acc, el) => {
        acc[el.key] = el.value
        return acc
    }, {})    

    emit('handleSubmit', formData)

    fields.value = []
}
</script>

<template>
  <div :class="['side', { active: sideModalStore.isActive }]">
    <div class="side__head">
        <h2 class="side__title">{{ title }}</h2>
        <Icon name="material-symbols-light:close-small-outline-rounded" @click="sideModalStore.isActive = false" />
    </div>

    <form class="side__form" @submit.prevent="handleSubmit">
      <div
        class="side__form-field"
        v-for="(field, idx) of fields"
        :key="field.title + idx"
      >
        <label :for="field.title" class="side__form-label">{{
          field.title
        }}</label>
        <input
          type="text"
          v-model="field.value"
          :id="field.title"
          class="side__form-input"
          :disabled="field.disabled"
          :class="{ disabled: field.disabled }"
        />
      </div>

      <button class="bg-primary text-white px-2 py-1">Сохранить</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.side {
  background: #232323;
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  z-index: 999;
  padding: 20px;
  box-shadow: -15px 0 10px 0 rgba(0, 0, 0, 0.2);
  transition: .3s;
  transform: translateX(150%);

  &.active {
    transform: translateX(0)
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    & span {
        font-size: 30px;
        cursor: pointer;
    }
  }

  &__title {
    font-size: 25px;
    font-weight: 700;
  }

  &__form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    &-field {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 100%;

      &:not(:last-child) {
        margin-bottom: 25px;
      }
    }
    &-input {
      background: none;
      outline: none;
      border: 2px solid #e2e2e2;
      border-radius: 5px;
      padding: 2px 10px;

      &.disabled {
        border: 2px solid red;
        opacity: 0.7;
      }
    }
  }
}
</style>