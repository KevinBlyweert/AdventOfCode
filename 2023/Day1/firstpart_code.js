input = require('./input');
let sum = 0;
input.module.forEach(element => {
    let firstDigit = 0;
    let secondDigit = 0;
    for (i = 0;i < element.length; i++){
        if (!isNaN(element[i])) {
            firstDigit = element[i];
            break;
        }
    }
    let reversedArray = element.split('').reverse().join('');
    for (i = 0;i < reversedArray.length; i++){
        if (!isNaN(reversedArray[i])) {
            secondDigit = reversedArray[i];
            break;
        }
    }
    sum+= Number(firstDigit+secondDigit);
});
console.log(sum);