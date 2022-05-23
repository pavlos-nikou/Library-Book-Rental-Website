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
expandSidebarIcon.addEventListener("click", () => {
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

// #############################################FILTERS################################################
function addFilters(filters) {
    let items = document.querySelectorAll(".item")
    items.forEach(item => {
        // console.log(item.dataset.genre)
        // console.log(item.dataset.material)
        // console.log(item.dataset.lang)
        item.classList.remove("hide")
        if (!filters.genre.includes(item.dataset.genre) && filters.genre.length !== 0) {
            item.classList.add("hide")
        }
        if (!filters.material.includes(item.dataset.material) && filters.material.length !== 0) {
            item.classList.add("hide")
        }
        if (!filters.lang.includes(item.dataset.lang) && filters.lang.length !== 0) {
            item.classList.add("hide")
        }
    })
}

let genreFilters = document.querySelectorAll(".side-genres input")
let materialFilters = document.querySelectorAll(".side-material input")
let langFilters = document.querySelectorAll(".side-langs input")
let filters = { genre: [], material: [], lang: [] }

// clear filters
let removeGenre = document.querySelector("#removeGenre")
// removeGenre.addEventListener("click",removeFilters)

// add or remove filters
genreFilters.forEach(genre => {
    genre.addEventListener("change", (event) => {
        if (event.target.checked === true) {
            // console.log("checked")
            filters.genre.push(event.target.name)
        }
        else {
            filters.genre = filters.genre.filter(element => element !== event.target.name)
        }
        console.log(filters)
        addFilters(filters)
    })
})
materialFilters.forEach(material => {
    material.addEventListener("change", (event) => {
        if (event.target.checked === true) {
            // console.log("checked")
            filters.material.push(event.target.name)
        }
        else {
            filters.material = filters.material.filter(element => element !== event.target.name)
        }
        // filters.material.push(event.target.name)
        console.log(filters)
        addFilters(filters)
    })
})
langFilters.forEach(lang => {
    lang.addEventListener("change", (event) => {
        if (event.target.checked === true) {
            // console.log("checked")
            filters.lang.push(event.target.name)
        }
        else {
            filters.lang = filters.lang.filter(element => element !== event.target.name)
        }
        // filters.lang.push(event.target.name)
        console.log(filters)
        addFilters(filters)
    })
})

// ##########################################LAZY LOADING#######################################

const generateStars = rating => {
    intRating = Math.floor(rating)
    stars = ""
    for (let i = 1; i <= 5; i++) {
        if (i <= intRating) {
            stars += '<i class="fa-solid fa-star"></i>'
        }
        else {
            stars += '<i class="fa-regular fa-star"></i>'
        }
    }
    return stars
}

const appendNewData = data => {
    let displayItems = document.querySelector(".displayItems")
    data.forEach((book) => {
        const item = document.createElement("div")
        item.classList.add("item")
        item.dataset.id = book._id
        item.dataset.lang = book.language_code
        item.dataset.material = book.material
        item.dataset.genre = book.genre
        const ratingInStars = generateStars(book.average_rating)
        item.innerHTML = `<img src="${book.image_url}" alt="book cover of ${book.title}">
                            <span class="title">${book.title}</span>
                            <span>Rating:</span>
                            <p>${ratingInStars}</p>`
        displayItems.appendChild(item)
    })
}

let loading = false
$(window).scroll(function () {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        if (loading === false) {
            loading = true
            // console.log("this is the end")
            let searchTerm = window.location.search.slice(8)
            let displayItems = document.querySelector(".displayItems")
            if (displayItems.childElementCount >= 10) {
                let loadingDiv = document.createElement("div")
                loadingDiv.classList.add("loading")
                loadingDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
                displayItems.appendChild(loadingDiv)
                console.log(searchTerm, displayItems.childElementCount)

                fetch(`http://localhost:3000/UnderConstruction/searchproducts/${searchTerm}/${displayItems.childElementCount - 1}`)
                    .then(response => {
                        return response.json()/*xriazete return mlka pavlo*/
                    })
                    .then(data => {
                        console.log("Lazy Loading data :", data)
                        if (data.length === 0) {
                            loadingDiv.innerHTML = "End of Results :("
                        }
                        else {
                            loadingDiv.remove()
                            loading = false
                            appendNewData(data)
                            addFilters(filters)
                        }
                    })
            }
        }

    }
});

