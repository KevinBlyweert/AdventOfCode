const input = require('fs').readFileSync('example.txt','utf-8').split('\r\n');
const oldLines = input.map(line=>line.split(''))
let galaxies = [],pairs=[]

function calculateDist(){
    pairs.forEach(pair=>{
        let ship = {x:pair.first.x,y:pair.first.y}, arrived = false,move = 0;
        while (arrived == false){
            if (ship.x < pair.second.x){
                move++
                ship.x += 1
                if(ship.y < pair.second.y){
                    move++
                    ship.y += 1
                }
                if(ship.y > pair.second.y){
                    move++
                    ship.y -= 1
                }
            }
            if (ship.x > pair.second.x){
                move++
                ship.x -= 1
                if(ship.y < pair.second.y){
                    move++
                    ship.y += 1
                }
                if(ship.y > pair.second.y){
                    move++
                    ship.y -= 1
                }
            }
            if (ship.x == pair.second.x){
                if(ship.y < pair.second.y){
                    move++
                    ship.y += 1
                }
                if(ship.y > pair.second.y){
                    move++
                    ship.y -= 1
                }
            }
            if (ship.x == pair.second.x && ship.y == pair.second.y){
                arrived = true;
            }
        }
        pair.moves = move;
        console.log(pair);
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
    let columnToAdd = []
    for (let index = 0; index < oldLines[0].length; index++) {
        let lineArray = oldLines.map(line=>line[index])
        console.log(lineArray);
        isEmptyLine(lineArray)&&columnToAdd.unshift(index);
    }
    columnToAdd.forEach(index=>{
        oldLines.map(line=>{
            line.splice(index,0,'.')
        })
    })
    let lineToAdd = []
    oldLines.forEach((line,x)=>{
        isEmptyLine(line)&&lineToAdd.unshift(x);
    })
    let newLine = [...Array(oldLines[0].length)].map(elt=>'.')
    lineToAdd.forEach(index=>{
        oldLines.splice(index,0,newLine)
    })
}

expand();
getGalaxies();
getPairs();
calculateDist();
let sum = pairs.map(pair=>pair.moves).reduce((a,b)=>a+b)
console.log(sum);