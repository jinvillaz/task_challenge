import { Router } from 'express'
import { deleteHandler, getByIdHandler, getHandler, postHandler, putHandler } from './handler'

const router = Router()
router.route('/').get(getHandler).post(postHandler)

router.route('/:taskId').get(getByIdHandler).put(putHandler).delete(deleteHandler)

export default router
