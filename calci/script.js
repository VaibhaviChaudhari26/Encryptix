// script.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.querySelectorAll('.btn'));
    const equals = document.getElementById('equals');
    const clear = document.getElementById('clear');

    let currentInput = '';
    let operator = '';
    let firstNumber = '';
    let waitingForSecondNumber = false;

    const updateDisplay = () => {
        display.textContent = currentInput || '0';
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.dataset.value >= '0' && button.dataset.value <= '9' || button.dataset.value === '.') {
                if (waitingForSecondNumber) {
                    currentInput = button.dataset.value;
                    waitingForSecondNumber = false;
                } else {
                    currentInput += button.dataset.value;
                }
                updateDisplay();
            } else if (button.dataset.value === 'C') {
                currentInput = '';
                operator = '';
                firstNumber = '';
                waitingForSecondNumber = false;
                updateDisplay();
            } else {
                if (firstNumber) {
                    if (waitingForSecondNumber) {
                        operator = button.dataset.value;
                        return;
                    }
                    performCalculation();
                }
                operator = button.dataset.value;
                firstNumber = currentInput;
                waitingForSecondNumber = true;
            }
        });
    });

    equals.addEventListener('click', () => {
        if (firstNumber && operator && currentInput) {
            performCalculation();
            operator = '';
            firstNumber = '';
            waitingForSecondNumber = false;
        }
    });

    clear.addEventListener('click', () => {
        currentInput = '';
        operator = '';
        firstNumber = '';
        waitingForSecondNumber = false;
        updateDisplay();
    });

    const performCalculation = () => {
        const num1 = parseFloat(firstNumber);
        const num2 = parseFloat(currentInput);
        switch (operator) {
            case '+':
                currentInput = (num1 + num2).toString();
                break;
            case '-':
                currentInput = (num1 - num2).toString();
                break;
            case '*':
                currentInput = (num1 * num2).toString();
                break;
            case '/':
                currentInput = (num1 / num2).toString();
                break;
        }
        updateDisplay();
    };
});