type Option<T> = undefined | T
type Cases<Case> = { [key: string]: Case }

export type Type = (something: any) => Option<any>
export type TypeValidator = (v: any) => boolean

// Returns a type based on the given validator.
export function TypeConstructor(validator: TypeValidator): Type {
    return v => validator(v) ? v : undefined
}

// Test if a value conforms to the given type.
export function isa(t: Type, value: any): boolean {
    const result = t(value)
    const typeName = t.name

    if (typeName.includes('Optional')) {
        if (value === undefined) return true
        else return result !== undefined
    } else {
        if (result === undefined) return false
        else return true
    }
}

//
// Core Type Builders.
//
export function Optional(base: Type): Type {
    const optionalType = TypeConstructor(v => v === undefined || base(v) !== undefined)
    Object.defineProperty(optionalType, 'name', { get: () => `Optional<${base.name}>` })

    return optionalType
}

export function And(...ts: Type[]): Type {
    return TypeConstructor(v => ts.every(t => isa(t, v)))
}

export function Or(...ts: Type[]): Type {
    return TypeConstructor(v => ts.findIndex(t => isa(t, v)) !== -1)
}

export function Not(t: Type): Type {
    return TypeConstructor(v => !isa(t, v))
}

//
// Basic Types.
//
// Mapped JS Value Types.
export const Bool = TypeConstructor(v => typeof v === 'boolean')

export const Num = TypeConstructor(v => typeof v === 'number' && !isNaN(v) && isFinite(v))
export const Int = And(Num, TypeConstructor(v => Number.isInteger(v)))
export const Float = Num
export const Str = TypeConstructor(v => typeof v === 'string')

export const Char = And(Str, TypeConstructor(v => v.length === 1))
export const Digit = And(Char, TypeConstructor(c => c >= '0' && c <= '9'))
export const LowercaseLetter = And(Char, TypeConstructor(c => {
    const charCode = c.charCodeAt(0)
    return c.charCodeAt(0) >= 97 && c.charCodeAt(0) <= 122
}))
export const UppercaseLetter = And(Char, TypeConstructor(c => {
    const charCode = c.charCodeAt(0)
    return charCode >= 65 && charCode <= 90
}))
export const Letter = Or(LowercaseLetter, UppercaseLetter)

export const Datetime = TypeConstructor(v => v instanceof Date && !isNaN(v.getTime()))

//
// Complex Types.
//
export function Literal<LiteralT>(literalValue: LiteralT): Type & { value: LiteralT } {
    if (literalValue === undefined) throw Error('undefined cannot be used as a Literal value.')

    const literalType = TypeConstructor((something: any) => Object.is(something, literalValue))
    Object.defineProperty(literalType, 'value', { get: () => literalValue })

    return literalType as Type & { value: LiteralT }
}

export function List(t: Type): Type {
    return TypeConstructor(v => Array.isArray(v) && v.every(e => isa(t, e)))
}

export function Tuple(...ts: Type[]): Type {
    return TypeConstructor(v => Array.isArray(v) && ts.length === v.length && ts.every((t, i) => isa(t, v[i])))
}

export function Obj(blueprint: { [key: string]: Type }): Type {
    const fields = Object.entries(blueprint)
    return TypeConstructor(v => v !== undefined && fields.every(([k, t]) => isa(t, v[k])))
}

export function Enum<Case>(cases: Cases<Case>): Type & { [K in keyof Cases<Case>]: Case } {
    const types = Object.values(cases).map(enumValue => Literal(enumValue))
    const EnumT = Or(...types)

    for (const [caseKey, enumValue] of Object.entries(cases)) {
        Object.defineProperty(EnumT, caseKey, { get: () => enumValue })
    }

    return EnumT as Type & { [K in keyof Cases<Case>]: Case }
}

export function MappedEnum<Case>(labels: string[], mapper: (label: string, index: number) => Case): Type & { [K in keyof Cases<Case>]: Case }  {
    const cases = {} as any
    let index = 0

    for (const label of labels) {
        cases[label] = mapper(label, index++)
    }

    return Enum(cases)
}

export function StrEnum(...labels: string[]) {
    return MappedEnum(labels, l => l)
}

export function IntEnum(...labels: string[]) {
    return MappedEnum(labels, (l, i) => i)
}

export function TemplateStr(...ts: Type[]) {
    return And(Str, TypeConstructor((s: string) => {
        if (ts.length !== s.length) return false
        return ts.every((t, i) => isa(t, s[i]))
    }))
}