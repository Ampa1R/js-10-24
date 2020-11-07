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
        show: false,
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
        },
        //показ корзины
        toBasket() {
            return this.show = !this.show
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
            return this.basket.reduce((acc, cur) => acc + cur.price, 0);
        }

    }
});












