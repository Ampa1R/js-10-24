let textBefore = document.getElementById('before-text'); 
let textAfter = document.getElementById('after-text');

function changeText() {
    let a = textBefore.textContent;
    textAfter.innerText = a.replace(/\B'|'\B/g, '"')
    };