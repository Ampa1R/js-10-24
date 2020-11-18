<template>
  <div id="app">
    <header>
        <a href="/" class="logo">E-shop</a>

        <searching 
            v-on:changeSearchValue="searchValue=$event"
            v-model="searchValue"
        >    
        </searching>

        <button class="cart-button" @click="isCartVisible = !isCartVisible">Корзина</button>

        <cart 
            v-bind:basket="basketGoods"
            
            v-if="isCartVisible"
            @remove-item="(itemId) => removeItem(itemId)"
        >
          
        </cart>
    </header>
    <Error v-if="error.length > 0" v-bind:message = "error"/>
    <main>
        <goods 
            v-bind:goods="filteredGoods" 
            @add-item="(item) => addItem(item)"
        > 
        </goods>
    </main>
  </div>
</template>

<script>
import Goods from './components/Goods.vue'
import Cart from './components/Cart.vue'
import Searching from './components/Searching.vue'
import Error from './components/Error.vue'

const API = 'http://localhost:3000';

const request = (url, method = 'GET', data) => {
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

          xhr.send(JSON.stringify(data));

        
    });
}

export default {
  name: 'App',
  components: {
    Goods,
    Cart,
    Searching,
    Error,
  },
  data() {
    return {
      goods: [],
      basketGoods: [],
      searchValue: '',
      isCartVisible: false,
      error: '',
    }
  },
  mounted() {
      this.fetchData();
      this.fetchBasket();
  },
  methods: {
      fetchData() {
          return new Promise((resolve) => {
              request('catalog')
                  .then((goodsFromServer) => {
                      this.goods = goodsFromServer;
                      resolve();
                  })
                  .catch((err) => {
                      this.error = "Ошибка получения списка товаров";
                      console.error(err);
                  });
          })
      },
      fetchBasket() {
          return new Promise((resolve) => {
              request('cart')
                  .then((basketGoodsFromServer) => {
                      this.basketGoods = basketGoodsFromServer;
                      //console.log(basketGoodsFromServer);
                      resolve();
                  })
                  .catch((err) => {
                      this.error = "Ошибка получения корзины";
                      console.error(err);
                  });
          })
      },

      async addItem(item) {
        try {
          await fetch(`${API}/addToCart`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(item)
          });
          let a = true;
          this.basketGoods.forEach((i, index) => {
            if (i.id_product == item.id_product) {
                i.counter++
                this.$set(this.basketGoods, index, i);
                a = false;
            }
          });
          if(a){
              item.counter = 1;
              this.basketGoods.push(item);
          }
        }catch (error) {
          console.log('neudachno',error);
        }
      },

      removeItem(id) {
        return new Promise((resolve) => {
          fetch(`${API}/remove/${id}`, {
            method: 'DELETE'
          })
          .then((res) => res.json())
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
          const regexp = new RegExp(this.searchValue, 'i');
          return this.goods.filter((goodsItem) => regexp.test(goodsItem.product_name));
      },
      totalPrice() {
          return this.basketGoods.reduce((acc, curr) => acc + curr.price, 0);
      }
  }
}
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
  .err{
    background-color: red;
  }
</style>
