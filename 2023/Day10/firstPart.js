const input = require('fs').readFileSync('./input.txt','utf-8').split('\r\n');
const oldLines = input.map(line=>line.split(''))
let sum = 0,currentValue ='S',currentX=0,currentY=0,previousDir = 0;
//previousdir[North = 1,East = 2,South = 3,West = 4]

function goNorth(newX,newY){
    previousDir = 3
    currentValue = lines[newX-1][newY]
    return {x:newX-1,y:newY}
}
function goEast(newX,newY){
    previousDir = 4
    currentValue = lines[newX][newY+1]
    return {x:newX,y:newY+1}
}
function goSouth(newX,newY){
    previousDir = 1
    currentValue = lines[newX+1][newY]
    return {x:newX+1,y:newY}
}
function goWest(newX,newY){
    previousDir = 2
    currentValue = lines[newX][newY-1]
    return {x:newX,y:newY-1}
}
function checkForStartValue(x,y){
    let [nortValue,eastValue,southValue,westValue] = [lines[x-1][y],lines[x][y+1],lines[x+1][y],lines[x][y-1]];
    let value = '';
    if(nortValue && eastValue && nortValue.match(/[|F7]/g) && eastValue.match(/[-J7]/g)) value = 'L'
    if(nortValue && southValue && nortValue.match(/[|F7]/g) && southValue.match(/[|JL]/g)) value = '|'
    if(nortValue && westValue && nortValue.match(/[|F7]/g) && westValue.match(/[-LF]/g)) value = 'J'
    if(eastValue && southValue && eastValue.match(/[-J7]/g) && southValue.match(/[|LJ]/g)) value = 'F'
    if(eastValue && westValue && eastValue.match(/[-J7]/g) && westValue.match(/[-LF]/g)) value = '-'
    if(southValue && westValue && southValue.match(/[|LJ]/g) && westValue.match(/[-LF]/g)) value = '7'
    return value
}
function walk({x,y}){
    // console.log(x,y,currentValue,previousDir);
    let positions = {}
    // let surroundValues = [lines[x-1][y]??undefined,lines[x][y+1]??undefined,lines[x+1][y]??undefined,lines[x][y-1]??undefined];
    if (currentValue !== 'S'){
    switch (currentValue) {
        case '|':
            switch (previousDir) {
                case 3:
                    positions = goNorth(x,y)
                    break;
                case 1:
                    positions = goSouth(x,y);
                    break;
                default:
                    positions = goNorth(x,y);
                    break;
            }
            break;
        case '-':
            switch (previousDir) {
                case 4:
                    positions = goEast(x,y);
                    break;
                case 2:
                    positions = goWest(x,y);
                    break;
                default:
                    positions = goEast(x,y);
                    break;
            }
            break;
        case 'L':
            switch (previousDir) {
                case 1:
                    positions = goEast(x,y);
                    break;
                case 2:
                    positions = goNorth(x,y);
                    break;
                default:
                    positions = goEast(x,y);
                    break;
            }
            break;
        case 'J':
            switch (previousDir) {
                case 1:
                    positions = goWest(x,y);
                    break;
                case 4:
                    positions = goNorth(x,y);
                    break;
                default:
                    positions = goWest(x,y);
                    break;
            }
            break;
        case '7':
            switch (previousDir) {
                case 3:
                    positions = goWest(x,y);
                    break;
                case 4:
                    positions = goSouth(x,y);
                    break;
                default:
                    positions = goWest(x,y);
                    break;
            }
            break;
        case 'F':
            switch (previousDir) {
                case 3:
                    positions = goEast(x,y);
                    break;
                case 2:
                    positions = goSouth(x,y);
                    break;
                default:
                    positions = goEast(x,y);
                    break;
            }
            break;
    }
    sum++
    currentX=positions.x
    currentY=positions.y
    }
}

function start(){
    let indexX = 0,indexY = 0;
    lines.forEach(line=>{
        if (line.find(char=>char==='S')){currentX = indexX;indexY = line.findIndex(char=>char==='S');}
        indexX++;
    })
    currentY = indexY
    currentValue = checkForStartValue(currentX,currentY);
    previousDir = undefined;
    // let positions = {x:currentX,y:currentY}
    while (currentValue !== 'S') {
        walk({x:currentX,y:currentY})
    }
}

let newLine = [...Array(oldLines[0].length)].map(elt=>'.')
oldLines.unshift(newLine);oldLines.push(newLine)
let lines = oldLines.map(line=>['.',...line,'.'])
start();
console.log(sum,sum/2);