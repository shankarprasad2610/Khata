function updateDashboard() {
    let now          = new Date();
    let currentMonth = now.getMonth();
    let currentYear  = now.getFullYear();
    let monthName    = now.toLocaleString("default", { month: "long" });

    // ── Customer stats ──────────────────────────────────────
    let totalCustomers  = customers.length;
    let totalCredit     = 0;
    let totalDebit      = 0;
    let netBalance      = 0;
    let monthlyCredit   = 0;
    let monthlyDebit    = 0;
    let totalTxns       = 0;
    let topCustomer     = "—";
    let highestBalance  = -Infinity;
    let overdueCount    = 0;
    let favoriteCount   = 0;

    customers.forEach(c => {
        netBalance += c.balance;
        totalTxns  += (c.transactions || []).length;

        if (c.balance > highestBalance) {
            highestBalance = c.balance;
            topCustomer    = c.name;
        }

        if (c.favorite) favoriteCount++;

        if (c.dueDate) {
            let due   = new Date(c.dueDate);
            let today = new Date();
            due.setHours(0,0,0,0);
            today.setHours(0,0,0,0);
            if (due < today && c.balance > 0) overdueCount++;
        }

        (c.transactions || []).forEach(t => {
            if (t.type === "credit") totalCredit += t.amount;
            else                     totalDebit  += t.amount;

            let d = new Date(t.date);
            if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
                if (t.type === "credit") monthlyCredit += t.amount;
                else                    monthlyDebit  += t.amount;
            }
        });
    });

    // ── Vendor stats ────────────────────────────────────────
    let totalVendors     = vendors.length;
    let totalVendorBal   = 0;
    let vendorOverdue    = 0;

    vendors.forEach(v => {
        totalVendorBal += v.balance;
        if (v.dueDate) {
            let due   = new Date(v.dueDate);
            let today = new Date();
            due.setHours(0,0,0,0);
            today.setHours(0,0,0,0);
            if (due < today && v.balance > 0) vendorOverdue++;
        }
    });

    // Credit vs Debit Chart calculations
    let totalVolume = totalCredit + Math.abs(totalDebit);
    let creditPercentage = totalVolume > 0 ? Math.round((totalCredit / totalVolume) * 100) : 50;
    let debitPercentage = totalVolume > 0 ? Math.round((Math.abs(totalDebit) / totalVolume) * 100) : 50;

    // Recent activity list consolidation
    let allTransactions = [];
    customers.forEach(customer => {
        (customer.transactions || []).forEach(transaction => {
            allTransactions.push({
                name: customer.name,
                type: transaction.type,
                amount: transaction.amount,
                date: transaction.date,
                entity: 'Customer'
            });
        });
    });
    vendors.forEach(vendor => {
        (vendor.transactions || []).forEach(transaction => {
            allTransactions.push({
                name: vendor.name,
                type: transaction.type,
                amount: transaction.amount,
                date: transaction.date,
                entity: 'Vendor'
            });
        });
    });
    allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    let activityHtml = "";
    if (allTransactions.length === 0) {
        activityHtml = `<p class='no-activity-text'>${t('noRecentTransactions')}</p>`;
    } else {
        allTransactions.slice(0, 5).forEach(t => {
            activityHtml += `
                <div class="activity-feed-item">
                    <div style="display:flex; flex-direction:column; gap:2px;">
                        <span class="activity-label-name">${escapeHtml(t.name)}</span>
                        <span class="activity-label-meta">${t.entity} • ${new Date(t.date).toLocaleDateString()}</span>
                    </div>
                    <span class="activity-amount ${t.type === 'credit' ? 'amount-pos' : 'amount-neg'}">
                        ${t.type === 'credit' ? '+' : '-'}${getCurrencySymbol()}${t.amount.toLocaleString()}
                    </span>
                </div>
            `;
        });
    }

    // escapeHtml is defined in customer.js (loads first)
    document.getElementById("dashboard").innerHTML = `
        <div class="dashboard-layout">
            <!-- Left Main Column (65% width) -->
            <div class="dashboard-main-column">

                <!-- Hero ${t('netBalance')} Card -->
                <div class="dashboard-hero-card">
                    <div class="hero-card-header">
                        <span class="hero-card-title">${t('netBalance')}</span>
                        <span class="hero-trend-badge ${netBalance >= 0 ? 'trend-up' : 'trend-down'}">
                            ${netBalance >= 0 ? t('positiveTrend') : t('negativeTrend')}
                        </span>
                    </div>
                    <h2>${getCurrencySymbol()}${netBalance.toLocaleString()}</h2>

                    
                    <!-- ${t('creditRatio')} Progress Chart -->
                    <div class="ratio-chart-section">
                        <div class="ratio-chart-header">
                            <span>${t('creditRatio')}</span>
                            <span>${creditPercentage}% Credit / ${debitPercentage}% Debit</span>
                        </div>
                        <div class="ratio-chart-track">
                            <div class="ratio-chart-fill fill-credit" style="width: ${creditPercentage}%"></div>
                            <div class="ratio-chart-fill fill-debit" style="width: ${debitPercentage}%"></div>
                        </div>
                        <div class="ratio-chart-legend">
                            <span><span class="legend-dot dot-green"></span> ${t('creditLegend')} (${getCurrencySymbol()}${totalCredit.toLocaleString()})</span>
                            <span><span class="legend-dot dot-red"></span> ${t('debitLegend')} (${getCurrencySymbol()}${totalDebit.toLocaleString()})</span>
                        </div>
                    </div>
                </div>

                <!-- Grouped Metrics -->
                <h3 class="dashboard-grid-title">${t('financialPerformance')}</h3>
                <div class="dashboard-metrics-grid">
                    <div class="metric-card-compact">
                        <span class="metric-label">${t('totalCredit')}</span>
                        <span class="metric-value val-green">${getCurrencySymbol()}${totalCredit.toLocaleString()}</span>
                    </div>
                    <div class="metric-card-compact">
                        <span class="metric-label">${t('totalDebit')}</span>
                        <span class="metric-value val-red">${getCurrencySymbol()}${totalDebit.toLocaleString()}</span>
                    </div>
                    <div class="metric-card-compact">
                        <span class="metric-label">${t('monthlyCredit')} (${monthName})</span>
                        <span class="metric-value">${getCurrencySymbol()}${monthlyCredit.toLocaleString()}</span>
                    </div>
                    <div class="metric-card-compact">
                        <span class="metric-label">${t('monthlyDebit')} (${monthName})</span>
                        <span class="metric-value">${getCurrencySymbol()}${monthlyDebit.toLocaleString()}</span>
                    </div>
                </div>

                <h3 class="dashboard-grid-title" style="margin-top: 24px;">${t('businessVolume')}</h3>
                <div class="dashboard-metrics-grid">
                    <div class="metric-card-compact">
                        <span class="metric-label">${t('totalCustomers')}</span>
                        <span class="metric-value">${totalCustomers}</span>
                    </div>
                    <div class="metric-card-compact">
                        <span class="metric-label">${t('totalVendors')}</span>
                        <span class="metric-value">${totalVendors}</span>
                    </div>
                    <div class="metric-card-compact">
                        <span class="metric-label">${t('vendorDues')}</span>
                        <span class="metric-value val-red">${getCurrencySymbol()}${totalVendorBal.toLocaleString()}</span>
                    </div>
                    <div class="metric-card-compact">
                        <span class="metric-label">${t('totalTransactions')}</span>
                        <span class="metric-value">${totalTxns}</span>
                    </div>
                </div>
            </div>

            <!-- Right Sidebar Column (35% width) -->
            <div class="dashboard-sidebar-column">
                <!-- Alerts Section -->
                <div class="dashboard-sidebar-panel">
                    <h4>${t('alertsReminders')}</h4>
                    <div class="dashboard-alerts-list">
                        <div class="dashboard-alert-item overdue-alert">
                            <span class="alert-label">${t('overdueAccounts')}</span>
                            <span class="alert-value">${overdueCount + vendorOverdue} ${t('accountsText')}</span>
                        </div>
                        ${totalVendorBal > 5000 ? `
                        <div class="dashboard-alert-item warning-alert">
                            <span class="alert-label">${t('highVendorDues')}</span>
                            <span class="alert-value">${getCurrencySymbol()}${totalVendorBal.toLocaleString()}</span>
                        </div>
                        ` : ""}
                    </div>
                </div>

                <!-- ${t('quickActions')} Panel -->
                <div class="dashboard-sidebar-panel">
                    <h4>${t('quickActions')}</h4>
                    <div class="dashboard-actions-grid">
                        <button class="btn-primary btn-accent" onclick="toggleAddCustomerForm()">${t('addCustomer')}</button>
                        <button class="btn-primary btn-accent" onclick="toggleAddVendorForm()">${t('addVendor')}</button>
                        <button class="btn-secondary" onclick="undoTransaction()">↩️ ${t('undoLast')}</button>
                        <button class="btn-secondary" onclick="showSettings()">⚙️ ${t('settingsTab')}</button>
                    </div>
                </div>

                <!-- ${t('recentActivity')} Feed -->
                <div class="dashboard-sidebar-panel">
                    <h4>${t('recentActivity')}</h4>
                    <div class="dashboard-activity-list">
                        ${activityHtml}
                    </div>
                </div>
            </div>
        </div>
    `;

}