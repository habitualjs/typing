import { Optional, Int, isa } from '../../src/index'

const OptionalInt = Optional(Int)

test('Undefined allowed in Optional(T).', () => {
    expect(OptionalInt(undefined)).toBeUndefined()
    expect(isa(OptionalInt, undefined)).toBe(true)
})

test('Value allowed in Optional(T).', () => {
    expect(OptionalInt(1)).toBe(1)
})
