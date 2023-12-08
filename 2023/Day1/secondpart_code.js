input = require('./input');
const numbers = ['one','two','three','four','five','six','seven','eight','nine'];
const nums = ['1','2','3','4','5','6','7','8','9'];
let sum = 0;
input.module.forEach(element => {
    let firstDigit = '';
    let secondDigit = '';
    console.log(element);
    for (i = 0;i < element.length; i++){
        if (!isNaN(element[i])) {
            if(firstDigit == ''){
                console.log('!isNaN',element[i]);
                firstDigit = element[i];
            }
        }
        let index = 0;
        numbers.forEach(number=>{
            let lastIndex = i + number.length
            if(element.substring(i,lastIndex) == number){
                if(firstDigit == ''){
                    console.log(element.substring(i,lastIndex),number.split('').reverse().join(''),nums[index]);
                    firstDigit = nums[index]
                }
            }
            index++;
        })
    }
    let reversedArray = element.split('').reverse().join('');
    for (i = 0;i < reversedArray.length; i++){
        if (!isNaN(reversedArray[i])) {
            if(secondDigit == ''){
                console.log('!isNaN',reversedArray[i]);
                secondDigit = reversedArray[i];
            }
        }
        let index = 0;
        numbers.forEach(number=>{
            let lastIndex = i + number.length
            if(reversedArray.substring(i,lastIndex) == number.split('').reverse().join('')){
                if(secondDigit == ''){
                    console.log(reversedArray.substring(i,lastIndex),number.split('').reverse().join(''),nums[index]);
                    secondDigit = nums[index]
                }
            }
            index++;
        })
    }
    sum+= Number(firstDigit+secondDigit);
});
console.log(sum);