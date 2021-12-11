export type TTask = {
    id?: string;
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string | null;
    columnId: string | null;
}

let tasks: TTask[] = []

export const getAll = async (boardId: string) => tasks.filter(el => el.boardId === boardId)

export const getTask = async (boardId: string, id: string) => {
    const boardTasks = await getAll(boardId)
    return boardTasks.find(el => el.id === id)
}

export const addTask = async (task: TTask) => {
    const length = tasks.push(task)
    return tasks[length - 1]
}

export const updateTask = async (id: string, data: TTask) => {
    const index = tasks.findIndex(el => el.id === id)
    if (index === -1) return null
    tasks[index] = {id, ...data}
    return tasks[index]
}

export const deleteTask = async (id: string) => {
    const index = tasks.findIndex((el) => el.id === id)
    if (index === -1) return null
    return tasks.splice(index, 1)[0]  
}

export const unassignUser = async (userId: string) => {
    tasks.forEach(el => {
        const task = el
        if(el.userId === userId) task.userId = null
    })
}

export const deleteBoardsTasks = async (boardId: string) => {
    const filtered = tasks.filter(el => el.boardId !== boardId)
    tasks = [...filtered]
}
