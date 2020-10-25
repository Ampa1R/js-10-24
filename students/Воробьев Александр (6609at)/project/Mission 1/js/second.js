class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;

    }
    render() {
        return `<div class="goods-item">
                    <h3>${this.title}<h3>
                    <p>${this.price}</p>
                    <button class="сarr-button">Купить</button>
                </div>`;
    }
}
class GoodList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shose', price: 250 }
        ];
    }
    render() {
        let ListHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            ListHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = ListHtml;
    }
    sumGoods() {
        function CountPirce(goods) {
            let costItem = 0;
            for (i = 0; i < goods.length; i++) {
                costItem += goods[i].price;
            }
            return costItem;
        }
       
    }
}

const list = new GoodList();
list.fetchGoods();
list.render();
list.sumGoods();

//пустые классы для корзины
class BascetItem {

}
class BascetList {

}