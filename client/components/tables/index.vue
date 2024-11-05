<script setup>
import { useSideModalStore } from '~/stores/useSideModalStore';
import { useDeleteModalStore } from "~/stores/useDeleteModalStore"

const sideModalStore = useSideModalStore()
const deleteModalStore = useDeleteModalStore()

const emit = defineEmits(['handleEdit', 'handleDelete'])

const props = defineProps({
  tableData: {
    type: Array,
    required: true,
    default: [],
  },
  labels: {
    type: Array,
    required: true,
    default: [],
  },
  statusFilter: {
    type: Array,
    required: true,
    default: []
  }
});

const page = ref(1);
const pageCount = 5;
const q = ref('')



const selectedStatus = ref('')

const filteredData = computed(() => {
  let data = props.tableData;

  if (selectedStatus.value.length) {
    data = data.filter(row => {
      if (selectedStatus.value[0].key === 'debtors') {
        return row.paid < row.mustPay;
      }
    });
  }

  if (q.value) {
    data = data.filter(row =>
      Object.values(row).some(val =>
        String(val).toLowerCase().includes(q.value.toLowerCase())
      )
    );
  }

  return data;
});


const rows = computed(() => {
  return filteredData.value.slice(
    (page.value - 1) * pageCount,
    page.value * pageCount
  );
});

const handleEdit = (row) => {
  emit('handleEdit', row)
  sideModalStore.isActive = true
};

const handleDelete = (row) => {
  emit('handleDelete', row)
  deleteModalStore.isActive = true
};

watch([q, selectedStatus], () => {
  page.value = 1;
});
</script>

<template>
  <div>
    <div class="flex justify-between py-3.5 border-b border-gray-200 dark:border-gray-700">
      <div class="filters flex">
        <UInput v-model="q" placeholder="Поиск..." :style="{ backgroundColor: '#232323' }" />
        <USelectMenu v-model="selectedStatus" :options="statusFilter" multiple placeholder="Фильтр" class="w-40 mx-5" :style="{backgroundColor: '#232323'}" />
      </div>
      <button class="bg-primary px-2 py-1" @click="sideModalStore.isActive = true"> Добавить студента </button>
    </div>

    <UTable
      :rows="rows"
      :columns="labels"
      :loading="!rows.length"
      :progress="{ color: 'primary', animation: 'carousel' }"
      :style="{ background: '#232323', color: 'white' }"
    >
      <template #actions-data="{ row }">
        <div class="flex justify-end">
          <button @click="handleEdit(row)" class="bg-blue-500 text-white px-2 py-1 mr-2">Править</button>
          <button @click="handleDelete(row)" class="bg-red-500 text-white px-2 py-1">Удалить</button>
        </div>
      </template>
    </UTable>

    <div class="flex justify-end py-3.5 border-t border-white">
      <UPagination
        v-model="page"
        :page-count="pageCount"
        :total="filteredData.length"
      />
    </div>
  </div>
</template>
