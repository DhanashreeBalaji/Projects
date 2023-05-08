const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

//Initial setup
let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setIndicator("#ccc"); //set strength circle to gray

//set passwordLength value in UI and slider according to passwordLength variable
function handleSlider(){
 inputSlider.value = passwordLength;
 lengthDisplay.innerText = passwordLength;
 //or kuch karna chahiya??
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

function setIndicator(color){
   indicator.style.backgroundColor = color;
   //shadow apply for indicator
   indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min,max){
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowerCase(){
     return String.fromCharCode(getRndInteger(97,123))
}
function generateUpperCase(){
   return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol(){
 const randNum = getRndInteger(0,symbols.length);
 return symbols.charAt(randNum);
}

   function calcStrength(){
      let hasUpper  = false;
      let hasLower = false;
      let hasNumbers = false;
      let hasSymbols = false;
   if(uppercaseCheck.checked) hasUpper=true;
   if(lowercaseCheck.checked) hasLower=true;
   if(numbersCheck.checked)   hasNumbers=true;
   if(symbolsCheck.checked)   hasSymbols=true;

  //Now we found out which all check boxes are checked and accordingly we will find strength through applying conditions over ticked checkboxes
  if (hasUpper && hasLower && (hasNumbers || hasSymbols) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNumbers || hasSymbols) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

   async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        //Above line is writing the password to clipboard...
        copyMsg.innerText = "Copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copyMsg wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}

//....Applying eventListener over copy button.........
function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    //special condition
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
    
})
   
  

   //................Applying the event listener on Slider. When slided over slider the value changes.So use that value and update in UI..........
   inputSlider.addEventListener('input', (e) =>{
      passwordLength = e.target.value;
      handleSlider();
   })

   function shufflePassword(array) {
      //Fisher Yates Method
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      let str = "";
      array.forEach((el) => (str += el));
      return str;
  }

   //APPLYING EVENT LISTENER ON COPY BUTTION
   copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

  //............ADDING EVENT LISTENER TO GENERATE PASSWORD BUTTON...........
   generateBtn.addEventListener('click', () => {

      //if no checkboxes ticked
      if(checkCount == 0) 
        return;

        if(passwordLength < checkCount){
         passwordLength = checkCount;
         handleSlider();
        }

         
         
        // To remove old password before generating a new one
           password = "";

    //According to the ticked checkboxes you have to call functions. To find which all checkboxes are ticked you have to apply eventlistener on every checkbox.....
         let funcArr = [];  //FunctionArray to keep functions

         if(uppercaseCheck.checked)
         funcArr.push(generateUpperCase); //If any checkbox is checked then that function is kept in array
         if(lowercaseCheck.checked)
         funcArr.push(generateLowerCase); 
         if(numbersCheck.checked)
         funcArr.push(generateRandomNumber); 
         if(symbolsCheck.checked)
         funcArr.push(generateSymbol); 

         //compulsory addition
         for(let i=0; i<funcArr.length; i++)
         password += funcArr[i](); //Function call

         //remaining addition
         for(let i=0; i<passwordLength-funcArr.length;i++){
         //The min and max value of randIndex range will depend on funcArr Length
            let randIndex = getRndInteger(0 , funcArr.length);
            console.log("randIndex" + randIndex);
            password += funcArr[randIndex]();
         }
    //shuffle the password
    password = shufflePassword(Array.from(password));
    //show in UI
    passwordDisplay.value = password;
    //calculate strength after shuffling
    calcStrength();
  }
   )