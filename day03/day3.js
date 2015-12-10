import fs from 'fs'

console.log(fs.readFileSync(__dirname + '/input.txt').toString().split('')
    .reduce(({ x, y, visited }, dir) => {
        switch(dir) {
            case '^': y += 1 ; break ;
            case '>': x += 1 ; break ;
            case 'v': y -= 1 ; break ;
            case '<': x -= 1 ; break ;
        }

        let code = `${x};${y}`
        if (visited.indexOf(code) < 0) {
            visited.push(code)
        }

        return { x, y, visited }
    }, { x: 0, y: 0, visited: [] })
    .visited
    .length)
