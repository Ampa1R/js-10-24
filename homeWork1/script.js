const goods = [
    {title: "мышь", price: 500},
    {title: "клавиатура", price: 700},
    {title: "монитор", price: 10000},
    {title: "принтер", price: 5000},
    {title: "принтер", price: 5000},
    {title: "принтер", price: 5000},
],
    divGoods = document.querySelector('.goods'),
    getGoodsItemLayout = (title, price) => {
        return `
            <div class="item">
                <h4>${title}</h4>
                <p>${price}</p>
                <button class="add">Добавить</button>
            </div>
        `;
    },
    render = (list = goods) => {
        let goodItems = list.map(item => getGoodsItemLayout(item.title, item.price));
        divGoods.innerHTML = goodItems.join('');
    };


render(goods);

