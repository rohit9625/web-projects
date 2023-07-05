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


// For active class of each page
const navLinks = document.querySelectorAll('.nav-link');
const winPathName = window.location.pathname;
console.log(navLinks);
navLinks.forEach(link =>{
    if(link.href.includes(winPathName)){
        link.classList.add('active-page');
    }
});


let shop = document.querySelector('#shop');

function isAvailable(status) {
    if(status){
        return "Available"
    }else { 
        return "Not Available"
    }
}
function colorAvailable(status) {
    if(status) {
        return "#009688";
    }else {
        return "red";
    }
}

//function to load particular items for a page
let loadItems = (item) => {
    return (shop.innerHTML = item.map((x) => {
    return `
    <div id="product-id-${x.id}" class="product-card">
        <div class="item">
            <span class="product-tag" style="color: ${colorAvailable(x.available)};" >${isAvailable(x.available,this)}</span>
            <img src=${x.image} alt="">
            <button type="button" onclick="addToCart(${x.id})" class="addToCart" id="${x.id}">Add To Cart</button>
        </div>
        <div class="product-info">
            <h3 class="product-name">${x.name}</h3>
            <p class="product-price">Rs. ${x.price}</p>
            <p class="product-description">${x.desc}</p>    
        </div>
    </div>
    `
    }).join(""));
   
}

for(let i=0; i<navLinks.length; i++) {
    if(navLinks[i].classList.contains('active-page')) {
        loadItems(productsCollection[i]);
    }
}

//****** For Cart Page ******
//basket to store your cart items
let basket = JSON.parse(localStorage.getItem("data")) || []; 
//Add to cart function
let addToCart = (id) => {
    let selectedItem = id;
    let search = basket.find((item) => item.id === selectedItem.id);

    if(search === undefined) {
        basket.push({
            id: selectedItem.id,
            quantity: 1
        });
    }else {
        search.quantity += 1;
    }
    // update(selectedItem.id);
    updateCartIcon();

    //Updating in local storage at last
    localStorage.setItem("data",JSON.stringify(basket));
}
//update function 
// let update = (id) => {
//     let search = basket.find((x) => x.id === id);
//     if(search === undefined) return;

//     console.log(search.quantity);
//     document.getElementById('quantity').innerHTML = search.quantity;
// }

let updateCartIcon = () => {
    let cartIcon = document.getElementById('quantity');
    // console.log(basket.map((x) => x.quantity).reduce((x, y) => x + y, 0));
    cartIcon.innerHTML = basket.map((x) => x.quantity).reduce((x, y) => x + y, 0);
}

updateCartIcon(); //Every time the website get's loaded
