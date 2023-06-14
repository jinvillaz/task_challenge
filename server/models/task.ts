export enum StatusTask {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface BodyTask {
  title: string
  description: string
  status: StatusTask
}

export interface Task extends BodyTask {
  id: string
}
