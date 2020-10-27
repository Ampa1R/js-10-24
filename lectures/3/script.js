/* async example 

let a = 1;

setTimeout(() => {
    a++;
    console.log('async', a);
}, 100);

console.log('main', a);
*/

/* callbacks

let a = 0;

const get1 = (callback) => {
    setTimeout(() => {
        a++;
        console.log('1st', a);
        callback(a);
    }, 100);
}

const get2 = (callback) => {
    setTimeout(() => {
        a++;
        a++;
        console.log('2st', a);
        callback(a);
    }, 50);
}

const get3 = () => {
    console.log('final');
}

// 

get1((data) => {
    console.log('callback 1st');

    get2((anotherData) => {
        console.log('callback 2nd');
        
        get3();
    })
});

*/

/* Promises


// pending
// fulfilled
// rejected

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject();
    }, 1000);
});

promise
    .then(() => {
        console.log('promise fulfilled');
    })
    .catch(() => {
        console.log('promise rejected');
    });

let a = 0;

const get1 = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            a++;
            console.log('1st', a);
            res('some success message');
        }, 100);
    });
}

const get2 = () => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            a++;
            a++;
            console.log('2st', a);
            res(a);
        }, 50);
    })
}

const get3 = () => console.log('get3');

//


get1()
    .then(
        (data) => {
            console.log(data);
            console.log('callback 1st');
        
            return get2();
        },
        (err) => {
            console.log(err);
            console.log('catch 1');
        }
    )
    .then((anotherData) => {
        console.log('callback 2nd');
        
        get3();
    })
    .catch(() => {
        console.log('catch');
    });

*/

/* XHR */

const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json');

xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText));
        } else if(xhr.status === 404) {
            console.log('Not Found error');
        } else {
            console.log('Unknown error');
        }
    }
}

xhr.send();
