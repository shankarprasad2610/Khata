function setActiveTab(tab) {
    const tabs = ["tabDashboard", "tabCustomer", "tabVendor", "tabSettings"];
    tabs.forEach(t => {
        const el = document.getElementById(t);
        if (el) el.classList.remove("active");
    });
    const activeEl = document.getElementById("tab" + tab.charAt(0).toUpperCase() + tab.slice(1));
    if (activeEl) activeEl.classList.add("active");
}

function showDashboard(){
    document.getElementById("dashboardSection").style.display = "block";
    document.getElementById("recentSection").style.display    = "none";
    document.getElementById("customerSection").style.display  = "none";
    document.getElementById("vendorSection").style.display    = "none";
    document.getElementById("settingsSection").style.display  = "none";
    setActiveTab("dashboard");
    if (typeof updateDashboard === "function") updateDashboard();
}

function showRecentTransactions(){
    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("recentSection").style.display    = "block";
    document.getElementById("customerSection").style.display  = "none";
    document.getElementById("vendorSection").style.display    = "none";
    document.getElementById("settingsSection").style.display  = "none";
}

function showCustomers(){
    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("recentSection").style.display    = "none";
    document.getElementById("customerSection").style.display  = "block";
    document.getElementById("vendorSection").style.display    = "none";
    document.getElementById("settingsSection").style.display  = "none";
    setActiveTab("customer");
    if (typeof displayCustomers === "function") displayCustomers();
}

function showVendors(){
    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("recentSection").style.display    = "none";
    document.getElementById("customerSection").style.display  = "none";
    document.getElementById("vendorSection").style.display    = "block";
    document.getElementById("settingsSection").style.display  = "none";
    setActiveTab("vendor");
    if (typeof displayVendors === "function") displayVendors();
}

function showSettings(){
    document.getElementById("dashboardSection").style.display = "none";
    document.getElementById("recentSection").style.display    = "none";
    document.getElementById("customerSection").style.display  = "none";
    document.getElementById("vendorSection").style.display    = "none";
    document.getElementById("settingsSection").style.display  = "block";
    setActiveTab("settings");
}

// Start on customer section by default
showCustomers();