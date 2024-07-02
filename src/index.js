// function onSubmit(event) {
//   event.preventDefault();
//   console.log("tá funcionand");
// }

// const form = document.querySelector("form");
// form.addEventListener("load", onSubmit);

// const buttonSubmit = document.getElementById("buttonSubmit");
// buttonSubmit.addEventListener("click", () => {
//   console.log("funcionando");
// });

// Quando o usuário digitar o valor deverá aparecer na tela RESULTADO
// Terá que armazenar quando clicar em algum OPERADOR
// Quando o usuário digitar o valor deverá aparecer na tela RESULTADO
// Caso ele apertar um Operador, já deverá fazer a operação do anterior e armazenar esse valor
// Caso ele apertar o botão IGUAL, só somará os valores

const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

function updateResult(originClear = false) {
  result.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}

function addDigit(digit) {
  if (digit === "," && (currentNumber.includes(",") || !currentNumber)) return;

  if (restart) {
    currentNumber = digit;
    restart = false;
  } else {
    currentNumber += digit;
  }

  updateResult();
}

function setOperator(newOperator) {
  if (currentNumber) {
    calculate();

    firstOperand = parseFloat(currentNumber.replace(",", "."));
    currentNumber = "";
  }

  operator = newOperator;
}

function calculate() {
  if (operator === null || firstOperand === null) return;
  let secondOperand = parseFloat(currentNumber.replace(",", "."));
  let resultValue;

  switch (operator) {
    case "+":
      resultValue = firstOperand + secondOperand;
      break;
    case "-":
      resultValue = firstOperand - secondOperand;
      break;
    case "×":
      resultValue = firstOperand * secondOperand;
      break;
    case "÷":
      resultValue = firstOperand / secondOperand;
      break;
    default:
      return;
  }

  if (resultValue.toString().split(".")[1]?.length > 5) {
    currentNumber = parseFloat(resultValue.toFixed(5)).toString();
  } else {
    currentNumber = resultValue.toString();
  }

  operator = null;
  firstOperand = null;
  restart = true;
  percentageValue = null;
  updateResult();
}

function clearCalculator() {
  currentNumber = "";
  firstOperand = null;
  operator = null;
  updateResult(true);
}

function setPercentage() {
  let result = parseFloat(currentNumber) / 100;

  if (["+", "-"].includes(operator)) {
    result = result * (firstOperand || 1);
  }

  if (result.toString().split(".")[1]?.length > 5) {
    result = result.toFixed(5).toString();
  }

  currentNumber = result.toString();
  updateResult();
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.innerText;
    if (/^[0-9,]+$/.test(buttonText)) {
      addDigit(buttonText);
    } else if (["+", "-", "×", "÷"].includes(buttonText)) {
      setOperator(buttonText);
    } else if (buttonText === "=") {
      calculate();
    } else if (buttonText === "C") {
      clearCalculator();
    } else if (buttonText === "±") {
      currentNumber = (
        parseFloat(currentNumber || firstOperand) * -1
      ).toString();
      updateResult();
    } else if (buttonText === "%") {
      setPercentage();
    }
  });
});
