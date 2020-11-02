// задание 1,2

const opt1 = /\s'/g;
const opt2 = /'\s/g;
let text = "RegExr was created by gskinner.com, and is p'roudly hosted by Media Temple. Edit the Expression & Text to see matches.Roll over 'matches' or the expression for details.PCRE & JavaScript flavors of RegEx are supported.Validate your expression with Tests mode. The side bar 'includes' a Cheat'sheet, full Reference, and Help.You can also Save & Share with the Com'munity, and view patterns you create 'or' favorite in My Patterns. Explore results with the Tools below.Replace & List output custom results.Details lists capture groups. Explai describes your expression in plain English.";


if (opt1.test(text)) {
    text = text.replace(opt1, ' "');
}
if (opt2.test(text)) {
    text = text.replace(opt2, '" ');
}
// console.log(text);

// Задание 3
// Имя, Телефон, E-mail, текст, кнопка Отправить
// Имя содержит только буквы.
// Телефон имеет вид + 7(000)000 - 0000.
// E - mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my - mail@mail.ru.
// Текст произвольный.
// Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.

let form = document.querySelector('form');

class Input {
    constructor(id, type, text = '') {
        let item = document.createElement('input');
        item.className = id;
        item.placeholder = text;
        item.type = type;
        form.append(item);
    }

}

let isName = new Input('name', 'text', 'введите имя');
let isNumb = new Input('numb', 'text', '+ 7(000)000 - 0000');
let isEmail = new Input('email', 'text', 'введите email');
let isText = new Input('text', 'text', 'введите любой текст');
let button = document.createElement('button');
button.classList.add('submit');
button.innerText = 'Oтправить';
form.append(button);

const checkName = /[a-zа-я]{2,8}/i; //jn 2 до 8 букв любого алфовита в любом регистре 
const checkNumb = /\+7[\d]{10}/; //начиная с +7 еще 10 цифр подряд
const checkEmail = /[a-z0-9]+@[a-z]+\.[a-z]+/; //набор букв и цифр , затем @, затем опять буквы, точка и еще буквы. регистрозависимое поле
const checkText = /[a-zа-я0-9\s\S]{2,20}\b/i; //от 2 до 20 любых символов. не регистрозависимое поле 

button.onclick = function () {
    if (checkName.test(isName)) {
        if (checkNumb.test(isNumb)) {
            if (checkEmail.test(isEmail)) {
                if (checkText.test(isText)) {
                    console.loge('Ok');
                } else {
                    let inpText = document.querySelector('.text');
                    inpText.classList.add('red');
                    console.log('4');
                }
            } else {
                let inpEmail = document.querySelector('.email');
                inpEmail.classList.add('red');
                console.log('3');
            }
        } else {
            let inpNumb = document.querySelector('.numb');
            inpNumb.classList.add('red');
            console.log('2');
        }
    } else {
        const inpName = document.querySelector('.name');
        inpName.classList.add('red');
        console.log('1');
    }
}


