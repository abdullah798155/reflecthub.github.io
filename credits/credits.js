document.addEventListener('DOMContentLoaded', () => {
    const youtubeChannels = [
        { name: "Rhyad", link: "https://www.youtube.com/@rhyadmuslim" },
        { name: "Talk Islam", link: "https://www.youtube.com/@TalkIslam1" },
        { name: "Rational Believer", link: "https://www.youtube.com/@RationalBeliever" },
        { name: "The Recital", link: "https://www.youtube.com/@TheRecital" },
        { name: "MercifulServant", link: "https://www.youtube.com/@TheMercifulServant" },
        { name: "danishkim007", link: "https://www.youtube.com/@danishkim007" },
        { name: "ThereIsNoClash", link: "https://www.youtube.com/@ThereIsNoClash" },
        { name: "Bobby's Perspective", link: "https://www.youtube.com/@TheBobbysPerspective" },
        { name: "Thom J. Défilet (ريّان)", link: "https://www.youtube.com/@thomdefilet" },
        { name: "muhammad Abdulaziz", link: "https://www.youtube.com/@muhammadabdulaziz6076" },
        { name: "The Ink of Scholars Channel", link: "https://www.youtube.com/@inkofscholars" },
        { name: "Digital Mimbar", link: "https://www.youtube.com/@khalifahklothing" },
        { name: "Towards Eternity", link: "https://www.youtube.com/@TowardsEternity" },
        { name: "Daniel Drury", link: "https://www.youtube.com/@danielwaynedrury" },
        { name: "Daud Kim", link: "https://www.youtube.com/@JaehanKim66" }
    ];

    const channelGrid = document.getElementById('channelGrid');
    const header = document.createElement('div');
        header.innerHTML = `
            <div class="channel-name" style="color:lime;font-weight:bold;font-family: 'Quicksand', sans-serif;">SPECIAL THANKS</div>
             <div class="channel-type">[For creating Valuable Content to reflect]</div>
            
        `;
    channelGrid.appendChild(header);
    const divider = document.createElement('div');
    divider.innerHTML = `
        <div class="channel-type">-------------------------------------------------------</div>
    `;
    channelGrid.appendChild(divider);

    // Create a spacer element for gap between cycles
    function createSpacer() {
        const spacer = document.createElement('div');
        spacer.classList.add('credits-spacer');
        spacer.innerHTML = `
            <div class="channel-name">• • •</div>
        `;
        return spacer;
    }

    // Render channels with a spacer between cycles
    function renderChannelsWithSpacing(channels) {
        // First render the full list of channels
        channels.forEach(channel => {
            const channelItem = document.createElement('div');
            channelItem.classList.add('channel-item');
            
            channelItem.innerHTML = `
                <div class="channel-name">${channel.name}</div>
                <div class="channel-type">YouTube Channel</div>
            `;

            // Add click event to open channel
            channelItem.addEventListener('click', () => {
                window.open(channel.link, '_blank');
            });

            channelGrid.appendChild(channelItem);
        });

        // Add a spacer
        channelGrid.appendChild(createSpacer());
    }

    // Render the channels
    renderChannelsWithSpacing(youtubeChannels);
});