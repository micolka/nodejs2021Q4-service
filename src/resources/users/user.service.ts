import * as uuid from 'uuid'
import { unassignUser } from '../tasks/task.memory.repository'
import usersRepo, { TUser } from './user.memory.repository'

/**
 * Returns user's info excluding password
 * @returns User's info
 */
const toResponse = (user: TUser) => {
    const { id, name, login } = user
    return { id, name, login }
}

/**
 * Returns all users from users repository
 * @returns All users or []
 */
const getAll = () => usersRepo.getAll()

/**
 * Modifies user, adds it to users repository and returns added user
 * @param user first term TUser
 * @returns Added user
 */
const addUser = (user: TUser) => usersRepo.addUser({id: uuid.v4(), ...user});

/**
 * Returns user for provided id
 * @param id first term string
 * @returns User or null if user doesn't exist
 */
const getUser = async (id: string) => {
    const user = await usersRepo.getUser(id);
    if (user) return toResponse(user)
    return null;
}

/**
 * Updates user in users repository with provided id and data
 * @param id first term string
 * @param data second term TUser
 * @returns Updated user or null if user doesn't exist
 */
const updateUser = async (id: string, data: TUser) => {
    const user = await usersRepo.updateUser(id, data)
    if (user) return toResponse(user)
    return null; 
}

/**
 * Deletes user with provided id from users repository and unassigns user from all tasks
 * @param id first term string
 * @returns Deleted user or null if user doesn't exist
 */
const deleteUser = async (id: string) => {
    const user = await usersRepo.deleteUser(id)
    if (!user) return null;  
    await unassignUser(id)
    return toResponse(user)
}

export default { getAll, addUser, getUser, updateUser, deleteUser }
