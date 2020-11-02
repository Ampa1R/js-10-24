let email = document.getElementById('email1');
let tel = document.getElementById('tel1');
let text = document.getElementById('text1');
let submit = document.getElementById('submit1');
submit.addEventListener('click', function(event){
	if (event.target.id = 'submit1') {
		rexp_mail = /([a-z0-9]+\@mail\.[a-z]{2,4})|([a-z0-9]+(\.|\-)[a-z0-9]+\@mail\.[a-z]{2,4})/i
		if (rexp_mail.test(email.value)){
			email.classList.remove('wrong');
			email.value = email.value.match(rexp_mail)[0];

		}else{
			email.classList.add('wrong');
		}
		rexp_tel = /\+7\(\d{3}\)\d{3}-\d{4}/;
		if (rexp_tel.test(tel.value)){
			tel.classList.remove('wrong');
			tel.value = tel.value.match(rexp_tel)[0];
		}else{
			tel.classList.add('wrong');
		}
		
		if (text.value == "") {
			text.classList.add('wrong');
		}else{
			text.classList.remove('wrong');
		}
	} ;
})