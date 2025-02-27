import {verbose} from 'sqlite3';
const sqlite = verbose();

export const db = new sqlite.Database('./src/db/database.db');
