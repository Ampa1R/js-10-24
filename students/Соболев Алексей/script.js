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
        let i = 0;
        this.goods.forEach(function(item){
            i += item.price; 
        })
        return i;
    }
}

const list = new GoodsList();
list.fetchData();
list.render();

//homework2---------------------------------------------------------------------------------------
let sum = list.calculateQuantity();

class Basket {
    constructor(){
        this.sum = 0;
        this.goodsQuantity = 0;
    }

    layoutRender(){

    }

    calculateQuantity() {

    }

    calculateSum() {

    }

    clearBasket(){

    }

    addItem(){

    }

    removeItem(){

    }
}

class BasketItem {
    constructor(){
        this.title = title;
        this.price = price;
        this.quantity = 0;
    }
    layoutRender(){
        
    }
}