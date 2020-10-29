class GoodsItem {
    constructor({ title = 'Нет данных', price }) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `
            <div class="item">
                <h4>${this.title}</h4>
                <p>${this.price}</p>
                <button class='buy-button' id='add-button'>BUY</button>
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
            { title: 'Мышка', price: 500 },
            { title: 'Ноутбук', price: 50000 },
            { title: 'Клавиатура', price: 5000 },
            { title: 'Монитор', price: 10000 },
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
        let total = 0;
            for (let i=0; i<this.goods.length; i++) {
                total += this.goods[i].price;
            }
        return total;
    }
}

class Cart {
    constructor ({totalItemsCount = 0, totalPtice = 0}) {
        this.totalItemsCount = totalItemsCount;
        this.totalPtice = totalPtice;
    }
    count() {
        //общее число товаров в корзине
    }
    totalCartPrice() {
        //суммарная стоимость товаров в корзине 
    }
    deleteItem() {
        //удалить товар
    }
    addUnit() {
        //увеличить количество позиции в корзине 
    }
    deleteUnit() {
        //уменьшить количетсво позиции в корзине
    }
}
class CartItem {
    constructor ({title = 'none', price, count = 1}) {
        this.title = title; 
        this.price = price;
        this.count = count;
    }
}
const list = new GoodsList();
list.fetchData();
list.render();
