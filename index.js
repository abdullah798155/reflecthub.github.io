// Function to show only the selected div and hide others
function showDiv(divId) {
    // Hide the menu container
    document.querySelector('.menu-container').style.display = 'none';

    // Hide all content divs
    const divs = document.getElementsByClassName('content-div');
    for (let div of divs) {
        div.style.display = 'none';
    }
    // Show selected div
    document.getElementById(divId).style.display = 'block';
}

// Show the first section by default on page load
window.onload = function() {
    showDiv('div1');
    
};
document.addEventListener('DOMContentLoaded', (event) => {
    // Wait for 1.3 seconds (1300 milliseconds)
    setTimeout(() => {
        // Select all elements with class names swipers and swipers1
        const swipersElements = document.querySelectorAll('.swipers, .swipers1');

        // Add the 'start' class to each selected element
        swipersElements.forEach((element) => {
            element.classList.add('start');
        });
    }, 1300); // Delay in milliseconds
});



// Get elements
const panelIcon = document.getElementById("panelIcon");
const panelpopup = document.getElementById("popup");
const panelclosePopup = document.getElementById("closePopup");

// Open the popup when the panel icon is clicked
panelIcon.onclick = function() {
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
 const quickLink = document.getElementById("quickLink");
 const quickpopup = document.getElementById("quickpopup");
const quickclosePopup = document.getElementById("quickclosePopup");

// Open the popup when the panel icon is clicked
quickLink.onclick = function() {
    quickpopup.style.display = "block";
}

// Close the popup when the close button is clicked
quickclosePopup.onclick = function() {
    quickpopup.style.display = "none";
}

// Close the popup when clicking outside of the popup content
window.onclick = function(event) {
    if (event.target == quickpopup) {
        quickpopup.style.display = "none";
    }
}

