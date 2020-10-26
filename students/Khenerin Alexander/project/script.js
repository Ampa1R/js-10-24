// const goods = [
//     { title: 'Мышка', price: 500 },
//     { title: 'Ноутбук', price: 50000 },
//     { title: 'Клавиатура', price: 5000 },
//     { title: 'Монитор', price: 10000 },
// ];
//
// const getGoodsItemLayout = (title, price) =>
//     ` <div class="item">
//             <h4>${title}</h4>
//             <p>${price}</p>
//         </div>
//     `;
//
//
// const render = (list) => {
//     let goodsItems = list.map(item => getGoodsItemLayout(item.title, item.price)).join("");
//     document.querySelector('.goods').innerHTML = goodsItems;
// };
//
// render(goods);
class GoodItem {
    constructor(title = 'Товар', price = 'Цена', img = '#') {
        this.title = title;
        this.price = price;
        this.img = img;
    }

    render() {
        return `<div class="goods-item"><div class="goods-info"><img src="${this.img}" alt="${this.title}"><h3>${this.title}</h3><p>${this.price}</p></div><button class='addClick'>Добавить</button></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            { title: 'Мышка', price: 500, img: "./img/мышь.jpg"},
            { title: 'Ноутбук', price: 50000, img: './img/ноутбук.jpg'},
            { title: 'Клавиатура', price: 5000, img: './img/клавиатура.jpg'},
            { title: 'Монитор', price: 10000, img: './img/монитор.jpg'},
        ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach((good) => {
            const goodItem = new GoodItem(good.title, good.price, good.img);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    calcAllGoods() {
        let totalPrice = 0;
        this.goods.forEach((good) => {
            if (good.price !== undefined) {
                totalPrice += good.price;
                console.log(good.price);
            }
        });
        let totalGoodsAnswer = "Общая сумма товаров:" + totalPrice;
        document.querySelector('.goods-total').innerHTML = totalGoodsAnswer;
    }
}


class BasketItem {

    constructor(title, price, img, link) {
        this.title = title;
        this.price = price;
        this.img = img;
        this.link = link;
    }

    render() {

    }
}

class Basket {
    constructor() {

        this.addGoods = [];
        this.deletedGoods = [];
    }

/

    addToBasket() {
    }

    deleteFromBasket() {
    }

    calcBasket() {
    }

    isOrder() {
    }

    render() {
    }

    openBasket() {
    }
}

const list = new GoodsList();
list.fetchGoods();
window.onload = () => {
    list.render();
    list.calcAllGoods();
};