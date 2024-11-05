import { Router } from "express";
import studentsController from "../controllers/studentsController.js";

const router = Router()

router.get('/', studentsController.getAll)
router.patch('/', studentsController.update)
router.post('/', studentsController.createStudent)
router.delete('/', studentsController.deleteStudent)

export default router
