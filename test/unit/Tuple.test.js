import { Float, Int, Str, Tuple, Bool, TypeConstructor } from '../../src/index'

// Empty tuple type.
test('The empty Tuple.', () => {
    const nothing = []
    const EmptyTuple = Tuple()

    expect(EmptyTuple([1])).toBeUndefined()
    expect(EmptyTuple(nothing)).toBe(nothing)
})

// Single entry tuples.
test('Single entry Tuple.', () => {
    const AnInt = Tuple(Int)
    const i = [1]

    expect(AnInt(i)).toBe(i)
    expect(AnInt([undefined, 1])).toBeUndefined()
    expect(AnInt([])).toBeUndefined()
})

// Multi entry tuples.
// Like type tuples.
test('Multi-entry, like-type Tuple.', () => {
    const Point = Tuple(Int, Int)
    const point = [1,2]

    expect(Point(point)).toBe(point)
    expect(Point([undefined, 1])).toBeUndefined()
    expect(Point([1])).toBeUndefined()
})

// Unlike type tuples.
test('Multi-entry, unlike-type tuples.', () => {
    const Grade = Tuple(Str, Float, Bool)
    const grade = ['Jimmy', 0.52, true]

    expect(Grade(grade)).toBe(grade)
    expect(Grade(['Jimmy', '0.52', true])).toBeUndefined()
    expect(Grade(['Jimmy', true])).toBeUndefined()
})

// Tuple cannot be undefined.
test('Tuple cannot be undefined', () => {
    const Tup = Tuple(TypeConstructor(v => true))
    expect(Tup(null)).toBeUndefined()
})

// Tuple cannot be null.
test('Tuple cannot be undefined', () => {
    const Tup = Tuple(TypeConstructor(v => true))
    expect(Tup(null)).toBeUndefined()
})

// Cannot pass superset of tuple to subset type.
test('Superset Tuple is not of subset Tuple type.', () => {
    const Point2D = Tuple(Int, Int)
    const Point3D = Tuple(Int, Int, Int)

    const two = [0, 0]
    const three = [0, 0, 0]

    expect(Point2D(two)).toBe(two)
    expect(Point3D(three)).toBe(three)
    expect(Point2D(three)).toBeUndefined()
})

