<script setup>
import { useStudentsStore } from '~/stores/useStudentsStore';
const studentsStore = useStudentsStore()

const cards = computed(() => [
    { title: "Ученики", count: studentsStore.totalStudents, bg: '#bf85ff', to: "/students" },
    { title: "Группы", count: 7, bg: '#232323' },
    { title: "Доходы", count: 12, bg: "#4ac68b" },
    { title: "Расходы", count: 12, bg: "#da4959" }
])

onMounted(async () => {
    await studentsStore.gettAllStudents()
})
</script>

<template>
    <div class="cards">
        <NuxtLink :to="card.to" class="cards__card" v-for="card of cards" :key="card.title" :style="{ background: card.bg }">
            <span class="cards__card-count"> {{ card.count }} </span>
            <span class="cards__card-title"> {{ card.title }} </span>
        </NuxtLink>    
    </div>
</template>

<style lang="scss">
.cards {
    display: flex;
    justify-content: space-between;
    gap: 30px;

    &__card {
        border-radius: 10px;
        width: calc(100% / 4);
        padding: 20px;

        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;

        &-count {
            font-size: 40px;
            margin-bottom: 10px;
        }

        &-title {
            font-size: 20px;
        }
    }
}
</style>
