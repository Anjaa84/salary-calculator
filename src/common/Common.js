// export const addZeroes = (num) => {
//   if (num) {
//     var value = Number(num);

//     var res = num.split(".");

//     if (res.length == 1 || res[1].length < 3) {
//       value = value.toFixed(2);
//     }

//     return value;
//   }
//   return 0;
// };

export const getEarningTotalValue = (list) => {
  const sum = list?.reduce(
    (num, { earningValue }) => Number(num) + earningValue,
    0
  );
  return sum;
};

export const getDeductionTotalValue = (list) => {
  const sum = list?.reduce(
    (num, { deductionValue }) => Number(num) + deductionValue,
    0
  );
  return sum;
};
