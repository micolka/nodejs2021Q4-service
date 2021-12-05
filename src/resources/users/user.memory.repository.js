const User = require('./user.model');

const users = [];

const getAll = async () => users;

const getUser = async (id) => users.find(el => el.id === id)

const addUser = async (user) => {
    users.push(User.toRepository(user));
    return user
}

const updateUser = async (id, data) => {
    const index = users.findIndex(el => el.id === id);
    if (index === -1) return null
    users[index] = {id, ...data}
    return users[index]
}

const deleteUser = async (id) => {
    const index = users.findIndex((el) => el.id === id)
    if (index === -1) return null
    return users.splice(index, 1)[0]  
}

module.exports = { getAll, addUser, getUser, updateUser, deleteUser };
