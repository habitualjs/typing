import { Digit } from '../../src/index'

const lowercase = 'abcdefghijklmnopqrstuvwxyz'
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const digits = '0123456789'

test('Reject lowercase letters', () => {
    for (const c of lowercase) {
        expect(Digit(c)).toBeUndefined()
    }
})

test('Reject uppercase letters', () => {
    for (const c of uppercase) {
        expect(Digit(c)).toBeUndefined()
    }
})

test('Allow all digits.', () => {
    for (const c of digits) {
        expect(Digit(c)).toBe(c)
    }
})