import { Char, isa } from '../../src/index'

// Character.
test('Character', () => {
    expect(Char('a')).toBe('a')
    expect(Char('\n')).toBe('\n')
})

// Empty string is not a character.
test('Empty string is not a character.', () => {
    expect(Char('')).toBeUndefined()
})

// Str is not a character.
test('Str is not Char', () => {
    expect(Char('ab')).toBeUndefined()
})

// Char cannot be undefined.
test('Char cannot be undefined', () => {
    expect(isa(Char, undefined)).toBe(false)
})

// Char cannot be null.
test('Char cannot be null', () => {
    expect(isa(Char, null)).toBe(false)
})

// Char cannot be an integer.
test('Char cannot be an integer', () => {
    expect(isa(Char, 0)).toBe(false)
})

