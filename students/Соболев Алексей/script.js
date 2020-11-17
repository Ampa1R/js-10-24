const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const request = (url, method = 'GET') => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
    
        xhr.open(method, `${API}/${url}`);
    
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else if(xhr.status === 404) {
                    reject('Not Found error');
                } else {
                    reject('Unknown error');
                }
            }
        }
    
        xhr.send();
    });
}
Vue.component('servererr', {
    props: ['serr'],
    template: `
        <div class = "err">{{serr}}</div>
    `,
});


Vue.component('goods', {
    props: ['goods'],
    template: `
        <div class="goods">
            <goods-item 
                v-for="item, index in goods"
                v-bind:key="item.id_product"
                v-bind:item="item" 
                v-on:add-item="handleAddItem"
            />
            <div v-if="goods.length === 0">Нет товаров</div>
        </div>
    `,
    methods: {
        handleAddItem(item) {
            this.$emit('add-item', item);
        }
    }
});

Vue.component('goods-item', {
    props: ['item'],
    template: `
        <div class="item">
            <h4>{{item.product_name}}</h4>
            <p>{{item.price}}</p>
            <button v-on:click="handleButtonClick">Add to basket</button>
        </div>
    `,
    methods: {
        handleButtonClick() {
            this.$emit('add-item', this.item) ;
        }
    }
});

Vue.component('cart', {
    props: ['basket'],
    template: `
        <div class="cart">
            <cart-item
                v-for="item in basket"
                v-bind:key="item.id_product"
                v-bind:item="item"
            />
            <div v-if="basket.length === 0">Корзина пуста</div> 
        </div>
    `,
    methods: {

    }
});

Vue.component('cart-item', {
    props: ['item'],
    template: `
        <div class="cart-item">
            <h4>{{item.product_name}}</h4>
            <p>{{item.price}}</p>
        </div>
    `,
    methods: {

    }
});

Vue.component('searching', {
    props: [''],
    template: `
        <input type="text" class="search" placeholder="Поиск" />
    `,
});

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        basketGoods: [],
        searchValue: '',
        isCartVisible: false,
        serverErr: "",
    },
    mounted() {
        this.fetchData();
        this.fetchBasket();
    },
    methods: {
        fetchData() {
            return new Promise((resolve, reject) => {
                request('catalogData.json')
                    .then((goodsFromServer) => {
                        this.goods = goodsFromServer;
                        resolve();
                    })
                    .catch((err) => {
                        serverErr = err;
                        console.error(err);
                    });
            })
        },
        fetchBasket() {
            return new Promise((resolve, reject) => {
                request('getBasket.json')
                    .then((basketGoodsFromServer) => {
                        this.basketGoods = basketGoodsFromServer.contents;
                        resolve();
                    })
                    .catch((err) => {
                        serverErr = err;
                        console.error(err);
                    });
            })
        },
        addItem(item) {
            return new Promise((resolve, reject) => {
                request('addToBasket.json', 'GET')
                    .then((data) => {
                        if (data.result === 1) {
                            this.basketGoods.push(item);
                            console.log(this.basketGoods);
                        } else {
                            console.error('addItem result != 1');
                        }
                        resolve();
                    })
                    .catch((err) => {
                        serverErr = err;
                        console.error(err);
                    });
            });
        },
        removeItem(id) {
            return new Promise((resolve, reject) => {
                request('deleteFromBasket.json', 'GET')
                    .then((data) => {
                        if (data.result === 1) {
                            this.basketGoods = this.basketGoods.filter((product) => product.id_product !== id);
                        } else {
                            console.error('removeItem result != 1');
                        }
                        resolve();
                    })
                    .catch((err) => {
                        serverErr = err;
                        console.error(err);
                    });
            });
        },
    },
    computed: {
        filteredGoods() {
            const regexp = new RegExp(this.searchValue, 'i');
            return this.goods.filter((goodsItem) => regexp.test(goodsItem.product_name));
        },
        totalPrice() {
            return this.goods.reduce((acc, curr) => acc + curr.price, 0);
        }
    }
});
