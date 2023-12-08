const fs = require('fs');
const input = fs.readFileSync('./input.txt','utf-8');
// function intervalsIntersection( [ startA, endA ], [ startB, endB ] ) {
// 	let intersection = null

// 	if ( endB < startA || startB > endA ) {
// 		//outside
// 	} else if ( startB <= startA ) {
// 		if ( endB <= endA ) {
// 			intersection = [ startA, endB ]
// 		} else {
// 			intersection = [ startA, endA ]
// 		}
// 	} else if ( startA < startB ) {
// 		if ( endB <= endA ) {
// 			intersection = [ startB, endB ]
// 		} else {
// 			intersection = [ startB, endA ]
// 		}
// 	}
//     return intersection
// }

// function parse() {
//     const [,seeds] = input[0].match(/seeds: (.*)/).map(n=>n.trim().split(' ').map(Number));
//     const mapping = {}
//     let currentSource, currentDestination
//     for(let i=1;i<input.length;i++){
//         if(input[i].includes('-to-')){
//             const [,s,d] = input[i].match(/(\w*)-to-(\w*) map:/)
//             currentSource = s.trim()
//             currentDestination = d.trim()
//             mapping[currentSource] = {
//                 [currentDestination]:[]
//             }
//         }else{
//             if(input[i] !== ''){
//                 const [,d,s,l] = input[i].match(/(\d*) (\d*) (\d*)/).map(Number);
//                 mapping[currentSource][currentDestination].push({d,s,l})
//             }
//         }
//     }
//     return {mapping,seeds}
// }

// const {mapping,seeds = []} = parse();
// const transformation = {}
// 	let from = 'seed', to

// 	transformation[ from ] = []
// 	seeds.forEach( ( seed, index ) => {
// 		/* create seed intervals */
// 		if ( index % 2 === 1 ) {
// 			transformation[ from ].push( {
// 				from: seeds[ index - 1 ],
// 				to: seeds[ index - 1 ] + seed - 1
// 			} )
// 		}
// 	} )

// 	transformation[ from ].sort( ( t1, t2 ) => t1.from - t2.from )

// 	do {
// 		to = Object.keys( mapping[ from ] ).pop()
// 		transformation[ to ] = []

// 		transformation[ from ].forEach( interval => {
// 			/* find the equavalent of the current transformation, but only on the area where we have seeds */
// 			let intervals = []
// 			mapping[ from ][ to ]
// 				.sort( ( m1, m2 ) => m1.s - m2.s )
// 				.forEach( m => {
// 					const intersection = intervalsIntersection( [ interval.from, interval.to ], [ m.s, m.s + m.l - 1 ] )

// 					if ( intersection ) {
// 						intervals.push( {
// 							from: intersection[ 0 ],
// 							to: intersection[ 1 ],
// 							delta: m.d - m.s
// 						} )
// 					}
// 				} )

// 			if ( intervals.length ) {
// 				intervals = intervals.sort( ( i1, i2 ) => i1.from + i1.delta - i2.from + i2.delta )
// 				/* outside the matched intervals, we have the same type of transformation */
// 				if ( intervals[ 0 ].from > interval.from ) {
// 					transformation[ to ].push( {
// 						from: interval.from,
// 						to: intervals[ 0 ].from - 1,
// 					} )
// 				}

// 				intervals.forEach( ( splitInterval, index ) => {
// 					if ( index > 0 && intervals[ index - 1 ].to !== splitInterval.from ) {
// 						/* same transformation if there is space between the intervals */
// 						transformation[ to ].push( {
// 							from: intervals[ index - 1 ].to + 1,
// 							to: splitInterval.from - 1,
// 						} )
// 					}

// 					/* only the matched intervals suffer transformation */
// 					transformation[ to ].push( {
// 						from: splitInterval.from + splitInterval.delta,
// 						to: splitInterval.to + splitInterval.delta,
// 					} )
// 				} )

// 				if ( intervals[ intervals.length - 1 ].to < interval.to ) {
// 					transformation[ to ].push( {
// 						from: intervals[ intervals.length - 1 ].to + 1,
// 						to: interval.to,
// 					} )
// 				}
// 			} else {
// 				/* nothing found, not transformation, interval stays the same */
// 				transformation[ to ].push( interval )
// 			}
// 		} )

// 		from = to
// 	} while ( mapping[ from ] )

// 	console.log( Math.min( ...transformation.location.map( l => l.from ) ) );

let map = {};
input.match(/([a-zA-Z].*):/gm).map(key => {
    const [, numbers] = new RegExp(`${key}\\s*(\\d+(?:\\s+\\d+)*)\\r\n`, "gm").exec(input);
    map[key.replace(/:|-|map|\s/gm, "")] = numbers.split("\n").map(item => item.split(" ").map(Number))
});

const initialSeeds = map.seeds[0];
delete map.seeds;
map = Object.values(map);

const seedRange = [];
for(let i = 0; i < initialSeeds.length - 1; i+=2){
    seedRange.push({
        start: initialSeeds[i],
        end: initialSeeds[i] + initialSeeds[i+1],
    });
}
const seedExist = seed => seedRange.some(({start, end}) => seed >= start && seed <= end);

const getSeedByLocation = (location) => {
    let result = location;
    for (const item of [...map].reverse()) {
        for (const [destination, source, range] of item) {
            if (destination <= result && destination + range > result) {
                result = source + result - destination;
                break;
            }
        }
    }

    return result;
}

for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
    const seed = getSeedByLocation(i);

    if (seedExist(seed)) {
        console.log(i);
        break;
    }
}