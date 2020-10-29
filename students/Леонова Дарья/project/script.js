var goods = [
    { name: 'bRANDED sHOE', price: 300, img: 'img/shoes.jpg' },
    { name: 'bRANDED tEES', price: 300, img: 'img/tshort.jpg' },
    { name: 'bRANDED purse', price: 300, img: 'img/purse.jpg' },
    { name: 'bRANDED tsort', price: 300, img: 'img/tshort1.png' },
    { name: 'EMS Women bAG', price: 300, img: 'img/bag.jpg' },
    { name: 'bRANDED CARGOS', price: 300, img: 'img/short.png' }
];


const getGoodsItemLayout = (title, price, img) =>
    `
        <div class="item">
        <img src=${img}>
            <h4 class="title">${title}</h4>
            <p>$${price}</p>
            <button class="buy"> Buy </button>
        </div>
    `;



const render = (list = []) => {
    let goodsItems = list.map(item => getGoodsItemLayout(item.name, item.price, item.img));
    document.querySelector('.products').innerHTML = goodsItems.join(''); //для того чтобы не выводилась запятая. так как goodsItems это масив, то выводит значени через запятую. join('') - преобразует масив в строку и убирает заптую.
};

render(goods);

// корзина

class Basket {
    constructor() { //создание массива корзины
    }

    sumPrice() { //сумма стоимостей всех товаров корзины
        var sum;
        basketInner.map(item => sum += item.price * item.count); //count - количество (штук) выбранного товара 
        return sum;
    }
    pay() { } //функция оплаты
}

// элемент корзины 
class BascketItem {

    constructor() {
    }

    count() {  //счетчик количества штук каждого товара

    }
    del() {  //функция удаления товара из корзины

    }
}


// открытие корзины
var basketBtn = document.querySelector('.bag');
basketBtn.onclick = function () {
    let bascketBlock = document.querySelector('#basket');

    if (bascketBlock.classList.contains('hidden')) {
        bascketBlock.classList.remove('hidden');
        bascketBlock.classList.add('show');
    } else {
        bascketBlock.classList.add('hidden');
        bascketBlock.classList.remove('show');
    }
}