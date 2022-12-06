


export const getEarningTotalValue = (list) => {
  const sum = list.reduce(
    (num, { earningValue }) => Number(num) + Number(removeComma(earningValue)),
    0
  );
  return parseFloat(sum).toFixed(2);
};

export const getDeductionTotalValue = (list) => {
  const sum = list.reduce(
    (num, { deductionValue }) => Number(num) + Number(removeComma(deductionValue)),
    0
  );
  return sum;

};


export const currencyMask = (e) => {
 let value = e.target.value;


 e.target.value = value;
 return e;

};

export const removeComma = num => num?.replace(/,/g, '');


