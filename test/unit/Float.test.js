import { Float } from '../../src/index'

// String representations are not allowed.
test('String is not Float', () => {
    expect(Float('2.34')).toBeUndefined()
})

// Check that NaN is not allowed.
test('NaN is not Float.', () => {
    expect(Float(NaN)).toBeUndefined()
})

// Check that booleans are not allowed.
test('Boolean is not Float.', () => {
    expect(Float(true)).toBeUndefined()
    expect(Float(false)).toBeUndefined()
})

// Check that infinity is not allowed.
test('Infinity is not Float.', () => {
    expect(Float(Infinity)).toBeUndefined()
    expect(Float(-Infinity)).toBeUndefined()
})

// Check that positive values are allowed.
test('Postive numbers.', () => {
    expect(Float(1)).toBe(1)
    expect(Float(4321.342)).toBe(4321.342)
})

// Check that negative values are allowed.
test('Negative numbers.', () => {
    expect(Float(-1)).toBe(-1)
    expect(Float(-43251.2423)).toBe(-43251.2423)
})

// Check that zero is allowed.
test('Zero.', () => {
    expect(Float(0)).toBe(0)
})

// Check undefined.
test('Float cannot be undefined.', () => {
    expect(Float(undefined)).toBeUndefined()
})

// Check null.
test('Float cannot be null.', () => {
    expect(Float(null)).toBeUndefined()
})
