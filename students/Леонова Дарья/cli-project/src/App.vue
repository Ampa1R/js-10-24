<template>
  <div id="app">
    <header>
      <nav>
        <ul class="list">
          <li class="list-item">
            <a href="#" class="item-link">list-item#1</a>
          </li>
          <li class="list-item">
            <a href="#" class="item-link">list-item#2</a>
          </li>
          <li class="list-item">
            <a href="#" class="item-link">list-item#3</a>
          </li>
        </ul>
        <Search v-model="search" />
        <button class="basket" v-on:click="show = !show">Basket</button>
      </nav>
    </header>
    <section class="container">
      <basket
        v-bind:basket="basket"
        v-if="show"
        v-on:del-item="(elem) => removeItem(elem)"
      ></basket>
      <goods
        v-bind:goods="filtered"
        v-on:add-item="(item) => addItem(item)"
      ></goods>
    </section>
  </div>
</template>

<script>
import Goods from "./components/goods";
import Search from "./components/search.vue";
import Basket from "./components/basket.vue";
// import Error from "./components/Error.vue";

const API = "http://localhost:3000";

const request = (url, method = "GET", data) => {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, `${API}/${url}`);

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          res(JSON.parse(xhr.responseText));
        } else if (xhr.status === 404) {
          //если ошибка404
          rej("Not Found error");
        } else {
          rej("Unknown error");
        }
      }
    };

    xhr.send(JSON.stringify(data));
  });
};

export default {
  name: "App",
  components: {
    Goods,
    Search,
    Basket,
    // Error,
  },
  data() {
    return {
      goods: [], //массив товаров
      basket: [], //массив корзины
      show: false,
      search: "",
    };
  },
  mounted() {
    this.fetchData(); //вызывает массив товаров из каталога
    this.fetchBasket(); //вызывает массив корзины
  },
  methods: {
    //товары
    fetchData() {
      return new Promise((res) => {
        request("catalog")
          .then((goodsFromServer) => {
            this.goods = goodsFromServer;
            res();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    },
    //корзина
    fetchBasket() {
      return new Promise((res) => {
        request("basket")
          .then((basketFromServer) => {
            this.basket = basketFromServer;
            res();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    },
    //добавление элементов
    addItem(item) {
      return new Promise((res) => {
        request("addToBasket", "POST", item)
          .then((data) => {
            if (data.result === 1) {
              this.basket.push(item);
              console.log(this.basket);
            } else {
              console.error("addItem result != 1");
            }
            res();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    },
    //удаление элементов
    removeItem(elem) {
      return new Promise((res) => {
        request("delFromBasket", "Get", elem)
          .then((data) => {
            if (data.result === 1) {
              this.basket = this.basket.filter(
                (product) => product.id_product !== elem.id_product
              );
            } else {
              console.error("removeItem result != 1");
            }
            res();
          })
          .catch((err) => {
            console.error(err);
          });
      });
    },
  },
  computed: {
    //фильтрация по поисковой строке
    filtered() {
      const regexp = new RegExp(this.search, "i");
      return this.goods.filter((goodsItem) => regexp.test(goodsItem.name));
    },
    totalPrice() {
      return this.basket.reduce((acc, cur) => acc + cur.price, 0);
    },
  },
};
</script>

<style>
nav {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid lightskyblue;
}

.container {
  margin: 0 auto;
  width: 1200px;
}

.list {
  width: 400px;
  list-style: none;
  display: flex;
  justify-content: space-between;
}

.item-link {
  text-decoration: none;
  color: lightgray;
}

.item-link:hover {
  text-decoration: underline;
  color: gray;
}

.basket {
  font-size: 20px;
  background-color: lightskyblue;
  padding: 5px 15px;
  height: 35px;
  align-self: center;
}

.products {
  padding-top: 50px;
  width: 900px;
  margin: 0 auto;
  display: grid;
  float: left;
  grid-template-columns: 1fr 1fr 1fr;
}

.item {
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  padding: 40px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.title {
  text-transform: uppercase;
}

.buy,
.del,
.total-buy {
  padding: 10px 20px;
  border: 3px solid transparent;
  background-color: lightskyblue;
  border-radius: 5px;
}

.buy:hover {
  border: 3px solid blue;
  box-sizing: border-box;
}

#basket {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.basket-block {
  padding: 15px;
  border-radius: 10px;
  background-color: lightblue;
  box-sizing: border-box;
  width: 300px;
  float: right;
  margin-top: 50px;
}

.basket-item {
  display: flex;
  align-items: center;
}

.basket-title {
  margin-right: 20px;
}
</style>
