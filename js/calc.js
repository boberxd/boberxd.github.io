var digitsArray = document.getElementsByClassName('calculator-line__item');
for(var i = 0; i<digitsArray.length; i++){
	digitsArray[i].addEventListener('click', onButtonClick);
}

var buttonResult = document.getElementById('buttonResult');
var buttonClear = document.getElementById('clear');

var result = document.getElementById('result');
var predResult = 0;
var expression = '';

function onButtonClick(e){
	var resultInnerHTML = document.getElementById('result').innerHTML;
	var resultLastChar = '';
	if(e.currentTarget.innerHTML === 'C'){
		expression = '';
		result.innerHTML = '';

	} else if(e.currentTarget.innerHTML != '='){
		if(resultInnerHTML.length != 15){
			expression += e.currentTarget.id;
			result.innerHTML = expression;
		}
	} else if(e.currentTarget.innerHTML === '=') {
		result.innerHTML = eval(expression);
		expression = result.innerHTML;
	}
}
