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
            default:
                throw new Error("Invalid expression");
        }
    }

    return tokens
}

module.exports = {token, tokenize}