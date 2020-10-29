const API_URL ='https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest (url) {

    return new Promise (function(resolove,reject){
        
        var xhr;

        if ( window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } 
        else if ( window.ActiveXObject) {
            xhr = new ActiveXObject( "Microsoft.XMLHTTP" );
        }

        xhr.open( 'GET' , url, true );

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolove(JSON.parse(xhr.responseText));
                } else if(xhr.status === 404) {
                    console.log('Not Found error');
                } else {
                    console.log('Unknown error');
                }
            }
        }

        xhr.onerror = function() {
            reject(new Error("Network Error"));
        };

        xhr.send();

    });
    
}

class GoodsItem {
    constructor({ product_name = 'Нет данных', price }) {
        this.title = product_name;
        this.price = price;
    }
    render() {
        return `
        <div class="item">
            <img src="http://placehold.it/150x150/" alt ="/">
            <h4 class="title_of_card">${this.title}</h4>
            <p class="description_of_card">${this.price}</p>
            <button class="card_button btn" type="button">Добавить</button>
        </div>
        `;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    
    fetchData(callback) {
        makeGETRequest (`${API_URL}/catalogData.json`)
            .then(
                (result) => {
                    this.goods = result;
                    console.log(result);
                    callback();
                },
                (err) => {
                    console.log(`bad`);
                    
                }
            );
    }
    

    render() {
        let goodsItems = this.goods.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render();
        });
        document.querySelector('.goods').innerHTML = goodsItems.join('');
    }

    calculatePrice() {
        let onlyPriceOfGoodsArr = this.goods.map(function(item){
            return item.price;
        });
        let summOfAllGoods = onlyPriceOfGoodsArr.reduce(function(sum,current){
            return sum + current;
        });
        console.log(summOfAllGoods);
    }
}

class ElementOfCart {
    
    render() {

    }

    changeQuantity() {

    }

    removeItem() {

    }
}

class Cart {
    
    fetchBasket() {
    }

    render() {
    }

    addItem(item) {
    }

    changeQuantity() {
    }

    removeItem() {
    }

    calculatePrice() {
    }
}

const list = new GoodsList();
list.fetchData(() => list.render());

