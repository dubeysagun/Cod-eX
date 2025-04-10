async function generateQuestion() {
    const difficulty = document.getElementById("difficulty").value;
    const topic = document.getElementById("topic").value;
    const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ difficulty, topic })
    });
    const data = await response.json();
    document.getElementById("output").innerText = data.question;
}