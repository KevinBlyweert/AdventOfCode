const fs = require('fs');
const input = fs.readFileSync('./input.txt','utf-8');

const [directions,empty,...lines] = input.split('\r\n');
const map = [];
const directionsArray = directions.split('')
lines.forEach(line=>{
    const [element,node] = line.split('=');
    // console.log(line,`'${element.trim()}'`,node);
    for (const m of node.matchAll(/([A-Z]{3}), ([A-Z]{3})/gm)){
        let leftNode = m[1]
        let rightNode = m[2]
        map.push({element:element.trim(),leftNode,rightNode})
    };
})
let count = 0;
let from = 'AAA',index = 0,dir;
do{
    dir = directionsArray[index]
    if (dir === 'L') from = map.find(elt=>elt.element == from).leftNode; else from = map.find(elt=>elt.element == from).rightNode;
    index = index == directionsArray.length-1?0:index+1
    count++;
}while (from !== 'ZZZ')
console.log(count);