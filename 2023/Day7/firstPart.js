const fs = require('fs');
const input = fs.readFileSync('./input.txt','utf-8');
const types = ['11111','2111','221','311','32','41','5'];
const cardNames = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];
const points = [2,3,4,5,6,7,8,9,10,11,12,13,14];

function parse(){
    const entities = []
    for (const [,line] of input.split('\r\n').entries()){
        entities.push({hand:line.split(' ')[0],bid:Number(line.split(' ')[1]),sorted:line.split(' ')[0].split('').sort((a,b)=>a.localeCompare(b,'fr',{numeric:true})).join('')})
    }
    return entities
}

function sortHands(cards){
    cards.forEach(card=>{
        card.points = []
        card.hand.split('').forEach(name=>{
            card.points.push(points[cardNames.indexOf(name)])
        })
        card.points = card.points.join(',')
    })
    return cards.sort((a,b)=>a.points.localeCompare(b.points,'fr',{numeric:true}))
}

const entities = parse();
entities.forEach(entity=>{
    const doneLetter = []
    const handType = []
    entity.sorted.split('').forEach(letter=>{
        if(!doneLetter.includes(letter)){
            // console.log(entity,letter,[...entity.sorted.matchAll(letter)].length)
            handType.push([...entity.sorted.matchAll(letter)].length)
        }
        doneLetter.push(letter)
    })
    handType.sort((a,b)=>b-a)
    entity.value = types.indexOf(handType.join(''));
})
const fives = sortHands(entities.filter(elt=>elt.value == 6))
const fours = sortHands(entities.filter(elt=>elt.value == 5))
const fulls = sortHands(entities.filter(elt=>elt.value == 4))
const three = sortHands(entities.filter(elt=>elt.value == 3))
const two = sortHands(entities.filter(elt=>elt.value == 2))
const one = sortHands(entities.filter(elt=>elt.value == 1))
const high = sortHands(entities.filter(elt=>elt.value == 0))
const sortedCards = [...high,...one,...two,...three,...fulls,...fours,...fives];
// console.log(sortedCards);
let sum = 0;
for (let index = 0; index < sortedCards.length; index++) {
    sum += sortedCards[index].bid * (index+1)
}
console.log(sum);