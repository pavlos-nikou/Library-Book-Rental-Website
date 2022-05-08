let icons = document.querySelectorAll(".icon")
icons.forEach(element => {
    element.addEventListener("click", element => {
        icons.forEach(icon => {
            icon.classList.remove("active")
        })
        element.srcElement.classList.add("active")
        // console.log(element)
    })
});

// expand sidebar
let expandSidebarIcon = document.querySelector(".expand-sidebar-icon")
expandSidebarIcon.addEventListener("click",()=>{
    console.log("rotate")
    expandSidebarIcon.classList.toggle("rotate-icon-180")
    let sidebar = document.querySelector(".sidebar")
    let displayItems = document.querySelector(".displayItems")
    sidebarWidth = sidebar.offsetWidth
    displayItems.offsetWidth = "100%"
    sidebar.classList.toggle("hideSidebar")
})

if (window.matchMedia("(max-width: 1150px)").matches) {
    let expandSidebarIcon = document.querySelector(".sidebar .iconContainer")
    let sidebar = document.querySelector(".sidebar")
    expandSidebarIcon.classList.remove("hidden")
    sidebar.classList.add("hideSidebar")
}
if (window.matchMedia("(min-width: 1150px)").matches) {
    let expandSidebarIcon = document.querySelector(".sidebar .iconContainer")
    expandSidebarIcon.classList.add("hidden")
}
window.onresize = function () {
    if (window.matchMedia("(max-width: 1150px)").matches) {
        let expandSidebarIcon = document.querySelector(".sidebar .iconContainer")
        let sidebar = document.querySelector(".sidebar")
        expandSidebarIcon.classList.remove("hidden")
        sidebar.classList.add("hideSidebar")
    }
    if (window.matchMedia("(min-width: 1150px)").matches) {
        let expandSidebarIcon = document.querySelector(".sidebar .iconContainer")
        let sidebar = document.querySelector(".sidebar")
        expandSidebarIcon.classList.add("hidden")
        sidebar.classList.remove("hideSidebar")
    }
}