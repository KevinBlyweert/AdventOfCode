const input = require('fs').readFileSync('./input.txt','utf-8').split('\r\n');
const global = []
let sum = 0
for(line of input){
    let values = line.split(' ').map(elt=>Number(elt));
    global.push([values])
}

function isMonoNumbered(stepsArray) {
    let set = new Set(stepsArray);
    return set.size === 1;
  }

for (let index = 0; index < global.length; index++) {
    while (!isMonoNumbered(global[index][0])) {
        let steps = []
        for (let j = 0; j < global[index][0].length; j++) {
            if (j+1<global[index][0].length) steps.push(Number(global[index][0][j+1])-Number(global[index][0][j]))
        }
        global[index].unshift(steps)
    }
    global[index][0].push(global[index][0][0])
    while (global[index].length != 1) {
        global[index][1].push(global[index][1][global[index][1].length-1] + global[index][0].pop());
        global[index].shift()
    }
    sum += global[index][0].pop()
}

console.log('done',sum);