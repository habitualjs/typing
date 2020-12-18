import { stringify } from 'querystring'
import { isa, Datetime, Int, Obj, Optional, Str, Float, List } from '../../src/index'

// Object type must be passed blueprint.
test('Obj constructor takes in blueprint.', () => {
    expect(Obj({})).toBeTruthy()
    expect(Obj([])).toBeTruthy()
    expect(() => Obj(null)).toThrowError()
    expect(() => Obj(undefined)).toThrowError()
})

// Simple object type.
test('Obj with simple fields.', () => {
    const Point = Obj({
        x: Int,
        y: Int
    })

    const origin = {x: 0, y: 0}
    
    expect(Point(origin)).toBe(origin)
})

// Object with simple optional fields.
test('Obj with simple optional fields.', () => {
    const User = Obj({
        id: Int,
        name: Str,
        lastUpdate: Optional(Datetime)
    })

    const u = {
        id: 1,
        name: 'Fin',
        lastUpdate: new Date()
    }

    expect(User(u)).toBe(u)

    const u2 = {
        ...u,
        lastUpdate: undefined
    }

    expect(User(u2)).toBe(u2)
    
    const u3 = {
        ...u2,
        name: null
    }

    expect(User(u3)).toBeUndefined()
})

// Complex object of objects.
test('Obj of Objs.', () => {
    const Course = Obj({
        courseCode: Str,
        profName: Str,
        grade: Optional(Float)
    })

    const Student = Obj({
        name: Str,
        age: Int,
        courses: List(Optional(Course))
    })

    const s = {
        name: 'Mary',
        age: 25,
        courses: [
            {
                courseCode: 'ECON101',
                profName: 'Friedman',
                grade: 0.91
            },
            {
                courseCode: 'MATH201',
                profName: 'Winner',
            },
            undefined
        ]
    }

    expect(Student(s)).toBe(s)

    const invalidS = {
        ...s,
        name: undefined
    }

    expect(Student(invalidS)).toBeUndefined()
})

test('Obj of objects', () => {
    const T = Obj({
        x: Obj({
            y: Int,
            z: Int
        })
    })

    expect(isa(T, {})).toBe(false)
})

// Superset type can be passed to subset type.
test('Obj can be passed as subset type', () => {
    const Point2D = Obj({
        x: Int,
        y: Int
    })

    const Point3D = Obj({
        x: Int,
        y: Int,
        z: Int
    })

    const two = { x: 1, y: -6 }
    const three = { x: 1, y: -6, z: 32 }

    expect(Point2D(two)).toBe(two)
    expect(Point3D(three)).toBe(three)
    expect(Point2D(three)).toBe(three)
})
