document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");
    const recentLaunchesList = document.getElementById("recentLaunchesList");

    const clients = [
        { name: "EaglercraftX Default (Version U32) [STILL NEED TO UPDATE TEXTURES]", url: "u32_build/index.html" },

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
        content.innerHTML = `

                             <ul>
                                <li>EaglercraftX: Regular release (current version: U32).</li>
                                <li>EaglerForge: Mod Support for Eagler</li>
                                <li>EaglerL 1.9 Beta: Stable Eagler 1.9, fewer features, but ensured to work.</li>
                                <li>EaglerL 1.9 Unstable: Unstable Eagler 1.9</li>
                                <li>Eaglercraft 1.5: Legacy</li>
                                <li>Eaglercraft Beta 1.3: OG</li>
                             </ul>`;
    };

    const loadResourcePacks = () => {
        content.innerHTML = `<div class="resource-packs">
        <h2>Resource Packs</h2>
                                <div class="pack">
                                   <h2>Low Taper Fade</h2>
                                    <a href="resourcepacks/lowtaperfade.zip" download>Download</a>
                                </div>
                                <div class="pack">
                                    <h2>Cold Crystal</h2>
                                    <a href="resourcepacks/coldcrystal.zip" download>Download</a>
                                </div>
                                <div class="pack">
                                    <h2>Bomby X32</h2>
                                    <a href="resourcepacks/bomby.zip" download>Download</a>
                                </div>
                                <div class="pack">
                                    <h2>Nebula</h2>
                                    <a href="resourcepacks/nebulapack.zip" download>Download</a>
                                </div>
                                <div class="pack">
                                    <h2>Bluepack</h2>
                                    <a href="resourcepacks/bluepack.zip" download>Download</a>
                                </div>
                                <!-- Add more packs as needed -->
                             </div>`;
    };
    const loadOfflineDownloads = () => {
        content.innerHTML = `<div class="resource-packs">
                <h2>Offline Downloads</h2>

                                <div class="pack">
                                    <h2>EaglercraftX Offline Download</h2>
                                    <a href="offlinedownload/offline_eagler.html" download>Download</a>
                                </div>
                                <div class="pack">
                                    <h2>Eaglerforge</h2>
                                    <a href="eaglerforge.html" download>Download</a>
                                </div>
                                <div class="pack">
                                    <h2>Eagler 1.9</h2>
                                    <a href="offlinedownload/eagler19.html" download>Download</a>
                                </div>
                                <div class="pack">
                                    <h2>Eagler 1.5</h2>
                                    <a href="eagler15.html" download>Download</a>
                                </div>
                                 <div class="pack">
                                    <h2>Eaglercraft Beta 1.3</h2>
                                    <a href="eaglerbeta13.html" download>Download</a>
                                </div>
                                <!-- Add more packs as needed -->
                             </div>`;
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
            if (tab === 'resource') loadResourcePacks();
            if (tab === 'offline') loadOfflineDownloads(); // Add this line
// Add this line
        });
    });

    // Load home content by default
    loadHome();
});
