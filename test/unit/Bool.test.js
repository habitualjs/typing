import { Bool } from '../../src/index'

// String representations are not allowed.
test('String is not Bool', () => {
    expect(Bool('true')).toBeUndefined()
    expect(Bool('false')).toBeUndefined()
})

// Int representatinos are not allowed.
test('Int is not Bool', () => {
    expect(Bool(0)).toBeUndefined()
    expect(Bool(1)).toBeUndefined()
})

// Check that booleans are not allowed.
test('Bool values.', () => {
    expect(Bool(true)).toBe(true)
    expect(Bool(false)).toBe(false)
})

// Check undefined.
test('Bool cannot be undefined.', () => {
    expect(Bool(undefined)).toBeUndefined()
})

// Check null.
test('Bool cannot be null.', () => {
    expect(Bool(null)).toBeUndefined()
})

