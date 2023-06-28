import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("transactions.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) =>
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS TRANSACTIONS (
        id INTEGER PRIMARY KEY NOT NULL,
        name VARCHAR(20) NOT NULL,
        type VARCHAR(10) NOT NULL,
        date VARCHAR(20) NOT NULL,
        quantity INTEGER NOT NULL,
        net REAL NOT NULL,
        tax REAL NOT NULL,
        brokerage REAL NOT NULL);`,
        [],
        (_, result) => console.log("SUCCESS IN INIT"),
        (_, error) => console.log("error")
      )
    );
  });

  return promise;
}

export const fetchTransactions = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) =>
      tx.executeSql(
        `SELECT * FROM TRANSACTIONS`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    );
  });

  return promise;
};

export const addTransaction = (payload) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) =>
      tx.executeSql(
        `INSERT INTO TRANSACTIONS (name, type, date, quantity, net, tax, brokerage) VALUES (?,?,?,?,?,?,?)`,
        [
          payload.name,
          payload.type,
          payload.date,
          payload.qty,
          payload.netAmt,
          payload.taxAmt,
          payload.brokerage,
        ],
        (_, result) => resolve("SUCCESS"),
        (_, error) => reject(error)
      )
    );
  });

  return promise;
};
