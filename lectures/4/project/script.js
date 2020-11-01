const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const request = (url, method = 'GET') => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
    
        xhr.open(method, `${API}/${url}`);
    
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else if(xhr.status === 404) {
                    reject('Not Found error');
                } else {
                    reject('Unknown error');
                }
            }
        }
    
        xhr.send();
    });
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

    fetchData() {
        return new Promise((resolve, reject) => {
            request('catalogData.json')
                .then((goodsFromServer) => {
                    this.goods = goodsFromServer;
                    resolve();
                })
                .catch((err) => {
                    console.error(err);
                });
        })
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
    constructor() {
        this.basketGoods = [];
        this.totalPrice = 0;
        this.countGoods = 0;
    }

    fetchBasket() {
        return new Promise((resolve, reject) => {
            request('getBasket.json')
                .then((basketGoodsFromServer) => {
                    this.basketGoods = basketGoodsFromServer.contents;
                    this.totalPrice = basketGoodsFromServer.amount;
                    this.countGoods = basketGoodsFromServer.countGoods;
                    resolve();
                })
                .catch((err) => {
                    console.error(err);
                });
        })
    }

    addItem(item) {
        return new Promise((resolve, reject) => {
            request('addToBasket.json', 'GET')
                .then((data) => {
                    if (data.result === 1) {
                        this.basketGoods.push(item);
                    } else {
                        console.error('addItem result != 1');
                    }
                    resolve();
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    }

    removeItem(id) {
        return new Promise((resolve, reject) => {
            request('deleteFromBasket.json', 'GET')
                .then((data) => {
                    if (data.result === 1) {
                        this.basketGoods = this.basketGoods.filter((product) => product.id_product !== id);
                    } else {
                        console.error('removeItem result != 1');
                    }
                    resolve();
                })
                .catch((err) => {
                    console.error(err);
                });
        });
    }

    render() {

    }

    changeQuantity() {

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
list.fetchData()
    .then(() => list.render());

const basket = new Basket();
basket.fetchBasket()
    .then(() => {
        basket.addItem({ id_product: 999, title: 'Мышь', price: 100 });
        basket.addItem({ id_product: 748, title: 'Монитор', price: 200 });
        basket.addItem({ id_product: 349, title: 'Клавиатура', price: 300 });
        basket.removeItem(123);
        basket.removeItem(748);
    });
