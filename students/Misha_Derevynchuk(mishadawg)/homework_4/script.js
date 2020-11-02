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