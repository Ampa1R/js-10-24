Vue.component('g-main', {
    template: `
        <div>
            <h1>Hello, {{ name }} {{ lastName }} {{ surname }}! </h1>
            <goods-item v-on:add-to-basket="handleGoodsItemClick" title="GoodsItem">
            </goods-item>
        </div>
    `,
    props: ['last-name', 'surname'],
    data() {
        return {
            name: 'Geekbrains'
        }
    },
    methods: {
        handleGoodsItemClick(value) {
            console.log('handleGoodsItemClick', value);
        }
    },
    computed: {

    }
});

Vue.component('goods-item', {
    template: `
        <p>
            {{ title }}
            <button v-on:click="handleClick">Buy</button>
        </p>
    `,
    props: ['title'],
    methods: {
        handleClick() {
            this.$emit('add-to-basket', 'some value');
        },
    },
});

const app = new Vue({
    el: '#app',
});
