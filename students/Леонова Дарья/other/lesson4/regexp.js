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
const nameMas = [], numbMas = [], emailMas = [], storyMas = [];

const name = document.querySelector('.name').addEventListener('input', (eve) => {
    nameMas.push(eve.target.value);
});
const numb = document.querySelector('.numb').addEventListener('input', (eve) => {
    numbMas.push(eve.target.value);
});
const email = document.querySelector('.email').addEventListener('input', (eve) => {
    emailMas.push(eve.target.value);
});
const story = document.querySelector('.text').addEventListener('input', (eve) => {
    storyMas.push(eve.target.value);
});
const button = document.querySelector('.submit');

const checkName = /[a-zа-я]{2,8}/ig; //jn 2 до 8 букв любого алфовита в любом регистре 
const checkNumb = /\+7[\d]{10}/; //начиная с +7 еще 10 цифр подряд
const checkEmail = /[a-z0-9]+@[a-z]+\.[a-z]+/; //набор букв и цифр , затем @, затем опять буквы, точка и еще буквы. регистрозависимое поле
const checkText = /[a-zа-я0-9\s\S]{5,100}/ig; //от 2 до 20 любых символов. не регистрозависимое поле 

button.onclick = function () {
    const errorName = document.querySelector('.name');
    const errorNumb = document.querySelector('.numb');
    const errorEmail = document.querySelector('.email');
    const errorStory = document.querySelector('.text');

    if (!checkName.test(nameMas[nameMas.length - 1])) {
        errorName.classList.add('red');
    } else {
        errorName.classList.remove('red');
    };
    if (!checkNumb.test(numbMas[numbMas.length - 1])) {
        errorNumb.classList.add('red');
    } else {
        errorNumb.classList.remove('red');
    };
    if (!checkEmail.test(emailMas[emailMas.length - 1])) {
        errorEmail.classList.add('red');
    } else {
        errorEmail.classList.remove('red');
    };
    if (!checkText.test(storyMas[storyMas.length - 1])) {
        errorStory.classList.add('red');
    } else {
        errorStory.classList.remove('red');
    };
}


