// @ts-nocheck
import { app } from '@/index';

import { Database } from '@/db';

class UserModal {
  private readonly db: any;
  private readonly table: string;

  constructor(table) {
    this.db = new Database();
    this.table = table;
  }

  select = (columns: string, clause?: string) => {
    let query = `SELECT ${columns} FROM ${this.table}`;
    if (clause != null) query += clause;
    return this.db.query(query);
  };
}

export default UserModal;
