const fs = require('fs')
var DIRECTIONS = [ ]

const NODES = { }


function main() {

    processInput()
    
    const stepsByRoute = [ ]
    
    for (const id of Object.keys(NODES)) { 
    
        if (id[2] != "A") { continue }
                
        stepsByRoute.push(findStepsFor(id))
    }
        
    console.log("the answer is", lowestCommonMultiple(stepsByRoute))
}

function processInput() {

    const input = fs.readFileSync("./input.txt",'utf-8').trim()
    
    const [dir,__,...lines] = input.split("\r\n")
    DIRECTIONS = dir
    
    // const lines = parts.split("\r\n")
    for (const line of lines) { 
        const tokens = line.trim().split(" ")
        
        const id = tokens.shift()
        
        tokens.shift() // =
        
        const left = tokens.shift().substring(1, 4)

        const right = tokens.shift().substring(0, 3)

        NODES[id] = { left,right }
    }
}

function findStepsFor(nodeId) {

    let steps = 0
    
    let pointer = -1
    
    while (true) {
        
        pointer += 1
    
        let direction = DIRECTIONS[pointer]

        if (direction == undefined) { direction = DIRECTIONS[0]; pointer = 0 }

        steps += 1
    
        const node = NODES[nodeId]

        nodeId = (direction == "L") ? node.left : node.right
        
        if (nodeId[2] == "Z") { return steps }
    }    
} 

///////////////////////////////////////////////////////////

function lowestCommonMultiple(list) {

    let multiple = list[0]
    
    for (let n = 1; n < list.length; n++) {
    
        multiple = lcm(multiple, list[n])
    }
    
    return multiple

    function lcm(a, b) { return (a * b) / gcd(a, b) }

    function gcd(a, b) { return (b == 0) ? a : gcd(b, a % b) }
}    

main()