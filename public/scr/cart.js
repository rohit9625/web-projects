//****** For Responsive Navbar ******
const menu = document.getElementById('bar')
const nav = document.getElementById('navbar')
const close = document.getElementById('close')

if(bar) {
    bar.addEventListener('click', () =>{
        nav.classList.add('active')
    })
}

if(close) {
    close.addEventListener('click', () =>{
        nav.classList.remove('active')
    })
}

let cartHead = document.getElementById('head');
let cart = document.getElementById('cart');
let finalAmount = document.getElementById('final-price');

//basket to store your cart items
let basket = JSON.parse(localStorage.getItem("data")) || [];

//Update cart icon
let updateCartIcon = () => {
    let cartIcon = document.getElementById('quantity');
    // console.log(basket.map((x) => x.quantity).reduce((x, y) => x + y, 0));
    cartIcon.innerHTML = basket.map((x) => x.quantity).reduce((x, y) => x + y, 0);
}

updateCartIcon();

let loadCart = () => {
    if(basket.length !== 0) {
        return (cart.innerHTML = basket.map((item) =>{
            // console.log(basket);
            let {id, quantity} =  item;
            let search = basket.find((x) => (x.id === id)) || [];
            // console.log(id);
            let itemFromData
            for (const array of productsCollection) {
                for(const object of array) {
                    if(object.id === id) {
                        itemFromData = object;
                        break;
                    }
                }
                if(itemFromData){
                    break;
                }
            }
            // console.log(itemFromData);
            if(itemFromData === undefined) return;
            return `
            <tr>
                <td class="cart-product">
                    <img src="${itemFromData.image}" alt="">
                    <div class="product-info">
                        <h3 class="title">${itemFromData.name}</h3>
                        <small>Price : Rs. ${itemFromData.price}</small>
                        <i onclick="remove(${id})" class="bi bi-trash3 remove-btn"></i>
                    </div>
                </td>
                <td>
                    <div class="quantity">
                        <i class="bi bi-dash-circle-fill" onclick="decreament(${itemFromData.id})" style="color: #009688; font-size: 20px;"></i>
                        <p id="${itemFromData.id}">
                            ${search.quantity === undefined? 0: search.quantity}
                        </p>
                        <i class="bi bi-plus-circle-fill" onclick="increament(${itemFromData.id})"  style="color: #009688; font-size: 20px;"></i>
                    </div>
                </td>
                <td>Rs. ${search.quantity*itemFromData.price}</td>
            </tr>
            `
        }).join(""));
    }else {
        cart.innerHTML = `
        <div id="empty-cart">
            <i id="sad-face" class="bi bi-emoji-frown"></i>
            <h2>Your Bag is Empty</h2>
            <a href="./index.html">To back to home</a>
        </div>
        `;
        cartHead.innerHTML = ``;
        finalAmount.innerHTML = ``;
    }
};
loadCart();

//Increament function
let increament = (id) => {
    let selectedItem = id;
    let search = basket.find((item) => (item.id === selectedItem.id));

    //Hence item is already present in the cart
    search.quantity += 1; //So increase its quantity
    //and update cart icon

    update(selectedItem.id);
    updateCartIcon();
    loadCart();
    totalAmount();

    //Updating in local storage at last
    localStorage.setItem("data",JSON.stringify(basket));
}
//Decreament function
let decreament = (id) => {
    let selectedItem = id;
    let search = basket.find((item) => (item.id === selectedItem.id));

    if(search.quantity === 0)
        return;
        
    search.quantity -= 1;

    update(selectedItem.id);
    updateCartIcon();
    totalAmount();
    
    basket = basket.filter((x) => x.quantity !== 0);
    loadCart();

    //Updating in local storage at last
    localStorage.setItem("data",JSON.stringify(basket));
}
//Update function
let update = (id) => {
    let search = basket.find((item) => (item.id === id));

    document.getElementById(id).innerHTML = search.quantity;
}
//Remove function
let remove = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => (x.id !== selectedItem.id));
    localStorage.setItem("data",JSON.stringify(basket));
    loadCart();
    updateCartIcon();
    totalAmount();
}

//Final amount calculation
let totalPrice = document.getElementById('total-price');
let deliveryCharge = document.getElementById('delivery-charge');
console.log(deliveryCharge);
let totalAmount = () => {
    if(basket.length !== 0) {
        let amount = basket.map((x) => {
            let {id, quantity} = x; 
            let search;
            for(array of productsCollection) {
                for(object of array) {
                    if(object.id === id) {
                        search = object;
                        break;
                    }
                }
                if(search) break;
            }
            return (quantity * search.price);
        }).reduce((x,y) => x + y, 0);

        let delivery_charge = (amount < 500)? 30 : 50; 
        deliveryCharge.innerHTML = `
            <td>Delivery Charge</td>
            <td>Rs. ${delivery_charge}</td>
        `;
        totalPrice.innerHTML = `
            <td>Total Price:</td>
            <td>Rs. ${amount + delivery_charge}</td>
        `;
        // console.log(amount);
    } else return;
}

totalAmount();

//For checkout
let checkoutBtn = document.getElementById('checkout-btn');
let checkoutPage = document.getElementById('checkout');
let blur = document.getElementById('blur');

console.log(blur);

checkoutBtn.addEventListener('click', () => {
    checkoutPage.classList.toggle('pop');
    blur.classList.toggle('pop');
    console.log(checkoutBtn);
    console.log(checkoutPage);
});

//After submitting form
let proceedBtn = document.getElementById('proceed-btn');
console.log(proceedBtn);
proceedBtn.addEventListener('click', () => {
    window.location.href = 'redirect.html';

    localStorage.clear();
})