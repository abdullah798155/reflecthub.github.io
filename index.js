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
    // Wait for 5 seconds (5000 milliseconds)
    setTimeout(() => {
        const swipersElement = document.querySelector('.swipers');
        swipersElement.classList.add('start'); // Add the class to start the animation
    }, 1300); // Delay in milliseconds
});
