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
          addTransaction({ ...trx, pl: isProfit ? trxPL : -trxPL })
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        })
        .catch((error) => console.log(error));
    }
  });

  return promise;
}

export const getTotalBuySellAmt = (type, pl, net, qty) => {
  let totalSellAmt = net;
  let totalBuyAmt = net;
  if (type.toUpperCase() === "SELL") {
    if (pl > 0) {
      totalBuyAmt = totalSellAmt - pl;
    } else {
      totalBuyAmt = totalSellAmt + -pl;
    }
    return [totalBuyAmt / +qty, totalSellAmt / +qty];
  } else {
    return [totalBuyAmt / +qty, 0];
  }
};

export const prepareDataObj = (data) => {
  let finalObj = [];
  data.forEach((entry) => {
    finalObj.push({ label: entry.name, value: entry.name });
  });
  return finalObj;
};

export const applyPredefinedPeriodFilter = (data, period) => {
  let final = data;
  let curr = new Date();
  switch (period) {
    case "today":
      final = final.filter(
        (entry) => new Date(entry.date).toDateString() === curr.toDateString()
      );
      break;
    case "week":
      let first = curr.getDate() - curr.getDay();
      let last = first + 6;

      let firstday = new Date(curr.setDate(first)).toUTCString();
      let lastday = new Date(curr.setDate(last)).toUTCString();

      final = final.filter(
        (entry) =>
          new Date(entry.date) >= new Date(firstday) &&
          new Date(entry.date) <= new Date(lastday)
      );
      break;
    case "month":
      final = final.filter(
        (entry) =>
          new Date(entry.date).getMonth() === curr.getMonth() &&
          new Date(entry.date).getFullYear() === curr.getFullYear()
      );
      break;
    case "year":
      final = final.filter(
        (entry) => new Date(entry.date).getFullYear() === curr.getFullYear()
      );
      break;
  }

  return final;
};

export const applyCustomPeriodFilter = (data, start, end) => {
  let final = data;
  final = final.filter(
    (entry) =>
      new Date(entry.date) >= new Date(start) &&
      new Date(entry.date) <= new Date(end)
  );

  return final;
};

export const applyTypeFilter = (data, type) => {
  let final = data;
  final = final.filter(
    (entry) => entry.type.toUpperCase() === type.toUpperCase()
  );

  return final;
};
