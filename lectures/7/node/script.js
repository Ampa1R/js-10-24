// const module = require('./script.js');
// const jquery = require('jquery');
const fs = require('fs');

fs.readFile('./foo.json', 'utf-8', (err, data) => {
    if (err) {
        console.log('Read file error', err);
        return;
    }

    const res = JSON.parse(data);
    res.bar = 'baz';
    console.log(res);

    fs.writeFile('./foo.json', JSON.stringify(res), (err) => {
        if (err) {
            console.log('Write file error', err);
            return;
        }

        console.log('Write file successful');
    });
});
