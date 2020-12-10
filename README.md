# @habitual/typing

The @habitual/typing library is designed to provide dynamic (runtime) type checking for applications that perform input validation, or applications that require extreme flexibility and specificity in modeling their problem domain.

### Installation
```
npm install @habitual/typing
```

## Building Runtime Type Checkers
The library provides functionality for defining runtime types from a large selection of predefined basic and complex elements such as Integers, Strings, Lists, Tuples, Objects, Enums, and more.

### **Example**
#### **Define (runtime) types...**
```ts
// More imports available. See 'API'.
import { 
    isa, 
    Optional,
    Int, 
    Float,
    Digit,
    Str,
    TemplateStr,
    Datetime, 
    List, 
    Tuple, 
    Obj, 
    IntEnum, 
    StrEnum
} from '@habitual/typing'

// Runtime type definitions.
const SubscriptionStatus = IntEnum('active', 'past_due', 'expired')

const CreditCard = Obj({
    brand: Optional(StrEnum('visa', 'mastercard', 'amex')),
    last4: TemplateStr(Digit, Digit, Digit, Digit),
    expiry: Tuple(Int, Int) //month, year
})

const Customer = Obj({
    id: Int,
    name: Str,
    rating: Float,
    signedUpAt: Datetime,
    subscriptionStatus: SubscriptionStatus,
    paymentMethods: List(CreditCard),
})
```

#### **...then use them to validate runtime values.**
```ts
const aCustomer = {
    id: 10,
    name: 'Gillian',
    rating: 0.24,
    signedUpAt: new Date(),
    subscriptionStatus: 1,
    paymentMethods: [
        {
            brand: 'amex',
            last4: '1123',
            expiry: [10, 22]
        },
        {
            last4: '2943',
            expiry: [7, 21]
        }
    ]
}

// Two ways to check if value is valid (according to Type).
// 1.
if (isa(Customer, aCustomer)) {
    // aCustomer is a Customer.
}

// 2.
const validatedCustomer = Customer(aUser)
if (validatedCustomer === undefined) {
    // validatedCustomer is not a Customer.
    // note: be careful when using this form with Optional(...) types.
}
```

## About `undefined`
Runtime types are defined such that the `undefined` value is not a member of the type.  To allow a value to be `undefined`, specify its type as `Optional(T)` instead of `T` (where `T` is a runtime type).

# API
## Basic Types
### `Bool`
Allows any boolean value.

### `Char`
Allows a single character.

### `Digit`
Allows a single decimal digit.

```ts
isa(Digit, '4') //true
isa(Digit, '12') //false
isa(Digit, 4) //false
```

### `Float`
Allows any non-`null`, non-`NaN` finite number value.

### `Int`
Allows any non-`null`, non-`NaN` finite integer number value.

### `Letter`
Allows a single ASCII letter.

```ts
isa(Letter, 'a') //true
isa(Letter, 'A') //true
isa(Letter, '4') //false
```

### `Literal(v: any)`
Allows the specific value `v`.

```ts
const Zero = Literal(0)

isa(Zero, 0) //true
isa(Zero, 1) //false

Zero.value === 0 //true
```

### `LowercaseLetter`
Allows a single lowercase ASCII letter.

```ts
isa(LowercaseLetter, 'a') //true
isa(LowercaseLetter, 'A') //false
isa(LowercaseLetter, '4') //false
```

### `Str`
Allows any string value.


### `UppercaseLetter`
Allows a single uppercase ASCII letter.

```ts
isa(LowercaseLetter, 'a') //false
isa(LowercaseLetter, 'A') //true
isa(LowercaseLetter, '4') //false
```

___

## Composite Types
### `TemplateStr(...T)`
Allows a string where each character has the type of its corresponding element in `...T`.

```ts
const PostalCode = TemplateStr(Letter, Digit, Letter, Digit, Letter, Digit)
isa(PostalCode, 'k1M2f4') // true
isa(PostalCode, 'k122f4') // false

const ZipCode = TemplateStr(new Array(5).fill(Digit))
isa(ZipCode, '90210') // true
```

### `Tuple(...T)`
Allows an array with in-place values defined by the runtime types `...T`.

```ts
const Point = Tuple(Float, Float)
const Point3D = Tuple(Float, Float, Float)

isa(Point, [0, 0]) //true
isa(Point3D, [0, 0, 3.14]) //true
```

### `List(T)`
Allows an array containing zero or elements that each conform to the runtime type `T`.

```ts
const Points = List(Tuple(Float, Float))

isa(Points, [ [0,0], [1,2] ]) //true
```

### `Obj(blueprint: { [key: string]: T })`
Allows an object containing keys with the corresponding runtime types in the given blueprint.

```ts
const Point = Obj({
    x: Float,
    y: Float
})

const Point3D = Obj({
    x: Float,
    y: Float,
    z: Float
}

isa(Point, { x: 0, y: 0 }) // true
isa(Point, { x: 0, y: 0, z: 0 }) // true

isa(Point3D, { x: 0, y: 0 }) // false
isa(Point3D, { x: 0, y: 0, z: 0 }) // true
```

### `Enum(cases: { [key: string]: any })`
Allows any one of the literal values specified by `cases`.

```ts
const Defaults = Enum({
    int: 0,
    str: '',
    datetime: new Date(0)
})

isa(Defaults, Defaults.datetime) //true
isa(Defaults, new Date(0)) //false

isa(Defaults, Defaults.int) //true
isa(Defaults, 0)) //true
```

### `MappedEnum(cases: string[], mapper: (label: string, index: number) => any)`
Allows any one of the literal values mapped from `cases` by `mapper`.

```ts
const Compass = MappedEnum(['north', 'east', 'south', 'west'], (l, i) => i * 90)

Compass.north === 0 //true
Compass.east === 90 //true 
Compass.south === 180 //true
Compass.west = 270 //true
```

### `StrEnum(cases: string[])`
Shortcut for declaring an `Enum` with `Str` type case values.

### `IntEnum(cases: string[])`
Shortcut for declaring an `Enum` with `Int` type case values.

---

## Defining Arbitrary Types
### `TypeConstructor((v: any) => boolean): T`
Define your own type by providing a function that returns `true` when passed a value of the type, and `false` otherwise.

```ts
const EvenLength = TypeConstructor(v => v.length % 2 === 0)
isa(EvenLength, [1,2]) //true
```

## Type Operations
### `Optional(T)`
Allows `undefined` to be a value of the underlying runtime type `...T`.

```ts
isa(Optional(Int), 1) //true

isa(Int, undefined) //false
isa(Optional(Int, undefined)) //true
```

### `Or(...T)`
Allows values that conform to one of the given runtime types `...T`.

```ts
const NumberLike = Or(Int, Float, Bool)

isa(NumberLike, 1) //true
isa(NumberLike, 3.14) //true
isa(NumberLike, true) //true
```

### `And(...T)`
Allows values that conform to all of the given runtime types `...T`.

```ts
const X = Obj({ x: Float })
const Y = Obj({ y: Float })

const Point = And(X, Y)

isa(Point, { x: 1.2, y: 3.4 }) //true
```

### `Not(T)`
Allows values that are not of runtime type `T`.

```ts
const Even = And(Int, TypeConstructor(v => v % 2 === 0))
const Odd = Not(Even)

isa(Even, 0) //true 
isa(Even, 2) //true 

isa(Odd, 1) //true
```