import { isa, Not, TypeConstructor } from '../../src/index'

test('Self negation results in nothing type.', () => {
    const Any = TypeConstructor(v => true)
    const Nothing = Not(Any)

    expect(Nothing(0)).toBeUndefined()
    expect(isa(Nothing, undefined)).toBe(false)
    expect(isa(Nothing, null)).toBe(false)
})