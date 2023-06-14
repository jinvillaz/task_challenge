import { Request, Response, NextFunction } from 'express'
import { CustomError } from './custom-error'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handleError = (err: TypeError | CustomError, req: Request, res: Response, next: NextFunction) => {
  let customError = err

  if (!(err instanceof CustomError)) {
    customError = new CustomError(err.message)
  }

  res.status((customError as CustomError).status).send(customError)
}
