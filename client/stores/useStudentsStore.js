import { defineStore } from 'pinia'

export const useStudentsStore = defineStore('students', () => {
    const students = ref([])
    const totalStudents = ref(0)

    const gettAllStudents = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/students')
            const data = await response.json()

            students.value = data.students
            totalStudents.value = data.totalStudents            
        } catch (e) {
            throw e
        }
    }

    const updateStudent = async (formData) => {
        try {
            const response = await fetch('http://localhost:8080/api/students', {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            await response.json();
        } catch (e) {
            throw e
        }
    }

    return { gettAllStudents, updateStudent, students, totalStudents }
})