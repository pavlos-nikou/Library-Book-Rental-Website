let toggleSwitch = document.querySelector("#toggle")
toggleSwitch.addEventListener("click",()=>{
    console.log("toggled")
    let toggleElements = document.querySelectorAll("#toggling")
    let header = document.querySelector("header")
    for (const element of toggleElements) {
        element.classList.toggle("toggling")
    }
    header.classList.toggle("headerAdjust")
})
