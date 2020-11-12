const fs = require('fs');
const cors = require('cors');

const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());


app.get('/catalog', (request, response) => {
    fs.readFile('./catalog.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Fail');
            response.status(500).send('Fail');
            return;
        }
        const catalog = JSON.parse(data);
        response.json(catalog);
    });
});

app.get('/basket', (request, response) => {
    fs.readFile('./basket.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Failed');
            response.status(500).send('Failed');
            return;
        }
        const basket = JSON.parse(data);
        response.json(basket);
    });
});

app.post('/addToBasket', (request, response) => {
    fs.readFile('./basket.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Fail', e);
            response.status(500).json({ result: 0 });
            return;
        }

        const basket = JSON.parse(data);

        const item = request.body;

        basket.push(item);

        fs.writeFile('./basket.json', JSON.stringify(basket), (err) => {
            if (err) {
                console.log('Failed');
                response.status(500).json({ result: 0 });
                return;
            }

            response.json({ result: 1 });
        })
    });
});

app.get('/delFromBasket', (request, response) => {
    fs.readFile('./basket.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Fail', e);
            response.status(500).json({ result: 0 });
            return;
        }

        const basket = JSON.parse(data);

        const elem = request.body;

        basket.slice(indexOf(item), 1);

        fs.writeFile('./basket.json', JSON.stringify(basket), (err) => {
            if (err) {
                console.log('Failed');
                response.status(500).json({ result: 0 });
                return;
            }

            response.json({ result: 1 });
        })
    });
});

app.listen('3000', () => {
    console.log('server is running @ 3000');
})