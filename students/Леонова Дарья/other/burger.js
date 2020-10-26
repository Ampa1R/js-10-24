// Маленький(50 рублей, 20 калорий).
// ### Большой(100 рублей, 40 калорий).
// ### Гамбургер может быть с одним из нескольких видов начинок(обязательно):
// ### С сыром(+10 рублей, +20 калорий).
// ### С салатом(+20 рублей, +5 калорий).
// ### С картофелем(+15 рублей, +10 калорий).
// ### Дополнительно гамбургер можно посыпать приправой(+15 рублей, +0 калорий) и полить майонезом(+20 рублей, +5 калорий).

class BugerItem {
    constructor(name, price, cal) {
        this.name = name;
        this.price = price;
        this.cal = cal;
    }
}
const item1 = new BugerItem("small", 50, 20);
const item2 = new BugerItem("big", 100, 40);
const item3 = new BugerItem("cheese", 10, 20);
const item4 = new BugerItem("salad", 20, 5);
const item5 = new BugerItem("potato", 15, 10);
const item6 = new BugerItem("spices", 15, 0);
const item7 = new BugerItem("sauce", 20, 5);

var burgerInners = [item1, item2, item3, item4, item5, item6, item7];
var calCalc = document.querySelector('.calNumber');
var priceCalc = document.querySelector('.price');


class BurgerCreate {
    constructor(burger) {
        let cal = 0;
        let price = 0;
        for (let item of burgerInners) {
            if (item.name === burger.size || item.name === burger.inner || item.name === burger.add) {
                cal += item.cal;
                price += item.price;
            }
            this.cal = cal;
            this.price = price;
        }
    }
}

let btn = document.querySelectorAll('button');
var burger = {};


// бургер-массив
for (let item of btn) {
    item.onclick = function (eve) {
        var itemId;
        itemId = eve.target.id;
        if (itemId === 'small' || itemId === 'big') {
            var size = itemId;
            burger.size = size;
            // console.log(size);
        } else if (itemId == 'spices' || itemId == 'sauce') {
            var add = itemId;
            burger.add = add;
            // console.log(add);
        } else {
            var inner = itemId;
            burger.inner = inner;
            // console.log(inner)
        }
        console.log(burger);
        let newBurger = new BurgerCreate(burger);
        calCalc.innerText = newBurger.cal;
        priceCalc.innerText = newBurger.price + 'руб.';
        console.log(newBurger)
    }
}









