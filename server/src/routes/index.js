import { Router } from "express";
import studentsRouter from './studentsRouter.js'

const router = Router()

router.use('/students', studentsRouter)

export default router