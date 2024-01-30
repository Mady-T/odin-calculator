const buttonContainer = document.querySelector('.button-panel');
const inputField = document.querySelector('.input');
const outputField = document.querySelector('.output')

buttonContainer.addEventListener('click', (e) => {
    const clickedButton = e.target;

    if (clickedButton.classList.contains('numeric')){
        inputField.value += clickedButton.textContent;

    } else if (clickedButton.classList.contains('operator')) {
        const activeOperator = document.querySelector('.active');
        if (inputField.value !== '') {  
            if (outputField.textContent !== '') { //perform calculation
                if (activeOperator) {
                    outputField.textContent = evaluate(outputField.textContent, inputField.value, activeOperator.id);
                } else {
                    outputField.textContent = inputField.value;
                }
            } else { //prepare for calculation
                outputField.textContent = inputField.value;
            }
            inputField.value = '';
        }
        if (activeOperator) {
            activeOperator.classList.remove('active');
        }
        clickedButton.classList.add('active');

    } else if (clickedButton.id === 'equal') {
        const activeOperator = document.querySelector('.active');
        if (inputField.value !== '') {  
            if (outputField.textContent !== '') { //perform calculation
                if (activeOperator) {
                    outputField.textContent = evaluate(outputField.textContent, inputField.value, activeOperator.id);
                }
            } else { //prepare for calculation
                outputField.textContent = inputField.value;
            }
            inputField.value = '';
        }
        if (activeOperator) {
            activeOperator.classList.remove('active');
        }

    } else if (clickedButton.id === 'ac') {
        outputField.textContent = '';
        inputField.value = '';
        for (const elem of document.querySelectorAll('.operator')) {
            elem.classList.remove('active');
        }

    } else if (clickedButton.id === 'backspace') {
        inputField.value = inputField.value.slice(0,-1);
        
    } else if (clickedButton.id === 'sign') {
        if (inputField.value) {
            inputField.value *= -1;
        } else {
            inputField.value = '-'
        }

    } else if (clickedButton.id === 'dot') {
        if (!inputField.value.includes('.')){
            inputField.value += clickedButton.textContent;
        }
    }
});

function evaluate(a, b, operator) {
    a = +a;
    b = +b;
    switch(operator) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide' :
            if (b === 0) return "MATH ERROR";
            return a / b;
        case 'mod' :
            return a % b;
        default:
            return operator;
    }
}