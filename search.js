document.addEventListener('DOMContentLoaded', async () => {
    const searchWrapper = document.getElementById('search-wrapper');
    const searchBar = document.getElementById('search-bar');
    const resultsContainer = document.getElementById('results');
    const resultsContainer1 = document.getElementById('results1');
    const searchButton = document.getElementById('search-button');
    const countElement = document.createElement('div');
    const jsonFiles = [
        'rational.json',
        'inspirational.json',
        'scientific.json',
        'reactions.json',
        'verses.json' // New JSON file for verses
    ];
    
    let allVideos = [];
    let allVerses = []; // Separate array for verses
    
    for (const file of jsonFiles) {
        try {
            const response = await fetch('https://reflectserver.github.io/Content/' + file);
            const data = await response.json();
    
            // Check if it's the verses.json file based on the filename
            if (file === 'verses.json') {
                allVerses = allVerses.concat(data);
            } else {
                // Extract only the required fields from non-verses JSON files
                const filteredData = data.map(video => ({
                    id: video.id,
                    title: video.title,
                    description: video.description,
                    channelName: video.channelName,
                    link:video.link,
                    thumbnail: video.thumbnail
                }));
                allVideos = allVideos.concat(filteredData);
            }
        } catch (error) {
            console.error(`Error loading ${file}:`, error);
        }
    }
    

    // Function to highlight matching terms in the title
    function highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span style="font-weight:bold;color:black;background-color:rgba(110, 253, 78, 0.5);">$1</span>');
    }

    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        resultsContainer.innerHTML = ''; // Clear previous results
        resultsContainer1.innerHTML = ''; // Clear previous results

        // Hide the count element initially
        countElement.style.display = 'none';

        if (query.trim()) {
            // Filter both videos and verses
            const filteredVideos = allVideos.filter(video =>
                Object.values(video).some(value =>
                    typeof value === 'string' && value.toLowerCase().includes(query)
                )
            );

            const filteredVerses = allVerses.filter(verse =>
                verse.verse.toLowerCase().includes(query)
            );

            const totalResults = filteredVideos.length + filteredVerses.length;

            if (totalResults > 0) {
                // Show the result count at the top
               
                // Create a new element to display the count at the top
             
                countElement.id = 'result-count';

                countElement.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // Transparent background
                // countElement.style.color = '#fff';
                countElement.style.padding = '10px 20px';
                countElement.style.fontSize = '1.5rem'; // Bigger font size
                countElement.style.fontFamily = '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'; // Font family
                countElement.style.borderRadius = '8px';
                countElement.style.zIndex = '100000'; // Ensure it's on top of other content
                countElement.style.display = 'none'; // Hide initially
                countElement.style.width = '80vw'; // Make width 80% of viewport width
                countElement.style.maxWidth = '500px'; // Set a maximum width
                countElement.style.boxSizing = 'border-box'; // Ensures padding doesn't affect width calculation
                
                // Responsive font size
                countElement.style.fontSize = 'calc(1.2rem + 1vw)'; // Makes the font responsive
                
                // document.body.appendChild(countElement);
                countElement.innerHTML = `Found ${totalResults} result${totalResults > 1 ? 's' : ''}`;
                countElement.style.display = 'block'; // Show the count element

                // Display filtered videos
                filteredVideos.forEach(video => {
                    const resultItem = document.createElement('a');
                    resultItem.classList.add('result-item');
                    resultItem.href = video.link;
                    resultItem.target = "_blank";
                    resultItem.innerHTML = highlightMatch(video.title, query) +
                        `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b><span style='color:blue;'>@${video.channelName}</span><br><img src="${video.thumbnail}" style="width: 180px; height: 100px; margin-top: 10px;border-radius:10px;"></b>`;

                    
                        resultsContainer.appendChild(resultItem);
                });

                // Display filtered verses
                filteredVerses.forEach(verse => {
                    const resultItem = document.createElement('a');
                    resultItem.classList.add('verse-item');
                    resultItem.href = `https://quran.com/${verse.chapterNo}?startingVerse=${verse.verseNo}`;
                    resultItem.target = "_blank";
                    resultItem.innerHTML = `
                        <p>${highlightMatch(verse.verse, query)}</p>
                        <span style="font-weight: bold; color: #007bff;">
                            (Chapter ${verse.chapterNo}, Verse ${verse.verseNo})
                        </span>
                    `;

                    // Add some additional styling to make it look like a block element
                    resultItem.style.display = 'block';
                    resultItem.style.padding = '15px';
                    resultItem.style.marginBottom = '10px';
                    resultItem.style.border = '1px solid #007bff';
                    resultItem.style.borderRadius = '8px';
                    resultItem.style.backgroundColor = '#f0f8ff';
                    resultItem.style.textDecoration = 'none'; // Remove underline
                    resultItem.style.color = 'inherit'; // Use inherited color

                    // const resultItemClone2 = resultItem.cloneNode(true);
                
                    resultsContainer.appendChild(resultItem);
                });
               resultsContainer1.appendChild(countElement);
            } else {
                // Display error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.innerHTML = `
                    <div class="error-icon">🚨</div>
                    <h2>Oops! No results found for your search. 😔</h2>
                    <p>Please try searching with different keywords.</p>
                `;
                errorMessage.style.color = '#D8000C';
                errorMessage.style.backgroundColor = '#FFF6F6';
                errorMessage.style.textAlign = 'center';
                errorMessage.style.margin = '20px auto';
                errorMessage.style.padding = '20px';
                errorMessage.style.border = '1px solid #D8000C';
                errorMessage.style.borderRadius = '10px';
                errorMessage.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                errorMessage.style.fontFamily = 'Arial, sans-serif';
                errorMessage.style.width = '90%';
                errorMessage.style.maxWidth = '600px';
                errorMessage.style.animation = 'fadeIn 0.5s ease-in-out';

                resultsContainer.appendChild(errorMessage);
            }
        }
    });

    // CSS styles for modern aesthetics
    const style = document.createElement('style');
    style.innerHTML = `
        .error-message .error-icon {
            font-size: 2.5rem;
            margin-bottom: 10px;
            animation: shake 0.5s ease-in-out;
        }

        .error-message h2 {
            margin: 0;
            font-size: 1.8rem;
            color: #D8000C;
        }

        .error-message p {
            margin: 10px 0;
            font-size: 1rem;
            color: #4F4F4F;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes shake {
            0%, 100% {
                transform: translateX(0);
            }
            25% {
                transform: translateX(-5px);
            }
            50% {
                transform: translateX(5px);
            }
            75% {
                transform: translateX(-5px);
            }
        }
    `;
    document.head.appendChild(style);

    // Show search bar on Ctrl + K
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            searchWrapper.style.display = 'flex'; // Show the search wrapper
            searchBar.focus();
        }

        // Close search bar on Esc
        if (e.key === 'Escape') {
            searchWrapper.style.display = 'none';
            countElement.style.display = 'none'
            resultsContainer.innerHTML = ''; // Clear results
            resultsContainer1.innerHTML = ''; // Clear results
        }
    });

    // Show search bar when search button is clicked
    searchButton.addEventListener('click', () => {
        searchWrapper.style.display = 'flex'; // Show the search wrapper
        searchBar.focus();
    });

    // Hide search bar and results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchBar.contains(e.target) && !resultsContainer.contains(e.target) && !searchButton.contains(e.target)) {
            searchWrapper.style.display = 'none';
            countElement.style.display = 'none'
            resultsContainer.innerHTML = ''; // Clear results
            resultsContainer1.innerHTML = ''; // Clear results
        }
    });

    const input = document.querySelector('#search-bar'); // Replace with your input element
    const results = document.querySelector('#results');
    const results1 = document.querySelector('#results1');

    input.addEventListener('focus', () => {
        results.classList.add('active');
        results1.classList.add('active');
    });

    input.addEventListener('blur', () => {
        setTimeout(() => 
            {results.classList.remove('active'), 200; // Allow time for interaction
            results1.classList.remove('active'), 200}); // Allow time for interaction
    });

});
