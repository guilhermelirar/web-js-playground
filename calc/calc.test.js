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

    expect(tokens).toBe(expected);
})