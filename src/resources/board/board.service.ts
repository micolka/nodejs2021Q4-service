import * as uuid from 'uuid'

import { deleteBoardsTasks } from '../tasks/task.memory.repository'
import boardsRepo, { TBoard } from './board.memory.repository'

const getAll = () => boardsRepo.getAll()

const addId = (board: TBoard) => {
    const { columns } = board
    if (Array.isArray(columns)) columns.forEach(el => {
        const colunm = el
        colunm.id = uuid.v4()
    })
    return {id: uuid.v4(), ...board}
}

const addBoard = (board: TBoard) => {
    const data = addId(board)
    return boardsRepo.addBoard(data)
}

const getBoard = async (id: string) => {
    const user = await boardsRepo.getBoard(id)
    return user || null
}

const updateBoard = async (id: string, data: TBoard) => boardsRepo.updateBoard(id, data)

const deleteBoard = async (id: string) => {
    const board = boardsRepo.deleteBoard(id)
    if (!board) return null
    await deleteBoardsTasks(id)
    return board
}

export default { getAll, addBoard, getBoard, updateBoard, deleteBoard }
