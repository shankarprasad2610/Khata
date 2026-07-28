// Backend URL — set window.KHATA_BACKEND in config.js to switch environments
const LOGIN_BACKEND = window.KHATA_BACKEND || "http://localhost:5000";

function showStatus(show, message = "Connecting to backend server...") {
    const overlay = document.getElementById("statusOverlay");
    const msgEl = document.getElementById("statusMsg");
    if (!overlay) return;
    
    if (show) {
        msgEl.textContent = message;
        overlay.style.display = "flex";
        document.getElementById("signInBtn").disabled = true;
        document.getElementById("demoBtn").disabled = true;
    } else {
        overlay.style.display = "none";
        document.getElementById("signInBtn").disabled = false;
        document.getElementById("demoBtn").disabled = false;
    }
}

async function login() {
    if (localStorage.getItem("currentUser")) {
        window.location.href = "index.html";
        return;
    }

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter your email and password");
        return;
    }

    showStatus(true, "Logging in...");

    try {
        const response = await fetch(`${LOGIN_BACKEND}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!data.success) {
            showStatus(false);
            alert(data.message || "Invalid credentials");
            return;
        }

        localStorage.setItem("authToken", data.token);
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        window.location.href = "index.html";

    } catch (err) {
        showStatus(false);
        alert("Could not connect to the server. Please make sure the backend is running on port 5000.");
    }
}

// ⚡ Bulletproof Demo Login Workflow
async function loginDemo() {
    const demoEmail = "demo@khata.com";
    const demoPassword = "password123";
    const demoName = "Demo Merchant";

    document.getElementById("email").value = demoEmail;
    document.getElementById("password").value = demoPassword;

    showStatus(true, "Authenticating demo user...");

    try {
        // Try logging in directly
        let response = await fetch(`${LOGIN_BACKEND}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: demoEmail, password: demoPassword })
        });

        let data = await response.json();

        // If demo account doesn't exist yet on a fresh database, create it in the background
        if (!data.success && data.message === "Invalid credentials") {
            showStatus(true, "First time database setup: Creating Demo Account...");
            
            const signupRes = await fetch(`${LOGIN_BACKEND}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: demoName, email: demoEmail, password: demoPassword })
            });
            const signupData = await signupRes.json();

            if (signupData.success) {
                // Retry login
                showStatus(true, "Demo Account created! Logging in...");
                response = await fetch(`${LOGIN_BACKEND}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: demoEmail, password: demoPassword })
                });
                data = await response.json();
            }
        }

        if (data.success) {
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("currentUser", JSON.stringify(data.user));
            window.location.href = "index.html";
        } else {
            showStatus(false);
            alert("Demo login failed: " + (data.message || "Unknown error"));
        }

    } catch (err) {
        showStatus(false);
        alert("Could not connect to the server. Please verify the backend is running.");
    }
}