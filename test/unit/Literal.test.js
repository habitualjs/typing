import { Literal, isa } from '../../src/index'

const Ten = Literal(10)

const config = { port: 9090, token: 'tok_123' }
const Config = Literal(config)

// Test value type literals.
test('Literal type has value of value type.', () => {
    expect(Ten.value).toBe(10)
})

test('Creating value literal from same value is allowed.', () => {
    expect(Ten(10)).toBe(10)
})

// Test reference type literals.
test('Reference type literals must be literally referenced.', () => {
    expect(Config({ port: 9090, token: 'tok_123' })).toBeUndefined()
})

test('Reference type literal from same object.', () => {
    expect(Config(config)).toBe(config)
})

test('value is reference to typed object.', () => {
    expect(Config.value).toBe(config)
})

test('Date Literal is reference type.', () => {
    const Epoch = Literal(new Date(0))

    expect(Epoch(new Date(0))).toBeUndefined()
    expect(isa(Epoch, Epoch.value)).toBe(true)
})

// Special values.
test('Literal cannot be undefined', () => {
    expect(() => Literal(undefined)).toThrowError()
})

test('Literal can be null', () => {
    const Null = Literal(null)

    expect(Null(null)).toBe(null)
    expect(isa(Null, null)).toBeTruthy()
})

test('Literal can be NaN', () => {
    const NotANumber = Literal(NaN)

    expect(NotANumber(NaN)).toBe(NaN)
    expect(isa(NotANumber, NaN)).toBeTruthy()
})

test('Literal can be Infinity', () => {
    const Inf = Literal(Infinity)

    expect(Inf(Infinity)).toBe(Infinity)
    expect(isa(Inf, Infinity)).toBeTruthy()
})