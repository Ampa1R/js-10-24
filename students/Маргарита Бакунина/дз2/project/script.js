class GoodsItem {
    constructor({ src, title, price }) {
        this.src = src;
        this.title = title;
        this.price = price;
    }

    render() {
        return `
        <div class="item card p-4" style="width: 16rem;">
        <img src="${this.src}" class="card-img-top" alt="item">
            <h4 class="card-title">${this.title}</h4>
            <p class="card-text">${this.price} руб.</p>
            <a href="#" class="btn btn-warning">Купить</a>
        </div>
        `;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchData() {
        this.goods = [
            { src: 'img/mouse.jpg', title: 'Мышка', price: 500 },
            { src: 'img/notebook.jpg', title: 'Ноутбук', price: 50000 },
            { src: 'img/keyboard.jpg', title: 'Клавиатура', price: 5000 },
            { src: 'img/monitor.jpg', title: 'Монитор', price: 10000 },
        ];
    }

    render() {
        let goodsItems = this.goods.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        });
        document.querySelector('.goods').innerHTML = goodsItems.join('');
    }

    calculateQuantity() {
        let sum = 0;
        this.goods.forEach((goods) => {
            if (goods.price !== undefined) {
                sum += goods.price;
                console.log(goods.price);
            }
        });
        let totalSum = `<h4> Все товары на сумму: ${sum} руб.</h4>`;
        document.querySelector('.basket').innerHTML = totalSum;

    }
}

class BasketItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    render() { }
}

class Basket {
    constructor() {
        this.addGoods = [];
        this.deletedGoods = [];
    }

    addToBasket() { }

    deleteFromBasket() { }

    calcBasket() { }

    render() { }


}

const list = new GoodsList();
list.fetchData();
list.render();
list.calculateQuantity();

