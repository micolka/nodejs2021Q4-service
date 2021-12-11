import * as uuid from 'uuid';

export default class Board {
  id: string;

  title: string;

  columns: string[];

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

export type TBoardClass = typeof Board