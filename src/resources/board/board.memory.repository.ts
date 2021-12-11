export type TColumns = {
    id?: string;
}

export type TBoard = {
    id?: string;
    title: string;
    columns: TColumns[];
}

const boards: TBoard[] = [];

const getAll = async () => boards;

const getBoard = async (id: string) => boards.find(el => el.id === id)

const addBoard = async (board: TBoard) => {
    const length = boards.push(board);
    return boards[length - 1];
}

const updateBoard = async (id: string, data: TBoard) => {
    const index = boards.findIndex(el => el.id === id);
    if (index === -1) return null
    boards[index] = { ...data }
    return boards[index]
}

const deleteBoard = async (id: string) => {
    const index = boards.findIndex((el) => el.id === id)
    if (index === -1) return null
    return boards.splice(index, 1)[0]  
}

export default { getAll, addBoard, getBoard, updateBoard, deleteBoard };
