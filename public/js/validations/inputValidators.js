const inputsToBeValidated = document.querySelectorAll(".form input:not([type='submit'])");
const submit = document.querySelector("input[type=submit]");
const selectedDiv = document.querySelector(".inputValidators")

let h2IfFailed = document.createElement("h2");
h2IfFailed.innerText = "Rellena todos los campos existentes.";
h2IfFailed.classList.add(".h2");
h2IfFailed.style.color = "red";

submit.addEventListener("click",(e)=>{
    let ArrayValidations = new Array();
    inputsToBeValidated.forEach( element => {
        if(element.value != 0){
            ArrayValidations.push(true);
        } else ArrayValidations.push(false);
    })

    console.log(inputsToBeValidated);
    const everyIsTrue = ArrayValidations.every( element => element);
    if(!everyIsTrue){
        e.preventDefault();
        selectedDiv.appendChild(h2IfFailed);
    }

})