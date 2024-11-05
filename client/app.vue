<script setup>

</script>

<template>
  <div class="wrapper">
    <AppSidebar />
    <div class="wrapper__content">
      <AppHeader />
      <main class="wrapper__content-main">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  padding: 15px;
  flex-grow: 1;
  &__content {
    width: 100%;
    margin: 0 30px;

    &-main {
      margin: 15px 0;
    }
  }
}
</style>