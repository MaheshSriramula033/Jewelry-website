// ---------- SETTINGS ----------
const BASE_PRICE_API = "http://localhost:5000/api/base-price";
const PRODUCTS_API = "http://localhost:5000/api/products";

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
    return data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return []; // fallback empty array
  }
}

async function renderProducts() {
  const [basePrice, products] = await Promise.all([
    fetchBasePrice(),
    fetchProducts()
  ]);
  
  const grid = document.getElementById("product-grid");

  if (products.length === 0) {
    grid.innerHTML = '<p class="no-products">No products found</p>';
    return;
  }

  grid.innerHTML = products
    .map((product) => {
      const price = Math.round(basePrice * product.baseMultiplier);
      // Use gold image as default
      const defaultImage = product.images.gold;
      
      return `
        <div class="product-card" data-id="${product._id}">
          <img src="${defaultImage}" alt="${product.name}" class="product-img" 
               onerror="this.src='https://via.placeholder.com/200x200?text=Image+Not+Found'">
          <h3>${product.name}</h3>
          <p class="price">₹${price}</p>
          <div class="swatches">
            ${Object.keys(product.images)
              .map(
                (color) =>
                  `<button class="swatch" data-color="${color}" 
                          style="background:${colorMap[color]};"
                          title="${color} gold"></button>`
              )
              .join("")}
          </div>
        </div>
      `;
    })
    .join("");

  attachColorListeners(products);
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
        
        // Update image source based on selected color
        img.src = product.images[selectedColor];
        
        // Optional: Add active state to swatch
        card.querySelectorAll('.swatch').forEach(sw => sw.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", renderProducts);