const STORAGE_KEY = "dealers";

function getStoredDealers() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveDealers(dealers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dealers));
}

// READ
export function getDealers() {
  return getStoredDealers();
}

// CREATE
export function addDealer(dealer) {
  const dealers = getStoredDealers();

  dealers.push({
    id: Date.now(),
    ...dealer
  });

  saveDealers(dealers);
}
