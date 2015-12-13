import { readFileSync } from 'fs'
import { chain } from 'lodash'

const lines = chain(readFileSync('day08/input.txt').toString().split('\n')).filter(l => l !== '')
const codeSize = lines.map(l => l.length).sum().value()
const memorySize = lines.map(l => eval(l).length).sum().value()
const recodedSize = lines.map(l => l.replace(/([\\"])/g, '\\$1').length + 2).sum().value()

console.log(codeSize, memorySize, recodedSize)
console.log(codeSize - memorySize)
console.log(recodedSize - codeSize)
