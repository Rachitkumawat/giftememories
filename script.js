// script.js (Fixed and Consolidated)
document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('productGrid');
  const searchBar = document.getElementById('searchBar');
  const categoryButtons = document.querySelectorAll('.category');

  let allProducts = [];

  fetch('products.json')
    .then(res => res.json())
    .then(products => {
      allProducts = products;
      renderProducts(products);
      attachCartListeners();
    });

  function renderProducts(products) {
    productGrid.innerHTML = '';
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button data-id="${product.id}">Add to Cart</button>
      `;
      productGrid.appendChild(card);
    });
    // attachCartListeners();
  }

  function attachCartListeners() {
    document.querySelectorAll('.product-card button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        const product = allProducts.find(p => p.id === id);
        addToCart(product);
      });
    });
  }

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);

  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const countSpan = document.getElementById('cart-count');
    if (countSpan) countSpan.textContent = totalItems;
    updateMiniCart(cart);
  }

  function updateMiniCart(cart) {
    const cartBox = document.getElementById('mini-cart');
    const cartItemsBox = document.getElementById('mini-cart-items');
    const cartTotal = document.getElementById('mini-cart-total');
    if (!cartBox || !cartItemsBox || !cartTotal) return;
    cartItemsBox.innerHTML = '';
    let total = 0;
    cart.slice(-3).forEach(item => {
      cartItemsBox.innerHTML += `<p>${item.name} × ${item.qty}</p>`;
      total += item.price * item.qty;
    });
    cartTotal.textContent = `Total: ₹${total}`;
  }

  document.getElementById('cart-toggle')?.addEventListener('click', (e) => {
    e.preventDefault();
    const miniCart = document.getElementById('mini-cart');
    miniCart.style.display = miniCart.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.cart-wrapper')) {
      const miniCart = document.getElementById('mini-cart');
      if (miniCart) miniCart.style.display = 'none';
    }
  });

  searchBar?.addEventListener('input', () => {
    const term = searchBar.value.toLowerCase();
    const filtered = allProducts.filter(p => p.name.toLowerCase().includes(term));
    renderProducts(filtered);
  });

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      const filtered = allProducts.filter(p => p.category === category);
      renderProducts(filtered);
    });
  });

  updateCartCount();
});
