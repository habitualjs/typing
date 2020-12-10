import { And, TypeConstructor, Obj, Int } from '../../src/index'

test('Early exit.', () => {
    const Never = TypeConstructor(v => false)
    const Throws = TypeConstructor(v => {
        throw new Error()
    })

    const T = And(Never, Throws)

    T(0)

    const RT = And(Throws, Never)

    expect(() => RT(0)).toThrow()
})

test('Field composition.', () => {
    const X = Obj({ x: Int })
    const Y = Obj({ y: Int })

    const Point = And(X, Y)

    const x = { x: 0 }
    const origin = { x: 0, y: 0 }

    expect(X(x)).toBe(x)
    expect(Point(x)).toBeUndefined()

    expect(X(origin)).toBe(origin)
    expect(Point(origin)).toBe(origin)
})