import { LowercaseLetter } from '../../src/index'

const lowercase = 'abcdefghijklmnopqrstuvwxyz'
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const digits = '0123456789'

test('Reject digits.', () => {
    for (const c of digits) {
        expect(LowercaseLetter(c)).toBeUndefined()
    }
})

test('Reject uppercase letters', () => {
    for (const c of uppercase) {
        expect(LowercaseLetter(c)).toBeUndefined()
    }
})

test('Allow lowercase letters', () => {
    for (const c of lowercase) {
        expect(LowercaseLetter(c)).toBe(c)
    }
})