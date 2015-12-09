import fs from 'fs'
import { indexBy, pick } from 'lodash'

let parseWire = (wire) => {
    let val = parseInt(wire)

    if (Number.isNaN(val)) {
        return `'${wire}'`
    } else {
        return val.toString()
    }
}

let lines = fs.readFileSync(__dirname + '/input.txt').toString().split('\n')
let signals = lines.map((line) => {

    let match = line.match(/(\w+(?: \w+)*) -> (\w+)/)

    if (!match) {
        console.warn("Line didn't match regex:", line)
        return {}
    }

    let [ _, operation, target ] = match
    let js = operation
        .toLowerCase()
        .replace(/^(\w+)$/, (_, wire) =>
            `${parseWire(wire)}`
        )
        .replace(/^(\w+) (\w+)$/, (_, gate, wire) =>
            `${gate}(${parseWire(wire)})`
        )
        .replace(/^(\w+) (\w+) (\w+)$/, (_, wire1, gate, wire2) =>
            `${gate}(${parseWire(wire1)}, ${parseWire(wire2)})`
        )

    return { operation, js, target }
})

let signalMap = indexBy(signals, 'target')
// console.log(signalMap)

// End of parsing
// vvv Eval Section vvv

let getValue = (wire) => {
    if (typeof wire === 'string') {
        if (signalMap[wire].value) {
            return signalMap[wire].value
        } else {
            signalMap[wire].value = NaN
            return signalMap[wire].value = getValue(eval(signalMap[wire].js))
        }
    } else {
        return wire
    }
}

let not = (w) =>
    ~ getValue(w)

let and = (w1, w2) =>
    getValue(w1) & getValue(w2)

let or = (w1, w2) =>
    getValue(w1) | getValue(w2)

let lshift = (w1, w2) =>
    getValue(w1) << getValue(w2)

let rshift = (w1, w2) =>
    getValue(w1) >>> getValue(w2)

console.log("Got it:", getValue('a'))
