//Select elements from html.file and make/declare into variables in js
const heading = document.querySelector(".heading");
const form = document.querySelector(".form");
const inputName = document.querySelector(".inputName"); 
const inputCode = document.querySelector(".inputCode");
const loginBtn = document.querySelector(".loginBtn");
const logoutBtn = document.querySelector(".logoutBtn");
const newUserForm = document.querySelector(".newUserForm");
const newInputName = document.querySelector(".newInputName");
const newInputCode = document.querySelector(".newInputCode");
const newUserBtn = document.querySelector(".newUserBtn");               
const registerBtn= document.querySelector(".registerBtn");

//Declaration "users" array with 3 objects: userName and password
let users = [
    {
        userName: "fredrik",
        password: "12345"
    },
    {
        userName: "sara",
        password: "112233"
    },
    {
        userName: "Emma",
        password: "1111"
    }
]

addEventListeners();

// hide certain html elements by default
newUserForm.style.display = "none";
logoutBtn.style.display ="none";

setupUsers();
init();


function addEventListeners() {
    //Event..,When click, what will happend (function)
    loginBtn.addEventListener("click", login);
    logoutBtn.addEventListener("click", logoutClick);
    newUserBtn.addEventListener("click", newUserClick);
    registerBtn.addEventListener("click", newUserLoggedIn);
}
//If theres not saved users i localStorage (usersInLocalStorage === null) then save the users array in localStorage.
//If there are alrady saved users in localStorage then they will be written over in the users array. 
//This will happend every time the website is loaded.
function setupUsers() {
    const usersInLocalStorage = localStorage.getItem("users");
    if (usersInLocalStorage === null) {
        localStorage.setItem("users", JSON.stringify(users));
    } else {
        users = JSON.parse(usersInLocalStorage);
    }


}
//If user been logged in and saved in localStorage the user will still be logged in when the website 
//starts again after being closed 

function init () { 
    if (localStorage.getItem("isLoggedin")) {
        renderSuccessfulUI();
    }
}
//Function to check if the function checkCodes return true or false. If true the renderSuccessUI function 
//will start and user will be saved i localStorrage. If false renderFailUI will start.  
function login() {

        if (checkCodes()) {
            localStorage.setItem("isLoggedin", JSON.stringify(true));//När  någon från array[]strängen inloggad då ska inputName sparas i localStorage och isloggedin till true
            localStorage.setItem("username", inputName.value); //spara inputName i localStorage
            
            renderSuccessfulUI() //Kör function renderSuccessfulUI
        } else {
            renderFailUI(); //annars kör renderFailUI
        }     
    }

//Function to check if userName and secretCode is correct.If inputName=userName och inputCode=secretCode,true/false?
function checkCodes(){

    let userName = inputName.value;
    let pw = inputCode.value;
    for (i=0; i<users.length; i++) {
        if(userName === users[i].userName && pw === users[i].password){
            return true
        }
    }

    return false
}

//View succesful logged in, Välkommen " " är inloggad!
function renderSuccessfulUI(){
    heading.innerText = "Välkommen " + localStorage.getItem("username") + " du är inloggad!";
    form.style.display = "none";
    newUserBtn.style.display = "none";
    logoutBtn.style.display = "inline";
}


//View failure logging in. Felaktig inloggning, försök igen!
function renderFailUI(){
    heading.innerText = "Felaktig inloggning, försök igen";
    logoutBtn.style.display = "none";
   
}

//View :Var vänlig logga in (After loggedOut)
function logoutClick(){
    heading.innerText = "Var vänlig logga in!";
    logoutBtn.style.display = "none";
    form.style.display = "inline";
    inputName.value = '';
    inputCode.value = '';
    loginBtn.style.display = "inline";
    newUserBtn.style.display = "inline";
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedin");

}

//View  register new user.Var vänlig registrera ny användare
function newUserClick(){
    heading.innerText = "Var vänlig registrera ny användare";
    newUserForm.style.display ="inline"
    logoutBtn.style.display = "none";
    loginBtn.style.display = "none";
    form.style.display = "none";
    newUserBtn.style.display = "none";
    registerBtn.style.display = "inline";
}


//View : Välkommen " " är inloggad! (After new user are registrated)
function newUserLoggedIn(){
    heading.innerText = "Välkommen " + newInputName.value + " du är inloggad!";
    //Add new user to tha users array och save in localStorage. Then save the user as isLoggedin 
    //so that the user stays loggedIn if the site is reloaded.
    users.push({userName: newInputName.value, password: newInputCode.value});
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("isLoggedin", JSON.stringify(true));
    localStorage.setItem("username", newInputName.value);

    form.style.display = "none";
    newUserForm.style.display ="none";
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline";
    registerBtn.style.display = "none";
    newUserBtn.style.display ="none";
}

