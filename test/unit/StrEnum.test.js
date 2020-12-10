import { Str, StrEnum } from '../../src/index'

test('Has proper Str cases.', () => {
    const Status = StrEnum('new', 'active', 'expired')

    expect(Status.new).toBe('new')
    expect(Status.active).toBe('active')
    expect(Status.expired).toBe('expired')

    expect(Status('new')).toBe('new')
    expect(Status('active')).toBe('active')
    expect(Status('expired')).toBe('expired')

    expect(Str(Status.new)).toBe('new')
    expect(Str(Status.active)).toBe('active')
    expect(Str(Status.expired)).toBe('expired')
})