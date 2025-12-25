const STORAGE_KEY = "reports";

function getStoredReports() {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveReports(reports) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
}

// READ
export function getReports() {
  return getStoredReports();
}

// CREATE
export function addReport(report) {
  const reports = getStoredReports();

  reports.push({
    id: Date.now(),
    status: "Open", // default tag
    ...report
  });

  saveReports(reports);
}

// UPDATE STATUS
export function updateReportStatus(id, status) {
  const reports = getStoredReports().map(report =>
    report.id === id ? { ...report, status } : report
  );

  saveReports(reports);
}
