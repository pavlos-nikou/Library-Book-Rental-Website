// let navbarButtons = document.querySelectorAll(".navbarButton")
// console.log(navbarButtons);
// navbarButtons.forEach(function (element) {
//     element.addEventListener("click", function (event) {
//         event.preventDefault()
//         let reference = document.querySelector(element.hash)
//         // console.log(reference)
//         const y = reference.getBoundingClientRect().center + window.scrollY;
//         window.scroll({
//             top: y,
//             behavior: 'smooth'
//         });
//     });
// });


// signIn
let signInButtonNavbar = document.querySelector("#accountIcon")
signInButtonNavbar.addEventListener("click",()=>{
    let signInForm = document.querySelector("#signInForm")
    signInForm.classList.remove("hidden")
})

let quitSignIn = document.querySelector("#quitSignIn")
quitSignIn.addEventListener("click",()=>{
    let signInForm = document.querySelector("#signInForm")
    signInForm.classList.add("hidden")
})


