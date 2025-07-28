// calc.test.js
let { token, tokenize } = require('./evaluation')

test("Tokenize 1+2*3 correctly", () => {
    const tokens = tokenize("1+2*3");
    const expected = [
        token('number', '1'),
        token('plus', '+'),
        token('number', '2'),
        token('times', '*'),
        token('number', '3')
    ];

    expect(tokens).toEqual(expected);
})

test("Tokenize throw errors", () => {
    const input1 = "x2+1";
    const input2 = "1#1";

    expect(() => tokenize(input1)).toThrow("Invalid expression");
    expect(() => tokenize(input2)).toThrow("Invalid expression");
})

