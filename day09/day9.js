import fs from 'fs'
import { chain, keys, extend, contains, last, rest } from 'lodash'

let lines = fs.readFileSync(__dirname + '/input.txt').toString().split('\n')

let data = lines.reduce((mapping, line) => {
    let match

    if (!(match = line.match(/(\w+) to (\w+) = (\d+)/))) return mapping

    let [_, originName, destName, distance] = match
    distance = parseInt(distance)

    return extend(mapping, {
        [originName]: extend(mapping[originName]||{}, {[destName]: distance}),
        [destName]: extend(mapping[destName]||{}, {[originName]: distance}),
    })
}, {})

let townWithout = (visited) => (c) => !contains(visited, c)

let shortest = (choices, total = 0, visited = ['']) => {

    let towns = chain(choices).filter(townWithout(visited))

    if (!towns.value().length) {
        return { distance: total, visited }
    }

    return towns
        .map((c) =>
            shortest(keys(data[c]), total + (data[c][last(visited)] ? data[c][last(visited)] : 0), [...visited, c]))
        .min((res) => res.distance).value()
}

let res = shortest(keys(data))
console.log(res.distance + ' : ' + rest(res.visited).join(' -> '))
