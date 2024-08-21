//CC#1
//CC#3
let dolphinsScore = [85, 54, 41];
let koalasScore = [23, 34, 27];
const calcAverage = (array) =>{ 
    let sum = 0;
    for (let i = 0; i < array.length; i++){
        sum += array[i];
    }
    return sum/array.length;
}
var dolphinsAverage = calcAverage(dolphinsScore);
var koalasAverage = calcAverage(koalasScore);

const checkWinner = (avgDolphins, avgKoalas) =>{
    if(avgDolphins >= 2*avgKoalas)
        console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
    else if(avgKoalas >= 2*avgDolphins)
        console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
    else
        console.log("No team wins");
}

checkWinner(dolphinsAverage, koalasAverage);