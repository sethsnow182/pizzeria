
//Cart Menu Function
(function() {
    const cartInfo = document.getElementById("cart-info");
    const cart = document.querySelector(".container-content-section");

    cartInfo.addEventListener("click", function() {
        cart.classList.toggle("show-cart");
    });

})();

//Remove Items from Cart
var removeCartItemButtons = document.getElementsByClassName("btn-danger")
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener ('click', removeCartItem)
    }
var quantityInputs = document.getElementsByClassName("cart-quantity-input")
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener("change", quantityChanged)
}

//Adding Items to Cart
var addtoCartButtons = document.getElementsByClassName("fas fa-shopping-cart")


for (var i = 0; i < addtoCartButtons.length; i++) {
    var button = addtoCartButtons[i]
    button.addEventListener("click", addtoCartClicked)
}

document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked)

function purchaseClicked() {
    alert("Thank you for your purchase")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
        updateCartTotal()
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
    }
    updateCartTotal()
}

function addtoCartClicked(event) {
    var button = event.target
    var shop = button.parentElement.parentElement
    var shopTitle = button.parentElement.parentElement.parentElement
    var title = shopTitle.getElementsByClassName("store-item-name")[0].innerText
    var price = shopTitle.getElementsByClassName("font-weight-bold")[0].innerText
    var imageSrc = shop.getElementsByClassName("card-img-top store-img")[0].src
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement("div")
    cartRow.classList.add("cart-row")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    var cartItemNames = cartItems.getElementsByClassName("cart-item-title")
    for (var i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
            alert("This item is already added to the cart")
            return 
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">$${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">X</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem)
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged)
}


//Updating Total amount in Cart
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0]
    var cartRows = cartItemContainer.getElementsByClassName("cart-row")
    var total = 0
    var ItemsHeader = 0
    
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName("cart-price")[0]
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        var price = parseFloat(priceElement.innerText.replace("$", ""))
        var quantity = parseFloat(quantityElement.value)
        

        total = total + (price * quantity)
        ItemsHeader = ItemsHeader + quantity
        
    }
    total = Math.round(total * 100) / 100 
    document.getElementsByClassName('cart-total-price')[0].innerText = "$" + total
    document.getElementsByClassName('item-total')[0].innerText =  total
    document.getElementsByClassName('item-count')[0].innerText = ItemsHeader

}

// Scroll to top



$('#return-to-top').on("click", function () { // When arrow is clicked
    $('body, html').animate({ // Animate scroll to top of body
        scrollTop: 0
    });
});

$(window).on('scroll', function () {

    if ($(this).scrollTop() >= 50) { // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200); // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200); // Else fade out the arrow
    }
});

//Icon Toggle

$(".store-item-icon").click(function () {
    $(this).find('i').toggleClass("fa-shopping-cart fa-check-circle")
});


//Input Redirect
var reDirect = document.getElementById("search-icon");

reDirect.onclick = function () {
    var text = document.getElementById("search-item").value;
    window.open("https://www.google.com/search?sxsrf=ACYBGNReOgUqBelaXoSj0yhoo_UTjVgoWw%3A1574801589883&ei=tZDdXYTENczHrgTpjZuQBA&q="+ text);
}


//Trigger Button Click on Enter
var clickButton = document.getElementById("search-item");
clickButton.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("search-icon").click();
    }
});

// //Items to the carts function

// (function() {

// const cartBtn = document.querySelectorAll(".store-item-icon");

// cartBtn.forEach(function(btn) {
//     btn.addEventListener("click", function(event) {
//         // console.log(event.target);

//         if(event.target.parentElement.classList.contains("store-item-icon")) {

//             let fullPath = event.target.parentElement.previousElementSibling.src;
//             let pos = fullPath.indexOf("img") + 3;
            
//             let parPath = fullPath.slice(pos);

//             const item = {};
//             item.img = `img-cart${parPath}`;

//             let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
//             item.name = name;

//             let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;

//             let finalPrice = price.slice(1).trim();

//             item.price = finalPrice;


//             const cartItem = document.createElement("div");
//             cartItem.classList.add("cart-item",
//             "d-flex",
//             "justify-content-between",
//             "text-capitalize",
//             "my-3");

//             cartItem.innerHTML = `
//             <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
//             <div class="item-text">

//               <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
//               <span>$</span>
//               <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
//             </div>
//             <a href="#" id='cart-item-remove' class="cart-item-remove">
//               <i class="fas fa-trash"></i>
//             </a>
//           </div>`;

//           //Select cart
//           const cart  = document.getElementById("cart");
//           const total = document.querySelector(".cart-total-container");

//           cart.insertBefore(cartItem, total);

//           showTotals();

//         }

//         });
//     });


        


    // }

// })();

// //Removing items


// function ready() {
//     var removeItem = document.getElementsByClassName('cart-item-remove')
    
//         removeItem.addEventListener('click', removeCartItem)
//     var buttonClicked = event.target
//     buttonClicked.parentElement.remove()
// }

// function removeCartItem(event) {
//     var buttonClicked = event.target
//     buttonClicked.parentElement.remove()
// }


