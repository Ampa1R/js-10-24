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

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        basketGoods: [],
        searchValue: '',
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
                        console.error(err);
                    });
            });
        }
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
