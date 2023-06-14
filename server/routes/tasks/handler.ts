import { NextFunction, Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { addTask, deleteTask, getTask, getTasks, updateTask } from '../../services/tasks.service'
import { validationSchema } from './schema'

export const getHandler = async (req: Request, res: Response) => {
  const data = await getTasks()
  res.send(data)
}

export const getByIdHandler = async (req: Request, res: Response) => {
  const id = req.params.taskId
  const data = await getTask(id)
  if (!data) {
    return res.status(StatusCodes.NOT_FOUND).send({ message: ReasonPhrases.NOT_FOUND })
  }
  res.send(data)
}

export const postHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await validationSchema.validate(req.body, { abortEarly: false })
    const task = await addTask(data)
    res.send(task)
  } catch (e) {
    if (e.errors) {
      return res.status(StatusCodes.BAD_REQUEST).send({ errors: e.errors })
    }
    next(e)
  }
}

export const putHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.taskId
    const dataFound = await getTask(id)
    if (!dataFound) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: ReasonPhrases.NOT_FOUND })
    }
    const data = await validationSchema.validate(req.body, { abortEarly: false })
    const taskUpdated = await updateTask(id, data)
    res.send(taskUpdated)
  } catch (e) {
    if (e.errors) {
      return res.status(StatusCodes.BAD_REQUEST).send({ errors: e.errors })
    }
    next(e)
  }
}

export const deleteHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.taskId
    const dataFound = await getTask(id)
    if (!dataFound) {
      return res.status(StatusCodes.NOT_FOUND).send({ message: ReasonPhrases.NOT_FOUND })
    }
    await deleteTask(id)
    res.status(StatusCodes.OK).end()
  } catch (e) {
    next(e)
  }
}
