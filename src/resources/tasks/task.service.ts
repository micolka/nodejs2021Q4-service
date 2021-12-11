import * as uuid from 'uuid';
import * as tasksRepo from './task.memory.repository';


export const getAll = (boardId: string) => tasksRepo.getAll(boardId);

export const addTask = (task: tasksRepo.TTask, boardId: string) => tasksRepo.addTask({id: uuid.v4(), ...task, boardId});

export const getTask = async (boardId: string, id: string) => {
    const task = await tasksRepo.getTask(boardId, id);
    return task || null;
}

export const updateTask = async (id: string, data: tasksRepo.TTask) => {
    const task = await tasksRepo.updateTask(id, data)

    return task || null;
}

export const deleteTask = async (id: string) => {
    const task = await tasksRepo.deleteTask(id)
    return task || null;
}
