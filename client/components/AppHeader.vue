<script scoped>
</script>

<template>
  <header class="header">
    <nav class="header__nav">
        <NuxtLink class="header__nav-link" to="/">
            <img class="header__nav-img" src="@/assets/images/appHeader/logo.png" alt="Logo">
        </NuxtLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
    background: #232323;
    width: 100%;
    padding: 10px;
    border-radius: 10px;

    &__nav {
        display: flex;
        justify-content: center;
        align-items: center;
        &-img {
            width: 30px;
        }
    }
}
</style>