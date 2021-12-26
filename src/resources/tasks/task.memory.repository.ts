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

/**
 * Returns all tasks of the board
 * @param boardId first term string
 * @returns All board's tasks or [] if it's empty
 */
export const getAll = async (boardId: string) => tasks.filter(el => el.boardId === boardId)

/**
 * Returns task for provided id and board's id
 * @param boardId first term string
 * @param id second term string
 * @returns Task for provided id or undefined if there isn't such task
 */
export const getTask = async (boardId: string, id: string) => {
    const boardTasks = await getAll(boardId)
    return boardTasks.find(el => el.id === id)
}

/**
 * Adds task to tasks and returns added task
 * @param task first term TTask
 * @returns Added task
 */
export const addTask = async (task: TTask) => {
    const length = tasks.push(task)
    return tasks[length - 1]
}

/**
 * Updates task with provided id and data
 * @param id first term string
 * @param data first term TTask
 * @returns Updated task or null if task doesn't exist
 */
export const updateTask = async (id: string, data: TTask) => {
    const index = tasks.findIndex(el => el.id === id)
    if (index === -1) return null
    tasks[index] = {id, ...data}
    return tasks[index]
}

/**
 * Deletes task with provided id
 * @param id first term string
 * @returns Deleted task or null if task doesn't exist
 */
export const deleteTask = async (id: string) => {
    const index = tasks.findIndex((el) => el.id === id)
    if (index === -1) return null
    return tasks.splice(index, 1)[0]  
}

/**
 * Unassignes user from tasks
 * @param userId first term string
 * @returns Void
 */
export const unassignUser = async (userId: string) => {
    tasks.forEach(el => {
        const task = el
        if(el.userId === userId) task.userId = null
    })
}

/**
 * Deletes all tasks of the board with provided id
 * @param boardId first term string
 * @returns Void
 */
export const deleteBoardsTasks = async (boardId: string) => {
    const filtered = tasks.filter(el => el.boardId !== boardId)
    tasks = [...filtered]
}
