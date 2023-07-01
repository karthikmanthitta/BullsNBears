import {
  addStock,
  findStockByName,
  updatePortfolioAvg,
  updatePortfolioPL,
} from "../db/database";

export const buyTrans = (total, tax, brk) => {
  return +total + +tax + +brk;
};

export const sellTrans = (total, tax, brk) => {
  return +total - +tax - +brk;
};

export const adjustPortfolio = (trxPayload) => {
  findStockByName(trxPayload.name)
    .then((response) => {
      if (response.length === 0) {
        addStock({
          name: trxPayload.name,
          qty: trxPayload.qty,
          avg: trxPayload.netAmt / +trxPayload.qty,
        })
          .then((response) => console.log("NEW STOCK ADDED"))
          .catch((error) => console.log(error));
      } else {
        calculatePL(response[0], a);
      }
    })
    .catch((error) => console.log(error));
};

const calculatePL = (current, trx) => {
  if (trx.type.toUpperCase() === "BUY") {
    let totalAmt = current.avg * current.quantity + trx.netAmt;
    let newQty = current.quantity + +trx.qty;
    let newAvgPrice = totalAmt / newQty;
    updatePortfolioAvg(current.id, newQty, newAvgPrice)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  } else {
    let avgSellAmt = trx.netAmt / +trx.qty;
    let newQty = current.quantity - +trx.qty;
    let plDiff;
    plDiff = +current.pl + avgSellAmt * +trx.qty;
    updatePortfolioPL(current.id, newQty, plDiff)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
};
