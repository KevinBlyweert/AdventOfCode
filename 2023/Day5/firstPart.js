const fs = require('fs');
const input = fs.readFileSync('./input.txt','utf-8').split('\r\n');

function parse() {
    console.log(input);
    const [,seeds] = input[0].match(/seeds: (.*)/).map(n=>n.trim().split(' ').map(Number));
    console.log(seeds);
    const mapping = {}
    let currentSource, currentDestination
    for(let i=1;i<input.length;i++){
        if(input[i].includes('-to-')){
            const [,s,d] = input[i].match(/(\w*)-to-(\w*) map:/)
            currentSource = s.trim()
            currentDestination = d.trim()
            mapping[currentSource] = {
                [currentDestination]:[]
            }
        }else{
            if(input[i] !== ''){
                const [,d,s,l] = input[i].match(/(\d*) (\d*) (\d*)/).map(Number);
                mapping[currentSource][currentDestination].push({d,s,l})
            }
        }
    }
    return {mapping,seeds}
}

const {mapping,seeds = []} = parse();
// const transformation = {}
// seeds.forEach(seed => {
//     transformation[seed] = {seed}
// })
// let from = 'seed', to
// do{
//     to = Object.keys(mapping[from]).pop()
//     seeds.forEach(seed=>{
//         const value = transformation[seed][from]
//         console.log(value);
//         const match = mapping[from][to].find(m => m.s <= value && m.s + m.l > value)
//         transformation[seed][to] = match? match.d + (value - match.s):value
//         console.log(seed,to,transformation[seed][to]);
//     })
//     from = to
// }while(mapping[from])
// console.log(Math.min(...Object.values(transformation).map(t=>t.location)));
