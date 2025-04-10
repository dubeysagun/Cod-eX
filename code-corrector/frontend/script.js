document.getElementById("correctBtn").addEventListener("click", async () => {
    const inputCode = document.getElementById("inputCode").value.trim();
    const outputCode = document.getElementById("outputCode");

    if (!inputCode) {
        outputCode.innerText = "Please enter some code.";
        return;
    }

    outputCode.innerText = "Processing...";

    try {
        const response = await fetch("https://code-corrector.onrender.com/correct-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code: inputCode })
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();
        outputCode.innerText = data.correctedCode || "No correction found.";
    } catch (error) {
        outputCode.innerText = "Error fetching corrected code. Please try again.";
    }
});