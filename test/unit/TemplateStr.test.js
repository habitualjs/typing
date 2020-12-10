import { TemplateStr, Digit, UppercaseLetter } from '../../src/index'

test('Digit string.', () => {
    const ZipCode = TemplateStr(...new Array(5).fill(Digit))

    expect(ZipCode('90210')).toBe('90210')
    expect(ZipCode('9021')).toBeUndefined()
})

test('Letter string.', () => {
    const CountryCode = TemplateStr(UppercaseLetter, UppercaseLetter)

    expect(CountryCode('CA')).toBe('CA')
    expect(CountryCode('US')).toBe('US')
    expect(CountryCode('USA')).toBeUndefined()
})

test('Mixed digits and letters.', () => {
    const Ts = new Array(3).fill([UppercaseLetter, Digit]).flat()
    const PostalCode = TemplateStr(...Ts)

    expect(PostalCode('K0M2K4')).toBe('K0M2K4')
    expect(PostalCode('KKM2K4')).toBeUndefined()
    expect(PostalCode('')).toBeUndefined()
})