const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const request = (url, method = 'GET') => {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, `${API}/${url}`);
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

Vue.component('goods', {
    props: ['goods'],
    template: `
        <section class="products">
        <goods-item v-for='item in goods' v-bind:item="item" v-bind:key="item.id_product" v-on:add-item="handleAddItem" />
            <div class="no-product" v-if="goods.length === 0">Нет товаров</div>
        </section>
    `,
    data: function () {
        return {

        }
    },
    methods: {
        handleAddItem(item) {
            this.$emit('add-item', item);
        }
    }
});

Vue.component('goods-item', {
    props: ['item'],
    template: `
            <div class="item" >
                <h4 class="title">{{item.product_name}}</h4>
                <p>$ {{ item.price }}</p>
                <button class="buy"  v-on:click="handleButtonClick"> Buy </button>
            </div>
    `,
    methods: {
        handleButtonClick() {
            this.$emit('add-item', this.item);
        }
    },
});

Vue.component('basket', {
    props: ['basket'],
    template: `
    <section class="basket-block">
            <p class= "total"> Общая сумма вашего заказа:  $ </p >
            <basket-item v-for='elem in basket' v-bind:elem="elem" v-bind:key="elem.id_product" /> 
        </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        total() {
            this.$emit('totalPrice');
        },
    },
});

Vue.component('basket-item', {
    props: ['elem'],
    template: `
         <div class="basket-item"> 
                <h4 class="title basket-title">{{elem.product_name}}</h4>
                <div>
                <p>$ {{ elem.price }} </p>
                <p class="count"> count: {{count}}</p>
                </div>
         </div >
     `,
    data: function () {
        return {
            count: 1,
        }
    },
    methods: {
    },
});

const main = new Vue({
    el: '#main',
    data: {
        goods: [], //массив товаров
        basket: [], //массив корзины
        show: false,
        // search: '',
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
            return new Promise((res) => {
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
            return new Promise((res) => {
                request('addToBasket.json', 'Get')
                    .then((data) => {
                        if (data.result === 1) {
                            this.basket.push(item);
                            console.log(this.basket);

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
            return new Promise((res) => {
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
        filtered(search) {
            // console.log(search);
            const regexp = new RegExp(search, 'i');
            return this.goods.filter((goodsItem) => regexp.test(goodsItem.product_name));
        },
        totalPrice() {
            return this.basket.reduce((acc, cur) => acc + cur.price, 0);
        },
    }
});











