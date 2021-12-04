const uuid = require('uuid');

class Task {
  constructor({
    id = uuid.v4(),
    title = 'super-task',
    order = 0,
    description = 'fix this bug',
    userId = null,
    boardId = null,
    columnId = null,
    
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toPero(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
