// ─── Cloudinary Configuration (Optional — Resume Upgrade) ─────────────────────
const CLOUDINARY_CLOUD_NAME = "khatawebsite"; 
const CLOUDINARY_UPLOAD_PRESET = "khatawebsite"; 

// ─── Localization & i18n System ────────────────────────────────────────────────
const locales = {
    en: {
        outstanding: "Outstanding",
        viewLedger: "View Ledger",
        addCredit: "+ Credit",
        addDebit: "- Debit",
        due: "Due",
        viewLedgerMenu: "📋 View Ledger",
        editCustomerMenu: "✏️ Edit Customer",
        editVendorMenu: "✏️ Edit Vendor",
        setDueDateMenu: "📅 Set Due Date",
        addNoteMenu: "📝 Add Note",
        exportPdfMenu: "📄 Export PDF",
        deleteCustomerMenu: "🗑️ Delete Customer",
        deleteVendorMenu: "🗑️ Delete Vendor",
        
        netBalance: "Net Balance",
        totalCredit: "Total Credit",
        totalDebit: "Total Debit",
        money: "Money",
        business: "Business",
        alerts: "Alerts",
        quickActions: "Quick Actions",
        recentActivity: "Recent Activity",
        
        overdue: "Overdue",
        noActivity: "No activity yet",
        
        addCustomer: "Add Customer",
        addVendor: "Add Vendor",
        undoLast: "Undo Last",
        sortByBalance: "Sort by Balance",
        searchPlaceholder: "Search...",
        
        storeName: "Store Name",
        defaultCurrency: "Default Currency",
        language: "Language",
        saveChanges: "Save Changes",
        
        bizProfile: "Business Profile",
        bizName: "Registered Business Name",
        bizPhone: "Contact Phone",
        bizAddress: "Address",
        bizGST: "GST Number",
        
        appearance: "Appearance",
        colorTheme: "Color Theme",
        lightMode: "Light Mode",
        darkMode: "Dark Mode",
        
        security: "Security & Authentication",
        pinLabel: "Change Login PIN (4 digits)",
        confirmPin: "Confirm PIN",
        updatePin: "Update PIN",
        
        dataHeader: "Data & Backup Operations",
        dataHelp: "Manually backup or restore your ledger dataset locally.",
        createBackup: "Create Backup",
        restoreBackup: "Restore Backup",
        
        aboutHeader: "About Khata",
        version: "Version",
        license: "License",
        developerInfo: "Developer Info",
        
        advanceHeader: "Advance settings",
        advanceHelp: "Resetting operations are permanent and cannot be reversed.",
        deleteAllCustomers: "Delete All Customers",
        deleteAllVendors: "Delete All Vendors",
        resetAllAppData: "Reset All App Data",
        
        dashboardTab: "📊 Dashboard",
        customersTab: "👥 Customers",
        vendorsTab: "🏪 Vendors",
        settingsTab: "⚙️ Settings",
        
        generalMenu: "General",
        businessMenu: "Business Info",
        appearanceMenu: "Appearance",
        securityMenu: "Security",
        dataMenu: "Data & Backup",
        aboutMenu: "About",
        advanceMenu: "Advance settings",
        
        // Additional dashboard translations
        positiveTrend: "↑ Positive",
        negativeTrend: "↓ Negative",
        creditRatio: "Credit vs Debit Ratio",
        creditLegend: "Credit Volume",
        debitLegend: "Debit Volume",
        financialPerformance: "Financial Performance",
        monthlyCredit: "Monthly Credit",
        monthlyDebit: "Monthly Debit",
        businessVolume: "Business Volume",
        totalCustomers: "Total Customers",
        totalVendors: "Total Vendors",
        vendorDues: "Vendor Dues",
        totalTransactions: "Total Transactions",
        alertsReminders: "Alerts & Reminders",
        overdueAccounts: "Overdue Accounts",
        highVendorDues: "High Vendor Dues",
        accountsText: "accounts",
        noRecentTransactions: "No recent transactions",
        customersHeader: "Customers",
        vendorsHeader: "Vendors",
        settingsHeader: "Settings",
        generalSettings: "General Settings"
    },
    hi: {
        outstanding: "बकाया",
        viewLedger: "लेज़र देखें",
        addCredit: "+ क्रेडिट",
        addDebit: "- डेबिट",
        due: "देय",
        viewLedgerMenu: "📋 लेज़र देखें",
        editCustomerMenu: "✏️ ग्राहक संपादित करें",
        editVendorMenu: "✏️ विक्रेता संपादित करें",
        setDueDateMenu: "📅 देय तिथि चुनें",
        addNoteMenu: "📝 नोट जोड़ें",
        exportPdfMenu: "📄 पीडीएफ निर्यात करें",
        deleteCustomerMenu: "🗑️ ग्राहक हटाएं",
        deleteVendorMenu: "🗑️ विक्रेता हटाएं",
        
        netBalance: "कुल शेष",
        totalCredit: "कुल क्रेडिट",
        totalDebit: "कुल डेबिट",
        money: "पैसे",
        business: "व्यापार",
        alerts: "चेतावनी",
        quickActions: "त्वरित कार्रवाई",
        recentActivity: "हाल की गतिविधि",
        
        overdue: "अतिदेय",
        noActivity: "अभी तक कोई गतिविधि नहीं",
        
        addCustomer: "ग्राहक जोड़ें",
        addVendor: "विक्रेता जोड़ें",
        undoLast: "पूर्ववत करें",
        sortByBalance: "शेष राशि द्वारा क्रमबद्ध करें",
        searchPlaceholder: "खोजें...",
        
        storeName: "दुकान का नाम",
        defaultCurrency: "डिफ़ॉल्ट मुद्रा",
        language: "भाषा",
        saveChanges: "बदलाव सुरक्षित करें",
        
        bizProfile: "व्यापार प्रोफ़ाइल",
        bizName: "पंजीकृत व्यापार का नाम",
        bizPhone: "संपर्क फोन",
        bizAddress: "पता",
        bizGST: "जीएसटी नंबर",
        
        appearance: "रूप-रंग",
        colorTheme: "रंग थीम",
        lightMode: "लाइट मोड",
        darkMode: "डार्क मोड",
        
        security: "सुरक्षा और प्रमाणीकरण",
        pinLabel: "लॉगिन पिन बदलें (4 अंक)",
        confirmPin: "पिन की पुष्टि करें",
        updatePin: "पिन अपडेट करें",
        
        dataHeader: "डेटा और बैकअप संचालन",
        dataHelp: "अपने बहीखाता डेटासेट को स्थानीय रूप से मैन्युअल रूप से बैकअप या पुनर्स्थापित करें।",
        createBackup: "बैकअप बनाएं",
        restoreBackup: "बैकअप बहाल करें",
        
        aboutHeader: "खाता के बारे में",
        version: "संस्करण",
        license: "लाइसेंस",
        developerInfo: "डेवलपर जानकारी",
        
        advanceHeader: "उन्नत सेटिंग्स",
        advanceHelp: "रीसेट संचालन स्थायी हैं और इन्हें उलटा नहीं जा सकता।",
        deleteAllCustomers: "सभी ग्राहकों को हटाएं",
        deleteAllVendors: "सभी विक्रेताओं को हटाएं",
        resetAllAppData: "सभी ऐप डेटा रीसेट करें",
        
        dashboardTab: "📊 डैशबोर्ड",
        customersTab: "👥 ग्राहक",
        vendorsTab: "🏪 विक्रेता",
        settingsTab: "⚙️ सेटिंग्स",
        
        generalMenu: "सामान्य",
        businessMenu: "व्यापार जानकारी",
        appearanceMenu: "रूप-रंग",
        securityMenu: "सुरक्षा",
        dataMenu: "डेटा बैकअप",
        aboutMenu: "परिचय",
        advanceMenu: "उन्नत सेटिंग्स",
        
        // Additional dashboard translations
        positiveTrend: "↑ सकारात्मक",
        negativeTrend: "↓ नकारात्मक",
        creditRatio: "क्रेडिट बनाम डेबिट अनुपात",
        creditLegend: "क्रेडिट मात्रा",
        debitLegend: "डेबिट मात्रा",
        financialPerformance: "वित्तीय प्रदर्शन",
        monthlyCredit: "मासिक क्रेडिट",
        monthlyDebit: "मासिक डेबिट",
        businessVolume: "व्यापार मात्रा",
        totalCustomers: "कुल ग्राहक",
        totalVendors: "कुल विक्रेता",
        vendorDues: "विक्रेता बकाया",
        totalTransactions: "कुल लेनदेन",
        alertsReminders: "अलर्ट और अनुस्मारक",
        overdueAccounts: "अतिदेय खाते",
        highVendorDues: "उच्च विक्रेता बकाया",
        accountsText: "खाते",
        noRecentTransactions: "कोई हालिया लेनदेन नहीं",
        customersHeader: "ग्राहक",
        vendorsHeader: "विक्रेता",
        settingsHeader: "सेटिंग्स",
        generalSettings: "सामान्य सेटिंग्स"
    }
};

function t(key) {
    const lang = localStorage.getItem("settingLang") || "en";
    const dict = locales[lang] || locales.en;
    return dict[key] || locales.en[key] || key;
}

function getCurrencySymbol() {
    const cur = localStorage.getItem("settingCurrency") || "INR";
    if (cur === "USD") return "$";
    if (cur === "EUR") return "€";
    return "₹";
}

function applyLanguage() {
    const lang = localStorage.getItem("settingLang") || "en";
    const dict = locales[lang] || locales.en;

    const safeSetHTML = (id, html) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
    };

    safeSetHTML("tabDashboard", dict.dashboardTab);
    safeSetHTML("tabCustomer", dict.customersTab);
    safeSetHTML("tabVendor", dict.vendorsTab);
    safeSetHTML("tabSettings", dict.settingsTab);

    safeSetHTML("menu-general", dict.generalMenu);
    safeSetHTML("menu-business", dict.businessMenu);
    safeSetHTML("menu-appearance", dict.appearanceMenu);
    safeSetHTML("menu-security", dict.securityMenu);
    safeSetHTML("menu-data", dict.dataMenu);
    safeSetHTML("menu-about", dict.aboutMenu);
    safeSetHTML("menu-danger", dict.advanceMenu);

    const customerSectionTitle = document.querySelector("#customerSection .toolbar h2");
    if (customerSectionTitle) customerSectionTitle.textContent = dict.customersHeader;

    const vendorSectionTitle = document.querySelector("#vendorSection .toolbar h2");
    if (vendorSectionTitle) vendorSectionTitle.textContent = dict.vendorsHeader;

    const settingsSectionTitle = document.querySelector("#settingsSection .toolbar h2");
    if (settingsSectionTitle) settingsSectionTitle.textContent = dict.settingsHeader;

    const setGeneral = document.getElementById("set-general");
    if (setGeneral) {
        setGeneral.querySelector("h3").textContent = dict.generalSettings;
        const rows = setGeneral.querySelectorAll(".settings-row");
        if (rows[0]) rows[0].querySelector("label").textContent = dict.storeName;
        if (rows[1]) rows[1].querySelector("label").textContent = dict.defaultCurrency;
        if (rows[2]) rows[2].querySelector("label").textContent = dict.language;
        const btn = setGeneral.querySelector("button");
        if (btn) btn.textContent = dict.saveChanges;
    }

    const setBusiness = document.getElementById("set-business");
    if (setBusiness) {
        setBusiness.querySelector("h3").textContent = dict.bizProfile;
        const rows = setBusiness.querySelectorAll(".settings-row");
        if (rows[0]) rows[0].querySelector("label").textContent = dict.bizName;
        if (rows[1]) rows[1].querySelector("label").textContent = dict.bizPhone;
        if (rows[2]) rows[2].querySelector("label").textContent = dict.bizAddress;
        if (rows[3]) rows[3].querySelector("label").textContent = dict.bizGST;
        const btn = setBusiness.querySelector("button");
        if (btn) btn.textContent = dict.saveChanges;
    }

    const setAppearance = document.getElementById("set-appearance");
    if (setAppearance) {
        setAppearance.querySelector("h3").textContent = dict.appearance;
        const rows = setAppearance.querySelectorAll(".settings-row");
        if (rows[0]) rows[0].querySelector("label").textContent = dict.colorTheme;
        const optLight = setAppearance.querySelector("select option[value='light']");
        if (optLight) optLight.textContent = dict.lightMode;
        const optDark = setAppearance.querySelector("select option[value='dark']");
        if (optDark) optDark.textContent = dict.darkMode;
    }

    const setSecurity = document.getElementById("set-security");
    if (setSecurity) {
        setSecurity.querySelector("h3").textContent = dict.security;
        const rows = setSecurity.querySelectorAll(".settings-row");
        if (rows[0]) rows[0].querySelector("label").textContent = dict.pinLabel;
        if (rows[1]) rows[1].querySelector("label").textContent = dict.confirmPin;
        const btn = setSecurity.querySelector("button");
        if (btn) btn.textContent = dict.updatePin;
    }

    const setData = document.getElementById("set-data");
    if (setData) {
        setData.querySelector("h3").textContent = dict.dataHeader;
        setData.querySelector(".settings-row-help").textContent = dict.dataHelp;
        const btns = setData.querySelectorAll("button");
        if (btns[0]) btns[0].textContent = dict.createBackup;
        if (btns[1]) btns[1].textContent = dict.restoreBackup;
    }

    const setAbout = document.getElementById("set-about");
    if (setAbout) {
        setAbout.querySelector("h3").textContent = dict.aboutHeader;
    }

    const setDanger = document.getElementById("set-danger");
    if (setDanger) {
        setDanger.querySelector("h3").textContent = dict.advanceHeader;
        setDanger.querySelector(".danger-box p").textContent = dict.advanceHelp;
        const btns = setDanger.querySelectorAll("button");
        if (btns[0]) btns[0].textContent = dict.deleteAllCustomers;
        if (btns[1]) btns[1].textContent = dict.deleteAllVendors;
        if (btns[2]) btns[2].textContent = dict.resetAllAppData;
    }
}

// ─── Toast Notification System ────────────────────────────────────────────────
function toast(message, type = "success", duration = 2800) {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        document.body.appendChild(container);
    }
    const icons = { success: "✅", error: "❌", info: "ℹ️", warning: "⚠️" };
    const el = document.createElement("div");
    el.className = `toast ${type}`;
    el.innerHTML = `<span>${icons[type] || ""}</span><span>${escapeHtml(message)}</span>`;
    container.appendChild(el);
    setTimeout(() => {
        el.classList.add("out");
        setTimeout(() => el.remove(), 320);
    }, duration);
}

// ─── Contact Validation Helper ────────────────────────────────────────────────
function validatePhone(phone) {
    const cleanPhone = phone.replace(/\D/g, ""); // Extract digits only
    if (cleanPhone.length < 10 || cleanPhone.length > 12) {
        alert("Please enter a valid phone number (10 to 12 digits)");
        return false;
    }
    return true;
}

// ─── Security Helper ──────────────────────────────────────────────────────────
function escapeHtml(str) {


    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ─── Confirmation Modal ────────────────────────────────────────────────────────
function confirmAction({ icon = "⚠️", title = "Are you sure?", message, confirmText = "Confirm", type = "danger" } = {}) {
    return new Promise((resolve) => {
        const overlay    = document.getElementById("confirmModal");
        const iconEl     = document.getElementById("modalIcon");
        const titleEl    = document.getElementById("modalTitle");
        const messageEl  = document.getElementById("modalMessage");
        const confirmBtn = document.getElementById("modalConfirmBtn");
        const cancelBtn  = document.getElementById("modalCancelBtn");

        iconEl.textContent     = icon;
        titleEl.textContent    = title;
        messageEl.textContent  = message;
        confirmBtn.textContent = confirmText;
        confirmBtn.className   = `modal-btn ${type === "warning" ? "warning-btn" : "danger-btn"}`;
        overlay.classList.add("active");

        function onConfirm() { cleanup(); resolve(true);  }
        function onCancel()  { cleanup(); resolve(false); }
        function onOverlay(e){ if (e.target === overlay) onCancel(); }
        function cleanup() {
            overlay.classList.remove("active");
            confirmBtn.removeEventListener("click", onConfirm);
            cancelBtn.removeEventListener("click",  onCancel);
            overlay.removeEventListener("click",    onOverlay);
        }
        confirmBtn.addEventListener("click", onConfirm);
        cancelBtn.addEventListener("click",  onCancel);
        overlay.addEventListener("click",    onOverlay);
    });
}

// ─── Image Compression ────────────────────────────────────────────────────────
function compressImage(file, maxWidth) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = e => {
            const img = new Image();
            img.onload = () => {
                let w = img.width, h = img.height;
                if (w > maxWidth) { h = Math.round((maxWidth / w) * h); w = maxWidth; }
                const canvas = document.createElement("canvas");
                canvas.width = w; canvas.height = h;
                canvas.getContext("2d").drawImage(img, 0, 0, w, h);
                resolve(canvas.toDataURL("image/jpeg", 0.72));
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

// ─── Inline Transaction Form ──────────────────────────────────────────────────
// No popups — form expands directly inside the card
let _inlineFormState = null;

function addCredit(index) { _openInlineForm(index, "credit", "customer"); }
function addDebit(index)  { _openInlineForm(index, "debit",  "customer"); }

function _openInlineForm(index, type, entityType) {
    const isSame = _inlineFormState &&
                   _inlineFormState.index === index &&
                   _inlineFormState.type === type &&
                   _inlineFormState.entityType === entityType;

    // Close any previously open inline form first
    _closeInlineForm();

    if (isSame) {
        // Clicking same button again collapses the form
        return;
    }

    const cardId = entityType === "customer" ? "ccard-" + index : "vcard-" + index;
    const card   = document.getElementById(cardId);
    if (!card) return;

    // Hide action buttons while form is open
    const footerActions = card.querySelector(".card-footer-actions");
    if (footerActions) footerActions.style.display = "none";

    // Build the inline form
    const form = document.createElement("div");
    form.className = "inline-txn-form";
    form.innerHTML = `
        <p class="inline-form-label">
            ${type === "credit" ? "💳 Add Credit" : "💸 Add Debit"}
        </p>

        <input type="number" id="iAmount"
               placeholder="Amount (${getCurrencySymbol()}) *"
               min="0.01" step="0.01"
               class="inline-input">
        <p id="iAmountErr" class="field-err" style="display:none;">⚠️ Please enter a valid amount</p>

        <input type="text" id="iProduct"
               placeholder="Product details (optional)"
               class="inline-input">

        <label class="file-input-label" style="margin-top:2px;">
            <input type="file" id="iBill" accept="image/*,.pdf" class="file-input-hidden">
            <span class="file-input-btn">📎 Upload Bill &nbsp;<span style="font-weight:400;opacity:.6;font-size:.8em;">(optional)</span></span>
        </label>
        <div id="iBillPreview" class="bill-preview"></div>

        <div class="inline-actions">
            <button class="inline-cancel-btn" onclick="_closeInlineForm()">Cancel</button>
            <button class="inline-submit-btn ${type === "credit" ? "txn-credit-btn" : "txn-debit-btn"}"
                    onclick="_submitInlineForm(${index}, '${type}', '${entityType}')">
                ${type === "credit" ? "✅ Add Credit" : "❌ Add Debit"}
            </button>
        </div>`;

    card.appendChild(form);
    _inlineFormState = { el: form, index, type, entityType, footerActions };

    // Auto-focus amount
    const amountEl = document.getElementById("iAmount");
    if (amountEl) amountEl.focus();

    // Bill file preview
    document.getElementById("iBill").onchange = function () {
        const file    = this.files[0];
        const preview = document.getElementById("iBillPreview");
        if (!file) { preview.innerHTML = ""; return; }
        if (file.size > 2 * 1024 * 1024) {
            preview.innerHTML = `<p class="bill-err">⚠️ File too large (max 2MB)</p>`;
            this.value = ""; return;
        }
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = e => {
                preview.innerHTML = `<img src="${e.target.result}" class="bill-thumb-preview" alt="Bill preview">`;
            };
            reader.readAsDataURL(file);
        } else {
            preview.innerHTML = `<p class="pdf-preview">📄 ${escapeHtml(file.name)}</p>`;
        }
    };
}

function _closeInlineForm() {
    if (_inlineFormState) {
        _inlineFormState.el.remove();
        if (_inlineFormState.footerActions) _inlineFormState.footerActions.style.display = "";
        _inlineFormState = null;
    }
}





// ─── Cloudinary Uploader ──────────────────────────────────────────────────────
async function uploadToCloudinary(file) {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) return null;
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        return data.secure_url || null;
    } catch (err) {
        console.error("Cloudinary upload failed:", err);
        return null;
    }
}

function _submitInlineForm(index, type, entityType) {
    const amountVal = document.getElementById("iAmount").value;
    const amount    = parseFloat(amountVal);
    if (!amountVal || isNaN(amount) || amount <= 0) {
        document.getElementById("iAmountErr").style.display = "block";
        document.getElementById("iAmount").focus();
        return;
    }

    const product  = document.getElementById("iProduct").value.trim();
    const billFile = document.getElementById("iBill").files[0];

    const txnData = {
        type, amount, product,
        date: new Date().toISOString().slice(0, 10),
        billData: null, billType: null, billName: null
    };

    const submitBtn = _inlineFormState.el.querySelector(".inline-submit-btn");
    const originalBtnText = submitBtn.textContent;

    function save(data) {
        if (entityType === "customer") {
            if (type === "credit") customers[index].balance += data.amount;
            else                   customers[index].balance -= data.amount;
            customers[index].transactions.push(data);
            lastTransaction = { index, entityType: "customer", type, amount: data.amount };
            localStorage.setItem("customers", JSON.stringify(customers));
            _inlineFormState = null; // clear before re-render
            displayCustomers();
            toast(`${getCurrencySymbol()}${data.amount.toLocaleString()} ${type} recorded`, type === "credit" ? "success" : "error");
        } else {
            if (type === "credit") vendors[index].balance += data.amount;
            else                   vendors[index].balance -= data.amount;
            vendors[index].transactions.push(data);
            lastTransaction = { index, entityType: "vendor", type, amount: data.amount };
            localStorage.setItem("vendors", JSON.stringify(vendors));
            _inlineFormState = null;
            displayVendors();
            toast(`${getCurrencySymbol()}${data.amount.toLocaleString()} ${type} recorded`, type === "credit" ? "success" : "error");
        }
    }

    // Main upload & save orchestrator
    async function processBillAndSave() {
        if (!billFile || billFile.size > 2 * 1024 * 1024) {
            // No file or file too large — save without bill
            save(txnData);
            return;
        }

        // Helper: save locally using Base64 / canvas compression
        function saveLocally() {
            if (billFile.type.startsWith("image/")) {
                compressImage(billFile, 900).then(compressed =>
                    save({ ...txnData, billData: compressed, billType: billFile.type, billName: billFile.name })
                );
            } else {
                const reader = new FileReader();
                reader.onload = e =>
                    save({ ...txnData, billData: e.target.result, billType: billFile.type, billName: billFile.name });
                reader.readAsDataURL(billFile);
            }
        }

        // Try Cloudinary first if credentials are set
        if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET) {
            submitBtn.disabled = true;
            submitBtn.textContent = "📤 Uploading Bill...";

            const cloudUrl = await uploadToCloudinary(billFile);
            if (cloudUrl) {
                save({ ...txnData, billData: cloudUrl, billType: billFile.type, billName: billFile.name });
                return; // ← success: stop here, do NOT fall through to local save
            }

            // Cloudinary failed — reset button and fall back to local
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            toast("Cloud upload failed — saving bill locally", "warning");
        }

        saveLocally();
    }

    processBillAndSave();
}


// ─── Details Modal ────────────────────────────────────────────────────────────
function showCustomerDetails(index) {
    const c = customers[index];
    openDetailsModal("👤 " + escapeHtml(c.name), c.transactions || []);
}

function openDetailsModal(title, transactions) {
    document.getElementById("detailsTitle").textContent = title;
    const content = document.getElementById("detailsContent");

    if (!transactions || transactions.length === 0) {
        content.innerHTML = `<div class="no-txns">📭 No transactions yet</div>`;
    } else {
        const sorted = [...transactions].reverse();
        content.innerHTML = sorted.map(t => {
            let billHtml = "";
            if (t.billData) {
                if (t.billType && t.billType.startsWith("image/")) {
                    billHtml = `<div class="txn-bill">
                        <img src="${t.billData}" class="bill-thumb"
                             onclick="window.open(this.src,'_blank')"
                             title="Click to view full size" alt="Bill">
                        <span class="bill-hint">Click to expand</span>
                    </div>`;
                } else {
                    billHtml = `<div class="txn-bill">
                        <a href="${t.billData}" download="${escapeHtml(t.billName || "bill.pdf")}" class="bill-pdf-link">
                            📄 Download ${escapeHtml(t.billName || "Bill")}
                        </a>
                    </div>`;
                }
            }
            return `
            <div class="txn-detail-item">
                ${t.product ? `<p class="txn-product">📦 <strong>Product:</strong> ${escapeHtml(t.product)}</p>` : ""}
                <p class="txn-amount-line ${t.type === "credit" ? "credit" : "debit"}">
                    ${t.type === "credit" ? "+" : "−"}${getCurrencySymbol()}${Number(t.amount).toLocaleString()}
                    <span class="txn-type-badge ${t.type === "credit" ? "credit-badge" : "debit-badge"}">${t.type === "credit" ? "Credit" : "Debit"}</span>
                </p>
                <p class="txn-date">📅 ${escapeHtml(String(t.date))}</p>
                ${billHtml}
            </div>`;
        }).join("");
    }
    document.getElementById("detailsModal").classList.add("active");
}

function closeDetailsModal() {
    document.getElementById("detailsModal").classList.remove("active");
}

// ─── PDF Export ───────────────────────────────────────────────────────────────
function exportEntityPDF(name, phone, balance, transactions, entityType) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "mm", format: "a4" });

    const pageW  = doc.internal.pageSize.getWidth();
    const margin = 14;
    let   y      = 20;

    // ─ Header bar
    doc.setFillColor(30, 41, 59);          // dark slate
    doc.rect(0, 0, pageW, 28, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("📒 Khata — Account Statement", margin, 13);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Generated: " + new Date().toLocaleString(), margin, 21);
    y = 38;

    // ─ Entity info box
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin, y, pageW - margin * 2, 22, 3, 3, "F");
    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text((entityType === "customer" ? "👤 " : "🏪 ") + name, margin + 4, y + 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("📞 " + phone, margin + 4, y + 15);

    // Balance badge (right side)
    const balStr   = "Balance: Rs." + Number(balance).toLocaleString();
    const balColor = balance >= 0 ? [5, 150, 105] : [220, 38, 38];
    doc.setFillColor(...balColor);
    doc.roundedRect(pageW - margin - 48, y + 4, 48, 12, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(balStr, pageW - margin - 24, y + 11, { align: "center" });
    y += 30;

    // ─ Transaction table header
    if (!transactions || transactions.length === 0) {
        doc.setTextColor(100, 116, 139);
        doc.setFont("helvetica", "italic");
        doc.setFontSize(11);
        doc.text("No transactions found.", margin, y + 8);
    } else {
        const cols  = { date: margin, type: margin + 30, product: margin + 52, amount: pageW - margin - 2 };
        const rowH  = 8;

        // Table header
        doc.setFillColor(30, 41, 59);
        doc.rect(margin, y, pageW - margin * 2, rowH, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.text("Date",    cols.date    + 2, y + 5.5);
        doc.text("Type",    cols.type    + 2, y + 5.5);
        doc.text("Product", cols.product + 2, y + 5.5);
        doc.text("Amount",  cols.amount,      y + 5.5, { align: "right" });
        y += rowH;

        const sorted = [...transactions].reverse();
        sorted.forEach((t, i) => {
            // New page if needed
            if (y + rowH > doc.internal.pageSize.getHeight() - 16) {
                doc.addPage();
                y = 16;
            }

            // Alternating row bg
            doc.setFillColor(i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 250 : 255, i % 2 === 0 ? 252 : 255);
            doc.rect(margin, y, pageW - margin * 2, rowH, "F");

            // Row border
            doc.setDrawColor(226, 232, 240);
            doc.rect(margin, y, pageW - margin * 2, rowH);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);

            // Date
            doc.setTextColor(71, 85, 105);
            doc.text(String(t.date || ""), cols.date + 2, y + 5.5);

            // Type
            const isCredit = t.type === "credit";
            doc.setTextColor(...(isCredit ? [5, 150, 105] : [220, 38, 38]));
            doc.setFont("helvetica", "bold");
            doc.text(isCredit ? "Credit" : "Debit", cols.type + 2, y + 5.5);

            // Product
            doc.setTextColor(71, 85, 105);
            doc.setFont("helvetica", "normal");
            const productText = t.product ? t.product.substring(0, 28) : "—";
            doc.text(productText, cols.product + 2, y + 5.5);

            // Amount
            doc.setFont("helvetica", "bold");
            doc.setTextColor(...(isCredit ? [5, 150, 105] : [220, 38, 38]));
            doc.text((isCredit ? "+" : "-") + "Rs." + Number(t.amount).toLocaleString(),
                cols.amount, y + 5.5, { align: "right" });

            y += rowH;
        });

        // ─ Summary row
        y += 4;
        let totalCredit = 0, totalDebit = 0;
        transactions.forEach(t => {
            if (t.type === "credit") totalCredit += t.amount;
            else                     totalDebit  += t.amount;
        });
        doc.setFillColor(241, 245, 249);
        doc.roundedRect(margin, y, pageW - margin * 2, 14, 2, 2, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(5, 150, 105);
        doc.text("Total Credit: Rs." + totalCredit.toLocaleString(), margin + 4, y + 9);
        doc.setTextColor(220, 38, 38);
        doc.text("Total Debit: Rs." + totalDebit.toLocaleString(), margin + 65, y + 9);
        doc.setTextColor(30, 41, 59);
        doc.text("Net Balance: Rs." + Number(balance).toLocaleString(), margin + 128, y + 9);
    }

    // ─ Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let p = 1; p <= pageCount; p++) {
        doc.setPage(p);
        doc.setFontSize(7);
        doc.setTextColor(148, 163, 184);
        doc.text("Khata — Smart Account Book  |  Page " + p + " of " + pageCount,
            pageW / 2, doc.internal.pageSize.getHeight() - 6, { align: "center" });
    }

    const safeName = name.replace(/[^a-z0-9]/gi, "_");
    doc.save(safeName + "_statement.pdf");
}

function exportCustomerPDF(index) {
    const c = customers[index];
    exportEntityPDF(c.name, c.phone, c.balance, c.transactions || [], "customer");
}

function exportVendorPDF(index) {
    const v = vendors[index];
    exportEntityPDF(v.name, v.phone, v.balance, v.transactions || [], "vendor");
}

// ─── Add Customer Form Toggle ─────────────────────────────────────────────────
function toggleAddCustomerForm() {
    const form = document.getElementById("addCustomerForm");
    const backdrop = document.getElementById("addCustomerModalBackdrop");
    const isOpen = form.style.display !== "none";
    if (isOpen) {
        form.style.display = "none";
        backdrop.style.display = "none";
        document.getElementById("name").value = "";
        document.getElementById("phone").value = "";
    } else {
        form.style.display = "block";
        backdrop.style.display = "block";
        setTimeout(() => document.getElementById("name").focus(), 80);
    }
}

// ─── Dropdown Menu Controller ────────────────────────────────────────────────
function toggleDropdown(event, index, entityType = "customer") {
    event.stopPropagation();
    const prefix = entityType === "customer" ? "dropdown-" : "vdropdown-";
    
    // Close other dropdowns
    const allMenus = document.querySelectorAll(".dropdown-menu");
    allMenus.forEach(m => {
        if (m.id !== prefix + index) m.classList.remove("active");
    });

    const menu = document.getElementById(prefix + index);
    if (menu) {
        menu.classList.toggle("active");
    }
}

// Global click listener to close all dropdowns when clicking outside
document.addEventListener("click", () => {
    const allMenus = document.querySelectorAll(".dropdown-menu");
    allMenus.forEach(m => m.classList.remove("active"));
});

// ─── Add Customer ─────────────────────────────────────────────────────────────
function addCustomer() {
    let name  = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    if (!name || !phone) { alert("Please enter name and phone number"); return; }
    if (!validatePhone(phone)) return;
    customers.push({ name, phone, note: "", favorite: false, balance: 0, dueDate: "", transactions: [] });
    localStorage.setItem("customers", JSON.stringify(customers));
    
    // Hide modal
    document.getElementById("addCustomerForm").style.display = "none";
    document.getElementById("addCustomerModalBackdrop").style.display = "none";
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    
    displayCustomers();
    toast(`${name} added successfully`);
}


// ─── Display Customers ────────────────────────────────────────────────────────
function displayCustomers() {
    const list   = document.getElementById("customerList");
    const search = (document.getElementById("search") ? document.getElementById("search").value : "").toLowerCase();
    list.innerHTML = "";

    if (customers.length === 0) {
        list.innerHTML = `<div class="empty-state">
            <span class="empty-state-icon">👥</span>
            <h3>No Customers Yet</h3>
            <p>Start by adding your first customer to keep track of sales and outstanding balances.</p>
            <button class="btn-primary" onclick="toggleAddCustomerForm()">+ Add Customer</button>
        </div>`;
        updateDashboard();
        return;
    }

    customers.forEach((customer, index) => {
        if (customer.favoorite !== undefined && customer.favorite === undefined) {
            customer.favorite = customer.favoorite;
            delete customer.favoorite;
            localStorage.setItem("customers", JSON.stringify(customers));
        }
        if (!customer.transactions) customer.transactions = [];
        if (!customer.note)         customer.note = "";
        if (search && !customer.name.toLowerCase().includes(search) && !String(customer.phone).includes(search)) return;

        list.innerHTML += `
        <div class="customer-card ${customer.balance > 5000 ? "high-due" : ""}" id="ccard-${index}">

            <!-- Header Row -->
            <div class="card-header-row">
                <h3 class="card-name-title">
                    ${escapeHtml(customer.name)}
                    <span class="star-toggle ${customer.favorite ? 'active' : ''}" onclick="toggleFavorite(${index}); event.stopPropagation();">★</span>
                </h3>
                
                <!-- Overflow Menu Dropdown (Top-Right Aligned) -->
                <div class="card-menu-container">
                    <button class="menu-btn-dots" onclick="toggleDropdown(event, ${index}, 'customer')">•••</button>
                    <div id="dropdown-${index}" class="dropdown-menu">
                        <button class="dropdown-item" onclick="showCustomerDetails(${index})">📋 View Ledger</button>
                        <div class="dropdown-divider"></div>
                        <button class="dropdown-item" onclick="editCustomer(${index})">✏️ Edit Customer</button>
                        <button class="dropdown-item" onclick="setDueDate(${index})">📅 Set Due Date</button>
                        <button class="dropdown-item" onclick="addNote(${index})">📝 Add Note</button>
                        <div class="dropdown-divider"></div>
                        <button class="dropdown-item" onclick="exportCustomerPDF(${index})">📄 Export PDF</button>
                        <div class="dropdown-divider"></div>
                        <button class="dropdown-item danger-action" onclick="deleteCustomer(${index})">🗑️ Delete Customer</button>
                    </div>
                </div>
            </div>

            <!-- Body Section -->
            <div class="card-body-section">
                <span class="card-phone">📞 ${escapeHtml(customer.phone)}</span>
                ${customer.note ? `<span class="card-meta">📝 ${escapeHtml(customer.note)}</span>` : ""}
                ${customer.dueDate ? `<span class="card-meta">📅 ${t('due')}: ${escapeHtml(customer.dueDate)}</span>` : ""}
                
                <div class="card-balance-block">
                    <span class="balance-label">Outstanding</span>
                    <span class="balance ${customer.balance < 0 ? 'balance-neg' : 'balance-pos'}">${getCurrencySymbol()}${Number(customer.balance).toLocaleString()}</span>
                </div>
            </div>

            <!-- Footer Quick Actions -->
            <div class="card-footer-actions">
                <div class="card-actions">
                    <button class="btn-primary" onclick="addCredit(${index})">+ Credit</button>
                    <button class="btn-secondary" onclick="addDebit(${index})">- Debit</button>
                </div>
                <button class="btn-text-link" onclick="showCustomerDetails(${index})">View Ledger</button>
            </div>

        </div>`;
    });


    updateDashboard();
    displayRecentTransactions();
}

// ─── Delete Customer ──────────────────────────────────────────────────────────
async function deleteCustomer(index) {
    const confirmed = await confirmAction({
        icon: "🗑️", title: "Delete Customer?",
        message: `"${customers[index].name}" and all their transaction history will be permanently deleted.`,
        confirmText: "Yes, Delete", type: "danger"
    });
    if (!confirmed) return;
    customers.splice(index, 1);
    localStorage.setItem("customers", JSON.stringify(customers));
    displayCustomers();
    toast("Customer deleted", "info");
}

// ─── Edit Customer ────────────────────────────────────────────────────────────
function editCustomer(index) {
    let newName  = prompt("Enter New Name",  customers[index].name);
    let newPhone = prompt("Enter New Phone", customers[index].phone);
    if (newName === null || newPhone === null) return;
    newName = newName.trim(); newPhone = newPhone.trim();
    if (!newName || !newPhone) { alert("Name and phone cannot be empty"); return; }
    if (!validatePhone(newPhone)) return;
    customers[index].name  = newName;
    customers[index].phone = newPhone;
    localStorage.setItem("customers", JSON.stringify(customers));
    displayCustomers();
}


// ─── Note ─────────────────────────────────────────────────────────────────────
function addNote(index) {
    const note = prompt("Enter Customer Note", customers[index].note);
    if (note === null) return;
    customers[index].note = note;
    localStorage.setItem("customers", JSON.stringify(customers));
    displayCustomers();
}

// ─── Sort ─────────────────────────────────────────────────────────────────────
function sortByBalance() {
    customers.sort((a, b) => b.balance - a.balance);
    localStorage.setItem("customers", JSON.stringify(customers));
    displayCustomers();
}

// ─── Favourite ────────────────────────────────────────────────────────────────
function toggleFavorite(index) {
    customers[index].favorite = !customers[index].favorite;
    localStorage.setItem("customers", JSON.stringify(customers));
    displayCustomers();
}

// ─── Due Date ────────────────────────────────────────────────────────────────
function setDueDate(index) {
    const dueDate = prompt("Enter Due Date (YYYY-MM-DD)", customers[index].dueDate);
    if (dueDate === null) return;
    if (dueDate !== "" && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
        alert("Please enter a valid date in YYYY-MM-DD format"); return;
    }
    customers[index].dueDate = dueDate;
    localStorage.setItem("customers", JSON.stringify(customers));
    displayCustomers();
}