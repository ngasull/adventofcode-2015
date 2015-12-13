import { readFileSync } from 'fs'
import { chain } from 'lodash'

const opsPart1 = {
  'turn on': () => 1,
  'turn off': () => 0,
  'toggle': s => (s + 1) % 2
}

const opsPart2 = {
  'turn on': s => s + 1,
  'turn off': s => Math.max(s - 1, 0),
  'toggle': s => s + 2
}

const SIZE = 1000
const state = Array(SIZE).fill().map(() => Array(SIZE).fill(0))

chain(readFileSync(__dirname + '/input.txt').toString().split('\n'))
  .map(l => l.match(/(turn on|turn off|toggle) ([0-9]+),([0-9]+) through ([0-9]+),([0-9]+)/))
  .filter(m => !!m)
  .map(([_, opStr, x1s, y1s, x2s, y2s]) => ({
    op: opsPart2[opStr],
    x1: parseInt(x1s), x2: parseInt(x2s),
    y1: parseInt(y1s), y2: parseInt(y2s) }))
  .map(({ op, x1, x2, y1, y2 }) => {
    for (let i = x1 ; i <= x2 ; i++)
      for (let j = y1 ; j <= y2 ; j++)
        state[i][j] = op(state[i][j])
  })
  .value()

const total = state.reduce((total, sl) => total + sl.reduce((c, s) => c + s, 0), 0)
console.log(total)
