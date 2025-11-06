// ---------- SETTINGS ----------
const API_BASE_URL = window.location.origin;
const BASE_PRICE_API = `${API_BASE_URL}/api/base-price`;
const PRODUCTS_API = `${API_BASE_URL}/api/products`;

// Color mapping for valid CSS values
const colorMap = {
  gold: '#FFD700',
  rose: '#B76E79',
  silver: '#E5E4E2',
};

// ---------- FUNCTIONS ----------

async function fetchBasePrice() {
  try {
    const res = await fetch(BASE_PRICE_API);
    const data = await res.json();
    return data.basePrice;
  } catch (error) {
    console.error('Failed to fetch base price:', error);
    return 1000; // fallback price
  }
}

async function fetchProducts() {
  try {
    const res = await fetch(PRODUCTS_API);
    const data = await res.json();
    console.log('Fetched products:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return []; // fallback empty array
  }
}

async function renderProducts() {
  const grid = document.getElementById("product-grid");
  
  if (!grid) {
    console.log('No product grid found on this page');
    return; // Exit if not on collection page
  }

  // Show loading state
  grid.innerHTML = '<div class="loading">Loading products...</div>';

  try {
    const [basePrice, products] = await Promise.all([
      fetchBasePrice(),
      fetchProducts()
    ]);

    if (products.length === 0) {
      grid.innerHTML = '<p class="no-products">No products found in database</p>';
      return;
    }

    grid.innerHTML = products
      .map((product) => {
        const price = Math.round(basePrice * product.baseMultiplier);
        const defaultImage = product.images.gold;
        
        return `
          <div class="product-card" data-id="${product._id}">
            <img src="${defaultImage}" alt="${product.name}" class="product-img" 
                 loading="lazy"
                 onerror="this.src='https://via.placeholder.com/200x200?text=Image+Error'">
            <h3>${product.name}</h3>
            <p class="price">₹${price.toLocaleString()}</p>
            <div class="swatches">
              ${Object.keys(product.images)
                .map(
                  (color) =>
                    `<button class="swatch ${color === 'gold' ? 'active' : ''}" 
                            data-color="${color}" 
                            style="background:${colorMap[color]};"
                            title="${color}"></button>`
                )
                .join("")}
            </div>
          </div>
        `;
      })
      .join("");

    attachColorListeners(products);
    
  } catch (error) {
    console.error('Error rendering products:', error);
    grid.innerHTML = '<p class="error">Error loading products. Please try again.</p>';
  }
}

function attachColorListeners(products) {
  const cards = document.querySelectorAll(".product-card");

  cards.forEach((card) => {
    const id = card.dataset.id;
    const product = products.find((p) => p._id === id);

    if (!product) return;

    card.querySelectorAll(".swatch").forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedColor = btn.dataset.color;
        const img = card.querySelector(".product-img");
        img.src = product.images[selectedColor];
        
        // Update active state
        card.querySelectorAll('.swatch').forEach(sw => sw.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });
}

// Check if we're on the collection page and render products
document.addEventListener("DOMContentLoaded", function() {
  const productGrid = document.getElementById("product-grid");
  if (productGrid) {
    renderProducts();
  }
});