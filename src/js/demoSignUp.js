const demoInputElement = document.getElementById('names');
const demoParent = document.querySelector('.demoParent');
const pinInputElement = document.getElementById('pins');
const pinSubmitButton = document.getElementById('pinSubmit');
//let counter = 0;

const pinTA = 95126;
const pinStudent = 95050;
let pinEntered = false;
let modAccess = false;

const nameSubmission = (event) => {
  if(pinEntered == true){
    //console.log("inside pinEntered true")
    const li = document.createElement('li');
    const button = document.createElement('button');
    const span = document.createElement('span');
    li.classList.add('li');
    //li.setAttribute("id", counter);
    //counter++;
    span.textContent = demoInputElement.value;
    button.classList.add('close');
    button.setAttribute('type', 'button');
    button.addEventListener('click', handleDeleteButton);
    button.innerHTML = '<span aria-hidden="true">&times;</span>';
    li.appendChild(span);
    li.appendChild(button);
    demoInputElement.value = "";
    demoParent.appendChild(li);
    demoInputElement.removeAttribute('disabled'); //idk if this is necessary
  }else{
    demoInputElement.value = "";
    window.alert("Need Access Code");
  }
}
const pinSubmission = (event) => {
  pin = pinInputElement.value;
  if(pin == pinTA){
    //console.log("ta here");
    pinEntered = true;
    modAccess = true;
    pinInputElement.value = "TA Access";
    pinInputElement.style.backgroundColor = "#46a368";
    pinSubmitButton.disabled = true;
    pinInputElement.disabled = true;
  }else if(pin == pinStudent){
    //console.log("student here");
    pinEntered = true;
    pinInputElement.value = "Student Access";
    pinInputElement.style.backgroundColor = "#34aeeb";
    pinSubmitButton.disabled = true;
    pinInputElement.disabled = true;
  }else{
    window.alert("Bad Access Code. Try Again Loser.");
  }
  //pinInputElement.value = "";
}
const handleDeleteButton = (event) => {
  console.log(event);
  if(modAccess == true){
    event.path[2].remove();
  }else {
    window.alert("You're not a TA, loser");
  }
}
const main = () => {

}

main();
