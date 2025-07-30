function token(type, value) {
    return {type, value}
}

// Returns a list of tokens from an input
// Ex: [{ type:'number', value:'1' }, 
//      {type:'plus', value:'+'},
//      {type:'number', value: '2'}]      ]
function tokenize(input) {
    let tokens = []
    let i = 0;

    while (i < input.length) {
        char = input[i];

        if (/[0-9.]/.test(char)) {
            let numstr = ""
            while (i < input.length && /[0-9.]/.test(input[i])) {
                numstr += input[i++];
            }

            tokens.push(token("number", numstr))
            continue;
        }

        i++;
        switch (char) {
            case ('+'): {
                tokens.push(token('plus', '+'));
                continue;
            }
            case ('-'): {
                tokens.push(token('minus', '-'));
                continue;
            }
            case ('*'): {
                tokens.push(token('times', '*'));
                continue;
            }
            case ('/'): {
                tokens.push(token('div', '/'));
                continue;
            }
            case ('('): {
                tokens.push(token('open parenthesis', '('));
                continue;
            }
            case (')'): {
                tokens.push(token('close parenthesis', ')'));
                continue;
            }
            default:
                throw new Error("Invalid expression");
        }
    }

    return tokens
}

function newParser(tokens) {
    let current = 0;

    function peek() {
        return tokens[current];
    }

    function consume() {
        return tokens[current++];
    }

    function parseExpression() {
        let node = parseTerm();
        let c_token = peek();

        while(c_token && (c_token.value === '+' || c_token.value === '-')) {
            const operator = c_token.value;
            consume();
            const right = parseTerm();

            node = {
                type: 'BinaryExpression',
                operator,
                left: node,
                right
            };

            c_token = peek();
        }

        console.log(node);
        return node;
    }

    function parseTerm() {
        let node = parseFactor();
        let c_token = peek();

        while(c_token && (c_token.value === '*' || c_token.value === '/')) {
            const operator = c_token.value;
            consume();
            const right = parseFactor();

            node = {
                type: 'BinaryExpression',
                operator,
                left: node,
                right
            };

            c_token = peek();
        }
        
        return node;
    } 

    function parseFactor() {
        const current_token = consume();
        
        if (current_token.type == 'number') {
            return {
                type: 'Literal',
                value: Number(current_token.value)
            } 
        }

        return {}
    }

    return {
        parseFactor,
        parseTerm,
        parseExpression
    }
}

module.exports = {token, tokenize, newParser}
