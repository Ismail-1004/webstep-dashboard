import models from "../models/models.js"

class StudentsController {
    async getAll (req, res) {
        try {
            const students = await models.User.findAll()

            return res.status(200).json({ students, totalStudents: students.length })
        } catch (e) {
            throw e
        }
    }

    async createStudent (req, res) {
        try {
            const { name, phone, groupId } = req.body

            if (!name || !phone || !groupId) {
                return res.status(400).json({ message: "Поля имя,телефон и ID группы обязательны" })
            }

            const student = await models.User.create({ name, phone, groupId })

            return res.status(200).json(student)
        } catch (e) {
            throw e
        }
    }

    async update (req, res) {
        try {
            console.log(req.body);
            const { id } = req.body
            
            const student = await models.User.findByPk(id)

            if (!student) {
                return res.status(404).json({ message: "Пользователь не найден" })
            }

            
            
            await student.update(req.body)

            return res.status(200).json(student)
        } catch (e) {
            throw e
        }
    }

    async deleteStudent (req, res) {
        try {
            const { id } = req.body
            await models.User.destroy({ where: { id: id } })

            return res.status(200).json({ message: 'Ученик успешно удален' })
        } catch (e) {
            throw e
        }
    }
}

export default new StudentsController()