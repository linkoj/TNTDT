let display = '0';
let currentOp = null;
let previousNum = null;
let shouldResetDisplay = false;
let calculationHistory = [];

document.addEventListener('DOMContentLoaded', function() {
    // Number buttons
    document.querySelectorAll('[data-number]').forEach(btn => {
        btn.addEventListener('click', () => appendNumber(btn.dataset.number));
    });

    // Operator buttons
    document.querySelectorAll('[data-operator]').forEach(btn => {
        btn.addEventListener('click', () => setOperator(btn.dataset.operator));
    });

    // Function buttons
    document.getElementById('clear-btn').addEventListener('click', clearDisplay);
    document.getElementById('delete-btn').addEventListener('click', deleteLastChar);
    document.getElementById('equals-btn').addEventListener('click', calculateResult);

    // Keyboard support
    document.addEventListener('keydown', handleKeyboard);

    loadHistory();
    updateDisplay();
});

function appendNumber(num) {
    if (shouldResetDisplay) {
        display = num;
        shouldResetDisplay = false;
    } else {
        // Get the last number in display (after operator if present)
        const lastNumber = getLastNumber(display);
        
        // Prevent multiple decimal points in current number
        if (num === '.' && lastNumber.includes('.')) return;
        
        // Prevent leading zero issues
        if (lastNumber === '0' && num !== '.') {
            if (display.includes(' ')) {
                // Replace the last number after operator
                display = display.substring(0, display.lastIndexOf(' ') + 1) + num;
            } else {
                display = num;
            }
        } else {
            display += num;
        }
    }
    updateDisplay();
}

function getLastNumber(str) {
    // Extract the last number after an operator
    const parts = str.split(' ');
    return parts[parts.length - 1];
}

function setOperator(op) {
    if (currentOp !== null && !shouldResetDisplay) {
        calculateResult();
    }
    previousNum = parseFloat(display);
    currentOp = op;
    // Append operator to display
    display = display + ' ' + op + ' ';
    shouldResetDisplay = true;
    updateDisplay();
}

async function calculateResult() {
    if (currentOp === null || previousNum === null) return;

    const currentNum = parseFloat(getLastNumber(display));
    const resultDiv = document.getElementById('result');

    if (isNaN(currentNum)) {
        resultDiv.textContent = 'Error';
        resultDiv.classList.add('error');
        return;
    }

    try {
        const response = await fetch('/api/calc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ num1: previousNum, num2: currentNum, op: currentOp })
        });

        const data = await response.json();

        if (response.ok) {
            const result = formatResult(data.result);
            display = result.toString();
            resultDiv.textContent = result;
            resultDiv.classList.remove('error');
            
            // Add to history
            const calculation = `${previousNum} ${currentOp} ${currentNum} = ${result}`;
            addToHistory(calculation);
            
            currentOp = null;
            previousNum = null;
            shouldResetDisplay = true;
            updateDisplay();
        } else {
            resultDiv.textContent = 'Error: ' + (data.detail || 'Invalid input');
            resultDiv.classList.add('error');
        }
    } catch (err) {
        resultDiv.textContent = 'Error: Server error';
        resultDiv.classList.add('error');
    }
}

function formatResult(result) {
    if (typeof result === 'number') {
        if (result % 1 === 0) {
            return result;
        } else {
            return parseFloat(result.toFixed(10));
        }
    }
    return result;
}

function clearDisplay() {
    display = '0';
    currentOp = null;
    previousNum = null;
    shouldResetDisplay = false;
    document.getElementById('result').textContent = '-';
    document.getElementById('result').classList.remove('error');
    updateDisplay();
}

function deleteLastChar() {
    if (display.length > 1) {
        display = display.slice(0, -1);
    } else {
        display = '0';
    }
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').textContent = display;
}

function addToHistory(calculation) {
    calculationHistory.unshift(calculation);
    if (calculationHistory.length > 20) {
        calculationHistory.pop();
    }
    saveHistory();
}

function saveHistory() {
    localStorage.setItem('calcHistory', JSON.stringify(calculationHistory));
}

function loadHistory() {
    const saved = localStorage.getItem('calcHistory');
    if (saved) {
        calculationHistory = JSON.parse(saved);
    }
}

function handleKeyboard(e) {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendNumber('.');
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        setOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        calculateResult();
    } else if (e.key === 'Backspace') {
        deleteLastChar();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
}
