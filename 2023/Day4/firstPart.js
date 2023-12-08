const fs = require('fs');
const input = fs.readFileSync("./input.txt",'utf-8');
function parse(){
    const entities = []
    for (const [x,line] of input.split('\r\n').entries()){
        const win = []
        const my = []
        const numbers = line.split(':')[1]
        const winNumbers = numbers.split('|')[0]
        const myNumbers = numbers.split('|')[1]
        for (const m of winNumbers.matchAll(/\d+/g)){
            win.push(parseInt(m[0]))
        }
        for (const m of myNumbers.matchAll(/\d+/g)){
            my.push(parseInt(m[0]))
        }
        entities.push({win,my})
    }
    return entities;
}
let sum = 0;
const elements = parse();
elements.forEach(card=>{
    let points = 0;
    for(x of card.my){
        if (card.win.includes(x)){
            points = points==0?points+1:points*2;
        }
    }
    sum+=points
})
console.log(sum);