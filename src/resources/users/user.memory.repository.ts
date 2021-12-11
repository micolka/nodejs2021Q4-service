export type TUser = {
    id?: string;
    name: string;
    login: string;
    password: string;
}

const users: TUser[] = []

const getAll = async () => users

const getUser = async (id: string) => users.find(el => el.id === id)

const addUser = async (user: TUser) => {
    const length = users.push(user)
    return users[length - 1]
}

const updateUser = async (id: string, data: TUser) => {
    const index = users.findIndex(el => el.id === id)
    if (index === -1) return null
    users[index] = {id, ...data}
    return users[index]
}

const deleteUser = async (id: string) => {
    const index = users.findIndex((el) => el.id === id)
    if (index === -1) return null
    return users.splice(index, 1)[0]  
}

export default { getAll, addUser, getUser, updateUser, deleteUser }
