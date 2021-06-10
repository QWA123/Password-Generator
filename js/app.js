const characterAmountNumber = document.getElementById("characterAmountNumber");
const characterAmountRange = document.getElementById("characterAmountRange");

characterAmountNumber.addEventListener("input", syncCharacterAmount);
characterAmountRange.addEventListener("input", syncCharacterAmount);

const form = document.getElementById("passwordGeneratorForm");

const UPPER_CASE_CODES = getCodes(65, 90);
const LOWER_CASE_CODES = getCodes(97, 122);
const NUMBER_CODES = getCodes(48, 57);
const SYMBOLS = getCodes(33, 47)
  .concat(getCodes(58, 64))
  .concat(getCodes(91, 96))
  .concat(getCodes(123, 126));

console.log(UPPER_CASE_CODES);
console.log(LOWER_CASE_CODES);
console.log(NUMBER_CODES);
console.log(SYMBOLS);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //   prevent submission of form ie reload
  const characterAmount = characterAmountNumber.value;
  const includeUppercase = document.getElementById("includeUppercase").checked;
  const includeNumbers = document.getElementById("includeNumbers").checked;
  const includeSymbols = document.getElementById("includeSymbols").checked;
  const password = generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );
  setPass(password);
});

function generatePassword(
  characterAmount,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  let collect = LOWER_CASE_CODES;
  if (includeUppercase) collect = collect.concat(UPPER_CASE_CODES);
  if (includeNumbers) collect = collect.concat(NUMBER_CODES);
  if (includeSymbols) collect = collect.concat(SYMBOLS);

  let ans = "";
  let p = collect.length;

  for (let i = 1; i <= characterAmount; i++) {
    let randomIdx = Math.floor(Math.random() * p);
    ans += String.fromCharCode(collect[randomIdx]);
  }
  return ans;
}

function setPass(ans) {
  const elem = document.getElementsByClassName("password-display")[0];
  elem.innerText = ans;
}

function getCodes(low, high) {
  let arr = [];
  // if you dont use [] while initializing you get error
  for (let i = low; i <= high; i++) {
    arr.push(i);
  }
  return arr;
}

function syncCharacterAmount(e) {
  const value = e.target.value;
  characterAmountRange.value = value;
  characterAmountNumber.value = value;
}
