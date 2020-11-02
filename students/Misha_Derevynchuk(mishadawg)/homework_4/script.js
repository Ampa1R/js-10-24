<<<<<<< HEAD
let searchText = document.getElementById('1').innerText;
let emptyText = document.getElementById('2');
let buttonAdd = document.getElementById('reg_rep');
let buttonDel = document.getElementById('del_rep'); 

function regexp () {
    emptyText.innerText = '';
    
    let regExper = /(?=\W)(\')/gim;
    emptyText.innerText += searchText.replace(regExper, '\"')
}
function regdel (){
    if(emptyText.innerText == ''){
        emptyText.innerText = 'Пусто!'
    }else{
        emptyText.innerText = '';
    }
}

buttonAdd.onclick = regexp;
buttonDel.onclick = regdel;
=======
function regexp () {
    let appDiv = document.getElementsByClassName('reg_rep_cont');
    let regExper = /(?=\W)(\')/gim;
    
    let searchText = document.getElementById('1').innerText;
    let emptyText = document.getElementById('2').innerText = '';
    // console.log(regExper.test(searchText));
    
    emptyText.innerText += searchText.replace(regExper, '\"')
}

let button = document.getElementsByClassName('reg_rep_btn');
button.onclick = regexp (); 
>>>>>>> master
