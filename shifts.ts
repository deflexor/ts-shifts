import yargs = require('yargs')

// Synopsis:
// findShortestShifts([4,4,4,2,2,2,1,1,1,8,8])

type ShiftDir = 'Left' | 'Right'

type Shift = {
    dir: ShiftDir;
    arr: Array<number>;
}

function shiftl(xs: Array<number>): Array<number> {
    if (xs.length >= 2) {
        let [x, y] = [xs[0], xs[1]]
        if (x === y) {
            return [x + y, ...shiftl(xs.slice(2))]
        } else {
            return [x, ...shiftl(xs.slice(1))]
        }
    } else {
        return [...xs]
    }
}

function shiftr(xs: Array<number>): Array<number> {
    return shiftl(xs.slice().reverse()).slice().reverse()
}

function shiftable(xs: Array<number>): boolean {
    return shiftl(xs).length !== xs.length
}

function findShifts(xs: Array<number>, sh: Array<Shift>): Array<Shift> {
    if(! shiftable(xs)) {
        return [...sh]
    } else {
        let s = nextShift(xs)
        return findShifts(s.arr, [s, ...sh])
    }
}

function nextShift(xs: Array<number>): Shift {
    if (findLefts(0, xs) > findRights(0, xs)) {
        return { dir: 'Left', arr: shiftl(xs) }
    } else {
        return { dir: 'Right', arr: shiftr(xs) }
    }
}

function findLefts(n: number, xs: Array<number>): number {
    if (xs.length >= 3) {
        let [x, y, z] = [xs[0], xs[1], xs[2]]
        if (y === z && x === y + z) {
            return findLefts(n + 1, xs.slice(2))
        } else {
            return findLefts(n, xs.slice(1))
        }
    } else {
        return n
    }
}

function findRights(n: number, xs: Array<number>): number {
    return findLefts(n, xs.slice().reverse())
}

function findShortestShifts(xs: Array<number>): Array<Shift> {
    return findShifts(xs, []).reverse()
}

function isPowerOfTwo(x : number) {
    return (x !== 0) && ((x & (x - 1)) === 0);
}

// findShortestShifts([4, 4, 4, 2, 2, 2, 1, 1, 1, 8, 8])

let argv = yargs
    .usage("Usage: $0 4 4 4 8\nwhere 4 4 4 8 is a sequence of numbers to analyze")
    .argv;

if(argv._) {
    let numbers = []
    if(argv._.length === 1 && /^[ 0-9,]+$/.test(argv._[0])) {
        numbers = argv._[0].split(/,\s*/).map(n => +n)
    } else {
        if (argv._.every(x => typeof x === 'number')) {
            numbers = argv._.map(n => +n)
        } else {
            console.log("Arguments should be all numbers!")
        }
    }
    if (! numbers.every(isPowerOfTwo)) {
        console.log("Arguments should be numbers which are all power of two!")
    } else {
        let shifts = findShortestShifts(numbers)
        let report = ''
        if(shifts.length > 0) {
            report = String(numbers) + ' > '
        }
        report += shifts.map(sh => {
            return sh.dir + ' > ' + String(sh.arr)
        }).join(' > ')
        console.log(report)
    }
}

export { shiftl, shiftr, shiftable, findShifts, findLefts, findRights, nextShift }
