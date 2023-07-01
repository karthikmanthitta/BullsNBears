import {
  findStockById,
  updatePortfolioAvg,
  updatePortfolioPL,
} from "../db/database";

export const buyTrans = (total, tax, brk) => {
  return +total + +tax + +brk;
};

export const sellTrans = (total, tax, brk) => {
  return +total - +tax - +brk;
};

export const formatAmount = (amt) => {};

//snapshot of portfolio needed
//buy affects avg price
//per share cal needed

const add = () => {
  // const portfolio = all entries in portfolio table
  // get added trx values
  // get pershare from protfolio table
  // if new trx is buy, change avg price and portfolio
  //
};

export const adjustPortfolio = (trxPayload) => {
  console.log("trx payload", trxPayload);
  let a = {
    brokerage: "10",
    date: "Sat Jul 01 2023",
    name: "TEST",
    netAmt: 1020,
    qty: "10",
    taxAmt: "10",
    type: "buy",
  };

  findStockById(a.name)
    //handle empty
    .then((response) => {
      console.log("stock find result ", response[0]);
      calculatePL(response[0], a);
    })
    .catch((error) => console.log(error));
};

const calculatePL = (current, trx) => {
  console.log("current", current);
  let c = { avg: 1000, id: 1, name: "TEST", pl: null, quantity: 10 };
  let t = {
    brokerage: "10",
    date: "Sat Jul 01 2023",
    name: "TEST",
    netAmt: 1020,
    qty: "10",
    taxAmt: "10",
    type: "buy",
  };
  console.log("trx", trx);
  if (trx.type.toUpperCase() === "BUY") {
    let totalAmt = current.avg * current.quantity + trx.netAmt;
    let newQty = current.quantity + +trx.qty;
    let newAvgPrice = totalAmt / newQty;
    console.log("BUY ", newQty, " ", newAvgPrice);
    updatePortfolioAvg(current.id, newQty, newAvgPrice);
  } else {
    let avgSellAmt = trx.netAmt / +trx.qty;
    let newQty = current.quantity - +trx.qty;
    let plDiff;
    plDiff = +current.pl + avgSellAmt * +trx.qty;
    console.log("SELL ", newQty, " ", plDiff);
    updatePortfolioPL(current.id, newQty, plDiff);
  }
};
