const pow = (a, x) => {
    if (a === null || x === null) {
        return null;
    }

    let res = 1;

    for (let i = 0; i < x; i++) {
        res *= a;
    }

    return res;
};

export default pow;

// module.exports = pow;
// const powFunction = require('./module.js');

// export default pow;
// import powFunction from './module.js';



// module.exports = {
//     pow: 1,
// };
// const { pow } = requre('./module.js');


// export const pow = 1;
// import { pow } from './module.js';
