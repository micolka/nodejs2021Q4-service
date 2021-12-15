import * as uuid from 'uuid'
import * as tasksRepo from './task.memory.repository'

/**
 * Returns all board's tasks from tasks repository
 * @param boardId first term string
 * @returns All board'stasks or [] if it's empty
 */
export const getAll = (boardId: string) => tasksRepo.getAll(boardId)

/**
 * Modifies task and adds it to tasks in tasks repository and returns added task
 * @param task first term TTask
 * @param boardId second term string
 * @returns Added task
 */
export const addTask = (task: tasksRepo.TTask, boardId: string) => tasksRepo.addTask({id: uuid.v4(), ...task, boardId})

/**
 * Returns task from tasks repository for provided task's and board's ids
 * @param boardId first term string
 * @param id second term string
 * @returns Task or null if task doesn't exist
 */
export const getTask = async (boardId: string, id: string) => {
    const task = await tasksRepo.getTask(boardId, id)
    return task || null
}

/**
 * Updates task in tasks repository with provided id and data
 * @param id first term string
 * @param data second term TTask
 * @returns Updated task or null if task doesn't exist
 */
export const updateTask = async (id: string, data: tasksRepo.TTask) => {
    const task = await tasksRepo.updateTask(id, data)
    return task || null
}

/**
 * Deletes task with provided id from tasks repository
 * @param id first term string
 * @returns Deleted task or null if task doesn't exist
 */
export const deleteTask = async (id: string) => {
    const task = await tasksRepo.deleteTask(id)
    return task || null
}
