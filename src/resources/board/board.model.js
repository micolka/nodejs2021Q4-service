const uuid = require('uuid');

class Board {
  constructor({
    id = uuid.v4(),
    title = 'BOARD123',
    columns = [],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
