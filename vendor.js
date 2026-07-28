// ─── Add Vendor Form Toggle ───────────────────────────────────────────────────
function toggleAddVendorForm() {
    const form = document.getElementById("addVendorForm");
    const backdrop = document.getElementById("addVendorModalBackdrop");
    const isOpen = form.style.display !== "none";
    if (isOpen) {
        form.style.display = "none";
        backdrop.style.display = "none";
        document.getElementById("vendorName").value  = "";
        document.getElementById("vendorPhone").value = "";
    } else {
        form.style.display = "block";
        backdrop.style.display = "block";
        setTimeout(() => document.getElementById("vendorName").focus(), 80);
    }
}

function addVendor() {
    let name  = document.getElementById("vendorName").value.trim();
    let phone = document.getElementById("vendorPhone").value.trim();

    if (!name || !phone) {
        alert("Please enter both vendor name and phone number");
        return;
    }
    if (!validatePhone(phone)) return;

    vendors.push({ name, phone, balance: 0, note: "", favorite: false, dueDate: "", transactions: [] });
    localStorage.setItem("vendors", JSON.stringify(vendors));

    // Close and reset the form
    document.getElementById("addVendorForm").style.display = "none";
    document.getElementById("addVendorModalBackdrop").style.display = "none";
    document.getElementById("vendorName").value  = "";
    document.getElementById("vendorPhone").value = "";

    displayVendors();
    toast(`${name} added successfully`);
}

function displayVendors() {
    const list = document.getElementById("vendorList");
    if (!list) return;
    list.innerHTML = "";

    const search = (document.getElementById("vendorSearch") ? document.getElementById("vendorSearch").value : "").toLowerCase();

    if (vendors.length === 0) {
        list.innerHTML = `<div class="empty-state">
            <span class="empty-state-icon">🏪</span>
            <h3>No Vendors Yet</h3>
            <p>Start by adding your first vendor to keep track of purchases and outstanding balances.</p>
            <button class="btn-primary" onclick="toggleAddVendorForm()">+ Add Vendor</button>
        </div>`;
        return;
    }

    vendors.forEach((vendor, index) => {
        if (!vendor.transactions) vendor.transactions = [];
        if (!vendor.note)         vendor.note = "";
        if (vendor.favorite === undefined) vendor.favorite = false;
        if (!vendor.dueDate)      vendor.dueDate = "";
        if (search && !vendor.name.toLowerCase().includes(search) && !String(vendor.phone).includes(search)) return;

        list.innerHTML += `
        <div class="customer-card ${vendor.balance > 5000 ? "high-due" : ""}" id="vcard-${index}">

            <!-- Header Row -->
            <div class="card-header-row">
                <h3 class="card-name-title">
                    🏪 ${escapeHtml(vendor.name)}
                    <span class="star-toggle ${vendor.favorite ? 'active' : ''}" onclick="toggleVendorFavorite(${index}); event.stopPropagation();">★</span>
                </h3>
                
                <!-- Overflow Menu Dropdown (Top-Right Aligned) -->
                <div class="card-menu-container">
                    <button class="menu-btn-dots" onclick="toggleDropdown(event, ${index}, 'vendor')">•••</button>
                    <div id="vdropdown-${index}" class="dropdown-menu">
                        <button class="dropdown-item" onclick="showVendorDetails(${index})">${t('viewLedgerMenu')}</button>
                        <div class="dropdown-divider"></div>
                        <button class="dropdown-item" onclick="editVendor(${index})">${t('editVendorMenu')}</button>
                        <button class="dropdown-item" onclick="setVendorDueDate(${index})">${t('setDueDateMenu')}</button>
                        <button class="dropdown-item" onclick="addVendorNote(${index})">${t('addNoteMenu')}</button>
                        <div class="dropdown-divider"></div>
                        <button class="dropdown-item" onclick="exportVendorPDF(${index})">${t('exportPdfMenu')}</button>
                        <div class="dropdown-divider"></div>
                        <button class="dropdown-item danger-action" onclick="deleteVendor(${index})">${t('deleteVendorMenu')}</button>
                    </div>
                </div>
            </div>

            <!-- Body Section -->
            <div class="card-body-section">
                <span class="card-phone">📞 ${escapeHtml(vendor.phone)}</span>
                ${vendor.note ? `<span class="card-meta">📝 ${escapeHtml(vendor.note)}</span>` : ""}
                ${vendor.dueDate ? `<span class="card-meta">📅 ${t('due')}: ${escapeHtml(vendor.dueDate)}</span>` : ""}
                
                <div class="card-balance-block">
                    <span class="balance-label">${t('outstanding')}</span>
                    <span class="balance ${vendor.balance < 0 ? 'balance-neg' : 'balance-pos'}">${getCurrencySymbol()}${Number(vendor.balance).toLocaleString()}</span>
                </div>
            </div>

            <!-- Footer Quick Actions -->
            <div class="card-footer-actions">
                <div class="card-actions">
                    <button class="btn-primary" onclick="vendorCredit(${index})">${t('addCredit')}</button>
                    <button class="btn-secondary" onclick="vendorDebit(${index})">${t('addDebit')}</button>
                </div>
                <button class="btn-text-link" onclick="showVendorDetails(${index})">${t('viewLedger')}</button>
            </div>

        </div>`;
    });
}

function showVendorDetails(index) {
    const v = vendors[index];
    openDetailsModal(`🏪 ${escapeHtml(v.name)}`, v.transactions || []);
}


async function vendorCredit(index) {
    _openInlineForm(index, "credit", "vendor");
}

async function vendorDebit(index) {
    _openInlineForm(index, "debit", "vendor");
}


function editVendor(index) {
    let newName  = prompt("Enter New Name",  vendors[index].name);
    let newPhone = prompt("Enter New Phone", vendors[index].phone);

    if (newName === null || newPhone === null) return;

    newName  = newName.trim();
    newPhone = newPhone.trim();

    if (!newName || !newPhone) {
        alert("Name and phone cannot be empty");
        return;
    }
    if (!validatePhone(newPhone)) return;

    vendors[index].name  = newName;
    vendors[index].phone = newPhone;

    localStorage.setItem("vendors", JSON.stringify(vendors));
    displayVendors();
}

function addVendorNote(index) {
    let note = prompt("Enter Vendor Note", vendors[index].note);
    if (note === null) return;
    vendors[index].note = note;
    localStorage.setItem("vendors", JSON.stringify(vendors));
    displayVendors();
}

function toggleVendorFavorite(index) {
    vendors[index].favorite = !vendors[index].favorite;
    localStorage.setItem("vendors", JSON.stringify(vendors));
    displayVendors();
}

function setVendorDueDate(index) {
    let dueDate = prompt("Enter Due Date (YYYY-MM-DD)", vendors[index].dueDate);
    if (dueDate === null) return;

    if (dueDate !== "" && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
        alert("Please enter a valid date in YYYY-MM-DD format");
        return;
    }

    vendors[index].dueDate = dueDate;
    localStorage.setItem("vendors", JSON.stringify(vendors));
    displayVendors();
}

function sortVendorsByBalance() {
    vendors.sort((a, b) => b.balance - a.balance);
    localStorage.setItem("vendors", JSON.stringify(vendors));
    displayVendors();
}

async function deleteVendor(index) {
    const confirmed = await confirmAction({
        icon: "🗑️",
        title: "Delete Vendor?",
        message: `"${vendors[index].name}" and all their transaction history will be permanently deleted.`,
        confirmText: "Yes, Delete",
        type: "danger"
    });
    if (!confirmed) return;

    vendors.splice(index, 1);
    localStorage.setItem("vendors", JSON.stringify(vendors));
    displayVendors();
    toast("Vendor deleted", "info");
}
