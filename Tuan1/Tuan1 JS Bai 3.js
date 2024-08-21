//CC#3
let dolphinsScore = [96, 108, 89];
let koalasScore = [88, 91, 110];
function avg(array){ 
    let sum = 0;
    for (let i = 0; i < array.length; i++){
        sum += array[i];
    }
    return sum/array.length;
}
let dolphinsAverage = avg(dolphinsScore);
let koalasAverage = avg(koalasScore);

function checkMinimum(array){
    for (let i = 0; i < array.length; i++){
        if (array[i] >= 100)
            return true;
    }
    return false;
}
let dolphinsMinimum = checkMinimum(dolphinsScore);
let koalasMinimum = checkMinimum(koalasScore);

if(dolphinsAverage > koalasAverage && dolphinsMinimum)
    console.log("Dolphins win");
else if(dolphinsAverage > koalasAverage && !dolphinsMinimum)
    console.log("Koalas wins");
else if (dolphinsAverage < koalasAverage && koalasMinimum)
    console.log("Koalas win");
else if (dolphinsAverage < koalasAverage && !koalasMinimum)
    console.log("Dolphins win");
else if(dolphinsAverage == koalasAverage && dolphinsMinimum && koalasMinimum)
    console.log("Draw");
else if(dolphinsAverage == koalasAverage && !dolphinsMinimum && koalasMinimum)
    console.log("Koalas win");
else if(dolphinsAverage == koalasAverage && dolphinsMinimum && !koalasMinimum)
    console.log("Dolphins win");
else
    console.log("No team wins");

