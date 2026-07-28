// Backend URL — set window.KHATA_BACKEND in config.js to switch environments
const SIGNUP_BACKEND = window.KHATA_BACKEND || "http://localhost:5000";

async function signup() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Client-side validation
    if (!name || name.length < 2) {
        alert("Please enter a valid name (at least 2 characters)");
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address");
        return;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    try {
        const response = await fetch(`${SIGNUP_BACKEND}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        alert(data.message);

        if (data.success) {
            window.location.href = "login.html";
        }
    } catch (err) {
        alert("Could not connect to the server. Please make sure the backend is running on port 5000.");
    }
}