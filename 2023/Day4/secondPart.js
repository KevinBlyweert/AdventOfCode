const fs = require('fs');
const input = fs.readFileSync("./input.txt",'utf-8');
const cardNumber = input.split('\r\n').length;
// console.log(input.split('\r\n'));
function parse(){
    const entities = []
    for (const [x,line] of input.split('\r\n').entries()){
        const win = []
        const my = []
        const numbers = line.split(':')[1]
        const winNumbers = numbers.split('|')[0]
        const myNumbers = numbers.split('|')[1]
        for (const m of winNumbers.matchAll(/\d+/g)){
            console.log(m);
            win.push(parseInt(m[0]))
        }
        for (const m of myNumbers.matchAll(/\d+/g)){
            my.push(parseInt(m[0]))
        }
        entities.push({number:x+1,win,my,weight:1})
    }
    return entities;
}
let sum = 0;
const elements = parse();
elements.forEach(card=>{
    // console.log('number',card.number,'weight',card.weight);
    for(k=1;k<=card.weight;k++)
    {
        let index = 0;
        for(x of card.my){
        if (card.win.includes(x)){
            index++;
        }
        }
        // console.log(`${index} cartes gagnées sur carte ${card.number}`);
        for (i = card.number;i<card.number+index;i++){
            if (i<cardNumber){
            // console.log('number',elements[i].number,'weight',elements[i].weight);
            elements[i].weight++
            }
        }
    }
})
console.log(Object.values(elements).reduce((acc,{weight})=>{
    return acc + weight
},0));