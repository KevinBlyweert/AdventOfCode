const input = require('./input');
const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;
let sum = 0;
let power = 0;

input.forEach(game=>{
    // console.log(game.Game,game.shots);
    let minRed = 0;
    let minBlue = 0;
    let minGreen = 0;
    let blues = [];
    let greens = [];
    let reds = [];
    game.shots.forEach(shot=>{
        // console.log(shot);
        for (color in shot){
            // console.log(color);
            switch (color) {
                case "red":
                    minRed = shot[color]>minRed?shot[color]:minRed
                    // console.log(shot[color],minRed);
                    reds.push(shot[color])
                    break;
                case "blue":
                    minBlue = shot[color]>minBlue?shot[color]:minBlue
                    // console.log(shot[color],minBlue);
                    blues.push(shot[color])
                    break;
                case "green":
                    minGreen = shot[color]>minGreen?shot[color]:minGreen
                    // console.log(shot[color],minGreen);
                    greens.push(shot[color])
                    break;
                default:
                    break;
            }
        }
    })
    power = minRed * minBlue * minGreen;
    // console.log("blues",blues,"reds",reds,"greens",greens);
    console.log(power,"minBlue",minBlue,"minRed",minRed,"minGreen",minGreen);
    sum+=power;
    console.log(sum);
})

console.log(sum);