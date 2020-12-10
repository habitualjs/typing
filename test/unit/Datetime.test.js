import { Datetime } from '../../src/index'

// Check cannot be created from numbers.
test('Number is not Datetime.', () => {
    expect(Datetime(0)).toBeUndefined()
})

// Check cannot be created from strings.
test('String is not Datetime.', () => {
    expect(Datetime('2020-01-01')).toBeUndefined()
})

// Check allows dates.
test('Date is Datetime.', () => {
    const d = new Date('2020-01-01')
    expect(Datetime(d)).toBe(d)
})

// Check disallows invalid dates.
test('Date is Datetime.', () => {
    expect(Datetime(new Date('abcdefghi'))).toBeUndefined()
})

// Check undefined.
test('Datetime cannot be undefined.', () => {
    expect(Datetime(undefined)).toBeUndefined()
})

// Check null.
test('Datetime cannot be null.', () => {
    expect(Datetime(null)).toBeUndefined()
})
