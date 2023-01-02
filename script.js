const MIN_FONT_SIZE = 1;

function handleKeyUp(event) {
  const input = event.target;
  const inputLength = input.innerText.length;
  const viewportWidth = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const BASE_FONT_SIZE = viewportWidth < 1000 ? 2 : 1;

  if (input.innerText[inputLength - 1] == "\n") {
    document.getElementById("sendButton").click();
  }

  const newFontSize = Math.max(
    MIN_FONT_SIZE,
    BASE_FONT_SIZE - Math.ceil(inputLength / BASE_FONT_SIZE)
  );
  input.style.fontSize = `${newFontSize}rem`;
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
