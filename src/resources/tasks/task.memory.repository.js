const Task = require('./task.model');

let tasks = [];

const getAll = async (boardId) => tasks.filter(el => el.boardId === boardId);

const getTask = async (boardId, id) => {
    const boardTasks = await getAll(boardId);
    return boardTasks.find(el => el.id === id);
}

const addTask = async (task) => {
    const length = tasks.push(Task.toPero(task));
    return tasks[length - 1];
}

const updateTask = async (boardId, id, data) => {
    const index = tasks.findIndex(el => el.id === id);
    if (index === -1) return null
    tasks[index] = {id, boardId, ...data}
    return tasks[index]
}

const deleteTask = async (boardId, id) => {
    const index = tasks.findIndex((el) => el.id === id)
    if (index === -1) return null
    return tasks.splice(index, 1)[0]  
}

const unassignUser = async (userId) => {
    tasks.forEach(el => {
        const task = el;
        if(el.userId === userId) task.userId = null;
    })
}

const deleteBoardsTasks = async (boardId) => {
    const filtered = tasks.filter(el => el.boardId !== boardId);
    tasks = [...filtered]
}

module.exports = { getAll, addTask, getTask, updateTask, deleteTask, unassignUser, deleteBoardsTasks };
