document.addEventListener("DOMContentLoaded", () => {
    const checkBtn = document.getElementById("checkBtn");
    const attemptCounter = document.getElementById("attemptCounter");
    const statusText = document.getElementById("status");

    let attempt = 0;

    // Chart initialization
    const ctxPing = document.getElementById("pingChart").getContext("2d");
    const pingChart = new Chart(ctxPing, {
        type: "line",
        data: { labels: [], datasets: [{ label: "Ping (ms)", borderColor: "#00ff88", data: [], fill: false, tension: 0.3 }] },
        options: { responsive: true }
    });

    const ctxLatency = document.getElementById("latencyChart").getContext("2d");
    const latencyChart = new Chart(ctxLatency, {
        type: "line",
        data: { labels: [], datasets: [{ label: "Latency (ms)", borderColor: "#ffcc00", data: [], fill: false, tension: 0.3 }] },
        options: { responsive: true }
    });

    function resetStats() {
        document.getElementById("ping").textContent = "--";
        document.getElementById("latency").textContent = "--";
        statusText.textContent = "Testing...";
        statusText.classList.remove("offline");
        attempt = 0;
        attemptCounter.textContent = "Test attempt: 0/10";
        attemptCounter.classList.remove("visible");

        // Reset Chart Data
        pingChart.data.labels = [];
        pingChart.data.datasets[0].data = [];
        pingChart.update();

        latencyChart.data.labels = [];
        latencyChart.data.datasets[0].data = [];
        latencyChart.update();
    }

    async function measurePing() {
    const url = "https://reflectserver.github.io/Content/rational.json";
    const start = performance.now();
    try {
        await fetch(url, { method: "HEAD", cache: "no-cache" }); 
    } catch (error) {
        console.error("Ping test failed:", error);
    }
    const end = performance.now();
    return Math.round(end - start);
}


    async function getLatency() {
    const url = "https://reflectserver.github.io/Content/rational.json"; // Your file as test URL
    const start = performance.now();
    try {
        await fetch(url, { method: "HEAD", cache: "no-cache" }); // Only send HEAD request to avoid full file download
    } catch (error) {
        console.error("Latency test failed:", error);
    }
    const end = performance.now();
    return Math.round((end - start) / 2); // Approximate one-way latency
}



    async function performNetworkTest() {
        resetStats();
        attemptCounter.classList.add("visible");

        for (let i = 1; i <= 10; i++) {
            attempt = i;
            attemptCounter.textContent = `Test attempt: ${i}/10`;

            const ping = await measurePing();
            const latency = await getLatency();

            document.getElementById("ping").textContent = ping;
            document.getElementById("latency").textContent = latency;

            // Update charts
            pingChart.data.labels.push(i);
            pingChart.data.datasets[0].data.push(ping);
            pingChart.update();

            latencyChart.data.labels.push(i);
            latencyChart.data.datasets[0].data.push(latency);
            latencyChart.update();

            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        statusText.textContent = "Test Completed ✅";
    }

    checkBtn.addEventListener("click", performNetworkTest);
});
//detecting the scroll
(function() {
    // Get the notification div
    const notification = document.getElementById("notification");
    notification.style.width = "100%";
    notification.style.padding = "10px";
    notification.style.textAlign = "center";
    notification.style.fontSize = "16px";
    notification.style.fontFamily = "Arial, sans-serif";
    notification.style.zIndex = "1000";
    notification.style.position = "fixed";
    notification.style.top = "0";
    notification.style.left = "0";
    notification.style.fontFamily="'Quicksand', sans-serif;";
    notification.style.transition = "transform 0.3s ease-in-out";
    notification.style.display = "none"; // Initially hidden
  
    function showNotification(message, color) {
        notification.textContent = message;
        notification.style.backgroundColor = color;
        notification.style.color = "#fff";
        notification.style.display = "block";
        notification.style.transform = "translateY(0)"; // Slide down
        document.body.style.transition = "margin-top 0.3s ease-in-out";
        document.body.style.marginTop = "40px"; // Move page down
  
        if (message === "Back online") {
            setTimeout(() => {
                hideNotification();
            }, 3000);
        }
    }
  
    function hideNotification() {
        notification.style.transform = "translateY(-100%)"; // Slide up
        setTimeout(() => {
            notification.style.display = "none";
            document.body.style.marginTop = "0"; // Move page back up
        }, 300);
    }
  
    function updateConnectionStatus() {
        if (navigator.onLine) {
            showNotification("Back online", "green");
        } else {
            showNotification("No internet connection", "red");
        }
    }
  
    // Listen for online/offline events
    window.addEventListener("online", updateConnectionStatus);
    window.addEventListener("offline", updateConnectionStatus);
  
    // Initial check
    if (!navigator.onLine) {
        showNotification("No internet connection", "red");
    }
  })();
  