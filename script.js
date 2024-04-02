const numButton = document.querySelectorAll(".btn");
const clearButton = document.getElementById("clear");
const calcButton = document.getElementById("equals");
const history = document.getElementById("expr");
const ans = document.getElementById("ans");
const delButton = document.getElementById("delete");
const dotButton = document.getElementById("dot");

numButton.forEach(clicked => {
    clicked.addEventListener("click", () =>{
        keyPressed(clicked);
        document.getElementsByClassName(`${clicked.textContent}`)[0].blur();
    });
});

clearButton.addEventListener("click", () => clear());
calcButton.addEventListener("click", () => calculate());
delButton.addEventListener("click", () => backSpace());
dotButton.addEventListener("click", () => dot());

document.addEventListener("keydown", (e) => {
    
    if(!isNaN(e.key) && e.key !== ' '){
		document.getElementById(`${e.key}`).click();
	}
    if(e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/" || e.key == "%" || e.key == "=" || e.key == "^" || e.key == "c" || e.key == "C"){
        document.getElementsByClassName(`${e.key}`)[0].click();
    }
    if (e.key === '.') {
		document.getElementById('dot').click();	
	}
    if(e.key == "Backspace"){
        backSpace()
    }
    if(e.key === "Enter"){
        calculate()
    }
});

function clear(){
    window.location.reload();
}

function check(){
    // check if theres a number before clicking an operator 
    const str = history.textContent;
    const lastStr = str.charAt(str.length - 1);

    arr = ["+", "-", "×", "÷", "%", "^"]

    for(i = 0; i < arr.length; i++){
        if(lastStr == arr[i]){
            return true
        }
    }
    return false;
}

function dot(){
    dotButton.disabled = true;
}

function keyPressed(key){
    if(check() == true){
        dotButton.disabled = false;
    }
    if(ans.textContent != "" && check() == false){
        history.textContent = ans.textContent;
        ans.textContent = ""
    }
    if((Number(history.textContent) == 0 && key.textContent == "+") || (Number(history.textContent) == 0 && key.textContent == "-") ||
     (Number(history.textContent) == 0 && key.textContent == "×") || (Number(history.textContent) == 0 && key.textContent == "÷") ||
     (Number(history.textContent) == 0 && key.textContent == "%") || (Number(history.textContent) == 0 && key.textContent == "^") ||
     (Number(history.textContent) == 0 && key.textContent == ".")){
        history.textContent += key.textContent;
    }
    else if(check() == true && key.textContent != Number(key.textContent)){
        history.textContent = history.textContent.substring(0, history.textContent.length - 1);
        history.textContent += key.textContent;
    }
    else if(history.textContent == "0."){
        history.textContent += key.textContent
    }
    else if(Number(history.textContent) == 0){
        history.textContent = ""
        history.textContent += key.textContent;
    }
    else{
        history.textContent += key.textContent;
    }
}

function backSpace(){
    if(Number(history.textContent) == 0){
        history.textContent = 0;
    }
    else if(history.textContent.charAt(history.textContent.length - 1) == "."){
        history.textContent = history.textContent.substring(0, history.textContent.length - 1);
        dotButton.disabled = false;
    }
    else if(history.textContent.length == 1){
        history.textContent = 0;
    }
    else{
        history.textContent = history.textContent.substring(0, history.textContent.length - 1);
    }
}

function calculate(){
    let result;
    let j = 0;
    const resultArray = history.textContent;
    const number = resultArray.split(/[\+\-\×\÷\%\^]+/);
    const nums = number.map(function(str) {
        return parseFloat(str); });
    const operator = resultArray.split(/[0-9.]+/).filter(Boolean);

    for(i = 0; i < nums.length; i++){   
        if(operator[j] == "+"){
            result = add(nums[0], nums[1])
            nums.shift()
            nums.shift()
            operator.shift()
            nums.unshift(result)
            i = 0;
        }
        else if(operator[j] == "-"){
            result = subtract(nums[0], nums[1])
            nums.shift()
            nums.shift()
            operator.shift()
            nums.unshift(result)
            i = 0;
        }
        else if(operator[j] == "×"){
            result = multiply(nums[0], nums[1])
            nums.shift()
            nums.shift()
            operator.shift()
            nums.unshift(result)
            i = 0;
        }
        else if(operator[j] == "÷"){
            result = divide(nums[0], nums[1])
            nums.shift()
            nums.shift()
            operator.shift()
            nums.unshift(result)
            i = 0;
        }
        else if(operator[j] == "^"){
            result = power(nums[0], nums[1])
            nums.shift()
            nums.shift()
            operator.shift()
            nums.unshift(result)
            i = 0;
        }
        else if(operator[j] == "%"){
            result = modulo(nums[0], nums[1])
            nums.shift()
            nums.shift()
            operator.shift()
            nums.unshift(result)
            i = 0;
        }
        ans.textContent = nums
    }

}

function add(num1, num2){
    sum = num1 + num2
    return Math.round(sum * 100) / 100;
}

function subtract(num1, num2){
    dif = num1 - num2
    return Math.round(dif * 100) / 100;
}

function multiply(num1, num2){
    prod = num1 * num2
    return Math.round(prod * 100) / 100;
}

function divide(num1, num2){
    if(num2 == 0){
        return "Cannot divide by zero"
    }
    quo = num1 / num2
    return Math.round(quo * 100) / 100;
}

function power(num1, num2){
    exp = num1 ** num2
    return Math.round(exp * 100) / 100;
}

function modulo(num1, num2){
    rem = num1 % num2
    return Math.round(rem % 100) / 100;
}