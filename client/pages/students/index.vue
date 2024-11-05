<script setup>
import { useStudentsStore } from "~/stores/useStudentsStore";
import { useSideModalStore } from '~/stores/useSideModalStore';

const sideModalStore = useSideModalStore()
const studentsStore = useStudentsStore();
const student = ref(null);
const deleteValue = ref(null)

const labels = [
  { label: "Имя", key: "name" },
  { label: "Оплатил", key: "paid" },
  { label: "Должен оплатить", key: "mustPay" },
  { label: "Номер", key: "phone" },
  { label: "", key: "actions" },
];

const sideContentFields = ref([
  { title: "Имя", value: "", key: "name" },
  { title: "Оплатил", value: "", key: "paid" },
  { title: "Должен оплатить", value: "", key: "mustPay", disabled: true },
  { title: "Номер телефона", value: "", key: "phone" },
]);

const statusFilter = [
  {
    key: "debtors",
    label: "Должники",
    value: false,
  },
];

const handleEdit = (row) => {
  student.value = row;
  const { name, paid, mustPay, phone } = row;

  const valueMapping = {
    Имя: name,
    Оплатил: paid,
    "Должен оплатить": mustPay,
    "Номер телефона": phone,
  };

  sideContentFields.value = sideContentFields.value.map((field) => ({
    ...field,
    value: valueMapping[field.title] || field.value,
  }));
};

const handleSubmit = async (fields) => {
  try {
    const data = {
      ...student.value,
      ...fields,
    };
    
    sideModalStore.isActive = false

    await studentsStore.updateStudent(data)
    await studentsStore.gettAllStudents();
    
  } catch (e) {
    throw e;
  }
};

const handleDelete = (row) => {
  deleteValue.value = row
}

onMounted(async () => {
  await studentsStore.gettAllStudents();
});
</script>

<template>
  <section class="students">
    <tables
      class="students__table"
      :statusFilter="statusFilter"
      :labels="labels"
      :tableData="studentsStore.students"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
    />
    <side-modal
      title="Студент"
      :fields="sideContentFields"
      @handleSubmit="handleSubmit"
    />
    <modals-delete-modal v-if="deleteValue" :data="deleteValue" />
  </section>
</template>

<style lang="scss" scoped>
</style>