import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("transactions.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS TRANSACTIONS (
        id INTEGER PRIMARY KEY NOT NULL,
        name VARCHAR(20) NOT NULL,
        type VARCHAR(10) NOT NULL,
        date VARCHAR(20) NOT NULL,
        quantity INTEGER NOT NULL,
        net REAL NOT NULL,
        tax REAL NOT NULL,
        brokerage REAL NOT NULL,
        pl REAL);`,
        [],
        (_, result) => resolve(result),
        (_, error) => console.log("error")
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS PORTFOLIO (
        id INTEGER PRIMARY KEY NOT NULL,
        name VARCHAR(20) NOT NULL,
        quantity INTEGER NOT NULL,
        avg REAL NOT NULL,
        pl REAL);`,
        [],
        (_, result) => resolve(result),
        (_, error) => console.log("error")
      );
    });
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

export const fetchStocks = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) =>
      tx.executeSql(
        `SELECT * FROM PORTFOLIO`,
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
        `INSERT INTO TRANSACTIONS (name, type, date, quantity, net, tax, brokerage, pl) 
        VALUES (?,?,?,?,?,?,?,?)`,
        [
          payload.name,
          payload.type,
          payload.date,
          payload.qty,
          payload.netAmt,
          payload.taxAmt,
          payload.brokerage,
          payload.pl ? payload.pl : null,
        ],
        (_, result) => resolve("SUCCESS"),
        (_, error) => reject(error)
      )
    );
  });

  return promise;
};

export const addStock = (payload) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) =>
      tx.executeSql(
        `INSERT INTO PORTFOLIO (name, quantity, avg) VALUES (?,?,?)`,
        [payload.name, payload.qty, payload.avg],
        (_, result) => resolve("SUCCESS"),
        (_, error) => reject(error)
      )
    );
  });

  return promise;
};

export const deleteTransactions = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) =>
      tx.executeSql(
        `DELETE FROM TRANSACTIONS`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    );
  });

  return promise;
};

export const deletePortfolio = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) =>
      tx.executeSql(
        `DELETE FROM PORTFOLIO`,
        [],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    );
  });

  return promise;
};

export const findStockByName = (stockName) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) =>
      tx.executeSql(
        `SELECT * FROM PORTFOLIO WHERE name=?`,
        [stockName],
        (_, result) => resolve(result.rows._array),
        (_, error) => reject(error)
      )
    );
  });

  return promise;
};

export const updatePortfolioAvg = (id, qty, avg) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) =>
      tx.executeSql(
        `UPDATE PORTFOLIO SET quantity=?, avg=? WHERE id=? `,
        [qty, avg, id],
        (_, result) => resolve("UPDATED AVG PRICE"),
        (_, error) => reject(error)
      )
    );
  });

  return promise;
};

export const updatePortfolioPL = (id, qty, pl) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) =>
      tx.executeSql(
        `UPDATE PORTFOLIO SET quantity=?, pl=? WHERE id=?`,
        [qty, pl, id],
        (_, result) => resolve("UPDATED PL"),
        (_, error) => reject(error)
      )
    );
  });

  return promise;
};

export const dropTrxTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) =>
      tx.executeSql(
        `DROP TABLE TRANSACTIONS`,
        [],
        (_, result) => console.log("TRX DROPPED"),
        (_, error) => reject(error)
      )
    );
  });

  return promise;
};

export const dropPortfolioTable = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) =>
      tx.executeSql(
        `DROP TABLE PORTFOLIO`,
        [],
        (_, result) => console.log("PORTFOLIO DROPPED"),
        (_, error) => reject(error)
      )
    );
  });

  return promise;
};
