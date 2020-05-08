// Synopsis:
// findShortestShifts([4,4,4,2,2,2,1,1,1,8,8])

type ShiftDir = 'SLeft' | 'SRight'

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
    return shiftl(xs.reverse()).reverse()
}

function shiftable(xs: Array<number>): boolean {
    return shiftl(xs).length !== xs.length
}

function findShifts(xs: Array<number>, sh: Array<Shift>): Array < Shift > {
    if(! shiftable(xs)) {
        return [...sh]
    } else {
        let s = nextShift(xs)
        return findShifts(s.arr, [s, ...sh])
    }
}

function nextShift(xs: Array<number>): Shift {
    if (findLefts(0, xs) > findRights(0, xs)) {
        return { dir: 'SLeft', arr: shiftl(xs) }
    } else {
        return { dir: 'SRight', arr: shiftr(xs) }
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
    return findLefts(n, xs.reverse())
}

function findShortestShifts(xs: Array<number>): void {
    let sh = findShifts(xs, []).reverse()
    console.log(sh)
}

// findShortestShifts([4, 4, 4, 2, 2, 2, 1, 1, 1, 8, 8])

export { shiftl, shiftr, shiftable, findShifts, findLefts, findRights, nextShift }
