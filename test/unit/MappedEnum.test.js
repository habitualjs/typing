import { MappedEnum } from '../../src/index'

// String enum.
test('StringEnum', () => {
    const Strings = MappedEnum(['abc', 'def', 'ghi'], l => l)

    expect(Strings.abc).toBe('abc')
    expect(Strings.def).toBe('def')
    expect(Strings.ghi).toBe('ghi')
})

// Mapped enum with value type cases.
test('MappedEnum with value type cases.', () => {
    const Compass = MappedEnum(['north', 'east', 'south', 'west'], (l, i) => i * 90)

    expect(Compass.north).toBe(0)
    expect(Compass.east).toBe(90)
    expect(Compass.south).toBe(180)
    expect(Compass.west).toBe(270)
})

// Mapped enum with reference type cases.
test('MappedEnum with reference type cases.', () => {
    const ZeroVectors = MappedEnum(['one', 'two', 'three'], (l, i) => new Array(i + 1).fill(0))

    expect(ZeroVectors.one).toEqual([0])
    expect(ZeroVectors.two).toEqual([0, 0])
    expect(ZeroVectors.three).toEqual([0, 0, 0])
})

// Mapped enum with mixed type cases.
test('MappedEnum with mixed type cases.', () => {
    const Defaults = MappedEnum(['int', 'str', 'datetime'], l => {
        switch(l) {
            case 'int': return 0
            case 'str': return ''
            case 'datetime': return new Date(0)
        }
    })

    expect(Defaults.int).toBe(0)
    expect(Defaults.str).toBe('')
    expect(Defaults(Defaults.datetime)).toBe(Defaults.datetime)
    expect(Defaults(new Date(0))).toBeUndefined()
})