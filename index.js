// Disable Lenis Smooth Scrolling - Use Normal Browser Scroll
let lenis = null; // Disabled for normal scroll speed

// NAVBAR & MENU
const navbar = document.querySelector("nav");
if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("sticky", window.scrollY > 0);
  });
}

const menu = document.querySelector(".menu");
const menuBtn = document.querySelector(".menu-btn");
const closeBtn = document.querySelector(".close-btn");

const toggleMenu = () => {
  if (!menu) return;
  menu.classList.toggle("active");
};

if (menuBtn) menuBtn.addEventListener("click", toggleMenu);
if (closeBtn) closeBtn.addEventListener("click", toggleMenu);

// Close menu when a link is clicked and smooth scroll to anchor
document.querySelectorAll(".menu a").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (menu && menu.classList.contains("active")) menu.classList.remove("active");
    
    // Handle smooth scrolling for anchor links
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// Close menu on ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu && menu.classList.contains("active")) {
    menu.classList.remove("active");
  }
});

// Click outside to close (ignore clicks on menu button)
document.addEventListener("click", (e) => {
  const target = e.target;
  if (!menu) return;
  if (
    menu.classList.contains("active") &&
    !menu.contains(target) &&
    !target.closest(".menu-btn") &&
    !target.closest(".close-btn")
  ) {
    menu.classList.remove("active");
  }
});

/* ------------------ PETS & CART: simple data-driven UI ------------------ */
const pets = [
  { id: 'p1', name: 'Sir Woofs', type: 'Dog', age: '2 years', img: 'img/pet-item-1.png', desc: 'Gentle and playful companion.', longDesc: 'Sir Woofs is a friendly and energetic dog who loves to play fetch and go on long walks. Perfect for active families.' },
  { id: 'p2', name: 'Captain Squawks', type: 'Bird', age: '1 year', img: 'img/pet-item-2.png', desc: 'A chirpy friend who loves to sing.', longDesc: 'Captain Squawks is a vibrant and talkative bird who enjoys music and interaction. Great for bird enthusiasts.' },
  { id: 'p3', name: 'Professor Meow', type: 'Cat', age: '3 years', img: 'img/pet-item-3.png', desc: 'Calm and curious lap cat.', longDesc: 'Professor Meow is a gentle and intelligent cat who loves cuddles and quiet time. Perfect for a calm home environment.' },
  { id: 'p4', name: 'Luna', type: 'Dog', age: '4 years', img: 'img/pet-item-1.png', desc: 'Loyal and protective companion.', longDesc: 'Luna is a devoted and protective dog who forms strong bonds with her family. Great for experienced dog owners.' },
  { id: 'p5', name: 'Whiskers', type: 'Cat', age: '2 years', img: 'img/pet-item-3.png', desc: 'Playful and affectionate feline.', longDesc: 'Whiskers is an active and loving cat who enjoys interactive toys and lots of attention. Perfect for families with children.' },
  { id: 'p6', name: 'Charlie', type: 'Dog', age: '1 year', img: 'img/pet-item-1.png', desc: 'Energetic puppy ready for adventure.', longDesc: 'Charlie is a young and energetic puppy who loves to explore and play. Ideal for active individuals or families.' },
  { id: 'p7', name: 'Mittens', type: 'Cat', age: '5 years', img: 'img/pet-item-3.png', desc: 'Mature and wise companion.', longDesc: 'Mittens is a calm and experienced cat who enjoys a peaceful environment. Perfect for seniors or quiet homes.' },
  { id: 'p8', name: 'Buddy', type: 'Dog', age: '3 years', img: 'img/pet-item-1.png', desc: 'Friendly and well-trained friend.', longDesc: 'Buddy is a well-behaved and sociable dog who gets along with everyone. Great for first-time dog owners.' },
  { id: 'p9', name: 'Sunny', type: 'Bird', age: '2 years', img: 'img/pet-item-2.png', desc: 'Bright and cheerful feathered friend.', longDesc: 'Sunny is a colorful and cheerful bird who brings joy to any home. Perfect for bird lovers.' }
];

const petsContainer = document.querySelector('.pets-collection');

// CART
let cart = [];
const CART_KEY = 'purrfect_cart_v1';
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartCountEl = document.getElementById('cart-count');
const cartItemsEl = document.getElementById('cart-items');
const clearCartBtn = document.getElementById('clear-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckoutBtn = document.getElementById('close-checkout');
const checkoutForm = document.getElementById('checkout-form');

function loadCart() {
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { cart = []; }
  updateCartUI();
}
function saveCart() { localStorage.setItem(CART_KEY, JSON.stringify(cart)); }

function updateCartUI() {
  if (cartCountEl) cartCountEl.textContent = cart.length;
  const cartCountSmall = document.getElementById('cart-count-small');
  if (cartCountSmall) cartCountSmall.textContent = cart.length;
  if (cartItemsEl) {
    cartItemsEl.innerHTML = cart.map(item => {
      const p = pets.find(x => x.id === item.id) || {};
      return `<div class="cart-item">
        <img src="${p.img || ''}" alt="${p.name || ''}" />
        <div class="meta">
          <strong>${p.name || 'Pet'}</strong>
          <div>${p.type || ''}</div>
        </div>
        <button class="btn-transparent remove-btn" data-id="${item.id}">Remove</button>
      </div>`;
    }).join('');
    document.querySelectorAll('.remove-btn').forEach(b => b.addEventListener('click', () => removeFromCart(b.dataset.id)));
  }
}

function addToCart(id) {
  if (!id) return;
  if (!cart.find(x => x.id === id)) {
    cart.push({ id });
    saveCart();
    updateCartUI();
  }
}
function removeFromCart(id) { cart = cart.filter(x => x.id !== id); saveCart(); updateCartUI(); }
function clearCart() { cart = []; saveCart(); updateCartUI(); }

// Cart modal handlers
if (cartBtn) cartBtn.addEventListener('click', () => {
  if (!cartModal) return;
  const open = cartModal.classList.toggle('active');
  cartModal.setAttribute('aria-hidden', open ? 'false' : 'true');
});
if (closeCartBtn) closeCartBtn.addEventListener('click', () => {
  if (!cartModal) return;
  cartModal.classList.remove('active');
  cartModal.setAttribute('aria-hidden', 'true');
});
if (clearCartBtn) clearCartBtn.addEventListener('click', () => { clearCart(); });

// Checkout flow
if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
  if (cartModal) { cartModal.classList.remove('active'); cartModal.setAttribute('aria-hidden','true'); }
  if (checkoutModal) { checkoutModal.classList.add('active'); checkoutModal.setAttribute('aria-hidden','false'); }
});
if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', () => { if (checkoutModal) { checkoutModal.classList.remove('active'); checkoutModal.setAttribute('aria-hidden','true'); } });

if (checkoutForm) {
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simple validation done by required attributes – show confirmation
    const name = checkoutForm.name.value;
    if (checkoutModal) { checkoutModal.classList.remove('active'); checkoutModal.setAttribute('aria-hidden','true'); }
    alert(`Thank you, ${name}! Your adoption request has been submitted.`);
    clearCart();
  });
}

// Search / Filter / Sort / Favorites
const searchInput = document.getElementById('search');
const filterType = document.getElementById('filter-type');
const sortBy = document.getElementById('sort-by');
const toggleFavsBtn = document.getElementById('toggle-favs');
let showFavorites = false;
const FAV_KEY = 'purrfect_favs_v1';
let favorites = JSON.parse(localStorage.getItem(FAV_KEY) || '[]');

function saveFavorites() { localStorage.setItem(FAV_KEY, JSON.stringify(favorites)); }

// update renderPets to apply filters
function getFilteredPets() {
  const q = (searchInput && searchInput.value) ? searchInput.value.toLowerCase() : '';
  const type = (filterType && filterType.value) ? filterType.value : 'all';
  let list = pets.slice();
  if (q) list = list.filter(p => (p.name+ ' ' + p.desc).toLowerCase().includes(q));
  if (type !== 'all') list = list.filter(p => p.type === type);
  if (showFavorites) list = list.filter(p => favorites.includes(p.id));
  if (sortBy && sortBy.value === 'name') list.sort((a,b)=> a.name.localeCompare(b.name));
  // featured sorting could be implemented via a 'featured' property; currently keep original
  return list;
}

// update renderPets to use filtered list
function renderPets() {
  if (!petsContainer) return;
  const list = getFilteredPets();
  const noResults = document.getElementById('no-results');
  if (list.length === 0) { if (noResults) noResults.style.display = 'block'; petsContainer.querySelectorAll('.pet-card').forEach(n => n.remove()); return; }
  if (noResults) noResults.style.display = 'none';

  petsContainer.innerHTML = list.map(p => `
    <div class="pet-card" data-id="${p.id}" style="opacity: 1; visibility: visible;">
      <div class="pet-badge">${p.type}</div>
      <div class="pet-avatar"><img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='img/pet-item-1.png'" /></div>
      <div class="pet-info">
        <h3>${p.name}</h3>
        <div class="pet-type">${p.age}</div>
        <p class="pet-desc">${p.desc}</p>
        <div class="pet-actions">
          <button class="btn-3 adopt-btn" data-id="${p.id}">Adopt</button>
          <button class="btn-transparent details-btn" data-id="${p.id}">Details</button>
          <button class="btn-transparent fav-btn ${favorites.includes(p.id)?'favored':''}" data-id="${p.id}" aria-label="Favorite"><i class="fa-regular fa-heart"></i></button>
        </div>
      </div>
    </div>
  `).join('');
  // attach handlers
  document.querySelectorAll('.adopt-btn').forEach(btn => btn.addEventListener('click', (ev) => {
    addToCart(btn.dataset.id);
    // animation
    const card = ev.currentTarget.closest('.pet-card');
    if (window.gsap && card) { gsap.fromTo(card, {scale:1}, {scale:1.04, duration:0.12, yoyo:true, repeat:1}); }
  }));
  document.querySelectorAll('.details-btn').forEach(b => b.addEventListener('click', (e) => { const id = e.currentTarget.dataset.id; openPetDetail(id); }));
  document.querySelectorAll('.fav-btn').forEach(b => b.addEventListener('click', (e) => {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    if (favorites.includes(id)) { favorites = favorites.filter(x=>x!==id); e.currentTarget.classList.remove('favored'); showToast('Removed from favorites'); }
    else { favorites.push(id); e.currentTarget.classList.add('favored'); showToast('Added to favorites'); }
    saveFavorites();
  }));
}

// wire up inputs
if (searchInput) searchInput.addEventListener('input', renderPets);
if (filterType) filterType.addEventListener('change', renderPets);
if (sortBy) sortBy.addEventListener('change', renderPets);
if (toggleFavsBtn) toggleFavsBtn.addEventListener('click', () => { showFavorites = !showFavorites; toggleFavsBtn.textContent = showFavorites ? 'Show All' : 'Show Favorites'; renderPets(); });

// Toast helper - Enhanced
const toastEl = document.getElementById('toast');
let toastTimer = null;
function showToast(msg, time=2200) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.style.display = 'block';
  // Force reflow to trigger animation
  toastEl.offsetHeight;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { 
    toastEl.style.display = 'none'; 
  }, time);
}

// Add animation + better addToCart feedback
function addToCart(id) {
  if (!id) return;
  // animate if possible
  try { flyToCart(id); } catch (e) { /* ignore animation errors */ }
  if (!cart.find(x => x.id === id)) {
    cart.push({ id });
    saveCart();
    updateCartUI();
    showToast('Added to cart');
  } else {
    showToast('Already in cart');
  }
}

// Orders handling
const ORDERS_KEY = 'purrfect_orders_v1';
function saveOrder(details) {
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  orders.unshift(details);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

// View past orders
const ordersModal = document.getElementById('orders-modal');
const ordersListEl = document.getElementById('orders-list');
const viewOrdersBtn = document.getElementById('view-orders');
const closeOrdersBtn = document.getElementById('close-orders');

function renderOrders() {
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  if (!ordersListEl) return;
  if (orders.length === 0) { ordersListEl.innerHTML = '<div>No past adoptions yet.</div>'; return; }
  ordersListEl.innerHTML = orders.map(o => `<div class="order-item"><strong>${o.name}</strong> — ${o.petNames.join(', ')}<div style="font-size:12px;color:#666">${new Date(o.date).toLocaleString()}</div></div>`).join('');
}

if (viewOrdersBtn) viewOrdersBtn.addEventListener('click', () => { if (!ordersModal) return; renderOrders(); ordersModal.classList.add('active'); ordersModal.setAttribute('aria-hidden','false'); });
if (closeOrdersBtn) closeOrdersBtn.addEventListener('click', () => { if (!ordersModal) return; ordersModal.classList.remove('active'); ordersModal.setAttribute('aria-hidden','true'); });

// extend checkout submit to save orders
if (checkoutForm) {
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = checkoutForm.name.value;
    const email = checkoutForm.email.value;
    const message = checkoutForm.message.value || '';
    const petNames = cart.map(i => (pets.find(p=>p.id===i.id)||{}).name || 'Pet');
    const order = { name, email, message, petNames, date: new Date().toISOString(), items: cart.slice() };
    saveOrder(order);
    if (checkoutModal) { checkoutModal.classList.remove('active'); checkoutModal.setAttribute('aria-hidden','true'); }
    cart = [];
    saveCart();
    updateCartUI();
    showToast('Adoption submitted! Thank you.');
    if (ordersModal) { renderOrders(); }
  });
}

// Basic focus trap for modals (cart, checkout, orders)
function trapFocus(modal) {
  const focusable = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const first = modal.querySelectorAll(focusable)[0];
  const focusables = Array.from(modal.querySelectorAll(focusable));
  if (!first) return;
  first.focus();
  // remove previous listener if present
  modal._trapHandler && modal.removeEventListener('keydown', modal._trapHandler);
  modal._trapHandler = function(e) {
    if (e.key !== 'Tab') return;
    const idx = focusables.indexOf(document.activeElement);
    if (e.shiftKey && idx === 0) { e.preventDefault(); focusables[focusables.length-1].focus(); }
    else if (!e.shiftKey && idx === focusables.length-1) { e.preventDefault(); focusables[0].focus(); }
  };
  modal.addEventListener('keydown', modal._trapHandler);
}

// When opening modals set focus trap and remember last focused element
let lastFocusedEl = null;
if (cartBtn) cartBtn.addEventListener('click', () => { if (cartModal && cartModal.classList.contains('active')) { lastFocusedEl = document.activeElement; trapFocus(cartModal); } });
if (checkoutBtn) checkoutBtn.addEventListener('click', () => { if (checkoutModal) { lastFocusedEl = document.activeElement; trapFocus(checkoutModal); } });
if (viewOrdersBtn) viewOrdersBtn.addEventListener('click', () => { if (ordersModal) { lastFocusedEl = document.activeElement; trapFocus(ordersModal); } });

// Favorites modal handlers
const favNavBtn = document.getElementById('fav-btn-nav');
const favoritesModal = document.getElementById('favorites-modal');
const favoritesListEl = document.getElementById('favorites-list');
const closeFavoritesBtn = document.getElementById('close-favorites');

function renderFavorites() {
  if (!favoritesListEl) return;
  const favs = pets.filter(p => favorites.includes(p.id));
  if (favs.length === 0) { favoritesListEl.innerHTML = '<div>No favorites yet.</div>'; return; }
  favoritesListEl.innerHTML = favs.map(p => `<div class="order-item"><strong>${p.name}</strong> — ${p.type}<div style="font-size:12px;color:#666">${p.desc}</div><div style="margin-top:8px"><button class="btn-3 add-from-fav" data-id="${p.id}">Adopt</button> <button class="btn-transparent remove-fav" data-id="${p.id}">Remove</button></div></div>`).join('');
  document.querySelectorAll('.add-from-fav').forEach(b => b.addEventListener('click', (e) => { addToCart(e.currentTarget.dataset.id); showToast('Added to cart'); }));
  document.querySelectorAll('.remove-fav').forEach(b => b.addEventListener('click', (e) => { const id = e.currentTarget.dataset.id; favorites = favorites.filter(x=>x!==id); saveFavorites(); renderFavorites(); renderPets(); showToast('Removed from favorites'); }));
}
if (favNavBtn) favNavBtn.addEventListener('click', () => { if (!favoritesModal) return; renderFavorites(); favoritesModal.classList.add('active'); favoritesModal.setAttribute('aria-hidden','false'); lastFocusedEl = document.activeElement; trapFocus(favoritesModal); });
if (closeFavoritesBtn) closeFavoritesBtn.addEventListener('click', () => { if (!favoritesModal) return; favoritesModal.classList.remove('active'); favoritesModal.setAttribute('aria-hidden','true'); if (lastFocusedEl) lastFocusedEl.focus(); });

// Export orders
const exportOrdersBtn = document.getElementById('export-orders');
function exportOrders() {
  const data = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `purrfect_orders_${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast('Exported adoptions');
}
if (exportOrdersBtn) exportOrdersBtn.addEventListener('click', exportOrders);

// Pet detail modal handlers
const petDetailModal = document.getElementById('pet-detail-modal');
const petDetailImg = document.getElementById('pet-detail-img');
const petDetailName = document.getElementById('pet-detail-name');
const petDetailType = document.getElementById('pet-detail-type');
const petDetailDesc = document.getElementById('pet-detail-desc');
const petAdoptBtn = document.getElementById('pet-adopt-btn');
const petFavBtn = document.getElementById('pet-fav-btn');
const closePetDetail = document.getElementById('close-pet-detail');
let currentPetId = null;

function openPetDetail(id) {
  const p = pets.find(x => x.id === id);
  if (!p) return;
  currentPetId = id;
  if (petDetailImg) petDetailImg.src = p.img;
  if (petDetailName) petDetailName.textContent = p.name;
  if (petDetailType) petDetailType.textContent = `${p.type} • ${p.age}`;
  if (petDetailDesc) petDetailDesc.textContent = p.longDesc || p.desc;
  if (petFavBtn) petFavBtn.textContent = favorites.includes(id) ? 'Favorited' : 'Add to Favorites';
  if (petDetailModal) { petDetailModal.classList.add('active'); petDetailModal.setAttribute('aria-hidden','false'); trapFocus(petDetailModal); }
}
if (closePetDetail) closePetDetail.addEventListener('click', () => { if (petDetailModal) { petDetailModal.classList.remove('active'); petDetailModal.setAttribute('aria-hidden','true'); if (lastFocusedEl) lastFocusedEl.focus(); } });
if (petAdoptBtn) petAdoptBtn.addEventListener('click', () => { if (currentPetId) { addToCart(currentPetId); showToast('Added to cart'); } });
if (petFavBtn) petFavBtn.addEventListener('click', () => { if (!currentPetId) return; if (favorites.includes(currentPetId)) { favorites = favorites.filter(x=>x!==currentPetId); showToast('Removed from favorites'); } else { favorites.push(currentPetId); showToast('Added to favorites'); } saveFavorites(); renderFavorites(); renderPets(); });

// cart fly animation using GSAP when adding to cart
function flyToCart(id) {
  if (!window.gsap) return;
  const card = document.querySelector(`.pet-card[data-id="${id}"]`);
  const cartBadge = document.getElementById('cart-count');
  if (!card || !cartBadge) return;
  const img = card.querySelector('img');
  if (!img) return;
  const clone = img.cloneNode(true);
  clone.style.position = 'fixed';
  const rect = img.getBoundingClientRect();
  clone.style.left = rect.left + 'px';
  clone.style.top = rect.top + 'px';
  clone.style.width = rect.width + 'px';
  clone.style.height = rect.height + 'px';
  clone.style.zIndex = 4000;
  document.body.appendChild(clone);
  gsap.to(clone, { duration: 0.9, x: (cartBadge.getBoundingClientRect().left - rect.left), y: (cartBadge.getBoundingClientRect().top - rect.top), scale: 0.3, opacity: 0.6, ease: 'power2.inOut', onComplete: () => clone.remove() });
}

// Initialize on DOM ready
function initApp() {
  // Ensure pets container exists before rendering
  if (petsContainer) {
    renderPets();
  } else {
    // Retry if container not found yet
    setTimeout(() => {
      if (petsContainer) renderPets();
    }, 100);
  }
  loadCart();
  renderOrders();
  renderFavorites();
}

// Call init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // DOM already ready
  initApp();
}

// Ensure no modal is accidentally visible on load (safety net)
(function initLoadAndReveal() {
  const modals = document.querySelectorAll('.cart-modal, .checkout-modal, .orders-modal, .favorites-modal, .pet-detail-modal');
  modals.forEach(m => {
    if (m.classList.contains('active')) m.classList.remove('active');
    m.setAttribute('aria-hidden', 'true');
  });

  const loader = document.getElementById('page-loader');
  function hidePageLoader() {
    if (!loader) return;
    if (!loader.classList.contains('hidden')) {
      loader.classList.add('hidden');
      loader.setAttribute('aria-hidden', 'true');
      // remove the element after animation completes to avoid overlays
      setTimeout(() => { if (loader && loader.parentNode) loader.parentNode.removeChild(loader); }, 700);
    }
  }

  // If DOM is already interactive, hide quickly; otherwise wait for DOMContentLoaded
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // small delay to allow first paint
    setTimeout(hidePageLoader, 220);
  } else {
    document.addEventListener('DOMContentLoaded', () => setTimeout(hidePageLoader, 220));
  }

  // also ensure hide on window load (images/fonts ready)
  window.addEventListener('load', hidePageLoader);

  // safety max hide (in case nothing else fires)
  setTimeout(hidePageLoader, 6000);

  // IntersectionObserver fallback for reveals (works even if GSAP/ScrollTrigger isn't loaded)
  const revealSelector = '.hero-headlines, .hero-images, .pets-headlines, .service-item, .story-item, .faq-item, .pet-card, .site-footer, .requirements-headlines, .about-headlines, .hero-features';
  const revealEls = Array.from(document.querySelectorAll(revealSelector));
  // add base 'reveal' class so CSS handles transitions
  revealEls.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          // footer gets a special class 'visible' for nicer transform
          if (entry.target.classList.contains('site-footer')) entry.target.classList.add('visible');
          // Stop observing once revealed for performance
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(el => obs.observe(el));
    // Safety fallback: if some elements never intersect (e.g. due to overflow), reveal after 1200ms
    setTimeout(() => {
      revealEls.forEach(el => { if (!el.classList.contains('show')) el.classList.add('show'); });
    }, 1200);
  } else {
    // fallback: reveal everything after a short delay
    setTimeout(()=> revealEls.forEach(el => el.classList.add('show')), 200);
  }
})();

// override addToCart to animate
const _addToCart = addToCart;
addToCart = function(id) { flyToCart(id); _addToCart(id); };

// lazy-loading images with smooth fade-in
document.querySelectorAll('img').forEach(img => { 
  if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy'); 
  
  // Add smooth fade-in when image loads
  if (img.complete) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', function() {
      this.classList.add('loaded');
    }, { once: true });
  }
});

// Return focus when closing cart/checkout/orders
if (closeCartBtn) closeCartBtn.addEventListener('click', () => { if (lastFocusedEl) lastFocusedEl.focus(); });
if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', () => { if (lastFocusedEl) lastFocusedEl.focus(); });
if (closeOrdersBtn) closeOrdersBtn.addEventListener('click', () => { if (lastFocusedEl) lastFocusedEl.focus(); });
// Stories carousel - Fast and responsive
(function initStories() {
  const track = document.querySelector('.stories-track');
  const prev = document.querySelector('.stories-prev');
  const next = document.querySelector('.stories-next');
  const dots = document.querySelector('.stories-dots');
  const thumbs = document.querySelectorAll('.stories-summary .thumbs img');
  if (!track || !prev || !next || !dots) return;
  const slides = Array.from(track.children);
  let idx = 0;
  let isTransitioning = false;
  
  function show(i) {
    if (isTransitioning) return; // Prevent rapid clicking
    isTransitioning = true;
    
    idx = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.innerHTML = slides.map((_,j)=>`<button class="dot ${j===idx? 'active':''}" data-i="${j}" aria-label="Go to testimonial ${j+1}"></button>`).join('');

    // Update thumbs active state
    thumbs.forEach((thumb, j) => {
      thumb.style.opacity = j === idx ? '1' : '0.5';
      thumb.style.transform = j === idx ? 'scale(1.1)' : 'scale(1)';
      thumb.style.border = j === idx ? '2px solid var(--accent)' : '2px solid #fff';
    });

    slides.forEach((s, j) => s.classList.toggle('active-slide', j===idx));
    // animated reveal for the active slide's body
    const body = slides[idx].querySelector('.story-body');
    if (window.gsap && body) {
      gsap.fromTo(body, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
    }
    
    setTimeout(() => { isTransitioning = false; }, 300);
  }
  
  prev.addEventListener('click', ()=> {
    if (!isTransitioning) show(idx-1);
  });
  next.addEventListener('click', ()=> {
    if (!isTransitioning) show(idx+1);
  });
  dots.addEventListener('click', (e)=> { 
    const b = e.target.closest('button'); 
    if (b && b.dataset.i && !isTransitioning) {
      show(Number(b.dataset.i));
    }
  });
  
  // Initialize to show first slide (index 0)
  track.style.transform = 'translateX(0%)';
  show(0);
  let timer = setInterval(()=> {
    if (!isTransitioning) show(idx+1);
  }, 5000);
  
  [prev,next,track].forEach(el => {
    el.addEventListener('mouseenter', ()=> clearInterval(timer));
    el.addEventListener('mouseleave', ()=> timer = setInterval(()=> {
      if (!isTransitioning) show(idx+1);
    }, 5000));
  });
})();

// Read all stories button (scroll into view and focus carousel)
const btnReadStories = document.getElementById('btn-read-stories');
if (btnReadStories) btnReadStories.addEventListener('click', () => { 
  const stories = document.getElementById('stories'); 
  if (stories) { 
    stories.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const firstDot = document.querySelector('.stories-dots button'); 
    if (firstDot) firstDot.focus(); 
  } 
});

// Support CTA handler (redirect to contact page)
const btnSupport = document.getElementById('btn-support');
if (btnSupport) btnSupport.addEventListener('click', () => { window.location.href = 'contact.html'; });

// Scroll-triggered reveals (GSAP ScrollTrigger)
if (window.gsap && gsap.registerPlugin) {
  try {
    gsap.registerPlugin(ScrollTrigger);
    const revealEls = document.querySelectorAll('.services-list .service-item, .faq-item, .story-item, .pet-card');
    revealEls.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        y: 18,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
      });
    });
  } catch (e) {
    // scrolltrigger may not be loaded — ignore
  }
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(q => q.addEventListener('click', (e)=>{
  const item = e.currentTarget.closest('.faq-item');
  if (!item) return;
  item.classList.toggle('open');
}));

// Contact form handler (on contact.html)
const contactForm = document.getElementById('contact-form');
const CONTACTS_KEY = 'purrfect_contacts_v1';
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.name.value || contactForm.cname && contactForm.cname.value;
    const email = contactForm.email && contactForm.email.value || contactForm.cemail && contactForm.cemail.value;
    const message = contactForm.message && contactForm.message.value || contactForm.cmessage && contactForm.cmessage.value;
    const contacts = JSON.parse(localStorage.getItem(CONTACTS_KEY) || '[]');
    contacts.unshift({ name, email, message, date: new Date().toISOString() });
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    showToast('Message sent — we will get back soon');
    contactForm.reset();
  });

  // clear button for contact page
  const contactClear = document.getElementById('contact-clear');
  if (contactClear) contactClear.addEventListener('click', () => contactForm.reset());
}
// Smooth scroll to pets on hero button
const btnOurPets = document.getElementById('btn-our-pets');
if (btnOurPets) btnOurPets.addEventListener('click', () => {
  const petsSection = document.getElementById('pets');
  if (petsSection) {
    petsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// 'Find more' -> scroll to Requirements
const btnFindMore = document.getElementById('btn-find-more');
if (btnFindMore) btnFindMore.addEventListener('click', (e) => {
  const req = document.getElementById('requirements');
  if (req) {
    req.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // briefly highlight section for visibility
    req.classList.add('reveal', 'show');
    setTimeout(() => req.classList.remove('reveal'), 1200);
  }
});

// ensure the requirements top anchor is focusable for keyboard users
const reqAnchor = document.getElementById('requirements');
if (reqAnchor) reqAnchor.setAttribute('tabindex', '-1');

// Hero contact CTA
const btnContactHero = document.getElementById('btn-contact-hero');
if (btnContactHero) btnContactHero.addEventListener('click', () => { window.location.href = 'contact.html'; });

// Get Started button (About section)
const btnGetStarted = document.getElementById('btn-get-started');
if (btnGetStarted) btnGetStarted.addEventListener('click', () => {
  const petsSection = document.getElementById('pets');
  if (petsSection) {
    petsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// Add GSAP reveal for hero feature cards
if (window.gsap) {
  try {
    gsap.from('.hero-feature', { y: 12, opacity: 0, stagger: 0.08, duration: 0.6, delay: 0.45, ease: 'power2.out' });
  } catch (e) { /* ignore if gsap not ready */ }
}

// Smooth scroll for all anchor links in footer
document.querySelectorAll('.footer-col a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Bottom nav actions (mobile)
const bnHome = document.getElementById('bn-home');
const bnPets = document.getElementById('bn-pets');
const bnContact = document.getElementById('bn-contact');
const bnCartBtm = document.getElementById('bn-cart');
const bnFavBtm = document.getElementById('bn-fav');
if (bnHome) bnHome.addEventListener('click', () => { 
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
if (bnPets) bnPets.addEventListener('click', () => { 
  const p = document.getElementById('pets'); 
  if (p) {
    p.scrollIntoView({ behavior: 'smooth' });
  }
});
if (bnContact) bnContact.addEventListener('click', () => { window.location.href = 'contact.html'; });
if (bnCartBtm && cartBtn) bnCartBtm.addEventListener('click', () => cartBtn.click());
if (bnFavBtm && favNavBtn) bnFavBtm.addEventListener('click', () => favNavBtn.click());

// Lightweight GSAP animations (if available)
if (window.gsap) {
  gsap.from('.hero-headlines h1', { y:-30, opacity:0, duration:0.8, ease:'power2.out' });
  gsap.from('.hero-headlines p', { y: -10, opacity:0, duration:0.8, delay:0.15 });
  gsap.from('.pet-card', { y: 30, opacity:0, stagger:0.12, duration:0.6, delay:0.3 });
}