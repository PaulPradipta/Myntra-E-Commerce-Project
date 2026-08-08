
let products = [];
let filteredProducts = [];

const productContainer = document.getElementById("products-container")

const productSection = document.getElementById("product-section")


fetchProducts();


function fetchProducts() {


    fetch('https://dummyjson.com/products', {
        method: 'GET'
    })

    .then((response)=>response.json())

    .then((data)=> {
        products = data.products
        
        renderProducts(products)

        filteredProducts = [...products];
    })

    .catch((error)=>console.log(error))
}

function renderProducts(productsToRender) {

    if(productsToRender.length == 0) {

        productContainer.innerHTML =  `
            <div class="w-full min-h-screen flex flex-col items-center justify-center py-5">
                <img
                    src="https://jalongi.com/public/assets/images/product_not_found.jpeg"
                    alt="No Products Found"
                    class="w-100 h-fit"
                >

                <p class="text-gray-500 mt-2 capitalize">
                    Try changing your Filters.
                </p>
            </div>
        `
        return;
    }
    
    const cards = productsToRender.map((item)=>{

        return `
            <div class="lg:w-[23%] lg:h-[380px] shadow-md flex flex-col bg-white ml-2">

                <div class="h-50 flex justify-center items-center">

                    <img
                        src="${item.images[0]}"
                        class="h-50 w-full object-contain"
                    >

                </div>

                <div class="p-2 flex-1 flex flex-col">

                    <h3 class="font-bold line-clamp-1">
                        ${item.title}
                    </h3>

                    <p class="text-gray-500 text-sm mt-2 line-clamp-2">
                        ${item.description}
                    </p>

                    <div class="flex items-center justify-start space-x-3 w-full">
                        <p class="text-center text-sm mt-2 capitalize font-bold text-green-500 bg-green-200 py-1 px-3 w-full">
                        ${item.category}
                        </p>
                        <button
                            onclick="addToCart(${item.id})" 
                            class="cursor-pointer text-sm mt-2 capitalize font-bold text-red-500 bg-red-200 py-1 px-3 w-full">Add To Cart</button>
                    </div>

                   <div class="flex items-center justify-start space-x-3 w-full">
                        <p class="text-center text-sm mt-2 capitalize font-bold text-blue-500 py-1 px-3 w-full">
                        ₹ ${item.price}
                        </p>
                        <p class="cursor-pointer text-sm mt-2 capitalize font-bold text-yellow-600 py-1 px-3 w-full">${item.rating} ⭐</p>
                    </div>

                </div>

            </div>
        `
    })

    productContainer.innerHTML = cards.join("");
}

function getSelectedCategories() {

    return [
        ...document.querySelectorAll(".category:checked")
    ].map((category)=>category.value)
}

function getSelectedRatings() {
    return [
        ...document.querySelectorAll(".rating:checked")
    ].map((rating)=>rating.value)
}

function applyFilters() {
    filteredProducts = [...products]

    const selectedCategories = getSelectedCategories()

    

    if(selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter((product) => 
            selectedCategories.includes(product.category)
        )
    }

    const selectedRatings = getSelectedRatings()

    if(selectedRatings.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
            selectedRatings.some((rating)=>product.rating >= rating)
        )
    }

    renderProducts(filteredProducts)
}

const categoryCheckboxes = document.querySelectorAll(".category");

categoryCheckboxes.forEach((checkBox)=>{
    checkBox.addEventListener("change",applyFilters)
})

const ratingCheckboxes = document.querySelectorAll(".rating");

ratingCheckboxes.forEach((ratingCheckBox)=>{
    ratingCheckBox.addEventListener("change",applyFilters)
})


//Clear All Functionality

const checkBoxeFilters = [".category",".rating"] 

function clearCheckboxFilter() {

    checkBoxeFilters.forEach((selector)=>
        document.querySelectorAll(selector).forEach(item => {
            item.checked = false
        })
    )
}

function clearAllFilters() {
    clearCheckboxFilter()
    applyFilters()
}

const clearFilterBtn = document.getElementById("clear-filters")

clearFilterBtn.addEventListener("click",clearAllFilters)

//Open and Close Shopping Cart Functionality
const cartBtn = document.getElementById("cart-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const closeCart = document.getElementById("close-cart");

const openCart = () => {

    // Show drawer
    cartDrawer.classList.remove("translate-x-full");

    // Show overlay
    cartOverlay.classList.remove("opacity-0", "invisible");

    cartOverlay.classList.add("opacity-100", "visible");
};


const closeCartDrawer = () => {

    // Hide drawer
    cartDrawer.classList.add("translate-x-full");

    // Hide overlay
    cartOverlay.classList.remove("opacity-100", "visible");

    cartOverlay.classList.add("opacity-0", "invisible");
};

cartBtn.addEventListener("click", openCart);


// Close button click
closeCart.addEventListener("click", closeCartDrawer);


// Overlay click
cartOverlay.addEventListener("click", closeCartDrawer);

// Add To Cart Functionality

const cartContainer = document.getElementById("cart-container");
const cartCount = document.getElementById("cart-count");
const cartItemsCount = document.getElementById("cart-items-count");
const cartTotal = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

//Saving Cart to Local Storage

const saveCart = ()=> {
    localStorage.setItem("cart",JSON.stringify(cart))
}

//Update Cart Badge
const updateCartCount = ()=> {
    // Number of Unique Products
    cartCount.innerText = cart.length

    // Number of Products with Quantity
    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,0
    )

    cartItemsCount.innerText = `${(totalQuantity === 1 || totalQuantity === 0)  ? `${totalQuantity} Item` : `${totalQuantity} Items`}`
}

//Add To Cart

const addToCart = (id)=> {
    //Find product from original products array
    const product = products.find(item => item.id === id)

    if(!product) {
        console.log("Product not Found")
        return
    }

    // Check whether product already exists in cart
    const existingProduct = cart.find(
        item => item.id === id
    )

    if(existingProduct) {
        existingProduct.quantity++;
    }
    else {
        cart.push({
            ...product,
            quantity: 1
        })
    }

    //Save Updated Cart
    saveCart();

    //Update UI
    updateCartCount();
    renderCart();


}

// Render Cart 

const renderCart = ()=> {
    if(cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center py-10">
                
                <i class="ri-shopping-cart-line text-5xl text-gray-300"></i>

                <p class="mt-3 text-gray-500 font-semibold">
                    Your cart is empty
                </p>

            </div>
        `;

        cartTotal.innerText = "₹ 0.00";
        updateCartCount();
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
            <div class="flex gap-4">
               <img src="${item.thumbnail}" alt="" class="w-30 h-30">
               <div class="flex flex-col gap-y-4">
                  <span class="font-[700] text-[12px] text-black">${item.title}</span>
                  <span class="font-[700] text-[12px] text-black"> ₹ ${item.price}</span>
                  <div class="flex gap-x-2">
                     <button 
                        onclick="decreaseQuantity(${item.id})"
                        class="cursor-pointer hover:bg-gray-200 transition duration-300 w-6 h-6 rounded-full flex items-center justify-center">
                        <i class="ri-subtract-line"></i>
                     </button>
                     <span class="w-6 h-6 rounded-full flex items-center justify-center">${item.quantity}</span>
                     <button 
                        onclick="increaseQuantity(${item.id})"
                        class="cursor-pointer hover:bg-gray-200 transition duration-300 w-6 h-6 rounded-full flex items-center justify-center">
                        <i class="ri-add-line"></i>
                     </button>
                     <button
                        onclick="removeFromCart(${item.id})" 
                        class="cursor-pointer hover:bg-red-500 hover:text-white transition duration-300 w-6 h-6 rounded-full flex items-center justify-center">
                        <i class="ri-delete-bin-line"></i>
                     </button>
                  </div>
               </div>
            </div>
        `).join("")

        updateCartTotal();
        updateCartCount();
}

//Increase Quantity

const increaseQuantity = (id) => {
    const product = cart.find(
        item => item.id === id
    );

    if(!product) return;

     product.quantity++;

     saveCart();
     renderCart();
}

// Decrease Quantity

const decreaseQuantity = (id) => {
    const product = cart.find(
        item => item.id === id
    );

    if(!product) return;

    if(product.quantity > 1) {
        product.quantity--;
    } else {
        //If quantity is 1, remove product
        cart = cart.filter(
            item => item.id != id
        );
    }

    saveCart();
    renderCart();
}

//Remove Product From Cart

const removeFromCart = (id) => {
    cart = cart.filter(
        item => item.id != id
    );

    saveCart();
    renderCart();
}

//Update Total Price

const updateCartTotal = ()=> {
    const total = cart.reduce(
        (sum, item) => {
            return sum + (item.price * item.quantity)
        },
        0
    );

    cartTotal.innerText = `₹ ${total.toFixed(2)}`;
}

updateCartCount();
renderCart();


// DEBOUNCED SEARCH

const searchInput = document.getElementById("search-input");


// Debounce Function
const debounce = (callback, delay) => {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

};


// Search Products
const searchProducts = (searchText) => {

    const searchTerm = searchText
        .toLowerCase()
        .trim();


    // If search box is empty
    if (searchTerm === "") {

        filteredProducts = [...products];

        renderProducts(filteredProducts);

        return;
    }


    // Search only by title and category
    filteredProducts = products.filter((product) => {

        const title = product.title.toLowerCase();

        const category = product.category.toLowerCase();

        const rating = String(product.rating);


        return (
            title.includes(searchTerm) ||
            category.includes(searchTerm) ||
            rating.includes(searchTerm)
        );

    });


    renderProducts(filteredProducts);

};


// Create debounced search function
const debouncedSearch = debounce(
    searchProducts,
    300
);


// Listen for typing
searchInput.addEventListener("input", (event) => {

    debouncedSearch(event.target.value);

});