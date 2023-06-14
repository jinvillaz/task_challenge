import { collection, addDoc, getDocs, doc, updateDoc, getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../config'
import { BodyTask, Task } from '../models/task'

const TASKS = 'tasks'

export const getTasks = async (): Promise<Task[]> => {
  const querySnapshot = await getDocs(collection(db, TASKS))
  const tasks: Task[] = []
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    const task: Task = {
      id: doc.id,
      title: data.title,
      description: data.description,
      status: data.status,
    }
    tasks.push(task)
  })
  return tasks
}

export const getTask = async (id: string): Promise<Task | null> => {
  const docSnap = await getDoc(doc(db, TASKS, id))
  if (!docSnap.exists()) {
    return null
  }
  return { id, ...docSnap.data() } as Task
}

export const addTask = async (data: BodyTask): Promise<Task> => {
  const docRef = await addDoc(collection(db, TASKS), data)
  return (await getTask(docRef.id)) as Task
}

export const updateTask = async (id: string, data: BodyTask): Promise<Task> => {
  await updateDoc(doc(db, TASKS, id), { ...data })
  return (await getTask(id)) as Task
}

export const deleteTask = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, TASKS, id))
}
