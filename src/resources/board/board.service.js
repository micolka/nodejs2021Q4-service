const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');
const Board = require('./board.model');

const getAll = () => boardsRepo.getAll();

const addBoard = (board) => boardsRepo.addBoard(new Board(board));

const getBoard = async (id) => {
    const user = await boardsRepo.getBoard(id);
    return user || null;
}

const updateBoard = async (id, data) => boardsRepo.updateBoard(id, data);

const deleteBoard = async (id) => {
    const board = boardsRepo.deleteBoard(id);
    if (!board) return null; 
    await tasksRepo.deleteBoardsTasks(id);
    return board;
};

module.exports = { getAll, addBoard, getBoard, updateBoard, deleteBoard };
