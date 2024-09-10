//CC#4

var bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

var tips =[];
var totals =[];

function calcTip(bill){
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
}

for(var i = 0; i<10; i++){
    tips.push(calcTip(bills[i]));
    totals.push(bills[i] + calcTip(bills[i]));
}

console.log(tips)
console.log(totals)

function calcAverage(Arr){
    var sum = 0;
    for(var i = 0; i<Arr.length; i++)
        sum+=Arr[i];
    return sum/Arr.length;
}

console.log(calcAverage(totals))