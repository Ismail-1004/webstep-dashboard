<script setup>
const links = [
  { title: "Главная", route: '/', icon: 'dashicons:admin-home' },
  { title: "Ученики", route: '/students', icon: 'dashicons:admin-users' },
  { title: "Группы", route: "/groups", icon: 'dashicons:groups' },
  { title: "Расходы", route: "/expenses", icon: 'dashicons:money-alt' }
]
</script>

<template>
  <aside class="aside">
    <ul class="aside__list">
      <li class="aside__list-item"  v-for="link of links" :key="link">
        <Icon :name="link.icon" />
        <NuxtLink class="aside__list-link" exact-active-class="active" :to="link.route"> {{ link.title }} </NuxtLink>
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
.aside {
  background: #232323;
  max-width: 250px;
  width: 100%;
  padding: 20px 30px;
  border-radius: 10px;

  &__list {
    &-item {
      color: white;
      display: flex;
      align-items: center;
      gap: 10px;

      &:not(:last-child) {
        margin-bottom: 25px;
      }

      & span {
        font-size: 25px;
      }
    }

    &-link {
      color: white;
      width: 100%;

      &.active {
        color: #ffcc00; // цвет для активной ссылки
        font-weight: bold;
      }
    }
  }
}
</style>