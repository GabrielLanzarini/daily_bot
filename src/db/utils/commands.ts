import {db} from '../connect';

export const dbRunner = async (query: string, values?: any[]) => {
  return new Promise((resolve, reject) => {
    db.run(query, values, (err) => {
      if (err) return reject(err);
      resolve(true);
    });
  });
};

export const dbQuery = async (query: string, values?: any[]) => {
  return new Promise((resolve, reject) => {
    db.get(query, values, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

export const dbQueryAll = async (query: string, values?: any[]) => {
  return new Promise((resolve, reject) => {
    db.all(query, values, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};
