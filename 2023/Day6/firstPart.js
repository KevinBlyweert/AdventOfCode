const fs = require('fs');
const input = fs.readFileSync('./input.txt','utf-8');

function parse(){
    const entities = []
    const times = []
    const maxDist = []
    for (const [x,line] of input.split('\r\n').entries()){
        if(line.split(':')[0] == 'Time'){
            for(const number of line.split(':')[1].match(/(\d+)/gm)){
                times.push(parseInt(number));
            }
        }else{
            for(const number of line.split(':')[1].match(/(\d+)/gm)){
                maxDist.push(parseInt(number));
            }
        }
    }
    entities.push({times,maxDist})
    return entities;
}

const entities = parse();
let sum = 1;
for (let i=0;i<entities[0].times.length;i++){
    let goodTry = 0
    for (let j=0;j<entities[0].times[i];j++){
        if((entities[0].times[i]-j)*j > entities[0].maxDist[i]) goodTry++
    }
    sum *= goodTry
}
console.log(sum);