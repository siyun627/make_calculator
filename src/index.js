/* 숫자 누르면 display에 나와야 함.
c 누르면 reset되어야 하며 각 연산자들로 계산할 수 있어야 함
=을 누르지 않아도(refresh)하지 않아도 자동으로 결과 값 알 수 있게 해야 함

각 숫자를 누르면 그 숫자가 display에 나타나게 함.
연산자를 누르면 display에 있던 string을 숫자와 시켜서(parseInt) 계산함
다음 숫자를 누르면 자동으로 결과값이 명시됨

*/
const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

function equal() {
  display.value = localStorage.getItem("Result");
}

function calculate() {
  const A = parseInt(localStorage.getItem("A"));
  const O = localStorage.getItem("O");
  const B = parseInt(display.value);
  let result = "result";
  switch (O) {
    case "+":
      result = A + B;
      break;
    case "-":
      result = A - B;
      break;
    case "×":
      result = A * B;
      break;
    case "÷":
      result = A / B;
      break;
  }
  localStorage.setItem("Result", result);
}

function saveNum() {
  const A = display.value;
  localStorage.setItem("A", A);
}

function clearAll() {
  display.value = "";
  localStorage.clear();
}

function displayNum(num) {
  display.value += num;
  if (localStorage.getItem("O") !== null) {
    calculate();
  }
  return display.value;
}

function getNumber() {
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      switch (button.dataset.type) {
        case "clear":
          clearAll();
          break;
        case "operator":
          if (localStorage.getItem("Result") !== null) {
            equal();
          }
          saveNum();
          const O = event.target.innerText;
          localStorage.setItem("O", O);
          localStorage.setItem("O2", O);
          break;
        case "equal":
          equal();
          break;
        default:
          display.removeAttribute("disabled");
          if (localStorage.getItem("O2") !== null) {
            display.value = "";
            localStorage.removeItem("O2");
          }
          let targetDigit = event.target.innerText;
          displayNum(targetDigit);
          break;
      }
    });
  });
}

function init() {
  getNumber();
}

init();
