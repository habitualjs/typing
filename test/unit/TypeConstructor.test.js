import { isa, TypeConstructor } from '../../src/index'

test('Never allowed to contain undefined, unless using Optional(T)', () => {
    const T = TypeConstructor(v => true)

    expect(isa(T, undefined)).toBe(false)
    expect(isa(T, 0)).toBe(true)
})