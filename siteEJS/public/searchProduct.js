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
        // console.log(filters)
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
        // console.log(filters)
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
        // console.log(filters)
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
        item.dataset.title = book.title
        item.dataset.rating = book.average_rating
        const ratingInStars = generateStars(book.average_rating)
        item.innerHTML = `<img src="${book.image_url}" alt="book cover of ${book.title}">
                            <a class="title" href = "/UnderConstruction/searchProducts/${book._id}">${book.title}</a>
                            <span>Rating:</span>
                            <p>${ratingInStars}</p>
                            <button class="addToCart"><i class="fa-solid fa-cart-plus"></i></button>`
        displayItems.appendChild(item)
    })
}

let loading = false
$(window).scroll(function () {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        if (loading === false) {
            loading = true
            // console.log("this is the end")

            let displayItems = document.querySelector(".displayItems")
            if (displayItems.childElementCount >= 10) {
                let loadingDiv = document.createElement("div")
                loadingDiv.classList.add("loading")
                loadingDiv.innerHTML = `<i class="fa-solid fa-spinner fa-spin-pulse"></i>`
                displayItems.appendChild(loadingDiv)
                // console.log(searchTerm, displayItems.childElementCount)
                let currentUrl = window.location.href.split("/");
                // console.log(currentUrl[5]);
                let url = ""
                let searchTerm = ""
                if (currentUrl[5].slice(0, 1) == "s") {
                    searchTerm = window.location.search.slice(8)
                    url = `http://localhost:3000/UnderConstruction/searchproducts/s/${searchTerm}/${displayItems.childElementCount - 1}`
                }
                if (currentUrl[5] == "g") {

                    url = `http://localhost:3000/UnderConstruction/searchproducts/g/${currentUrl[6].slice(0, -1)}/${displayItems.childElementCount - 1}`
                }
                // console.log(url)
                fetch(url)
                    .then(response => {
                        return response.json()/*xriazete return mlka pavlo*/
                    })
                    .then(data => {
                        // console.log("Lazy Loading data :", data)
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
                    .catch(err => {
                        loadingDiv.innerHTML = "error!!!\n pls reload the page"
                    })
            }
        }

    }
});

// ##########################################SORTING#####################################################
function sortAz(elements) {
    let sortingHelp = []
    let i = 0
    elements.forEach(element => {
        sortingHelp.push({ index: i, title: element.dataset.title })
        i++
        // console.log(sortingHelp)
    })
    // console.log(sortingHelp)
    sortingHelp.sort((a, b) => (a.title > b.title ? 1 : -1));
    return sortingHelp
}
function sortZa(elements) {
    let sortingHelp = []
    let i = 0
    elements.forEach(element => {
        sortingHelp.push({ index: i, title: element.dataset.title })
        i++
        // console.log(sortingHelp)
    })
    // console.log(sortingHelp)
    sortingHelp.sort((a, b) => (a.title < b.title ? 1 : -1));
    return sortingHelp
}
function sortRating(elements) {
    let sortingHelp = []
    let i = 0
    elements.forEach(element => {
        sortingHelp.push({ index: i, rating: element.dataset.rating })
        i++
        console.log(sortingHelp)
    })
    // console.log(sortingHelp)
    sortingHelp.sort((a, b) => (a.rating < b.rating ? 1 : -1));
    return sortingHelp
}

function sort(func) {
    let display = document.querySelector(".displayItems")
    // console.dir(display)
    let displayItems = document.querySelectorAll(".item")
    // console.log(displayItems)
    sortingHelp = func(displayItems)
    let sortedElements = []
    sortingHelp.forEach(element => {
        sortedElements.push(displayItems[element.index])
    });
    // console.log(sortedElements)
    display.innerHTML = ""
    // console.dir(sortedElements)
    sortedElements.forEach(element => {
        display.appendChild(element)
    })
}

let sortAzButton = document.querySelector(".fa-arrow-down-a-z")
sortAzButton.addEventListener("click", () => {
    sort(sortAz)
});

let sortZaButton = document.querySelector(".fa-arrow-down-z-a")
sortZaButton.addEventListener("click", () => {
    sort(sortZa)
})

let sortRatingButton = document.querySelector(".fa-thumbs-up")
sortRatingButton.addEventListener("click", () => {
    sort(sortRating)
})

