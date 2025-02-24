function sendEmail() {
    let subject = encodeURIComponent(document.getElementById("subject").value);
    let message = encodeURIComponent(document.getElementById("message").value);
    let contact = encodeURIComponent(document.getElementById("contact").value);

    let body = message;
    if (contact) {
        body += "%0D%0A%0D%0AContact Details: " + contact;
    }

    let mailtoLink = `mailto:reflect.intel@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
}
document.addEventListener('DOMContentLoaded', () => {

const infoBox = document.getElementById('info-box');
const citations = document.querySelectorAll('.citation');

citations.forEach(citation => {
citation.addEventListener('mouseenter', (event) => {
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
});
