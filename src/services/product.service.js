const STORAGE_KEY = "products";

function getStoredProducts() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// READ
export function getProducts() {
  return getStoredProducts();
}

// CREATE
export function addProduct(product) {
  const products = getStoredProducts();

  products.push({
    id: Date.now(),
    available: true,
    quantity: product.quantity,
    ...product
  });

  saveProducts(products);
}

// UPDATE
export function updateProduct(updatedProduct) {
  const products = getStoredProducts().map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product
  );

  saveProducts(products);
}

// DELETE
export function deleteProduct(id) {
  const products = getStoredProducts().filter(
    (product) => product.id !== id
  );

  saveProducts(products);
}

// TOGGLE STATUS
export function toggleProductStatus(id) {
  const products = getStoredProducts().map((product) =>
    product.id === id
      ? { ...product, available: !product.available }
      : product
  );

  saveProducts(products);
}
