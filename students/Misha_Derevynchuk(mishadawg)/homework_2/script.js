class GoodsItem {
    // значения по дефолту hw_1.
    constructor({ title = 'Нет данных', price }) {
        this.title = title;
        this.price = price;
    }

    render() {
    //сократил функцию es2015 hw_1.
        return `
        <div class="item">
            <img src="http://placehold.it/150x150/" alt ="/">
            <h4 class="title_of_card">${this.title}</h4>
            <p class="description_of_card">${this.price}</p>
            <button class="card_button btn" type="button">Добавить</button>
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
        //решил создать новый массив только с ценами.
        let onlyPriceOfGoodsArr = this.goods.map(function(item){
            return item.price;
        })
        //console.log(onlyPriceOfGoodsArr);
        //теперь подумал обойти этот массив и сложить все значения при помощи reduce.
        let summOfAllGoods = onlyPriceOfGoodsArr.reduce(function(sum,current){
            return sum + current;
        })
        console.log(summOfAllGoods);
    }
}

//Пустые классы для элемента корзины и для корзины с элементами.
class ElementOfCart {
    constructor(){

    }
    function () {
        
    }
}

class Cart {
    constructor(){

    }
    function () {
        
    }
}

const list = new GoodsList();
list.fetchData();
list.render();
list.calculateQuantity();
