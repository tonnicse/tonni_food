// --- Product Data pointing at your local images/ folder ---
const products = [
    { id: 1, name: 'Chicken Biryani',    desc: 'Fragrant basmati rice with tender chicken pieces.',      image: 'biryani.jpg',    price: 6.99 },
    { id: 2, name: 'Veg Burger',         desc: 'Grilled veggie patty with fresh lettuce and tomato.',    image: 'burger.jpg',     price: 3.49 },
    { id: 3, name: 'Pasta Alfredo',      desc: 'Creamy alfredo sauce over al dente pasta.',             image: 'pasta.jpeg',      price: 5.99 },
    { id: 4, name: 'Sushi Platter',      desc: 'Assorted nigiri & rolls with wasabi & pickled ginger.',  image: 'sushi.jpg',      price: 12.50 },
    { id: 5, name: 'Loaded Nachos',      desc: 'Corn chips topped with cheese, jalapeños & salsa.',      image: 'nachos.jpeg',     price: 6.75 },
    { id: 6, name: 'Choco Heaven Cake',  desc: 'Decadent layered chocolate cake with ganache.',           image: 'cake.jpg',       price: 5.25 },
    { id: 7, name: 'Rainbow Macarons',   desc: 'Assorted pastel-colored French macarons.',                image: 'macarons.jpg',   price: 4.99 },
    { id: 8, name: 'Tropical Fruit',     desc: 'Seasonal fruits artfully arranged in vibrant display.',   image: 'fruits.jpg',     price: 7.50 }
  ];
  
  // --- Cart State ---
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // --- Update Cart Count ---
  function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  // --- Render Product Cards ---
  function renderProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    products.forEach(p => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col';
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" class="h-40 w-full object-cover">
        <div class="p-4 flex-1 flex flex-col">
          <h3 class="font-semibold text-lg mb-1 text-gray-800">${p.name}</h3>
          <p class="text-gray-600 flex-1">${p.desc}</p>
          <div class="mt-4 flex items-center justify-between">
            <span class="font-bold text-red-600">$${p.price.toFixed(2)}</span>
            <button data-id="${p.id}" class="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition">
              Add to Cart
            </button>
          </div>
        </div>
      `;
      list.appendChild(card);
    });
  
    // Attach “Add to Cart” handlers
    document.querySelectorAll('[data-id]').forEach(btn => {
      btn.onclick = () => {
        const prod = products.find(x => x.id == btn.dataset.id);
        cart.push(prod);
        updateCartCount();
      };
    });
  }
  
  // --- Show Checkout Overlay ---
  function showCheckout() {
    const overlay = document.getElementById('checkout');
    const itemsDiv = document.getElementById('cart-items');
    itemsDiv.innerHTML = '';
  
    if (!cart.length) {
      itemsDiv.innerHTML = '<p class="text-gray-700">Your cart is empty.</p>';
    } else {
      cart.forEach((p, i) => {
        const div = document.createElement('div');
        div.className = 'flex justify-between items-center border-b pb-2';
        div.innerHTML = `
          <div>
            <h4 class="font-medium text-gray-800">${p.name}</h4>
            <span class="text-gray-600">$${p.price.toFixed(2)}</span>
          </div>
          <button data-index="${i}" class="text-red-600 hover:underline">Remove</button>
        `;
        itemsDiv.appendChild(div);
      });
  
      // Remove handlers
      itemsDiv.querySelectorAll('[data-index]').forEach(btn => {
        btn.onclick = () => {
          cart.splice(btn.dataset.index, 1);
          updateCartCount();
          showCheckout();
        };
      });
    }
  
    overlay.classList.remove('hidden');
  }
  
  // --- Init on Page Load ---
  document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
  
    // Open cart
    document.querySelector('a[href="#checkout"]').onclick = e => {
      e.preventDefault();
      showCheckout();
    };
  
    // Close cart
    document.getElementById('close-cart').onclick = () => {
      document.getElementById('checkout').classList.add('hidden');
    };
  
    // Confirm order
    document.getElementById('confirm-order').onclick = () => {
      if (!cart.length) return alert('Your cart is empty!');
      alert('🎉 Thank you! Your order has been placed.');
      cart = [];
      updateCartCount();
      document.getElementById('checkout').classList.add('hidden');
    };
  });
  