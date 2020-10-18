// found abababx
function match(string) {
    let state = start;
    for (const c of string) {
        state = state(c);
    }
    return state === end;
}

function start(c) {
    if (c === 'a')
        return foundA;
    else
        return start;
}

function foundA(c) {
    if (c === 'b')
        return foundA2;
    else
        return start(c);
}

function foundA2(c) {
    if (c === 'a')
        return foundB2;
    else
        return start(c);
}

function foundB2(c) {
    if (c === 'b')
        return foundA3;
    else
        return start(c);
}

function foundA3(c) {
    if (c === 'a')
        return foundB3;
    else
        return start(c);
}

function foundB3(c) {
    if (c === 'b')
        return foundX;
    else
        return start(c);
}

function foundX(c) {
    if (c === 'x')
        return end; 
    else
        return start(c);
}

function end() {
    return end;
}

console.log(match('i m abcabx'));
