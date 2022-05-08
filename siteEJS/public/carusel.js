// initial setup
window.onresize = function () {
    nextButton.classList.remove("disabled")
    prevButton.classList.add("disabled")
    prevButton.disabled = true
    setCarusel()
    // if (window.matchMedia("(max-width: 500px)").matches) {
    //     prevButton.classList.remove("disabled")
    //     location.reload()
    // }
}
function setCarusel() {
    let margin = 5
    let caruselItems = document.querySelectorAll(".caruselItem")
    let position = 0
    for (const element of caruselItems) {
        element.style.transform = `translateX(${position}px)`
        console.log(element.style.transform);
        position += margin
    }
}

let margin = 5
let caruselItems = document.querySelectorAll(".caruselItem")
let position = 0
for (const element of caruselItems) {
    element.style.transform = `translateX(${position}px)`
    console.log(element.style.transform);
    position += margin
}

// carusel move left
let nextButton = document.querySelector("#next")
nextButton.addEventListener("click", function () {
    // console.log(prevButton.classList.value)
    if (prevButton.classList.value === "disabled") {
        prevButton.classList.toggle("disabled")
    }
    prevButton.disabled = false;
    let caruselItems = document.querySelectorAll(".caruselItem")
    let width = caruselItems[0].offsetWidth;
    let movement = margin + width;
    for (const element of caruselItems) {
        let currentPosition = element.style.transform;
        currentPosition = parseInt(currentPosition.slice(11, -3));
        element.style.transform = `translateX(${currentPosition - movement}px)`;
        // console.log(element.style.transform)
    }
    // console.log(parseInt(caruselItems[0].style.transform.slice(11, -3)),-(width*caruselItems.length));
    let correction = 3
    if (window.matchMedia("(max-width: 1150px)").matches) {
        correction = 2
    }
    if (parseInt(caruselItems[0].style.transform.slice(11, -3)) <= -(width * (caruselItems.length - correction))) {
        nextButton.disabled = true
        nextButton.classList.toggle("disabled")
    }
    // console.log(caruselItems[0].style.transform)
})

// carusel move right
let prevButton = document.querySelector("#prev")
prevButton.disabled = true
prevButton.classList.toggle("disabled")
prevButton.addEventListener("click", function () {
    if (nextButton.classList.value === "disabled") {
        nextButton.classList.toggle("disabled")
    }
    nextButton.disabled = false;
    let caruselItems = document.querySelectorAll(".caruselItem")
    let width = caruselItems[0].offsetWidth;
    let movement = margin + width;
    for (const element of caruselItems) {
        let currentPosition = element.style.transform;
        currentPosition = parseInt(currentPosition.slice(11, -3));
        element.style.transform = `translateX(${currentPosition + movement}px)`;
        // console.log(element.style.transform)
    }
    if (parseInt(caruselItems[0].style.transform.slice(11, -3)) >= -50) {
        prevButton.disabled = true
        prevButton.classList.toggle("disabled")
    }
    // console.log(caruselItems[0].style.transform)
})

let caruselItemDiv = document.querySelector(".caruselItem:nth-of-type(2) div")
console.log(caruselItemDiv);
caruselItemDiv.addEventListener("click", () => {
    console.log("pressed")
    window.location.href = "productPage.html";
})