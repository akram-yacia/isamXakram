async function addUser() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    // Simple validation
    if (!username || !email) {
        alert("Please fill in both fields");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                username: username,
                email: email
            })
        });

        // Convert response to JSON
        const data = await response.json();

        if (response.ok) {
            alert("User added successfully!");
            console.log("Success:", data);

            // Clear inputs
            document.getElementById("user-name").value = "";
            document.getElementById("email").value = "";
        } else {
            // Backend returned an error
            alert("Error: " + data.message);
            console.error("Backend error:", data);
        }

    } catch (error) {
        // Network or other errors
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
}
