const charLen = document.querySelector('.len-container');
const slider = document.querySelector('.len-slider');
const output = document.querySelector('.output');
const form = document.querySelector('.form');
const numbersBox = document.querySelector('.numbers');
const symbolsBox = document.querySelector('.symbols');
const lowerBox = document.querySelector('.lower-letters');
const upperBox = document.querySelector('.upper-letters');


slider.value = 10;
charLen.innerHTML = slider.value;
slider.onchange = function(){
    charLen.innerHTML = slider.value;
}



const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbols = ['@', '!', '#', '$'];

const characterCode = Array.from(Array(26)).map((_, i) => i + 97);
//console.log(characterCode);

const lowercaseLetters = characterCode.map(code => String.fromCharCode(code));
const uppercaseLetters = lowercaseLetters.map(letter => letter.toUpperCase());
//console.log(lowercaseLetters);
//console.log(uppercaseLetters);

const generatePswd = (length, hasNumbers, hasSymbols, hasLower, hasUpper) =>{
    const availableCharacters = [
        ...(hasNumbers ? numbers : []),
        ...(hasSymbols ? symbols : []),
        ...(hasLower ? lowercaseLetters : []),
        ...(hasUpper ? uppercaseLetters : []),
    ];

    let password = '';

    if (availableCharacters.length == 0) {
        return "";
    }

    for(let i = 0; i < length; i++){
       const randomIndex = Math.floor(Math.random() * availableCharacters.length);
       password += availableCharacters[randomIndex];
    }
    return password;
}



form.addEventListener("submit",(e) => {
    e.preventDefault();
    output.innerHTML = '';
    output.innerHTML = generatePswd(slider.value, numbersBox.checked, symbolsBox.checked, lowerBox.checked, upperBox.checked);
    
});