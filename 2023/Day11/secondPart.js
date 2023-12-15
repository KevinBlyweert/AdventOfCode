const input = require('fs').readFileSync('input.txt','utf-8').split('\r\n');
const oldLines = input.map(line=>line.split(''))
let galaxies = [],pairs=[],emptyCols = [],emptyRows = [],coef = 1e6

function calculateDist(){
    pairs.forEach(pair=>{
        let ship = {x:pair.first.x,y:pair.first.y}, arrived = false,move = 0;
        while (arrived == false){
            if (ship.x != pair.second.x){
                if (ship.x < pair.second.x){
                    move += !emptyRows.includes(ship.x)?1:coef;
                    ship.x += 1
                }else{
                    move += !emptyRows.includes(ship.x)?1:coef;
                    ship.x -= 1
                }
            }else if (ship.y != pair.second.y){
                if (ship.y < pair.second.y){
                    move += !emptyCols.includes(ship.y)?1:coef;
                    ship.y += 1
                }else{
                    move += !emptyCols.includes(ship.y)?1:coef;
                    ship.y -= 1
                }
            }else if (ship.x == pair.second.x && ship.y == pair.second.y){
                arrived = true;
            }
        }
        pair.moves = move;
    })
}

function getGalaxies(){
    for (let x = 0; x < oldLines.length; x++) {
        for (let y = 0; y < oldLines[x].length; y++) {
            oldLines[x][y]!=='.'&&galaxies.push({name:galaxies.length+1,x,y});
        }
    }
}

function getPairs(){
    for (let index = 0; index < galaxies.length; index++) {
        if (index+1<galaxies.length){
            galaxies.slice(index+1).forEach(gal=>{
                pairs.push({first:galaxies[index],second:gal})
            })
        }
    }
}
function isEmptyLine(lineArray){
    let set = new Set(lineArray)
    return set.size===1
}

function expand(){
    for (let index = 0; index < oldLines[0].length; index++) {
        let lineArray = oldLines.map(line=>line[index])
        isEmptyLine(lineArray)&&emptyCols.push(index);
    }
    oldLines.forEach((line,x)=>{
        isEmptyLine(line)&&emptyRows.push(x);
    })
}

expand();
getGalaxies();
getPairs();
calculateDist();
let sum = pairs.map(pair=>pair.moves).reduce((a,b)=>a+b)
console.log(sum);