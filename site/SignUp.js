// const signUpButton = document.getElementById('signUp');
// const signInButton = document.getElementById('signIn');
// const container = document.getElementById('container');

// signUpButton.addEventListener('click', () => {
// 	container.classList.add("right-panel-active");
// });

// signInButton.addEventListener('click', () => {
// 	container.classList.remove("right-panel-active");
// });
let continueButton = document.querySelector("#continue")
console.log(continueButton);
continueButton.addEventListener("click",()=>{
    let signUp = document.querySelector(".form_signup-container")
    signUp.style.transform = "translateY(-500px)"
    let container = document.querySelector(".container")
    container.style.width = "1080px"
})

let goBackButton = document.querySelector(".arrow")
goBackButton.addEventListener("click",()=>{
    let signUp = document.querySelector(".form_signup-container")
    signUp.style.transform = "translateY(0)"
    let container = document.querySelector(".container")
    container.style.width = "768px"
})