// PASSWORD GENERATOR

// Character Generator Functions

// Function that accepts a string value as an argument and returns a random index number from the string argument
function randomIndex(str){
  return Math.floor(Math.random() * str.length);
}

// Example of the randomIndex function
console.log(randomIndex(`chicken`)); // 0, 1, 2, 3, 4, 5, 6

// Function that returns a random lowercase letter
function getRandomLower(){
  const letters = `abcdefghijklmnopqrstuvwxyz`;
  // Returning a random letter using a random index in the "letters" string
  return letters[randomIndex(letters)];
}

// Example of the getRandomLower function
console.log(getRandomLower()); // Random lowercase letter

// Function that returns a random uppercase letter
function getRandomUpper(){
  // Running the "getRandomLower" function to create a random letter and setting that value to the letter variable
  const letter = getRandomLower();
  // Changing the random letter to an uppercase letter and returning it from the function
  return letter.toUpperCase();
}

// Example of the getRandomUpper function
console.log(getRandomUpper()); // Random uppercase letter

// Function that returns a random number (AKA Random number as a string value)
function getRandomNumber(){
  const numbers = `0123456789`;
  // Returning a random number using a random index in the "numbers" string
  return numbers[randomIndex(numbers)];
}

// Example of the getRandomNumber function
console.log(getRandomNumber()); // Random number from the "numbers" string

// Function that returns a random symbol
function getRandomSymbol(){
  const symbols = `!@#$%^&*(){}[]=<>/,.`;
  // Returning a random symbol using a random index in the "symbols" string
  return symbols[randomIndex(symbols)];
}

// Example of the getRandomSymbol function
console.log(getRandomSymbol()); // Random symbol from the "symbols" string

// Object to store all the character generator functions
const randomFunctions = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

// Selecting the DOM Elements
const resultEl = document.querySelector(`#result`);
const clipboardEl = document.querySelector(`#clipboard`);
const lowercaseEl = document.querySelector(`#lowercase`);
const uppercaseEl = document.querySelector(`#uppercase`);
const numbersEl = document.querySelector(`#numbers`);
const symbolsEl = document.querySelector(`#symbols`);
const lengthEl = document.querySelector(`#length`);
const generateEl = document.querySelector(`#generate`);

// Function that accepts true or false values as well as a number as arguments
// NOTE: The checkbox inputs and number (AKA Length) input will determine the value/arguments entered into this function
function generatePassword(lower, upper, number, symbol, length){

  console.log(lower, upper, number, symbol, length);

  // 1. CREATE THE PASSWORD VARIABLE
  let generatedPassword = ``;

  // 2. FILTER OUT UNCHECKED OPTIONS
  // True and false values can be added together (True is 1 and false is 0)
  // NOTE: The value set to typesCount will be used when building the password
  const typesCount = lower + upper + number + symbol;
  console.log(typesCount);

  // If the user has not selected any of the four options, then display alert and return an empty string from the function so the password displayed will just be an empty string
  if (typesCount === 0){
    alert(`Please select at least one option`);
    // The RETURN keyword stops/ends the execution of a function (AKA Does not run any of the code on the lines that follow the return in the function)
    return ``;
  }

  // Creating an array of arrays. The first item in each nested array holds the value of a string that will be used to access a function in the randomFunctions object. Also, the second item in each nested array is one of the values passed into this generatePassword function.
  let typesArr = [
    [`lower`, lower],
    [`upper`, upper],
    [`number`, number],
    [`symbol`, symbol]
  ];
  console.log(typesArr);

  // The filter method creates a new array with all the items that "pass the test" implemented by the provided function (AKA All the items that cause the function to return a boolean value of true when the function is run using the item as an argument for the item parameter in this example)
  // Checking if the value for index of 1 in each item in the array is true or false. Also, removing the item from the array if it is false.
  typesArr = typesArr.filter(item => {
    console.log(item[1]);
    return item[1];
  });
  console.log(`typesArr:`, typesArr);

  // 3. LOOP OVER THE LENGTH AND CALL THE GENERATOR FUNCTION FOR EACH CHECKED OPTION
  // Building password with a for loop
  // NOTE: The value for "length" is the value selected for the length number input
  for (i = 0; i < length; i += typesCount){
    // One of the items in the updated/filtered version of the typesArr will be the value/argument passed into for the type parameter each time the anonymous arrow function is run/executed
    typesArr.forEach(type => {
      const funcName = type[0];
      console.log(funcName);
      // Accessing and running/executing a function in the randomFunctions object. Also, concatenating/adding the value returned from the accessed function to the generatedPassword string variable
      generatedPassword += randomFunctions[funcName]();
      console.log(generatedPassword);
    });
  }

  // 4. ADD THE GENERATED PASSWORD TO THE FINAL VARIABLE AND RETURN IT FROM THE FUNCTION
  // Removing extra characters if necessary (The above loop will create a password that may not match the length selected if that length is not a multiple of the number of options/checkboxes selected)
  const finalPassword = generatedPassword.slice(0, length);
  console.log(finalPassword);

  return finalPassword;
}

// Example of generatePassword function
// NOTE: Using the starting value for when the page first loads
generatePassword(true, true, true, true, 10);

// Event listener for when the "Generate Password" button is clicked
generateEl.addEventListener(`click`, () => {
  // Checking if the following options/checkboxes are selected/checked and setting the true or false values to the respective variables
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;
  
  // Accessing the value for the number input and changing the value from a string to a number
  // NOTE: The value returned from a number input is a string value
  const length = parseInt(lengthEl.value);

  console.log(hasLower, hasUpper, hasNumber, hasSymbol, length);

  // The generatePassword function takes the true/false values determined by the checkboxes as well as the number from the number input as arguments and returns a string (AKA The Password) which is set as the innerText value for the "result" (AKA Span) element
  resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// COPY PASSWORD
clipboardEl.addEventListener(`click`, () => {
  // Creating a textarea element which will be used to put the password inside of so that it can selected/copied
  const textarea = document.createElement(`textarea`);

  // Accessing the text/string value for the "result" span and setting it to the password variable
  const password = resultEl.innerText;

  // If user clicks the clipboard while no password is displayed the function will end and nothing will be copied to the clipboard
  if (password === ``){
    alert(`Please generate a password first`);
    return;
  }

  // Setting the value for the textarea to the password that is currently being displayed
  textarea.value = password;

  // Selecting the body element
  const body = document.querySelector(`body`);

  // Adding the textarea to the webpage/document
  body.append(textarea);

  // Using the select method which selects (AKA Focuses in on) an element. This is will highlight/select the value (AKA Password) inside the textarea.
  textarea.select();

  // Using execCommand to copy the selected value to the clipboard on the device the webpage is being viewed on
  // NOTE: Some execCommand commands/arguments are not supported by all browsers. However, copy is an execCommand command that all browsers support.
  document.execCommand(`copy`);

  // Removing the textarea element from the webpage/document
  textarea.remove();
  
  alert(`Password has been copied to the clipboard`);
});