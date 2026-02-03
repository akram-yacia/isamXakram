async function addUser() {
    const userName = document.getElementById("user-name").value;
    const userEmail = document.getElementById("email").value;

    // Simple validation
    if (!userName || !userEmail) {
        alert("Please fill in both fields");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                name: userName,
                email: userEmail
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
