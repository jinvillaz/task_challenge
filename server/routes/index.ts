import { Router } from 'express'
import tasksRouter from './tasks'

const router = Router()
router.use('/tasks', tasksRouter)

export default router
