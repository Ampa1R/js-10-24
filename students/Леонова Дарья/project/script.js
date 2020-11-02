// undefined:1 GET http://127.0.0.1:5500/students/%D0%9B%D0%B5%D0%BE%D0%BD%D0%BE%D0%B2%D0%B0%20%D0%94%D0%B0%D1%80%D1%8C%D1%8F/project/undefined 404 (Not Found) при закгрузке страницы;
let goods = [
    { title: 'bRANDED sHOE', price: 300, img: 'img/shoes.jpg', count: 1, code: 1 },
    { title: 'bRANDED tEES', price: 100, img: 'img/tshort.jpg', count: 1, code: 2 },
    { title: 'bRANDED purse', price: 700, img: 'img/purse.jpg', count: 1, code: 3 },
    { title: 'bRANDED tsort', price: 200, img: 'img/tshort1.png', count: 1, code: 4 },
    { title: 'EMS Women bAG', price: 600, img: 'img/bag.jpg', count: 1, code: 5 },
    { title: 'bRANDED CARGOS', price: 500, img: 'img/short.png', count: 1, code: 6 }
];
// const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// const request = (url) => {
//     return new Promise((res, rej) => {
//         const xhr = new XMLHttpRequest();

//         xhr.open('GET', `${API}/${url}`);

//         xhr.onreadystatechange = () => { //когда меняется статус
//             if (xhr.readyState === 4) { //проверка на полученный текст 
//                 if (xhr.status === 200) { //проверка на успех
//                     res(JSON.parse(xhr.responseText)); //приведение к обычному массиву 
//                 } else if (xhr.status === 404) { //если ошибка404
//                     rej('Not Found error');
//                 } else { // в любом другом случае
//                     rej('Unknown error');
//                 }
//             }
//         }

//         xhr.send();

//     })
// }


class GoodsItem {
    constructor({ /*product_name*/ title = 'Нет данных', price, img }) {
        this.title = /*product_name*/ title;
        this.price = price;
        this.img = img;
    }

    render() {
        return `
            <div class="item">
                <img src=${this.img}> 
                <h4 class="title">${this.title}</h4>
                <p>$${this.price}</p>
                <button class="buy"> Buy </button>
            </div>
        `;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    // fetchData() {

    //     request('catalogData.json')
    //         .then(
    //             (goodsFromServer) => {
    //                 this.goods = goodsFromServer;
    //                 console.log(this.goods);
    //                 this.render();
    //             }
    //         )
    //         .catch(() => console.log(error));
    // };

    render() {

        let goodsItems = goods.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        });
        document.querySelector('.products').innerHTML = goodsItems.join('');
    }
}

const list = new GoodsList();
list.render();
// list.fetchData();

const buttons = document.querySelectorAll('.buy');
var i = 0;
let basketInner = [];

// событие при нажатии на кнопку покупки
buttons.forEach(btn => {
    btn.setAttribute('id', 'btn-' + i);
    i++;
    btn.onclick = function (eve) {
        // newAdd.sumPrice();
        var elemId = eve.target.id;
        var getId = elemId.split('-');
        console.log(basketInner);
        if (basketInner.length >= 1) { //когда в коззине есть хотябы 1 элемент
            for (let item of basketInner) {// перебор корзины
                if (item./*id_product*/code === /*list.fetchData*/ goods[getId[1]]./*id_product*/code) {
                    item.count++;
                    // console.log(basketInner.indexOf(item));
                    let counter = document.querySelectorAll('.count')[basketInner.indexOf(item)];
                    // console.log('1');
                    counter.innerHTML = item.count;
                    return newAdd.sumPrice(), item.count, newAdd.toServer();
                }
            } newAdd = new Basket(getId[1]);
            // console.log('2');
            return newAdd.render(), newAdd.sumPrice(), newAdd.toServer(), newAdd.del();
        } else {
            newAdd = new Basket(getId[1]);
            // console.log('3');
            return newAdd.render(), newAdd.sumPrice(), newAdd.toServer(), newAdd.del();
        }
    }
});

// корзина

class Basket {
    constructor(id) { //создание массива корзины     
        basketInner.push(/*list.fetchData*/goods[id]);

    }
    //retern basketInner ломает вывод товаров в окно корзины

    sumPrice() { //сумма стоимостей всех товаров корзины
        const totalSum = document.querySelector('.total');
        const totalPrice = basketInner.reduce((acc, cur) => acc + (cur.price * cur.count), 0);
        totalSum.innerHTML = totalPrice;
    }
    del() {  //функция удаления товара из корзины
        const del = document.querySelectorAll('.del');
        let j = 0;
        del.forEach(delbtn => {
            delbtn.setAttribute('id', 'del-' + j);
            j++;
            delbtn.onclick = (eve) => {
                let targetDel = eve.target.id;
                var delId = targetDel.split('-');
                let counter = document.querySelectorAll('.count')[delId[1]];
                if (basketInner[delId[1]].count > 1) {
                    counter.innerHTML = --basketInner[delId[1]].count;
                } else if (basketInner[delId[1]].count === 1) {
                    const remove = basketInner.filter((item) => item.code !== basketInner[delId[1]].code);
                    let items = document.querySelectorAll('.basket-item')[delId[1]];
                    items.remove(items[delId[1]]);
                }
                // console.log(basketInner[delId[1]]);
                // return
            }
        })
    }


    pay() {
        alert('что-то пошло не так!')
    } //функция оплаты

    toServer() { //передача массива корзины на сервер
        const jsonBasket = JSON.stringify(basketInner);
        // 
    }

    render() {
        let baskItems = basketInner.map(item => {
            const baskItem = new BasketItem(item);
            return baskItem.render();
        });
        document.querySelector('#basket').innerHTML = baskItems.join('');
    }
}


// элемент корзины 
class BasketItem {

    constructor(elem) {
        this.title = elem./*product_name*/title;
        this.price = elem.price;
        this.img = elem.img;
        this.count = elem.count;
    }

    render() {//нельзя убрать return
        return `  
            <div class="basket-item">
                <img src=${this.img}> 
                <h4 class="title">${this.title}</h4>
                <p>$${this.price}</p>
                <p class="count">${this.count}</p>
                <button class="del"> &#10007; </button>
            </div>
        `;
    }
}




// открытие корзины
var basketBtn = document.querySelector('.bag');
basketBtn.onclick = function () {
    let bascketBlock = document.querySelector('.basket-block');

    if (bascketBlock.classList.contains('hidden')) {
        bascketBlock.classList.remove('hidden');
        bascketBlock.classList.add('show');
    } else {
        bascketBlock.classList.add('hidden');
        bascketBlock.classList.remove('show');
    }
}


