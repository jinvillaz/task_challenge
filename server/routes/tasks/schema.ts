import * as yup from 'yup'
import { BodyTask, StatusTask } from '../../models/task'

export const validationSchema: yup.ObjectSchema<BodyTask> = yup
  .object({
    title: yup.string().defined(),
    description: yup.string().defined(),
    status: yup.mixed<StatusTask>().oneOf(Object.values(StatusTask)).defined(),
  })
  .noUnknown(true, (err) => {
    return `invalid field: ${err.unknown}`
  })
  .strict()
