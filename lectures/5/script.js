const app = new Vue({
    el: '#app',
    data: {
        name: 'Steve',
        lastName: 'Jobs',
        names: [
            'Steve',
            'John',
            'Bob',
            'Michael',
        ],
        user: {
            firstName: 'Ivan',
            lastName: 'Ivanov',
            age: 10,
        },
        buttonId: 'super-button',
        styles: ['text', 'text-2'],
    },
    methods: {
        handleClick(e) {
            console.log('click', e);
        },
        handleInput(e) {
            console.log(e.target.value);
        },
        getFullName() {
            return `${this.name} ${this.lastName}`;
        },
        toUpperCase(val) {
            return val.toUpperCase();
        },
        handleResize(event) {
            console.log(event);
        }
    },
    computed: {
        // fullName() {
        //     return `${this.name} ${this.lastName}`;
        // },
        fullName: {
            get() {
                return `${this.name} ${this.lastName}`;
            },
            set(value) {
                const [firstName = '', lastName = ''] = value.split(' ');
                this.name = firstName;
                this.lastName = lastName;
            }
        }
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    }
});
