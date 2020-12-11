const demoInputElement = document.getElementById('names');
const questionInputElement = document.getElementById('qnames');
const demoParent = document.querySelector('.demoParent');
const questionParent = document.querySelector('.questionParent');
const pinInputElement = document.getElementById('pins');
const pinSubmitButton = document.getElementById('pinSubmit');
const urlD = new URL("http://"+location.host+"/demoQ");
const urlQ = new URL("http://"+location.host+"/questionQ");

const pinTA = 95126;
const pinStudent = [62221, 95050, 12345];
let pinEntered = false;
let modAccess = false;

//when a user submits a name to demo queue
const demoSubmission = (event) => {
  console.log(event);
  if(pinEntered == true){
    const name = demoInputElement.value;
    createDemo(name);

    fetch(urlD, {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name:name})
    }).catch(err => {
      console.log(err);
    })

  }else{
    //demoInputElement.value = "";
    window.alert("Need Access Code!");
  }
}

const createDemo = (name) => {
  const li = document.createElement('li');
  const button = document.createElement('button');
  const span = document.createElement('span');

  li.classList.add('li');
  span.textContent = name;
  button.classList.add('close');
  button.setAttribute('type', 'button');
  button.addEventListener('click', handleDeleteButton);
  button.innerHTML = '<span aria-hidden="true">&times;</span>';
  li.appendChild(span);
  li.appendChild(button);
  demoInputElement.value = "";
  demoParent.appendChild(li);
  demoInputElement.removeAttribute('disabled'); //idk if this is necessary


}

//when a user submits a name to question queue
const questionSubmission = (event) => {
  console.log(event);
  if(pinEntered == true){
    const name = questionInputElement.value;

    createQuestion(name);

    fetch(urlQ, {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name:name})
    }).catch(err => {
      console.log(err);
    })
  }else{
    //questionInputElement.value = "";
    window.alert("Need Access Code!");
  }
}

const createQuestion = (name) => {
  const li = document.createElement('li');
  const button = document.createElement('button');
  const span = document.createElement('span');


  li.classList.add('li');
  span.textContent = name;
  button.classList.add('close');
  button.setAttribute('type', 'button');
  button.addEventListener('click', handleDeleteButton);
  button.innerHTML = '<span aria-hidden="true">&times;</span>';
  li.appendChild(span);
  li.appendChild(button);
  questionInputElement.value = "";
  questionParent.appendChild(li);
  questionInputElement.removeAttribute('disabled'); //idk if this is necessary

}

//when a user submits a PIN
const pinSubmission = (event) => {
  pin = pinInputElement.value;
  if(pin == pinTA){
    pinEntered = true;
    modAccess = true;
    pinInputElement.value = "TA Access";
    pinInputElement.style.backgroundColor = "#46a368";
    pinSubmitButton.disabled = true;
    pinInputElement.disabled = true;
  }else if(pinStudent.includes(parseInt(pin))){
    pinEntered = true;
    pinInputElement.value = "Student Access";
    pinInputElement.style.backgroundColor = "#34aeeb";
    pinSubmitButton.disabled = true;
    pinInputElement.disabled = true;
  }else{
    window.alert("Bad Access Code. Try Again.");
  }
}

//when a user attempts to delete a user from either queue
const handleDeleteButton = (event) => {
  console.log(event);
  if(modAccess == true){
    const name = event.path[2].children[0].textContent
    if (event.path[3].classList.contains("demoParent")){
      fetch(urlD + "D", {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({name:name})
      }).catch(err => {
        console.log(err);
      })
    }else{
      fetch(urlQ + "D", {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({name:name})
      }).catch(err => {
        console.log(err);
      })
    }
    event.path[2].remove();
  }else {
    window.alert("You're not a TA!");
  }
}

const main = () => {
  fetch(urlD)
    .then(response => response.json())
    .then(data => {
      data.forEach(name => createDemo(name))
    });
    fetch(urlQ)
      .then(response => response.json())
      .then(data => {
        data.forEach(name => createQuestion(name))
      });
}
main();
