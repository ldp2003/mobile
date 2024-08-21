//CC#3
let mark = {
    fullName: "Mark Miller", 
    mass: 78,
    height: 1.69,
    calcBMI: function(){
        this.BMI = this.mass / (this.height * this.height);
        return this.BMI;
    }
};
let john = {
    fullName: "John Smith",
    mass: 92,
    height: 1.95,
    calcBMI: function(){
        this.BMI = this.mass / (this.height * this.height);
        return this.BMI;
    }
};

if(mark.calcBMI>john.calcBMI)
    console.log(`${mark.fullName}'s BMI (${mark.calcBMI().toFixed(1)}) is higher than ${john.fullName}'s (${john.calcBMI().toFixed(1)})`);
else
    console.log(`${john.fullName}'s BMI (${john.calcBMI().toFixed(1)}) is higher than ${mark.fullName}'s (${mark.calcBMI().toFixed(1)})`);