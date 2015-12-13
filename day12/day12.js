import { readFileSync } from 'fs'
import { isNumber, isString, isArray, values, sum } from 'lodash'
let isPart2 = false
let sumLeaves = v => isNumber(v) ? v : isString(v) ? 0 : sum((isArray(v) ? v : isPart2 && values(v).indexOf("red")>-1 ? [] : values(v)).map(sumLeaves))
console.log(sumLeaves(JSON.parse(readFileSync('day12/input.txt').toString())))
