const STORAGE_KEY = "inventory";

function getStoredInventory() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveInventory(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// READ
export function getInventory() {
  return getStoredInventory().map(item => {
    const stockPercent = Math.round(
      (item.quantity / item.maxQuantity) * 100
    );

    let status = "Available";
    if (stockPercent === 0) status = "Unavailable";
    else if (stockPercent <= 30) status = "Low";

    return { ...item, stockPercent, status };
  });
}

// ADD
export function addInventory(item) {
  const inventory = getStoredInventory();

  inventory.push({
    id: Date.now(),
    ...item
  });

  saveInventory(inventory);
}

// EDIT (material name / max quantity)
export function updateInventory(id, updatedFields) {
  const inventory = getStoredInventory().map(item => {
    if (item.id !== id) return item;

    const newQuantity =
      updatedFields.quantity ?? item.quantity;
    const newMaxQuantity =
      updatedFields.maxQuantity ?? item.maxQuantity;

    // 🔒 HARD RULE
    if (newQuantity > newMaxQuantity) {
      throw new Error(
        "Current quantity cannot be greater than max capacity"
      );
    }

    return {
      ...item,
      ...updatedFields
    };
  });

  saveInventory(inventory);
}

