const express = require('express');
const app = express();

app.use(express.static('./public'));

app.post('/goodsData', (request, response) => {
    console.log(request.headers);
    response.send('Hello, Earth!');
});

app.listen('3000', () => {
    console.log('Server is running @ 3000');
});
