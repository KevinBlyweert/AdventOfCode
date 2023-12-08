const fs = require('fs');
const input = fs.readFileSync('./input.txt','utf-8');

function parse(){
    const entities = []
    let times = 0
    let maxDist = 0
    for (const [x,line] of input.split('\r\n').entries()){
        if(line.split(':')[0] == 'Time'){
            console.log(line.split(':')[1].match(/(\d+)/gm));
            times = Number(line.split(':')[1].match(/(\d+)/gm).join(''));
        }else{
            maxDist = Number(line.split(':')[1].match(/(\d+)/gm).join(''));
        }
    }
    entities.push({times,maxDist})
    return entities;
}

const entities = parse();
let sum = 0;
for (let j=0;j<entities[0].times;j++){
    if((entities[0].times-j)*j < entities[0].maxDist){
        sum++;
    }else break;
}
const tries = entities[0].times - 2*sum +1
console.log(tries);