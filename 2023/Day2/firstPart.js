const input = require('./input');
const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;
let sum = 0;

input.forEach(game=>{
    let possible = true;
    console.log(game.Game);
    game.shots.forEach(shot=>{
        console.log(shot);
        for (color in shot){
            console.log(color);
            if ((color == "red" && shot[color] > maxRed) || (color == "green" && shot[color] > maxGreen) || (color == "blue" && shot[color] > maxBlue)){
                console.log('impossible',color,shot[color]);
                possible = false;
            }
        }
    })
    sum += possible?game.Game:0;
    console.log(sum);
})

console.log(sum);