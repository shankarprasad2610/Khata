
async function undoTransaction() {
    if (lastTransaction === null) {
        alert("No transaction to undo");
        return;
    }

    const isVendor   = lastTransaction.entityType === "vendor";
    const entityList = isVendor ? vendors : customers;
    const entity     = entityList[lastTransaction.index];

    if (!entity) {
        alert("Could not find the entity for the last transaction");
        lastTransaction = null;
        return;
    }

    const confirmed = await confirmAction({
        icon: "↩️",
        title: "Undo Transaction?",
        message: `Undo the last ${getCurrencySymbol()}${lastTransaction.amount} ${lastTransaction.type} for "${entity.name}"? This will reverse the balance change.`,
        confirmText: "Yes, Undo",
        type: "warning"
    });
    if (!confirmed) return;

    const idx = lastTransaction.index;

    if (isVendor) {
        if (lastTransaction.type === "credit") vendors[idx].balance -= lastTransaction.amount;
        else                                   vendors[idx].balance += lastTransaction.amount;
        vendors[idx].transactions.pop();
        localStorage.setItem("vendors", JSON.stringify(vendors));
        displayVendors();
    } else {
        if (lastTransaction.type === "credit") customers[idx].balance -= lastTransaction.amount;
        else                                   customers[idx].balance += lastTransaction.amount;
        customers[idx].transactions.pop();
        localStorage.setItem("customers", JSON.stringify(customers));
        displayCustomers();
    }

    lastTransaction = null;
    toast("Transaction undone", "info");
}


function displayRecentTransactions() {
    let allTransactions = [];

    customers.forEach(customer => {
        if (!customer.transactions) customer.transactions = [];
        customer.transactions.forEach(transaction => {
            allTransactions.push({
                name:   customer.name,
                entity: "Customer",
                type:   transaction.type,
                amount: transaction.amount,
                date:   transaction.date
            });
        });
    });

    vendors.forEach(vendor => {
        if (!vendor.transactions) vendor.transactions = [];
        vendor.transactions.forEach(transaction => {
            allTransactions.push({
                name:   vendor.name,
                entity: "Vendor",
                type:   transaction.type,
                amount: transaction.amount,
                date:   transaction.date
            });
        });
    });

    allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    let html = "";
    if (allTransactions.length === 0) {
        html = "<p class='no-activity-text'>No recent transactions</p>";
    } else {
        allTransactions.slice(0, 5).forEach(t => {
            html += `
                <div class="transaction-card">
                <h3>${t.type === "credit" ? "🟢 Credit" : "🔴 Debit"}</h3>
                <p><b>${t.entity}:</b> ${escapeHtml(t.name)}</p>
                <p><b>Amount:</b> ${getCurrencySymbol()}${escapeHtml(String(t.amount))}</p>
                <p><b>Date:</b> ${escapeHtml(new Date(t.date).toLocaleDateString())}</p>
                </div>
            `;
        });
    }

    const el = document.getElementById("recentTransactions");
    if (el) el.innerHTML = html;
}