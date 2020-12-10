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
} from '../../src/index'

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

test('Valid Customer', () => {
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

    expect(isa(Customer, aCustomer)).toBe(true)
    expect(Customer(aCustomer)).toBe(aCustomer)
})

test('Invalid Customer.', () => {
    const invalidCustomer = {
        id: 10,
        name: 'Gillian',
        rating: 0.24,
        signedUpAt: new Date(),
        subscriptionStatus: 1,
        paymentMethods: [
            {
                brand: 'amex',
                last4: '1123',
                // missing expiry.
            },
            {
                last4: '2943',
                expiry: [7, 21]
            }
        ]
    }

    expect(isa(Customer, invalidCustomer)).toBe(false)
    expect(Customer(invalidCustomer)).toBe(undefined)
})