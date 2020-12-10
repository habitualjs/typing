import { Int, IntEnum } from '../../src/index'

test('Has proper Int cases.', () => {
    const Status = IntEnum('new', 'active', 'expired')

    expect(Status.new).toBe(0)
    expect(Status.active).toBe(1)
    expect(Status.expired).toBe(2)

    expect(Status(0)).toBe(0)
    expect(Status(1)).toBe(1)
    expect(Status(2)).toBe(2)

    expect(Int(Status.new)).toBe(0)
    expect(Int(Status.active)).toBe(1)
    expect(Int(Status.expired)).toBe(2)
})