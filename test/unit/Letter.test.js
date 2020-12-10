import { Letter } from '../../src/index'

const lowercase = 'abcdefghijklmnopqrstuvwxyz'
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const digits = '0123456789'

test('Reject digits.', () => {
    for (const c of digits) {
        expect(Letter(c)).toBeUndefined()
    }
})

test('Allow uppercase letters', () => {
    for (const c of uppercase) {
        expect(Letter(c)).toBe(c)
    }
})

test('Allow lowercase letters', () => {
    for (const c of lowercase) {
        expect(Letter(c)).toBe(c)
    }
})