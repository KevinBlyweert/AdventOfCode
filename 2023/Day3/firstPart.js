const fs = require('fs');
const lines = fs.readFileSync('./input.js', 'utf8');

const adjacent = (numberEntity, symbolEntity) => {
  // Expand the number entity by one in each direction => point in a rectangle test.
  const x0 = numberEntity.x - 1
  const x1 = numberEntity.x + numberEntity.token.length
  const y0 = numberEntity.y - 1
  const y1 = numberEntity.y + 1
  return symbolEntity.x >= x0 && symbolEntity.x <= x1 && symbolEntity.y >= y0 && symbolEntity.y <= y1
}
function parse(){
    const entities = []
    for (const [y, line] of lines.split('\r\n').entries()) {
        for (const m of line.matchAll(/\d+/g))
        entities.push({ type: 'number', x: m.index, y, token: m[0], value: parseInt(m[0]) })
  
      for (const m of line.matchAll(/[^0-9\.]/g))
        entities.push({ type: 'symbol', x: m.index, y, token: m[0] })
    }
    return entities
}

const elements = parse();
const numbers = elements.filter(e => e.type === 'number');
const symbols = elements.filter(e => e.type === 'symbol');
const numbersSum = numbers.filter(n => symbols.some(s => adjacent(n, s))).map(n => n.value).reduce((a, b) => a + b, 0)
console.log(numbersSum);