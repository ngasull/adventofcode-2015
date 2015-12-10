
let reduceChars = ({ out = [], prev, i }, n) => {
    if (prev && prev === n) {
        i++
    } else {
        if (prev)
            out.push(`${i}${prev}`)

        prev = n
        i = 1
    }

    return { out, prev, i }
}

let nextIteration = (iteration) =>
    [...iteration.split(''), null].reduce(reduceChars, {}).out.join('')

let iteration = '3113322113'
for (let i = 0 ; i < 40 ; i++) {
    iteration = nextIteration(iteration)
}

console.log('Got length', iteration.length)

// Or the regex way:
console.log(Array(40).fill().reduce((x) => x.replace(/(.)\1*/g, (m,n) => `${m.length}${n}`), '3113322113').length)
