import * as uuid from 'uuid'

import { deleteBoardsTasks } from '../tasks/task.memory.repository'
import boardsRepo, { TBoard } from './board.memory.repository'

/**
 * Returns all boards from boards repository
 * @returns All boards or [] if it's empty
 */
const getAll = () => boardsRepo.getAll()

/**
 * Modifies board data adding uuid's 
 * @param board first term TBoard
 * @returns Modified board
 */
const addId = (board: TBoard) => {
    const { columns } = board
    if (Array.isArray(columns)) columns.forEach(el => {
        const colunm = el
        colunm.id = uuid.v4()
    })
    return {id: uuid.v4(), ...board}
}

/**
 * Modifies board and adds it to boards in boards repository and returns added board
 * @param board first term TBoard
 * @returns Added board
 */
const addBoard = (board: TBoard) => {
    const data = addId(board)
    return boardsRepo.addBoard(data)
}

/**
 * Returns board from boards repository for provided id
 * @param id first term string
 * @returns Board or null if board doesn't exist
 */
const getBoard = async (id: string) => {
    const user = await boardsRepo.getBoard(id)
    return user || null
}

/**
 * Updates board in boards repository with provided id and data
 * @param id first term string
 * @param data second term TBoard
 * @returns Updated board or null if board doesn't exist
 */
const updateBoard = async (id: string, data: TBoard) => boardsRepo.updateBoard(id, data)

/**
 * Deletes board with provided id from boards repository and clears all it's tasks in tasks repository 
 * @param id first term string
 * @returns Deleted board or null if board doesn't exist
 */
const deleteBoard = async (id: string) => {
    const board = boardsRepo.deleteBoard(id)
    if (!board) return null
    await deleteBoardsTasks(id)
    return board
}

export default { getAll, addBoard, getBoard, updateBoard, deleteBoard }
