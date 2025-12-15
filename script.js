/* --- PRODUCT DATABASE --- */
/* You can add as many items as you want here. 
   Just copy { ... }, and paste it again with new details. */
const products = [
    {
        id: 1,
        name: "Oversized Cotton Shirt",
        price: 45.90,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
        tag: "NEW IN"
    },
    {
        id: 2,
        name: "Linen Blend Trousers",
        price: 59.90,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800",
        tag: "BESTSELLER"
    },
    {
        id: 3,
        name: "Structure Blazer",
        price: 89.90,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
        tag: ""
    },
    {
        id: 4,
        name: "Ribbed Tank Top",
        price: 19.90,
        image: "https://images.unsplash.com/photo-1503342217505-b0815a002627?w=800",
        tag: "SALE"
    },
    {
        id: 5,
        name: "Satin Effect Dress",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1618932260643-be4bf9ae9eec?w=800",
        tag: "LIMITED"
    },
    {
        id: 6,
        name: "High Heeled Sandals",
        price: 49.90,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
        tag: ""
    }
];

// AUTOMATICALLY GENERATE 50 ITEMS (FOR DEMO ONLY)
// I am repeating the list above to simulate 50 items. 
// When you have your own photos, DELETE this loop.
const allProducts = [];
for(let i = 0; i < 9; i++) { // Repeat the list 9 times
    products.forEach(item => {
        // Create a copy with a unique ID so buttons work
        let copy = {...item}; 
        copy.id = allProducts.length + 1; 
        allProducts.push(copy);
    });
}

/* --- RENDER PRODUCTS TO PAGE --- */
const productGrid = document.getElementById('collection');

function renderProducts() {
    productGrid.innerHTML = ""; // Clear existing
    
    allProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        // This is the "Zara" Template for one item
        productCard.innerHTML = `
            <div class="image-container">
                <img src="${product.image}" alt="${product.name}">
                ${product.tag ? `<span class="tag">${product.tag}</span>` : ''}
                <button class="add-btn" onclick="addToCart(${product.id})">ADD +</button>
            </div>
            <div class="product-info">
                <div class="row">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

/* --- CART LOGIC (UPDATED) --- */
let cart = [];

function addToCart(id) {
    const product = allProducts.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
    
    // Tiny animation to show it worked
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "ADDED";
    setTimeout(() => btn.innerText = originalText, 1000);
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total').innerText = total.toFixed(2);
    
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = '';
    cart.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} <span style="float:right">$${item.price}</span>`;
        cartItemsList.appendChild(li);
    });
}

function checkoutViaWhatsApp() {
    const phoneNumber = "1234567890"; // YOUR PHONE NUMBER HERE
    if(cart.length === 0) return alert("Bag is empty");
    let message = "I would like to order:%0A";
    cart.forEach(item => message += `- ${item.name} ($${item.price})%0A`);
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    message += `%0ATotal: $${total.toFixed(2)}`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
}

// Modal Logic
const modal = document.getElementById("cart-modal");
const btn = document.querySelector(".cart-icon");
const span = document.getElementsByClassName("close-btn")[0];
btn.onclick = () => modal.style.display = "block";
span.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

// INITIALIZE
renderProducts();