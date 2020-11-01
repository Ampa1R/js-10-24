const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const request = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${API}/${url}`);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else if(xhr.status === 404) {
                    reject('Not Found Error');
                } else {
                    reject('Unknown error');
                }
            }
        }
        xhr.send();
    });
}
class GoodsItem {
    constructor({product_name = 'Not found', price}) {
        this.title = product_name;
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
        return new Promise((resolve, reject) => {
            request('catalogData.json')
                .then((goodsFromServer) => {
                this.goods = goodsFromServer;
                resolve();
            });
        })
    }
    render() {
        let goodItems = this.goods.map(item =>{
            const goodItem = new GoodsItem(item);
            return goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = goodItems.join('');
        
    }
    sumGoods() {
       return this.goods.ruduce((acc, curr) => acc + curr.price, 0);
    }
}

const list = new GoodList();
list.fetchGoods()
    .then(() => list.render());
//list.sumGoods();

//пустые классы для корзины
/* class Bascet {
    fetchBascet() {

    }

    render() {

    }
    addItem(id) {

    }
    removeItem() {

    }

    calculatePrice() {

    }
}

class BascetItem {

    render() {

    }
    changeQuantity() {

    }
    removeItem() {

    }
} */
