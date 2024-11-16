document.addEventListener('DOMContentLoaded', () => {
    
        const infoBox = document.getElementById('info-box');
        const citations = document.querySelectorAll('.citation');
    
        citations.forEach(citation => {
            citation.addEventListener('mouseenter', (event) => {
                console.log("mouse entered")
                const infoText = event.target.getAttribute('data-info');
                infoBox.innerHTML = infoText;
                infoBox.style.display = 'block';
                infoBox.style.animation = 'pop-up 0.3s ease-out forwards';
                positionInfoBox(event);
            });
    
            citation.addEventListener('mousemove', (event) => {
                positionInfoBox(event);
            });
    
            citation.addEventListener('mouseleave', () => {
                // infoBox.style.display = 'none';
                console.log("mouse left")
                infoBox.style.animation = 'pop-out 0.3s ease-out forwards';
             
            });
        });
    
        function positionInfoBox(event) {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            const infoBoxWidth = infoBox.offsetWidth;
            const infoBoxHeight = infoBox.offsetHeight;
    
            let xOffset = 0;
            let yOffset = 0;
    
            // Determine the section based on mouseX and mouseY
            // Top-left
            if (mouseX < windowWidth / 3 && mouseY < windowHeight / 3) {
                xOffset = 10;
                yOffset = 10;
            }
            // Top-center
            else if (mouseX >= windowWidth / 3 && mouseX <= 2 * windowWidth / 3 && mouseY < windowHeight / 3) {
                xOffset = -infoBoxWidth / 2;
                yOffset = 10;
            }
            // Top-right
            else if (mouseX > 2 * windowWidth / 3 && mouseY < windowHeight / 3) {
                xOffset = -infoBoxWidth - 10;
                yOffset = 10;
            }
            // Center-left
            else if (mouseX < windowWidth / 3 && mouseY >= windowHeight / 3 && mouseY <= 2 * windowHeight / 3) {
                xOffset = 10;
                yOffset = -infoBoxHeight / 2;
            }
            // Center
            else if (mouseX >= windowWidth / 3 && mouseX <= 2 * windowWidth / 3 && mouseY >= windowHeight / 3 && mouseY <= 2 * windowHeight / 3) {
                 xOffset = -infoBoxWidth / 2;
                yOffset = 10;
            }
            // Center-right
            else if (mouseX > 2 * windowWidth / 3 && mouseY >= windowHeight / 3 && mouseY <= 2 * windowHeight / 3) {
                xOffset = -infoBoxWidth - 10;
                yOffset = -infoBoxHeight / 2;
            }
            // Bottom-left
            else if (mouseX < windowWidth / 3 && mouseY > 2 * windowHeight / 3) {
                xOffset = 10;
                yOffset = -infoBoxHeight - 10;
            }
            // Bottom-center
            else if (mouseX >= windowWidth / 3 && mouseX <= 2 * windowWidth / 3 && mouseY > 2 * windowHeight / 3) {
                xOffset = -infoBoxWidth / 2;
                yOffset = -infoBoxHeight - 10;
            }
            // Bottom-right
            else if (mouseX > 2 * windowWidth / 3 && mouseY > 2 * windowHeight / 3) {
                xOffset = -infoBoxWidth - 10;
                yOffset = -infoBoxHeight - 10;
            }
    
            // Apply calculated position, ensuring infoBox stays within viewport
            const left = Math.min(Math.max(mouseX + xOffset, 0), windowWidth - infoBoxWidth);
            const top = Math.min(Math.max(mouseY + yOffset, 0), windowHeight - infoBoxHeight);
    
            infoBox.style.left = `${left}px`;
            infoBox.style.top = `${top}px`;
        }

    
    const menuLinks = document.querySelector('.menu-links');

    // Ensure the menu links are visible initially on small screens
    if (window.innerWidth <= 768) {
        menuLinks.style.display = 'flex'; // Show the menu links
        menuLinks.classList.add('show');  // Add the show class to ensure it’s visible
    }

    // Attach the scroll event listener to automatically collapse the menu on scroll
    window.addEventListener('scroll', collapseOnScroll);
    // Attach the resize event listener
    window.addEventListener('resize', handleResize);
});


// Function to toggle the menu links on hamburger icon click 
function toggleMenu() {
    const menuLinks = document.querySelector('.menu-links');

    if (menuLinks.classList.contains('show')) {
        // If the menu is currently shown, hide it
        menuLinks.classList.remove('show');
        menuLinks.classList.add('hide');

        // Wait for the animation to finish before setting display to none
        setTimeout(() => {
            menuLinks.style.display = 'none';
            menuLinks.classList.remove('hide'); // Reset for next toggle
        }, 500); // Match this duration to the CSS animation duration
    } else {
        // If the menu is hidden, show it
        menuLinks.style.display = 'flex';
        menuLinks.classList.add('show');
    }
}

// Function to collapse the menu links automatically on scroll for smaller screens
function collapseOnScroll() {
    const menuLinks = document.querySelector('.menu-links');

    if (window.innerWidth <= 768) {
        // Hide the menu links whenever the user scrolls down
        if (menuLinks.classList.contains('show')) {
            menuLinks.classList.remove('show');
            menuLinks.classList.add('hide');

            // Wait for the animation to finish before setting display to none
            setTimeout(() => {
                menuLinks.style.display = 'none';
                menuLinks.classList.remove('hide'); // Reset for next toggle
            }, 500); // Match this duration to the CSS animation duration
        }
    }
}

// Function to handle window resize and reset menu links state
function handleResize() {
    const menuLinks = document.querySelector('.menu-links');
    if (window.innerWidth > 768) {
        // Ensure the menu links are visible on large screens
        menuLinks.style.display = 'flex';
        menuLinks.classList.remove('show');
    } else {
        // Hide menu links if the screen is small
        menuLinks.style.display = 'flex'; // Ensure it's visible initially
    }
}



var targetjsonFile;
function showDiv(divId) {
    // Hide the menu container
    const jsonFiles = {
        'div1': 'rational',
        'div2': 'scientific',
        'div3':'inspirational',
        'div4':'reactions',
        'div5':'verses',
        'div6':'faith'
        // Add other mappings for 'div3' and 'div4' if needed
    };
    document.querySelector('.menu-container').style.display = 'none';
    targetjsonFile = jsonFiles[divId];
        // Fetch the JSON data
        // console.log("target: "+targetjsonFile);
    if(targetjsonFile != 'faith'){
        fetch('./Content/' + targetjsonFile + '.json')
            .then(response => response.json())
            .then(data => {
                // Call function to render the table
                if(targetjsonFile=='rational' || targetjsonFile=='scientific' || targetjsonFile=='inspirational' || targetjsonFile=='reactions') renderTable(data);
                if(targetjsonFile=='verses') renderVerse(data);
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }
    else{
        // if(targetjsonFile=='faith') renderFaith();
    }


    // Function to render the table
// Function to render the verses
function renderVerse(data) {
    const verseContainer = document.querySelector('.verse-style');

    // Clear existing content
    verseContainer.innerHTML = '';

    // Loop through the JSON data and create an h2 element for each verse
    data.forEach((item) => {
        // Create a new h2 element
        // const verseElement = document.createElement('h2');
        
        // Create an h4 element for the verse content
        const verseContent = document.createElement('h4');
        verseContent.classList.add('pop-up-animate'); // Add the verse-style class
        verseContent.innerHTML = `"
            ${item.verse}"<br>[Quran: <a href='https://quran.com/${item.chapterNo}?startingVerse=${item.verseNo}' target="_blank">${item.chapterNo}:${item.verseNo}</a>]
        `;

        // Append the h4 element to the h2 element
        // verseElement.appendChild(verseContent);

        // Append the h2 element to the verse container
        verseContainer.appendChild(verseContent);
        verseContainer.appendChild(document.createElement('br'));
        verseContainer.appendChild(document.createElement('br'));
    });
}

    
    
    function renderTable(data) {
        const tableBody = document.querySelector(`.${targetjsonFile} tbody`);
    
        // Clear any existing content
        tableBody.innerHTML = '';
    
        // Loop through the JSON data and create rows
        data.forEach((item, index) => {
            const row = document.createElement('tr');
row.innerHTML = `
    <td>${item.id}</td>
    <td>
        <a href="${item.channelLink}" target="_blank">
            <img src="${item.channelImage}" style="height: 20px; width: 20px;">
            ${item.channelName}
        </a>
    </td>
    <td>
        <a href="${item.link}" target="_blank">${item.title}</a>
        <br>
          <a href="${item.link}" target="_blank">
        <img src="${item.thumbnail}" 
             alt="Dummy row (Ignore this)" 
             style="height: 100px; width: 200px;" 
             loading="lazy">
             </a>
    </td>
    <td class="responsive-description">${item.description}</td>
    <td><a href="${item.link}" target="_blank">Visit</a></td>
`;

// Append the row to the table body
tableBody.appendChild(row);

        });
    }
    
    
    // Hide all content divs
    const divs = document.getElementsByClassName('content-div');
    for (let div of divs) {
        div.style.display = 'none';
    }
    
    // Show the selected div
    const selectedDiv = document.getElementById(divId);
    selectedDiv.style.display = 'block';

    // Find the table in the selected div
    const table = selectedDiv.querySelector('table');

    // Remove the animation class if it's already there
    if (table) {
        table.classList.remove('pop-up-animate');
        // selectedDiv.classList.remove('pop-up-animate');
        //mouseover
        //mouseout
        // Force reflow to restart the animation
        void table.offsetWidth;
        // void selectedDiv.offsetWidth;

        // Add the animation class to trigger the effect
        table.classList.add('pop-up-animate');
        // selectedDiv.classList.add('pop-up-animate');
    }

    // Buttons mapping
    const buttons = [
        { id: 'men-d1', targetDiv: 'div1' },
        { id: 'men-d2', targetDiv: 'div2' },
        { id: 'men-d3', targetDiv: 'div3' },
        { id: 'men-d4', targetDiv: 'div4' },
        { id: 'men-d5', targetDiv: 'div5' },
        { id: 'men-d6', targetDiv: 'div6'}
    ];

    // Loop through buttons and apply styles
    buttons.forEach(button => {
        const btnElement = document.getElementById(button.id);
        const isSelected = button.targetDiv === divId;

        // Reset button styles
        btnElement.style.backgroundColor = 'white';
        btnElement.style.color = 'black';
        btnElement.style.position = 'relative';
        btnElement.style.overflow = 'hidden';
        
        // Remove any existing swipe effect
        const existingHighlight = btnElement.querySelector('.swipe-highlight');
        if (existingHighlight) {
            btnElement.removeChild(existingHighlight);
        }

        if (isSelected) {
            // Change the text color for the selected button
            btnElement.style.color = 'black';

            // Create a swipe effect for the selected button
            const swipeHighlight = document.createElement('div');
            swipeHighlight.classList.add('swipe-highlight');
            swipeHighlight.style.position = 'absolute';
            swipeHighlight.style.top = '0';
            swipeHighlight.style.left = '-100%';
            swipeHighlight.style.width = '100%';
            swipeHighlight.style.height = '100%';
            //onhover effect to swipehighlight
            btnElement.classList.remove('pop-up-animate1');
            void btnElement.offsetWidth;
            btnElement.classList.add('pop-up-animate1');
            swipeHighlight.style.backgroundColor = 'rgba(46, 170, 5, 0.5)';
            swipeHighlight.style.transition = 'left 0.4s ease';
            
            // Animate the swipe effect
            setTimeout(() => {
                swipeHighlight.style.left = '0';
            }, 50);

            // Add swipe highlight to the button
            btnElement.appendChild(swipeHighlight);
        }
    });
}

// Apply animation when the page loads initially
window.onload = function() {
    showDiv('div1');
};

document.addEventListener('DOMContentLoaded', (event) => {
    
    // Wait for 1.3 seconds (1300 milliseconds)
    setTimeout(() => {
        // Select all elements with class names swipers and swipers1
        const swipersElements = document.querySelectorAll('.swipers, .swipers1,.swipers2');

        // Add the 'start' class to each selected element
        swipersElements.forEach((element) => {
            element.classList.add('start');
        });
    }, 1300); // Delay in milliseconds
});



// Get elements
const panelIcon = document.getElementById("panelIcon");
const panelIcon2 = document.getElementById("panelIcon2");
const panelpopup = document.getElementById("popup");
const panelclosePopup = document.getElementById("closePopup");

// Open the popup when the panel icon is clicked
panelIcon.onclick = function() {
    panelpopup.style.display = "block";
}
panelIcon1.onclick = function() {
    panelpopup.style.display = "block";
}

// Close the popup when the close button is clicked
panelclosePopup.onclick = function() {
    panelpopup.style.display = "none";
}

// Close the popup when clicking outside of the popup content
window.onclick = function(event) {
    if (event.target == panelpopup) {
        panelpopup.style.display = "none";
    }
}




