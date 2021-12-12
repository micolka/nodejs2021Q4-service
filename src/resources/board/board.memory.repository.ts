export type TColumns = {
    id?: string;
}

export type TBoard = {
    id?: string;
    title: string;
    columns: TColumns[];
}

const boards: TBoard[] = []

/**
 * Returns all boards
 * @returns All boards or [] if it's empty
 */
const getAll = async () => boards

/**
 * Returns board for provided id
 * @param id first term string
 * @returns Board for provided id or undefined if there isn't such board
 */
const getBoard = async (id: string) => boards.find(el => el.id === id)

/**
 * Adds board to boards and returns added board
 * @param board first term TBoard
 * @returns Added board
 */
const addBoard = async (board: TBoard) => {
    const length = boards.push(board)
    return boards[length - 1]
}

/**
 * Updates board with provided id and data
 * @param id first term string
 * @param data first term TBoard
 * @returns Updated board or null if board doesn't exist
 */
const updateBoard = async (id: string, data: TBoard) => {
    const index = boards.findIndex(el => el.id === id)
    if (index === -1) return null
    boards[index] = { ...data }
    return boards[index]
}

/**
 * Deletes board with provided id
 * @param id first term string
 * @returns Deleted board or null if board doesn't exist
 */
const deleteBoard = async (id: string) => {
    const index = boards.findIndex((el) => el.id === id)
    if (index === -1) return null
    return boards.splice(index, 1)[0]  
}

export default { getAll, addBoard, getBoard, updateBoard, deleteBoard }
