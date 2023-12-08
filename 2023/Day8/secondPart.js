const fs = require('fs');
const input = fs.readFileSync('./input.txt','utf-8');

const [directions,_,...lines] = input.split('\r\n');
const map = [];
const startsMap = [];
const endsMap = [];
const directionsArray = directions.split('')
lines.forEach(line=>{
    const [element,node] = line.split('=');
    // console.log(line,`'${element.trim().match(/..A/)}'`,node);
    for (const m of node.matchAll(/(...), (...)/gm)){
        let leftNode = m[1]
        let rightNode = m[2]
        if(element.trim().match(/..A/)) startsMap.push({element:element.trim(),leftNode,rightNode});
        else if (element.trim().match(/..Z/)) endsMap.push({element:element.trim(),leftNode,rightNode})
        map.push({element:element.trim(),leftNode,rightNode})
    };
})
let count = 0;
let endedPaths = [],index = 0,dir,from
while (endedPaths.length !== endsMap.length) {
    startsMap.forEach(path=>{
        dir = directionsArray[index]
        if (dir === 'L') path.element = map.find(elt=>elt.element == path.element).leftNode; else path.element = map.find(elt=>elt.element == path.element).rightNode;
        if(path.element.match(/..Z/)) endedPaths.push(path)
    })
    if (endedPaths.length !== endsMap.length) endedPaths = []
    index = index == directionsArray.length-1?0:index+1
    count++;
}
console.log(count);