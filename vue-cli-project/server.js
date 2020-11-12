const fs = require('fs');
const cors = require('cors');

const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/catalog', (request, response) => {
    fs.readFile('./catalog.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Read catalog.json Failed', e);
            response.status(500).send('Read catalog.json Failed');
            return;
        }

        const catalog = JSON.parse(data);

        response.json(catalog);
    });
});

app.get('/cart', (request, response) => {
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Read cart.json Failed', e);
            response.status(500).send('Read cart.json Failed');
            return;
        }

        const cart = JSON.parse(data);

        response.json(cart);
    });
});

app.post('/addToCart', (request, response) => {
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Read cart.json Failed', e);
            response.status(500).json({ result: 0 });
            return;
        }

        const cart = JSON.parse(data);

        const item = request.body;

        cart.push(item);

        fs.writeFile('./cart.json', JSON.stringify(cart), (err) => {
            if (err) {
                console.log('Write cart.json Failed', e);
                response.status(500).json({ result: 0 });
                return;
            }

            response.json({ result: 1 });
        })
    });
});

app.delete('/remove/:id', (request, response) => {
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('Read cart.json Failed', e);
            response.status(500).json({ result: 0 });
            return;
        }

        const cart = JSON.parse(data);

        const itemId = request.params.id;

        const filteredCart = cart.filter(
            (product) => product.id_product !== parseInt(itemId)
        );

        fs.writeFile('./cart.json', JSON.stringify(filteredCart), (err) => {
            if (err) {
                console.log('Write cart.json Failed', e);
                response.status(500).json({ result: 0 });
                return;
            }

            response.json({ result: 1 });
        })
    });
});

app.listen('3000', () => {
    console.log('Server is running @ 3000');
});
