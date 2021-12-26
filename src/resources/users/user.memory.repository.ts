export type TUser = {
    id?: string;
    name: string;
    login: string;
    password: string;
}

const users: TUser[] = []

/**
 * Returns all users from users repository
 * @returns All users or [] if it's empty
 */
const getAll = async () => users

/**
 * Returns user for provided id
 * @param id first term string
 * @returns User for provided id or undefined if there isn't such user
 */
const getUser = async (id: string) => users.find(el => el.id === id)

/**
 * Adds user to users and returns added user
 * @param user first term TUser
 * @returns Added user
 */
const addUser = async (user: TUser) => {
    const length = users.push(user)
    return users[length - 1]
}

/**
 * Updates user with provided id and data
 * @param id first term string
 * @param data first term TUser
 * @returns Updated user or null if user doesn't exist
 */
const updateUser = async (id: string, data: TUser) => {
    const index = users.findIndex(el => el.id === id)
    if (index === -1) return null
    users[index] = {id, ...data}
    return users[index]
}

/**
 * Deletes user with provided id
 * @param id first term string
 * @returns Deleted user or null if user doesn't exist
 */
const deleteUser = async (id: string) => {
    const index = users.findIndex((el) => el.id === id)
    if (index === -1) return null
    return users.splice(index, 1)[0]  
}

export default { getAll, addUser, getUser, updateUser, deleteUser }
