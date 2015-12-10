import fs from 'fs'

console.log(fs.readFileSync(__dirname + '/input.txt').toString()
    .split('\n')
    .map((d) => d.split('x'))
    .map(([ l, w, h ]) => 2 * (l*w + w*h + h*l) + Math.min(l*w, w*h, h*l))
    .reduce((c, n) => c + n))
