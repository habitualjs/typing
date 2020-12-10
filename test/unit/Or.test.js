import { Datetime, Float, Int, isa, List, Literal, Obj, Or, Str, Tuple, TypeConstructor } from '../../src/index'

test('Early exit.', () => {
    const Always = TypeConstructor(v => true)
    const Throws = TypeConstructor(v => {
        throw new Error()
    })

    const T = Or(Always, Throws)

    expect(T(0)).toBe(0)

    const RT = Or(Throws, Always)

    expect(() => RT(0)).toThrow()
})

test('Do not allow undefined in Unions.', () => {
    const Always = TypeConstructor(v => true)
    const T = Or(Always, Always)

    expect(isa(T, undefined)).toBe(false)
})

test('Unions of literals.', () => {
    const Bool = Or(Literal(true), Literal(false))
    
    expect(Bool(true)).toBe(true)
    expect(Bool(false)).toBe(false)
    expect(Bool(1)).toBeUndefined()
})

test('Unions of simple types.', () => {
    const Num = Or(Int, Float)

    expect(Num(0)).toBe(0)
    expect(Num(3.14)).toBe(3.14)
    expect(Num('1')).toBeUndefined()
})

test('Unions of complex types.', () => {
    const Point = Or(
        Obj({
            x: Int,
            y: Int
        }),
        Tuple(Int, Int)
    )

    const tPoint = [0, 0]
    const oPoint = { x: 0, y: 0 }

    expect(Point(tPoint)).toBe(tPoint)
    expect(Point(oPoint)).toBe(oPoint)

    const invalidPoint = { ...oPoint, x: undefined }

    expect(Point(invalidPoint)).toBeUndefined()
})

test('Unions of mixed types.', () => {
    const Any = Or(
        List(TypeConstructor(v => true)),
        Int,
        Str,
        Datetime
    )

    expect(Any([])).toEqual([])
    expect(Any(1)).toBe(1)
    expect(Any('')).toBe('')
    expect(Any(new Date(0).getTime())).toBe(new Date(0).getTime())
})

test('Unions of more than two types.', () => {
    const Value = Or(Int, Float, Str)
    
    expect(Value(1)).toBe(1)
    expect(Value(3.14)).toBe(3.14)
    expect(Value('Hello World')).toBe('Hello World')
    expect(Value([])).toBeUndefined()
    expect(Value({})).toBeUndefined()
})

