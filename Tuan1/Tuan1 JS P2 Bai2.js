//CC#2
let bill = 125;
function calcTip(bill){
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
}
console.log(`The bill was ${bill}, the tip was ${calcTip(bill)}, and the total value ${bill + calcTip(bill)}`);

let bills = [125, 555, 44];
let tips = bills.map(calcTip);
console.log(tips);
let total = bills.map((bill, index) => bill + tips[index]);
console.log(total);