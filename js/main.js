const charLen = document.querySelector(".len-container");
const slider = document.querySelector(".len-slider");
const output = document.querySelector(".output");
const form = document.querySelector(".form");
const numbersBox = document.querySelector(".numbers");
const symbolsBox = document.querySelector(".symbols");
const lowerBox = document.querySelector(".lower-letters");
const upperBox = document.querySelector(".upper-letters");
const copyText = document.querySelector(".output-copy");

slider.value = 10;
charLen.innerHTML = slider.value;
slider.oninput = function () {
  charLen.innerHTML = slider.value;
};

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbols = ["@", "!", "#", "$", "&", "?"];

const characterCode = Array.from(Array(26)).map((_, i) => i + 97);

const lowercaseLetters = characterCode.map((code) => String.fromCharCode(code));
const uppercaseLetters = lowercaseLetters.map((letter) => letter.toUpperCase());

const generatePswd = (length, hasNumbers, hasSymbols, hasLower, hasUpper) => {
  const availableCharacters = [
    ...(hasNumbers ? numbers : []),
    ...(hasSymbols ? symbols : []),
    ...(hasLower ? lowercaseLetters : []),
    ...(hasUpper ? uppercaseLetters : [])
  ];

  let password = "";

  if (availableCharacters.length == 0) {
    return "";
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableCharacters.length);
    password += availableCharacters[randomIndex];
  }
  return password;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  output.innerHTML = "";
  output.innerHTML = generatePswd(
    slider.value,
    numbersBox.checked,
    symbolsBox.checked,
    lowerBox.checked,
    upperBox.checked
  );
});

copyText.addEventListener("click", async () => {
  console.log(output.innerText);
  let text = output.innerText;
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard");
    copyText.classList.add("copy-successfull");
    setTimeout(function () {
      copyText.classList.remove("copy-successfull");
    }, 1500);
  } catch (error) {
    console.error("Failed to access the Clipboard API: ", error);
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy"); // Legacy approach
    document.body.removeChild(textArea);
    copyText.classList.add("copy-successfull");
    setTimeout(function () {
      copyText.classList.remove("copy-successfull");
    }, 1500);
  }
});