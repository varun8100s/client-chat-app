function handleKeyUp(event) {

  let BASE_FONT_SIZE = 1;
  let MIN_FONT_SIZE = 1;
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  if (vw < 1000) {
    BASE_FONT_SIZE = 2
    MIN_FONT_SIZE = 2
  } 

  const input = event.target;
  
  const inputLength = input.innerText.length;
  const inputFontSize = input.style.fontSize;

  if (input.innerText[inputLength - 1] == '\n') {
    document.getElementById('sendButton').click()
  }

  let newFontSize = BASE_FONT_SIZE;

  if (inputLength > BASE_FONT_SIZE) {
    newFontSize = BASE_FONT_SIZE - Math.ceil(inputLength / BASE_FONT_SIZE);
  }

  input.style.fontSize =
    newFontSize < MIN_FONT_SIZE ? `${MIN_FONT_SIZE}rem` : `${newFontSize}rem`;
}

function handleBlur(event) {
  const input = event.target;

  if (!input.innerText.trim().length) {
    input.innerHTML = "";
  }
}

const input = document.querySelector(".input");

input.addEventListener("keyup", handleKeyUp);
input.addEventListener("blur", handleBlur);

