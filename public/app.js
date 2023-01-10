// signIn
let signInButtonNavbar = document.querySelector("#accountIcon")
signInButtonNavbar.addEventListener("click", () => {
    let signInForm = document.querySelector("#signInForm")
    signInForm.classList.remove("hidden")
})

let quitSignIn = document.querySelector("#quitSignIn")
quitSignIn.addEventListener("click", () => {
    let signInForm = document.querySelector("#signInForm")
    signInForm.classList.add("hidden")
})