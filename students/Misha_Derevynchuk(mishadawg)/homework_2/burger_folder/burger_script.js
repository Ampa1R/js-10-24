class Hamburger {

    constructor (size, stuffing) {

    }

    addTopping(topping){ // Добавить добавку }

    }
    removeTopping(topping){ // Убрать добавку }

    }
    getToppings(topping){ // Получить список добавок }

    }
    getSize() { // Узнать размер гамбургера }

    }
    getStuffing() { // Узнать начинку гамбургера }

    }
    calculatePrice() { // Узнать цену }

    }
    calculateCalories() { // Узнать калорийность }

    }
};

// class GoodsItem {
//     constructor({ title = 'Нет данных', price }) {
//         this.title = title;
//         this.price = price;
//     }
    
//     render() {
//         return `
//             <div class="item">
//                 <img src="http://placehold.it/150x150/" alt ="/">
//                 <h4 class="title_of_card">${this.title}</h4>
//                 <p class="description_of_card">${this.price}</p>
//                 <button class="card_button btn" type="button">Добавить</button>
//             </div>
//         `;
//     }
// }
    
// class GoodsList {
//     constructor() {
//         this.goods = [];
//     }
    
//     render() {
//         let goodsItems = this.goods.map(item => {
//             const goodsItem = new GoodsItem(item);
//             return goodsItem.render();
//         });
//         document.querySelector('.goods').innerHTML = goodsItems.join('');
//     }
// }
    
    
// const list = new GoodsList();
// list.render();