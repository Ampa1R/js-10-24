'use strict';

class GoodsItem {
    constructor({title = 'Нет данных', price}) {
        this.title = title;
        this.price = price;
    }

    render() {
        return  `
        <div class="item">
            <h4>${this.title}</h4>
            <p>${this.price}</p>
            <button class="add">Добавить</button>
        </div>
        `;
    }
}

class BasketGoods {
    fetchBasket(){

    }
    
    render() {

    }

    addGood() {

    }

    removeGood(){

    }


    calcTotal(){

    }
}


class BasketGoodsElem {
    render(){

    }

    changeQuantity(){

    }


}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchData() {
        this.goods = [
            {title: "мышь", price: 500},
            {title: "клавиатура", price: 700},
            {title: "монитор", price: 10000},
            {title: "принтер", price: 5000},
            {title: "сканер", price: 5000},
            {title: "копир", price: 5000},
        ];
    }

    render() {
        let goodsItems = this.goods.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        });
        document.querySelector('.goods').innerHTML = goodsItems.join('');
    }

    calcTotalGoods() {
        let count = 0;
        this.goods.forEach(function(value) {
        count += +value.price;
        });
        console.log(count);
    }
}

const list = new GoodsList();
list.fetchData();
list.render();
list.calcTotalGoods();