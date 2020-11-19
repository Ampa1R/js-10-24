const calculate = (a, act, b) => {
    if (typeof a == 'string' || typeof b == 'string') {
        console.log('uncorrect argument');
        return;
    } else if (a === null || b === null) {
        return null;
    } else if (a === undefined || b === undefined) {
        return undefined;
    } else {
        if (act === '+') {
            return a + b;
        } else if (act === '-') {
            return a - b;
        } else if (act === '*') {
            return a * b;
        } else if (act === '/') {
            return a / b;
        }
    };

};



module.exports = {
    calculate,
};