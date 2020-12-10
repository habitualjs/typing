import { Int } from '../../src/index'

// String representations are not allowed.
test('String is not Int', () => {
    expect(Int('1')).toBeUndefined()
})

// Check that NaN is not allowed.
test('NaN is not Int.', () => {
    expect(Int(NaN)).toBeUndefined()
})

// Check that floats are not allowed.
test('Float is not Int.', () => {
    expect(Int(1.1)).toBeUndefined()
    expect(Int(-4.234)).toBeUndefined()
})

// Check that booleans are not allowed.
test('Boolean is not Int.', () => {
    expect(Int(true)).toBeUndefined()
    expect(Int(false)).toBeUndefined()
})

// Check that infinity is not allowed.
test('Infinity is not Int.', () => {
    expect(Int(Infinity)).toBeUndefined()
    expect(Int(-Infinity)).toBeUndefined()
})

// Check that positive values are allowed.
test('Postive integers.', () => {
    expect(Int(1)).toBe(1)
    expect(Int(4321)).toBe(4321)
})

// Check that negative values are allowed.
test('Negative integers.', () => {
    expect(Int(-1)).toBe(-1)
    expect(Int(-43251)).toBe(-43251)
})

// Check that zero is allowed.
test('Zero.', () => {
    expect(Int(0)).toBe(0)
})

// Check undefined.
test('Int cannot be undefined.', () => {
    expect(Int(undefined)).toBeUndefined()
})

// Check null.
test('Int cannot be null.', () => {
    expect(Int(null)).toBeUndefined()
})
