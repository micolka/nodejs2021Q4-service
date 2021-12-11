import boardsRepo, { TBoard } from './board.memory.repository'
import tasksRepo from '../tasks/task.memory.repository'
import Board from './board.model'


const getAll = () => boardsRepo.getAll();

const addBoard = (board: TBoard) => {
    const data = new Board(board)
    boardsRepo.addBoard(data);
};

const getBoard = async (id: string) => {
    const user = await boardsRepo.getBoard(id);
    return user || null;
}

const updateBoard = async (id: string, data: TBoard) => boardsRepo.updateBoard(id, data);

const deleteBoard = async (id: string) => {
    const board = boardsRepo.deleteBoard(id);
    if (!board) return null; 
    await tasksRepo.deleteBoardsTasks(id);
    return board;
};

export default { getAll, addBoard, getBoard, updateBoard, deleteBoard };
