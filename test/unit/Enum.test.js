import { Enum, isa } from '../../src/index'

// Cases accessible on type.
test('Cases accessible on Enum.', () => {
    const cases = { new: 'new', active: 'active', expired: 'expired' }
    const UserStatus = Enum(cases)

    for (const key of Object.keys(cases)) {
        expect(UserStatus[key]).toBe(cases[key])
    }
})

// Value type enums match values.
test('Value cased Enum cases match other values.', () => {
    const cases = { new: 'new', active: 'active', expired: 'expired' }
    const UserStatus = Enum(cases)

    expect(UserStatus.expired).toBe('expired')
    expect(UserStatus('expired')).toBe('expired')
})

// Reference type enums only match themselves.
test('Reference cased Enum cases match only specific enum values.', () => {
    const cases = {
        one: [
            [1]
        ],
        two: [
            [1, 0],
            [0, 1]
        ],
        three: [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ]
    }

    const IdentityMatrix = Enum(cases)

    expect(IdentityMatrix(IdentityMatrix.one)).toBe(IdentityMatrix.one)
    expect(IdentityMatrix([
        [1, 0],
        [0, 1]
    ])).toBeUndefined()
})

// Enums with mixed types.
test('Enum with mixed types.', () => {
    const cases = {
        int: 0,
        float: 0,
        str: '',
        bool: false,
        datetime: new Date(0)
    }

    const Default = Enum(cases)

    expect(Default.int).toBe(0)
    expect(Default.str).toBe('')
    expect(Default(Default.datetime)).toBe(Default.datetime)
    expect(Default(new Date(0))).toBeUndefined()
})

// Enum case value cannot be undefined.
test('Enum case value cannot be undefined.', () => {
    const cases = {
        undef: undefined
    }

    expect(() => Enum(cases)).toThrowError()
})

// Enum case value can be null.
test('Enum case value can be null.', () => {
    const cases = {
        null: null
    }

    const E = Enum(cases)
    expect(E.null).toBe(null)
    expect(E(null)).toBe(null)
    expect(isa(E, null)).toBeTruthy()
})

// Enum case value can be NaN.
test('Enum case value can be NaN.', () => {
    const cases = {
        nan: NaN
    }

    const E = Enum(cases)
    expect(E.nan).toBe(NaN)
    expect(E(NaN)).toBe(NaN)
    expect(isa(E, NaN)).toBeTruthy()
})

// Enum case value can be Infinity
test('Enum case value can be Infinity.', () => {
    const cases = {
        inf: Infinity
    }

    const E = Enum(cases)
    expect(E.inf).toBe(Infinity)
    expect(E(Infinity)).toBe(Infinity)
    expect(isa(E, Infinity)).toBeTruthy()
})