const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');

const getAll = () => boardsRepo.getAll();

const addBoard = (board) => boardsRepo.addBoard(new Board(board));

const getBoard = async (id) => {
    const user = await boardsRepo.getBoard(id);
    return user || null;
}

const updateBoard = async (id, data) => boardsRepo.updateBoard(id, data);

const deleteBoard = async (id) => boardsRepo.deleteBoard(id);

module.exports = { getAll, addBoard, getBoard, updateBoard, deleteBoard };
