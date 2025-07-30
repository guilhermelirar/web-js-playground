// calc.test.js
let { token, tokenize, newParser } = require('./evaluation')

const expected2times3Parsed = {
        type: 'BinaryExpression',
        operator: '*',
        left: { type: 'Literal', value: 2 },
        right: { type: 'Literal', value: 3 }
    }

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

    expect(() => tokenize(input1)).toThrow("Invalid Expression");
    expect(() => tokenize(input2)).toThrow("Invalid Expression");
})

test("parseFactor parses simple factor '1' correctly", () => {
    expect(newParser([token('number', '1')]).parseFactor()).toEqual({
        type: 'Literal',
        value: 1
    });
})

test("parseTerm returns binary expression correctly", () => {
    const input = [token('number', '2'), token('times', '*'), token('number', '3')];
    const expected = expected2times3Parsed;
    
    expect(newParser(input).parseTerm()).toEqual(expected);
})

test("parseExpression returns expression correctly (1+2*3)", () => {
    const input = [token('number', '1'), token('plus', '+'), 
        token('number', '2'), token('times', '*'), token('number', '3')
    ];

    const expected = {
        type: 'BinaryExpression',
        operator: '+',
        left: { type: 'Literal', value: 1},
        right: expected2times3Parsed
    }

    expect(newParser(input).parseExpression()).toEqual(expected);
})

test("parseExpression handles parenthesis correctly 1*(2+3)", () => {
    const input = [token('number', '1'), token('times', '*'), 
                   token('open parenthesis', '('),
                   token('number', '2'), token('plus', '+'), 
                   token('number', '3'), token('close parenthesis', ')')
    ];

    const expected = {
        type: 'BinaryExpression',
        operator: '*',
        left: { type: 'Literal', value: 1},
        right: {
        type: 'BinaryExpression',
            operator: '+',
            left: { type: 'Literal', value: 2 },
            right: { type: 'Literal', value: 3 }
        }
    }
    
    expect(newParser(input).parseExpression()).toEqual(expected);
})

test("two parenthesis level '1 * (2 + (3 - 4))'", () => {
    const strInput = "1*(2+(3-4))";
    const input = tokenize(strInput);

    const expected = {
        type: 'BinaryExpression',
        operator: '*',
        left: {type: 'Literal', value: 1},
        right: {
            type: 'BinaryExpression',
            operator: '+',
            left: {type: 'Literal', value: 2},
            right: {
                type: 'BinaryExpression',
                operator: '-',
                left: {type: 'Literal', value: 3},
                right: {type: 'Literal', value: 4}
            }
        }
    }

    expect(newParser(input).parseExpression()).toEqual(expected);
})