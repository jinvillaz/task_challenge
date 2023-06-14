import { ReasonPhrases, StatusCodes } from 'http-status-codes'

export class CustomError {
  message: string
  status: number

  constructor(
    message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    status: number = StatusCodes.INTERNAL_SERVER_ERROR,
  ) {
    this.message = message
    this.status = status
  }
}
