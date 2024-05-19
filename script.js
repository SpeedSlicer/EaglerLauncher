document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const recentLaunchesList = document.getElementById("recentLaunchesList");

    const clients = [
        { name: "EaglercraftX Default (Version U30)", url: "u30_build/index.html" },
        { name: "Eaglerforge", url: "eaglerforge.html" },
        { name: "EaglercraftL 1.9 Beta", url: "eaglerlweb/index.html" },
        { name: "EaglerL 1.9 Unstable", url: "eaglerunstable/index.html" },
        { name: "Eaglercraft 1.5", url: "eagler15.html" },
        { name: "Eaglercraft Beta 1.3", url: "eaglerbeta13.html" }
    ];

    const loadHome = () => {
        content.innerHTML = `<div class="image-container">
                                <img src="logo.png?v=2" alt="Game Image" />
                             </div>`;
        populateClientSelect();
        loadRecentLaunches();
    };

    const loadInfo = () => {
        content.innerHTML = `<h2>Welcome to the Game Launcher</h2>
                             <p>Select a client from the dropdown below to launch the game.</p>
                             <h3>Clients</h3>
                             <ul>
                                <li>EaglercraftX: Regular release (current version: U30).</li>
                                <li>EaglerForge: Mod Support for Eagler</li>
                                <li>EaglerL 1.9 Beta: Stable Eagler 1.9, fewer features, but ensured to work.</li>
                                <li>EaglerL 1.9 Unstable: Unstable Eagler 1.9</li>
                                <li>Eaglercraft 1.5: Legacy</li>
                                <li>Eaglercraft Beta 1.3: OG</li>
                             </ul>`;
    };

    const loadRecentLaunches = () => {
        const recentLaunches = JSON.parse(localStorage.getItem('recentLaunches')) || [];
        recentLaunchesList.innerHTML = '';

        recentLaunches.forEach(launch => {
            const li = document.createElement('li');
            li.textContent = launch.name;
            recentLaunchesList.appendChild(li);
        });
    };

    const populateClientSelect = () => {
        const clientSelect = document.getElementById("clientSelect");
        clientSelect.innerHTML = "";

        clients.forEach(client => {
            const option = document.createElement("option");
            option.value = client.url;
            option.textContent = client.name;
            clientSelect.appendChild(option);
        });
    };

    document.getElementById("launchBtn").addEventListener("click", () => {
        const selectedClientUrl = document.getElementById("clientSelect").value;
        const selectedClientName = document.getElementById("clientSelect").selectedOptions[0].textContent;

        if (selectedClientUrl) {
            let recentLaunches = JSON.parse(localStorage.getItem('recentLaunches')) || [];
            recentLaunches = recentLaunches.filter(launch => launch.url !== selectedClientUrl);
            recentLaunches.unshift({ name: selectedClientName, url: selectedClientUrl });

            if (recentLaunches.length > 3) {
                recentLaunches.pop();
            }

            localStorage.setItem('recentLaunches', JSON.stringify(recentLaunches));
            loadRecentLaunches();

            window.location.href = selectedClientUrl;
        } else {
            alert("Please select a client to launch.");
        }
    });

    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');
            if (tab === 'home') loadHome();
            if (tab === 'info') loadInfo();
        });
    });

    // Load home content by default
    loadHome();
});
