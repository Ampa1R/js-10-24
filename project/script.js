const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const request = (url, callback) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', `${API}/${url}`);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                callback(JSON.parse(xhr.responseText));
            } else if(xhr.status === 404) {
                console.log('Not Found error');
            } else {
                console.log('Unknown error');
            }
        }
    }

    xhr.send();
}

class GoodsItem {
    constructor({ product_name = 'Нет данных', price }) {
        this.title = product_name;
        this.price = price;
    }

    render() {
        return `
            <div class="item">
                <h4>${this.title}</h4>
                <p>${this.price}</p>
            </div>
        `;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchData(callback) {
        request('catalogData.json', (goodsFromServer) => {
            this.goods = goodsFromServer;
            callback();
        });
    }

    render() {
        let goodsItems = this.goods.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        });
        document.querySelector('.goods').innerHTML = goodsItems.join('');
    }

    calculateQuantity() {
        
    }

    calculatePrice() {
        return this.goods.reduce((acc, curr) => acc + curr.price, 0);
    }
}

class Basket {
    fetchBasket() {

    }

    render() {

    }

    addItem(item) {

    }

    changeQuantity() {

    }

    removeItem() {

    }

    calculatePrice() {

    }
}

class BasketItem {
    render() {

    }

    changeQuantity() {

    }

    removeItem() {

    }
}

const list = new GoodsList();
list.fetchData(() => list.render());
