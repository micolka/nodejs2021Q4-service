const boards = [];

const getAll = async () => boards;

const getBoard = async (id) => boards.find(el => el.id === id)

const addBoard = async (board) => {
    const length = boards.push(board);
    return boards[length - 1];
}

const updateBoard = async (id, data) => {
    const index = boards.findIndex(el => el.id === id);
    if (index === -1) return null
    boards[index] = { id, ...data }
    return boards[index]
}

const deleteBoard = async (id) => {
    const index = boards.findIndex((el) => el.id === id)
    if (index === -1) return null
    return boards.splice(index, 1)[0]  
}

module.exports = { getAll, addBoard, getBoard, updateBoard, deleteBoard };
