async function fetchCodeLogic() {
    const question = document.getElementById("question").value;

    if (!question) {
        alert("Please enter a question!");
        return;
    }

    try {
        const response = await fetch("https://codelogic.onrender.com/api/code-logic", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question }),
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        document.getElementById("output").textContent = data.output || "No response from API.";
    } catch (error) {
        console.error("Fetch error:", error);
        document.getElementById("output").textContent = "Error fetching data. Check console.";
    }
}
