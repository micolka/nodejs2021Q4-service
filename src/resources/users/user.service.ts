import { unassignUser } from '../tasks/task.memory.repository'
import usersRepo, { TUser } from './user.memory.repository'

const toResponse = (user: TUser) => {
    const { id, name, login } = user
    return { id, name, login }
}

const getAll = () => usersRepo.getAll()

const addUser = (user: TUser) => usersRepo.addUser(user);

const getUser = async (id: string) => {
    const user = await usersRepo.getUser(id);
    if (user) return toResponse(user)
    return null;
}

const updateUser = async (id: string, data: TUser) => {
    const user = await usersRepo.updateUser(id, data)
    if (user) return toResponse(user)
    return null; 
}

const deleteUser = async (id: string) => {
    const user = await usersRepo.deleteUser(id)
    if (!user) return null;  
    await unassignUser(id)
    return toResponse(user)
}

export default { getAll, addUser, getUser, updateUser, deleteUser }
