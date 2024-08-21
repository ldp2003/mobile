//CC#4
var bill = 275;
function tip() { 
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
}
console.log(`The bill was ${bill}, the tip was ${tip()}, and the total value is ${bill + tip()}`);
bill = 40;
console.log(`The bill was ${bill}, the tip was ${tip()}, and the total value is ${bill + tip()}`);
bill = 430;
console.log(`The bill was ${bill}, the tip was ${tip()}, and the total value is ${bill + tip()}`);
