//if it is mobile screen then rin this code
if (window.innerWidth < 768) {
    document.addEventListener("DOMContentLoaded", function () {
        const hash = window.location.hash;
        if (hash) {
          const el = document.querySelector(hash);
          if (el) {
            setTimeout(() => {
              el.scrollIntoView({ behavior: "smooth" });
            }, 100); // Delay helps layout settle
          }
        }
      });
}
else{
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetSelector = this.getAttribute('href');
            const targetElement = document.querySelector(targetSelector);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
}



document.addEventListener('DOMContentLoaded', function () {
const sidebar = document.querySelector('.sidebar');
const hamburger = document.querySelector('.hamburger-menu');
const overlay = document.querySelector('.overlay');
const close_side = document.querySelector('.close-side');
const sidebarCateg = document.querySelectorAll('.sidebar-categ');


// Function to toggle the sidebar
function toggleMenu() {
  sidebar.classList.toggle('open');
  overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
}

// Add click event to the hamburger menu to open/close sidebar
hamburger.addEventListener('click', toggleMenu);

// Close sidebar when clicking outside (on the overlay)
overlay.addEventListener('click', function () {
  sidebar.classList.remove('open');
  overlay.style.display = 'none';
});
close_side.addEventListener('click', function () {
  sidebar.classList.remove('open');
  overlay.style.display = 'none';
});

sidebarCateg.forEach(function (categ) {
  categ.addEventListener('click', function () {
      sidebar.classList.remove('open');
      overlay.style.display = 'none';
  });
});

// Load default "Rational" videos on page load
// loadVideos('rational', document.querySelector('.sidebar ul li a'));
})


function copy(divId) {
    let contentDiv = document.getElementById(divId);
    if (!contentDiv) {
        alert("Content not found!");
        return;
    }
    
    let extractedText = contentDiv.innerText.replace(/\n\n/g, "\n");
    extractedText += "\n\nFor more content visit https://reflecthub.github.io/reflections/";
    
    let copyBtn = document.querySelector(`#${divId} .copyBtn`);
    
    
    
    if (!copyBtn) {
        console.error("Copy button not found!");
        return;
    }
    
    
    navigator.clipboard.writeText(extractedText).then(() => {
        // Remove existing animation classes to restart transition
        copyBtn.classList.remove("fade-in-copy", "fade-out-copy");
        void copyBtn.offsetWidth; // **Force reflow to restart animation**
    
        // Step 1: Fade out
        copyBtn.classList.add("fade-out-copy");
    
        setTimeout(() => {
            // Step 2: Change text and fade-in smoothly
            //change innerHtml based on device width
            if (window.innerWidth < 480) {
                copyBtn.innerHTML = `<i class="fa-solid fa-check fa-lg" style="color: #4f9c9b;"></i>`;
            } else {
            copyBtn.innerHTML = `Copied <i class="fa-solid fa-check fa-lg" style="color: #4f9c9b;"></i>`;
            }
            copyBtn.classList.remove("fade-out-copy");
            copyBtn.classList.add("fade-in-copy");
    
            setTimeout(() => {
                // Step 3: Fade out before switching back
                copyBtn.classList.remove("fade-in-copy");
                void copyBtn.offsetWidth; // **Force reflow again**
                copyBtn.classList.add("fade-out-copy");
    
                setTimeout(() => {
                    // Step 4: Reset to clipboard icon & fade in again
                    copyBtn.innerHTML = `<i class="fa-regular fa-clone"></i>`;
                    copyBtn.classList.remove("fade-out-copy");
                    copyBtn.classList.add("fade-in-copy");
                }, 300);
            }, 2000);
        }, 300);
    }).catch(err => console.error("Failed to copy:", err));
    }
    
    
    function share(divId) {
    let shareBtn = document.querySelector(`#${divId} .shareBtn`);
    
    if (!shareBtn) {
        console.error("Share button not found!");
        return;
    }
    
    // Apply animation class
    shareBtn.classList.add("animate");
    
    // Remove animation class after it completes (100ms)
    setTimeout(() => {
        shareBtn.classList.remove("animate");
    }, 100);
    
    // Your sharing logic here
    let contentDiv = document.getElementById(divId);
    if (!contentDiv) {
        alert("Content not found!");
        return;
    }
    
    let extractedText = contentDiv.innerText.replace(/\n\n/g, "\n");
    extractedText += "\n\nFor more content visit https://reflecthub.github.io/reflections";
    
    if (navigator.share) {
        navigator.share({
            title: "Check this out!",
            text: extractedText,
        }).catch(err => console.error("Error sharing:", err));
    } else {
        navigator.clipboard.writeText(extractedText)
            .then(() => alert("Copied to clipboard!"))
            .catch(err => console.error("Failed to copy:", err));
    }
    }
    document.addEventListener('DOMContentLoaded', () => {
    
        // CSS for the modal overlay and popup
      const styles = `
      @keyframes pop-up-mob {
       0% {
           opacity: 0;
           transform: translate(-50%, -40%) scale(0.8);
       }
       100% {
           opacity: 1;
           transform: translate(-50%, -50%) scale(1);
       }
      }
      
      @keyframes pop-out-mob {
       0% {
           opacity: 1;
           transform: translate(-50%, -50%) scale(1);
       }
       100% {
           opacity: 0;
           transform: translate(-50%, -60%) scale(0.8);
       }
      }
      
      @keyframes fade-in {
       from { opacity: 0; }
       to { opacity: 1; }
      }
      
      @keyframes fade-out {
       from { opacity: 1; }
       to { opacity: 0; }
      }
      
      .modal-overlay {
       display: none;
       position: fixed;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       background-color: rgba(0, 0, 0, 0.5);
       z-index: 999;
       opacity: 0;
      }
      
      .modal-overlay.visible {
       animation: fade-in 0.3s ease-out forwards;
      }
      
      .modal-overlay.hiding {
       animation: fade-out 0.3s ease-out forwards;
      }
      
      .modal-content {
       position: fixed;
       top: 50%;
       left: 50%;
       transform: translate(-50%, -50%);
       background-color: white;
       padding: 20px;
       border-radius: 8px;
       max-width: 90%;
       width: 300px;
       z-index: 1000;
       opacity: 0;
        max-height: 70%;
       overflow-y: auto;
      }
      
      .modal-content.showing {
       animation: pop-up-mob 0.3s ease-out forwards;
      }
      
      .modal-content.hiding {
       animation: pop-out-mob 0.3s ease-out forwards;
      }
      
      .close-button {
       position: absolute;
       top: 10px;
       right: 10px;
       border: none;
       background: none;
       font-size: 24px;
       cursor: pointer;
       padding: 5px;
       width: 30px;
       height: 30px;
       display: flex;
       align-items: center;
       justify-content: center;
       border-radius: 50%;
      }
      
      .close-button:hover {
       background-color: rgba(0, 0, 0, 0.1);
      }
      
      .modal-inner-content {
       margin-top: 10px;
       padding-right: 20px;
      }
      
      @media (min-width: 768px) {
       .modal-overlay {
           display: none !important;
       }
      }`;
      
      // Add styles to document
      const styleSheet = document.createElement('style');
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
      
      // Create modal elements
      const modalOverlay = document.createElement('div');
      modalOverlay.className = 'modal-overlay';
      const modalContent = document.createElement('div');
      modalContent.className = 'modal-content';
      const closeButton = document.createElement('button');
      closeButton.className = 'close-button';
      closeButton.innerHTML = 'X';
      const modalInnerContent = document.createElement('div');
      modalInnerContent.className = 'modal-inner-content';
      
      modalContent.appendChild(closeButton);
      modalContent.appendChild(modalInnerContent);
      modalOverlay.appendChild(modalContent);
      document.body.appendChild(modalOverlay);
      
      const infoBox = document.getElementById('info-box');
      const citations = document.querySelectorAll('.citation');
      
      // Helper function to check if device is mobile
      function isMobileDevice() {
       return window.innerWidth < 768;
      }
      
      citations.forEach(citation => {
       // Handle both click and hover events
       citation.addEventListener('click', (event) => {
           const infoText = event.target.getAttribute('data-info');
           
           if (isMobileDevice()) {
               // Mobile behavior - show modal
               modalInnerContent.innerHTML = infoText;
               modalOverlay.style.display = 'block';
               // Add animation classes after a brief delay to ensure display: block has taken effect
               requestAnimationFrame(() => {
                   modalOverlay.classList.add('visible');
                   modalContent.classList.add('showing');
               });
               document.body.style.overflow = 'hidden';
           }
       });
      
       // Desktop hover behavior
       citation.addEventListener('mouseenter', (event) => {
           if (!isMobileDevice()) {
               const infoText = event.target.getAttribute('data-info');
               infoBox.innerHTML = infoText;
               infoBox.style.display = 'block';
               infoBox.style.animation = 'pop-up 0.3s ease-out forwards';
               positionInfoBox(event);
           }
       });
      
       citation.addEventListener('mousemove', (event) => {
           if (!isMobileDevice()) {
               positionInfoBox(event);
           }
       });
      
       citation.addEventListener('mouseleave', () => {
           if (!isMobileDevice()) {
               infoBox.style.animation = 'pop-out 0.3s ease-out forwards';
           }
       });
      });
      
      // Close modal function
      function closeModal() {
       modalOverlay.classList.add('hiding');
       modalContent.classList.add('hiding');
       modalContent.classList.remove('showing');
       
       // Wait for animation to complete before hiding
       setTimeout(() => {
           modalOverlay.style.display = 'none';
           modalOverlay.classList.remove('visible', 'hiding');
           modalContent.classList.remove('hiding');
           document.body.style.overflow = '';
       }, 300); // Match animation duration
      }
      
      // Close modal when clicking close button
      closeButton.addEventListener('click', closeModal);
      
      // Close modal when clicking outside
      modalOverlay.addEventListener('click', (event) => {
       if (event.target === modalOverlay) {
           closeModal();
       }
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
      
       const left = Math.min(Math.max(mouseX + xOffset, 0), windowWidth - infoBoxWidth);
       const top = Math.min(Math.max(mouseY + yOffset, 0), windowHeight - infoBoxHeight);
      
       infoBox.style.left = `${left}px`;
       infoBox.style.top = `${top}px`;
      }
       
      
      });
      document.addEventListener("DOMContentLoaded", () => {
        const container = document.querySelector(".button-container");
      
        // Set initial state (collapsed)
        container.style.overflow = "hidden";
        container.style.maxHeight = "0";
        container.style.transition = "max-height 0.5s ease-out";
      
        // Create the toggle button
        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "▼ Show Topics";
        toggleBtn.style.cssText = `
          margin: 10px auto;
          display: block;
          background-color: #3f6969;
          color: white;
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        `;
      
        // Insert the toggle button before the container
        container.parentNode.insertBefore(toggleBtn, container);
      
        // Toggle behavior
        let expanded = false;
        toggleBtn.addEventListener("click", () => {
          if (!expanded) {
            container.style.maxHeight = container.scrollHeight + "px";
            toggleBtn.textContent = "▲ Hide Topics";
          } else {
            container.style.maxHeight = "0";
            toggleBtn.textContent = "▼ Show Topics";
          }
          expanded = !expanded;
        });
      });
