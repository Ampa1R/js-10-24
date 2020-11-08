<template>
  <div id="app">
    <header>
        <a href="/" class="logo">E-shop</a>
        <input v-model="searchValue" type="text" class="search" placeholder="Поиск" />
        <button class="cart-button" v-on:click="isCartVisible = !isCartVisible">Корзина</button>
        <div class="cart" v-if="isCartVisible">
            <div class="cart-item" v-for="item in basketGoods" v-bind:key="item.id_product">
                <h4>{{item.product_name}}</h4>
                <p>{{item.price}}</p>
            </div>
        </div>
    </header>
    <main>
        <Goods v-bind:goods="filteredGoods" v-on:add-item="(item) => addItem(item)" />
    </main>
  </div>
</template>

<script>
import Goods from "./components/Goods.vue";
import './someStyles.css';

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

export default {
  name: "App",
  components: {
    Goods,
  },
  data() {
    return {
      goods: [],
      basketGoods: [],
      searchValue: "",
      isCartVisible: false,
    };
  },
  mounted() {
    this.fetchData();
    this.fetchBasket();
  },
  methods: {
    fetchData() {
      return new Promise((resolve) => {
        request("catalogData.json")
          .then((goodsFromServer) => {
            this.goods = goodsFromServer;
            resolve();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    },
    fetchBasket() {
      return new Promise((resolve) => {
        request("getBasket.json")
          .then((basketGoodsFromServer) => {
            this.basketGoods = basketGoodsFromServer.contents;
            resolve();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    },
    addItem(item) {
      return new Promise((resolve) => {
        request("addToBasket.json", "GET")
          .then((data) => {
            if (data.result === 1) {
              this.basketGoods.push(item);
              console.log(this.basketGoods);
            } else {
              console.error("addItem result != 1");
            }
            resolve();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    },
    removeItem(id) {
      return new Promise((resolve) => {
        request("deleteFromBasket.json", "GET")
          .then((data) => {
            if (data.result === 1) {
              this.basketGoods = this.basketGoods.filter(
                (product) => product.id_product !== id
              );
            } else {
              console.error("removeItem result != 1");
            }
            resolve();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    },
  },
  computed: {
    filteredGoods() {
      const regexp = new RegExp(this.searchValue, "i");
      return this.goods.filter((goodsItem) =>
        regexp.test(goodsItem.product_name)
      );
    },
    totalPrice() {
      return this.goods.reduce((acc, curr) => acc + curr.price, 0);
    },
  },
};
</script>

<style>
*, *::after, *::before {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
        "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
        "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f9fafc;
}

header {
    display: flex;
    background: #fff;
    justify-content: space-between;
    padding: 20px;
    box-shadow: 0 3px 6px rgba(0,0,0,.2);
}

.cart-button {
    border: none;
    border-radius: 20px;
    padding: 7px 20px;
    background: #0b5bb8;
    font-size: 16px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    color: #fff;
}

.cart-button:focus {
    outline: none;
    background: #0c50a0;
}

.cart-button:hover {
    background: #3b7eb9;
}

.goods {
    width: 70%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.item {
    box-shadow: 0 3px 6px rgba(0,0,0,.2);
    flex-basis: calc(25% - 40px);
    margin: 20px;
    background-color: #fff;
    border-radius: 5px;
    padding: 10px;
}

.cart {
    position: absolute;
    width: 300px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
    background: #fff;
    padding: 10px 15px;
    top: 70px;
    right: 30px;
  }
  .cart-item {
    margin-bottom: 10px;
  }

</style>
