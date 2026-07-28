let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
    window.location.href = "login.html";
    throw new Error("Not authenticated"); // stop script execution
}

// Use textContent — currentUser.name is user-controlled and must not be injected as HTML
document.getElementById("welcomeUser").textContent = "👋 " + currentUser.name;

let customers = JSON.parse(localStorage.getItem("customers") || "[]");
let vendors   = JSON.parse(localStorage.getItem("vendors")   || "[]");
let lastTransaction = null;

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

// Use textContent — shopName is user-controlled and must not be injected as HTML
const shopName = localStorage.getItem("shopName") || "Khata";
document.getElementById("shopTitle").textContent = shopName;

// ─── Cloud Sync System (Resume Upgrade) ──────────────────────────────────────
// BACKEND_URL is set in config.js — change it there for local vs production
const BACKEND_URL = window.KHATA_BACKEND || "http://localhost:5000";
let isFetchingFromCloud = false;

// UI update helper for sync indicator
function updateSyncStatus(status, text) {
    const indicator = document.getElementById("syncIndicator");
    if (!indicator) return;
    
    indicator.className = "sync-indicator " + status;
    if (status === "syncing") {
        indicator.style.display = "inline-flex";
        indicator.textContent = "⏳ Syncing...";
    } else if (status === "offline") {
        indicator.style.display = "none";
    } else {
        indicator.style.display = "inline-flex";
        indicator.textContent = "☁️ Synced";
    }
}


// Save local state to MongoDB Atlas
async function syncToCloud() {
    const token = localStorage.getItem("authToken");
    if (!token || isFetchingFromCloud) return;

    updateSyncStatus("syncing");

    try {
        const response = await fetch(`${BACKEND_URL}/sync`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                customers: JSON.parse(localStorage.getItem("customers") || "[]"),
                vendors: JSON.parse(localStorage.getItem("vendors") || "[]")
            })
        });

        const data = await response.json();
        if (data.success) {
            updateSyncStatus("synced");
        } else {
            updateSyncStatus("offline");
        }
    } catch (err) {
        console.warn("Could not sync with MongoDB. Using offline cache.", err);
        updateSyncStatus("offline");
    }
}

// Fetch user data from MongoDB Atlas on startup
async function loadCloudData() {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    isFetchingFromCloud = true;
    updateSyncStatus("syncing");

    try {
        const response = await fetch(`${BACKEND_URL}/sync`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (data.success) {
            // Save to localStorage
            localStorage.setItem("customers", JSON.stringify(data.customers || []));
            localStorage.setItem("vendors", JSON.stringify(data.vendors || []));
            
            // Reassign and refresh the view
            customers = data.customers || [];
            vendors = data.vendors || [];
            displayCustomers();
            displayVendors();

            updateSyncStatus("synced");
        } else {
            updateSyncStatus("offline");
        }
    } catch (err) {
        console.warn("Failed to load from database. Reverting to local cache.", err);
        updateSyncStatus("offline");
    } finally {
        isFetchingFromCloud = false;
    }
}

// ─── LocalStorage Interceptor ────────────────────────────────────────────────
// Patches localStorage.setItem to auto-trigger background sync for ledger variables
const originalSetItem = localStorage.setItem;
localStorage.setItem = function (key, value) {
    originalSetItem.apply(this, arguments);
    if ((key === "customers" || key === "vendors") && !isFetchingFromCloud) {
        syncToCloud();
    }
};

// Start initial load from MongoDB
loadCloudData();