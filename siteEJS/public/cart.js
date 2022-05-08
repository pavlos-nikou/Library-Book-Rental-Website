let cartButton = document.querySelector(".cart #cartIcon")
cartButton.addEventListener("click",()=>{
  let cart = document.querySelector(".cart")
  cart.classList.add("expand")
  cart.classList.remove("hovering")
  let cartXButton = document.querySelector("#cartQuitButton")
  cartXButton.classList.remove("hidden")
})

let cartXButton = document.querySelector("#cartQuitButton")
cartXButton.addEventListener("click",()=>{
  let cart = document.querySelector(".cart")
  cart.classList.remove("expand")
  cart.classList.add("hovering")
  cartXButton.classList.add("hidden")
})

// quantity selector and delete button

function cartItemSetup(){
  let cartItems = document.querySelectorAll(".cartItem")
  cartItems.forEach(element => {
    let quantitySelector = element.children[2]
    let remove_button = quantitySelector.children[0]
    let add_button = quantitySelector.children[2]
    let removeItemButton = element.children[4]
    let value = quantitySelector.children[1]
    remove_button.addEventListener("click",()=>{
      if (parseInt(value.value)>= 2) {
        value.value = parseInt(value.value)-1
      }
      
    })
    add_button.addEventListener("click",()=>{
      value.value = parseInt(value.value)+1
    })
    removeItemButton.addEventListener("click",()=>{
      element.remove()
    })
  });
}

cartItemSetup()
let cartEmpty = true
let caruseladdToCartButtons = document.querySelectorAll(".caruselItem button")
caruseladdToCartButtons.forEach(element => {
  element.addEventListener("click",()=>{
    let shoppingCart = document.querySelector("#shoppingCart")
    shoppingCart.innerHTML = shoppingCart.innerHTML + `<div class="cartItem">\
    <img src="http://prodimage.images-bn.com/pimages/9780545139700_p0_v5_s1200x630.jpg" alt="harry potter book">\
    <a class="title">Harry Potter</a>\
    <div class="quantity">\
      <button>-</button>\
      <input type="text" value="1">\
      <button>+</button>\
    </div>\
    <span class="price">10$</span>\
    <button class="removeItemButton">x</button>\
  </div>` 
  cartItemSetup()
  })
});