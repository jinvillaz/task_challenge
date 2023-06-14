import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import * as firestore from 'firebase/firestore'
import { App } from '../server/app'
import { StatusTask, Task } from '../server/models/task'

jest.mock('firebase/firestore')

const HOST = 'http://localhost:4000'

let app: App

beforeAll(async () => {
  app = new App()
})

afterAll(async () => {
  app.getApp().close()
})

describe('App endpoints', () => {
  test('Get tasks', async () => {
    const items = [
      {
        id: 'QfPMsyuxrM7n8GoWs68K',
        data() {
          const item = {
            title: 'test1',
            description: 'this is a test1',
            status: StatusTask.PENDING,
          }
          return item
        },
      },
      {
        id: 'QfPMsyuxrM7n8GoWs68l',
        data() {
          const item = {
            title: 'test2',
            description: 'this is a test2',
            status: StatusTask.COMPLETED,
          }
          return item
        },
      },
    ]
    const data = {
      forEach(callback) {
        for (let i = 0; i < items.length; i += 1) {
          callback(items[i])
        }
      },
    }

    const mock = jest.spyOn(firestore, 'getDocs')
    mock.mockResolvedValue(data as unknown as firestore.QuerySnapshot)
    const res = await request(HOST).get('/api/tasks')
    expect(res.statusCode).toEqual(StatusCodes.OK)
    expect(res.body.length).toEqual(items.length)
  })

  test('Add task', async () => {
    const body = {
      title: 'test1',
      description: 'this is a test1',
      status: StatusTask.PENDING,
    }
    const expected = {
      id: 'QfPMsyuxrM7n8GoWs68K',
      title: 'test1',
      description: 'this is a test1',
      status: StatusTask.PENDING,
    }
    const data = {
      id: 'QfPMsyuxrM7n8GoWs68K',
    }
    const dataGet = {
      exists() {
        return true
      },
      data() {
        return body
      }
    }

    const mockAdd = jest.spyOn(firestore, 'addDoc')
    mockAdd.mockResolvedValue(data as firestore.DocumentReference)
    const mockGet = jest.spyOn(firestore, 'getDoc')
    mockGet.mockResolvedValue(dataGet as unknown as firestore.DocumentSnapshot)
    const res = await request(HOST).post('/api/tasks').send(body)
    expect(res.statusCode).toEqual(StatusCodes.OK)
    expect(res.body).toStrictEqual(expected)
  })

  test('Add task with invalid parameters', async () => {
    const body = {
      title: 'test1',
      description: 'this is a test1',
      status: 'something',
    }
    const expected = {
      errors: [ 'status must be one of the following values: PENDING, COMPLETED' ]
    }
    const res = await request(HOST).post('/api/tasks').send(body)
    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST)
    expect(res.body).toStrictEqual(expected)
  })

  test('Update task', async () => {
    const body = {
      title: 'test1',
      description: 'this is a test1',
      status: StatusTask.COMPLETED,
    }
    const expected = {
      id: 'QfPMsyuxrM7n8GoWs68K',
      title: 'test1',
      description: 'this is a test1',
      status: StatusTask.COMPLETED,
    }
    const dataGet = {
      exists() {
        return true
      },
      data() {
        return body
      }
    }
    const mockGet = jest.spyOn(firestore, 'getDoc')
    mockGet.mockResolvedValue(dataGet as unknown as firestore.DocumentSnapshot)
    const mockAdd = jest.spyOn(firestore, 'updateDoc')
    mockAdd.mockResolvedValue()
    
    const res = await request('http://localhost:4000').put(`/api/tasks/${expected.id}`).send(body)
    expect(res.statusCode).toEqual(StatusCodes.OK)
    expect(res.body).toStrictEqual(expected)
  })

  test('Delete item', async () => {
    const body = {
      title: 'test1',
      description: 'this is a test1',
      status: StatusTask.COMPLETED,
    }
    const id = 'QfPMsyuxrM7n8GoWs68K'
    const dataGet = {
      exists() {
        return true
      },
      data() {
        return body
      }
    }
    const mockGet = jest.spyOn(firestore, 'getDoc')
    mockGet.mockResolvedValue(dataGet as unknown as firestore.DocumentSnapshot)
    const mockAdd = jest.spyOn(firestore, 'deleteDoc')
    mockAdd.mockResolvedValue()
    
    const res = await request(HOST).delete(`/api/tasks/${id}`)
    expect(res.statusCode).toEqual(StatusCodes.OK)
  })

  test('Delete invalid item', async () => {
    const id = 'QfPMsyuxrM7n8GoWs68K'
    const dataGet = {
      exists() {
        return false
      },
      data() {
        return null
      }
    }
    const mockGet = jest.spyOn(firestore, 'getDoc')
    mockGet.mockResolvedValue(dataGet as unknown as firestore.DocumentSnapshot)
    const mockAdd = jest.spyOn(firestore, 'deleteDoc')
    mockAdd.mockResolvedValue()
    
    const res = await request(HOST).delete(`/api/tasks/${id}`)
    expect(res.statusCode).toEqual(StatusCodes.NOT_FOUND)
  })
})
