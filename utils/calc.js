import {
  addStock,
  addTransaction,
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

export async function adjustPortfolio(trxPayload) {
  const promise = new Promise((resolve, reject) =>
    findStockByName(trxPayload.name)
      .then((response) => {
        if (response.length === 0) {
          addStock({
            name: trxPayload.name,
            qty: trxPayload.qty,
            avg: trxPayload.netAmt / +trxPayload.qty,
          })
            .then((response) => {
              addTransaction(trxPayload)
                .then((response) => resolve(response))
                .catch((error) => reject(error));
            })
            .catch((error) => reject(error));
        } else {
          calculatePL(response[0], trxPayload)
            .then((response) => resolve("PL calculated"))
            .catch((error) => reject(error));
        }
      })
      .catch((error) => reject(error))
  );

  return promise;
}

async function calculatePL(current, trx) {
  const promise = new Promise((resolve, reject) => {
    if (trx.type.toUpperCase() === "BUY") {
      let totalAmt = current.avg * current.quantity + trx.netAmt;
      let newQty = current.quantity + +trx.qty;
      let newAvgPrice = totalAmt / newQty;
      updatePortfolioAvg(current.id, newQty, newAvgPrice)
        .then((response) => {
          addTransaction(trx)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        })
        .catch((error) => console.log(error));
    } else {
      let avgSellAmt = trx.netAmt / +trx.qty;
      let newQty = current.quantity - +trx.qty;
      let plDiff;
      let isProfit = avgSellAmt > current.avg;
      let trxPL;
      if (isProfit) {
        trxPL = avgSellAmt * +trx.qty - current.avg * +trx.qty;
        plDiff = +current.pl + trxPL;
      } else {
        trxPL = current.avg * +trx.qty - avgSellAmt * +trx.qty;
        plDiff = +current.pl - trxPL;
      }
      updatePortfolioPL(current.id, newQty, plDiff)
        .then((response) => {
          console.log(response);
          addTransaction({ ...trx, pl: isProfit ? trxPL : -trxPL })
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        })
        .catch((error) => console.log(error));
    }
  });

  return promise;
}

const getTotalBuySellAmt = (type, pl, net, qty) => {
  let totalSellAmt = net;
  let totalBuyAmt;
  if (type.toUpperCase() === "SELL") {
    if (pl > 0) {
      totalBuyAmt = totalSellAmt - pl;
    } else {
      totalBuyAmt = totalSellAmt + pl;
    }
    return [totalBuyAmt / +qty, totalSellAmt / +qty];
  } else {
    return [totalBuyAmt / +qty, 0];
  }
};
