const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAll = (boardId) => tasksRepo.getAll(boardId);

const addTask = (task, boardId) => tasksRepo.addTask(new Task({...task, boardId}));

const getTask = async (boardId, id) => {
    const task = await tasksRepo.getTask(boardId, id);
    return task || null;
}

const updateTask = async (boardId, id, data) => {
    const task = await tasksRepo.updateTask(boardId, id, data)

    return task || null;
}

const deleteTask = async (boardId, id) => {
    const task = await tasksRepo.deleteTask(boardId, id)
    return task || null;
}

module.exports = { getAll, addTask, getTask, updateTask, deleteTask };
