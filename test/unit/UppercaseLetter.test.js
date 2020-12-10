import { UppercaseLetter } from '../../src/index'

const lowercase = 'abcdefghijklmnopqrstuvwxyz'
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const digits = '0123456789'

test('Reject lowercase letters', () => {
    for (const c of lowercase) {
        expect(UppercaseLetter(c)).toBeUndefined()
    }
})

test('Reject digits.', () => {
    for (const c of digits) {
        expect(UppercaseLetter(c)).toBeUndefined()
    }
})

test('Allow uppercase letters', () => {
    for (const c of uppercase) {
        expect(UppercaseLetter(c)).toBe(c)
    }
})