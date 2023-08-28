const currentOperand = document.querySelector("#currentOperand");
const resultEl = document.querySelector("#resultEl");
const buttons = document.querySelector("#buttons");

let currentOperandBuffer = ""; // Buffer to temporarily store the current operand
let isDecimalAdded = false; // Variable to track if a decimal point is added

function handleNumbers(e) {
  const input = e.target.innerText;

  if (input === "." && isDecimalAdded) {
    return;
  }

  if (currentOperand.innerText === "0" || currentOperand.innerText === "0.") {
    currentOperandBuffer = input === "." ? "0." : input;
  } else {
    currentOperandBuffer += input;
  }

  currentOperand.innerText = currentOperandBuffer;

  if (input === ".") {
    isDecimalAdded = true;
  }

  resultEl.innerText = "= " + currentOperand.innerText;
}

function handleOperators(e) {
  const operator = e.target.innerText;
  isDecimalAdded = false;
  currentOperandBuffer = currentOperand.innerText.replace(/[+\-×÷]$/, "");

  currentOperandBuffer += operator;

  currentOperand.innerText = currentOperandBuffer;
}

function handleFunction(e) {
  const key = e.target;

  if (key.innerText === "=") {
    try {
      const expression = currentOperand.innerText
        .replace(/×/g, "*")
        .replace(/÷/g, "/");

      // Evaluate the expression
      const result = eval(expression);

      currentOperand.innerText = result;
    } catch (error) {
      currentOperand.innerText = "Error";
    }

    isDecimalAdded = false;
  }

  if (key.dataset.value === "backspace") {
    const currentText = currentOperand.innerText;
    if (currentText.length === 1) {
      currentOperand.innerText = "0";
    } else {
      currentOperand.innerText = currentText.slice(0, -1);
    }

    isDecimalAdded = currentOperand.innerText.includes(".");
  }

  if (key.innerText === "AC") {
    currentOperand.innerText = "0";
    isDecimalAdded = false;
  }

  if (key.innerText === "%") {
    const value = parseFloat(currentOperand.innerText) / 100;
    currentOperand.innerText = value.toString();
  }
}

buttons.addEventListener("click", (e) => {
  if (e.target.dataset.type === "number") {
    handleNumbers(e);
  }
  if (e.target.dataset.type === "operator") {
    handleOperators(e);
  }
  if (e.target.dataset.type === "function") {
    handleFunction(e);
  }
});
