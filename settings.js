function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

function switchSettingsGroup(groupName, menuItem) {
    // Remove active class from all menu items
    const items = document.querySelectorAll(".settings-menu-item");
    items.forEach(item => item.classList.remove("active"));
    
    // Add active class to clicked menu item
    menuItem.classList.add("active");

    // Hide all settings sections
    const sections = document.querySelectorAll(".settings-group-section");
    sections.forEach(section => section.classList.remove("active"));

    // Show active section
    const activeSection = document.getElementById("set-" + groupName);
    if (activeSection) {
        activeSection.classList.add("active");
    }
}

function loadSettingsForm() {
    const shopName = localStorage.getItem("shopName") || "Khata";
    document.getElementById("settingStoreName").value = shopName;

    // Load simulation settings or placeholders
    document.getElementById("settingCurrency").value = localStorage.getItem("settingCurrency") || "INR";
    document.getElementById("settingLang").value = localStorage.getItem("settingLang") || "en";
    
    document.getElementById("bizName").value = localStorage.getItem("bizName") || "";
    document.getElementById("bizPhone").value = localStorage.getItem("bizPhone") || "";
    document.getElementById("bizAddress").value = localStorage.getItem("bizAddress") || "";
    document.getElementById("bizGST").value = localStorage.getItem("bizGST") || "";
}

async function saveSettings() {
    const storeName = document.getElementById("settingStoreName").value.trim();
    if (storeName) {
        localStorage.setItem("shopName", storeName);
        const shopTitleEl = document.getElementById("shopTitle");
        if (shopTitleEl) shopTitleEl.textContent = storeName;
    }

    const oldCurrency = localStorage.getItem("settingCurrency") || "INR";
    const newCurrency = document.getElementById("settingCurrency").value;

    localStorage.setItem("settingCurrency", newCurrency);
    localStorage.setItem("settingLang", document.getElementById("settingLang").value);
    
    localStorage.setItem("bizName", document.getElementById("bizName").value.trim());
    localStorage.setItem("bizPhone", document.getElementById("bizPhone").value.trim());
    localStorage.setItem("bizAddress", document.getElementById("bizAddress").value.trim());
    localStorage.setItem("bizGST", document.getElementById("bizGST").value.trim());

    // Convert all stored balances if currency changed
    if (oldCurrency !== newCurrency) {
        await convertAllBalances(oldCurrency, newCurrency);
    }

    // Apply currency and language changes instantly
    applyLanguage();
    if (typeof displayCustomers === 'function') displayCustomers();
    if (typeof displayVendors === 'function') displayVendors();
    if (typeof updateDashboard === 'function') updateDashboard();

    toast("Settings updated successfully", "success");
}

// ─── Real-Time Currency Conversion ────────────────────────────────────────────
async function fetchExchangeRate(from, to) {
    // open.er-api.com — free, no API key, supports INR as base currency
    const url = `https://open.er-api.com/v6/latest/${from}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.result !== "success") throw new Error(data["error-type"] || "API error");
    const rate = data.rates[to];
    if (!rate) throw new Error(`No rate found for ${to}`);
    return rate;
}

async function convertAllBalances(fromCurrency, toCurrency) {
    toast("Fetching live exchange rate...", "info", 3000);
    let rate;
    try {
        rate = await fetchExchangeRate(fromCurrency, toCurrency);
    } catch (err) {
        console.error("Exchange rate fetch failed:", err);
        toast("Could not fetch exchange rate. Balances unchanged.", "error");
        return;
    }

    const round2 = (n) => Math.round(n * 100) / 100;

    // Convert customers
    const rawCustomers = localStorage.getItem("customers");
    if (rawCustomers) {
        try {
            const list = JSON.parse(rawCustomers);
            list.forEach(c => {
                c.balance = round2((c.balance || 0) * rate);
                (c.transactions || []).forEach(tx => {
                    tx.amount = round2((tx.amount || 0) * rate);
                });
            });
            localStorage.setItem("customers", JSON.stringify(list));
            if (typeof customers !== "undefined") customers = list;
        } catch (e) { console.error("Customer conversion error:", e); }
    }

    // Convert vendors
    const rawVendors = localStorage.getItem("vendors");
    if (rawVendors) {
        try {
            const list = JSON.parse(rawVendors);
            list.forEach(v => {
                v.balance = round2((v.balance || 0) * rate);
                (v.transactions || []).forEach(tx => {
                    tx.amount = round2((tx.amount || 0) * rate);
                });
            });
            localStorage.setItem("vendors", JSON.stringify(list));
            if (typeof vendors !== "undefined") vendors = list;
        } catch (e) { console.error("Vendor conversion error:", e); }
    }

    toast(`Converted at 1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`, "success");
}

async function resetAllData(){
    const confirmed = await confirmAction({
        icon: "💥",
        title: "Reset Entire App?",
        message: "ALL customers, vendors, transactions and settings will be permanently deleted. This cannot be undone.",
        confirmText: "Yes, Delete Everything",
        type: "danger"
    });
    if (!confirmed) return;

    // Clear backend data first if logged in
    const token = localStorage.getItem("authToken");
    if (token) {
        const backendUrl = typeof BACKEND_URL !== "undefined" ? BACKEND_URL : "http://localhost:5000";
        try {
            await fetch(backendUrl + "/sync", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    customers: [],
                    vendors: []
                })
            });
        } catch (e) {
            console.error("Failed to reset backend data:", e);
        }
    }

    localStorage.clear();
    customers = [];
    vendors = [];
    if (typeof displayCustomers === 'function') displayCustomers();
    if (typeof displayVendors === 'function') displayVendors();
    location.reload();
}

async function resetVendors(){
    const confirmed = await confirmAction({
        icon: "🗑️",
        title: "Delete All Vendors?",
        message: "All vendor records and their transaction history will be permanently deleted.",
        confirmText: "Yes, Delete All",
        type: "danger"
    });
    if (!confirmed) return;

    vendors = [];
    localStorage.setItem("vendors", JSON.stringify(vendors));
    displayVendors();
    toast("All vendor records deleted", "info");
}

async function resetCustomers(){
    const confirmed = await confirmAction({
        icon: "🗑️",
        title: "Delete All Customers?",
        message: "All customer records and their transaction history will be permanently deleted.",
        confirmText: "Yes, Delete All",
        type: "danger"
    });
    if (!confirmed) return;

    customers = [];
    localStorage.setItem("customers", JSON.stringify(customers));
    displayCustomers();
    toast("All customer records deleted", "info");
}

function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    window.location.href = "login.html";
}

// Initialize form inputs on load
document.addEventListener("DOMContentLoaded", () => {
    loadSettingsForm();
    applyLanguage();
});
