import { List, Int, Str, Optional } from '../../src/index'

const IntList = List(Int)

test('Empty list creation.', () => {
    expect(IntList([])).toEqual([])
})

test('Single element list creation.', () => {
    expect(IntList([1])).toEqual([1])
})

test('Invalid list creation.', () => {
    expect(IntList(JSON.stringify([1]))).toBeUndefined()
})

test('List of lists', () => {
    const Matrix = List(List(Int))

    const matrix = [
        [1,2,3],
        [4,5,6],
        []
    ]

    expect(Matrix(matrix)).toBe(matrix)
})

test('List with simple optional elements.', () => {
    const OptionalStrList = List(Optional(Str))

    const v1 = ['1', undefined, 'abc', 'frankenstein']
    const v2 = [undefined]

    expect(OptionalStrList(v1)).toBe(v1)
    expect(OptionalStrList(v2)).toBe(v2)
})

test('List with complex optional elements.', () => {
    const SparseMatrix = List(Optional(List(Optional(Int))))

    const sparse = [
        [1, undefined, undefined, 4],
        undefined,
        []
    ]

    expect(SparseMatrix(sparse)).toBe(sparse)

    const invalidSparse = [
        [1, '2', undefined, 4],
        undefined,
        []
    ]

    expect(SparseMatrix(invalidSparse)).toBeUndefined()
})

