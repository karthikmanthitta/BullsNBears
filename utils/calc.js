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
