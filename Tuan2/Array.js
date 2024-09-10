//Map: tạo mảng mới bằng cách thực thi hàm đối với mỗi phần tử trong mảng
var number1 =[45,11,25,10];
var number2 = number1.map(myFunction);

function myFunction(value){
    return value * 2;
}

console.log(number2)

//Filter: tạo mảng mới với những phần tử đủ điều kiện
myFunction = (value) => {
    return value > 18;
}

var number3 = number1.filter(myFunction);

console.log(number3)

//Reduce: chạy hàm với mỗi phần tử để tạo ra một giá trị, thực hiện từ trái sang phải (phải sang thì xài reduceRight)
myFunction = (total, value) => {
    return total + value ;
}

var sum = number1.reduce(myFunction);

console.log('Total is ' + sum);

//Every: trả về true nếu toàn bộ phần tử đủ điều kiện
myFunction = (value) => {
    return value > 18;
}

var allGood = number1.every(myFunction)
var allGood2 = number2.every(myFunction)

console.log('All number in number1 is over 18? '+ allGood);
console.log('Number 2? '+ allGood2);

//Some: trả về true nếu có một phần tử dủ điều kiện
var someGood = number1.some(myFunction)

console.log('Some number in number1 is over 18? ' + someGood);

//flatMap: Maps mọi phần tử trong mảng sau đó tạo mảng mới bằng cách làm phẳng (flat) mảng

const newArr = number1.flatMap(x => [x, x*10])
console.log(newArr)
