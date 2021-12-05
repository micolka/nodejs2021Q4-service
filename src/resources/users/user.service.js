const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const addUser = (user) => usersRepo.addUser(new User(user));

const getUser = async (id) => {
    const user = await usersRepo.getUser(id);
    if (user) return User.toResponse(user)
    return null;
}

const updateUser = async (id, data) => {
    const user = await usersRepo.updateUser(id, data)

    if (user) return User.toResponse(user)
    return null; 
}

const deleteUser = async (id) => {
    const user = await usersRepo.deleteUser(id)
    if (!user) return null;  
    await tasksRepo.unassignUser(id)
    return User.toResponse(user);
}

module.exports = { getAll, addUser, getUser, updateUser, deleteUser };
