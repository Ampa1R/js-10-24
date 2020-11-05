const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

const request = (url, method = 'GET') => {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${API}/${url}`);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    res(JSON.parse(xhr.responseText));
                } else if (xhr.status === 404) { //если ошибка404
                    rej('Not Found error');
                } else {
                    rej('Unknown error');
                }
            }
        }

        xhr.send();

    });
}

const main = new Vue({
    el: '#main',
    data: {
        goods: [], //массив товаров
        basket: [], //массив корзины
        search: '', //запрос в строке поиска
    },
    mounted() {
        this.fetchData(); //вызывает массив товаров из каталога 
        this.fetchBasket(); //вызывает массив корзины
    },
    methods: {
        //товары
        fetchData() {
            return new Promise((res, rej) => {
                request('catalogData.json')
                    .then(
                        (goodsFromServer) => {
                            this.goods = goodsFromServer;
                            res();
                        })
                    .catch((err) => {
                        console.error(err);
                    });
            })

        },
        //корзина
        fetchBasket() {
            return new Promise((res, rej) => {
                request('getBasket.json')
                    .then(
                        (basketFromServer) => {
                            this.basket = basketFromServer.contents;
                            res();
                        })
                    .catch((err) => {
                        console.error(err);
                    });
            })

        },
        //добавление элементов
        addItem(item) {
            return new Promise((res, rej) => {
                request('addToBasket.json', 'Get')
                    .then((data) => {
                        if (data.result === 1) {
                            this.basket.push(item);
                            console.log(this.basket)
                        } else {
                            console.error('addItem result != 1');
                        }
                        res();
                    })
                    .catch((err) => {
                        console.error(err);
                    })
            });
        },
        //удаление элементов
        removeItem(id) {
            return new Promise((res, rej) => {
                request('deleteFromBasket.json', 'Get')
                    .then((data) => {
                        if (data.result === 1) {
                            this.basket = this.basket.filter((product) => product.id_product !== id);
                        } else {
                            console.error('removeItem result != 1');
                        }
                        res();
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            });
        }
    },
    computed: {
        //фильтрация по поисковой строке
        filtered() {
            const regexp = new RegExp(this.search, 'i');
            return this.goods.filter((goodsItem) => regexp.test(goodsItem.product_name));
        },
        //подсчет суммы покупок
        totalPrice() {
            return this.basket.reduce((acc, cur) => acc + (cur.price * cur.count), 0);
        }

    }
});












// const buttons = document.querySelectorAll('.buy');
// var i = 0;

// // событие при нажатии на кнопку покупки
// buttons.forEach(btn => {
//     btn.setAttribute('id', 'btn-' + i);
//     i++;
//     btn.onclick = function (eve) {
//         // newAdd.sumPrice();
//         var elemId = eve.target.id;
//         var getId = elemId.split('-');
//         console.log(basketInner);
//         if (basketInner.length >= 1) { //когда в коззине есть хотябы 1 элемент
//             for (let item of basketInner) {// перебор корзины
//                 if (item.id_product/*code*/ === list.fetchData.id_product/* goods[getId[1]].code*/) {
//                     item.count++;
//                     // console.log(basketInner.indexOf(item));
//                     let counter = document.querySelectorAll('.count')[basketInner.indexOf(item)];
//                     // console.log('1');
//                     counter.innerHTML = item.count;
//                     return newAdd.sumPrice(), item.count, newAdd.toServer();
//                 }
//             } newAdd = new Basket(getId[1]);
//             // console.log('2');
//             return newAdd.render(), newAdd.sumPrice(), newAdd.toServer(), newAdd.del();
//         } else {
//             newAdd = new Basket(getId[1]);
//             // console.log('3');
//             return newAdd.render(), newAdd.sumPrice(), newAdd.toServer(), newAdd.del();
//         }
//     }
// });




