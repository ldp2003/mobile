//CC#1

function bmi(mass, height){
    return mass/(height * height);
}
let markMass = 95;
let markHeight = 1.88;
let johnMass = 85;
let johnHeight = 1.76;
let markHigherBMI = bmi(markMass, markHeight) > bmi(johnMass, johnHeight)
console.log(markHigherBMI)