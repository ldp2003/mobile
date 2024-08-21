//CC#2

function bmi(mass, height){
    return mass/(height * height);
}
let markMass = 95;
let markHeight = 1.88;
let johnMass = 85;
let johnHeight = 1.76;
let markHigherBMI = bmi(markMass, markHeight) > bmi(johnMass, johnHeight);

if(markHigherBMI)
    console.log("Mark's BMI ("+ bmi(markMass, markHeight).toFixed(1) +") is higher than John's ("+bmi(johnMass, johnHeight).toFixed(1)+")!");
else   
    console.log("John's BMI ("+ bmi(johnMass, johnHeight).toFixed(1) +") is higher than Mark's ("+bmi(markMass, markHeight).toFixed(1)+")!");