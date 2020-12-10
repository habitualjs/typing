import { Str } from '../../src/index'

// Cannot coalesce from other type.
test('No coalescing.', () => {
    expect(Str(1)).toBeUndefined()
    expect(Str(true)).toBeUndefined()
    expect(Str({})).toBeUndefined()
})

// Check empty string.
test('Str can be empty', () => {
    expect(Str('')).toBe('')
})

// Check single character string.
test('Single character Str.', () => {
    expect(Str('a')).toBe('a')
})

// Check long string.
test('Multi character Str.', () => {
    expect(Str('abcdefghi12345!?')).toBe('abcdefghi12345!?')
})

// Check undefined.
test('Str cannot be undefined.', () => {
    expect(Str(undefined)).toBeUndefined()
})

// Check null.
test('Str cannot be null.', () => {
    expect(Str(null)).toBeUndefined()
})
