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




try{
          const panelclosePopup = document.getElementById("closePopup");
        // Get elements


        const panelpopup = document.getElementById("popup");
        panelIcon.onclick = function() {
          panelpopup.style.display = "block";
          panelclosePopup.onclick = function() {
            panelpopup.style.display = "none";
        }
        window.onclick = function(event) {
          if (event.target == panelpopup) {
              panelpopup.style.display = "none";
          }
       }
}
}
catch(err){
    console.log(err);
}
try{
          const panelclosePopup = document.getElementById("closePopup");
        // Get elements


        const panelpopup = document.getElementById("popup");
        panelIcon1.onclick = function() {
          panelpopup.style.display = "block";
        }
        panelclosePopup.onclick = function() {
          panelpopup.style.display = "none";
        }
        window.onclick = function(event) {
          if (event.target == panelpopup) {
              panelpopup.style.display = "none";
          }
       }
}
catch(err){
    console.log(err);
}




if ("serviceWorker" in navigator) {
    // Register the service worker
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((registration) => {
                console.log("Service Worker registered with scope:", registration.scope);
            })
            .catch((error) => {
                console.log("Service Worker registration failed:", error);
            });
    });
}

async function loadVideos(jsonFile, clickedButton) {
    try {
        // Highlight the active tab
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
    
        const videoContainer = document.getElementById('videoContainer');
        const loadingElement = document.getElementById('loading');
        const dynamicContent = document.getElementById('dynamicContent');
        // dynamicContent.style.display = `block`;
        dynamicContent.style.display = "block";
        dynamicContent.innerHTML = `${jsonFile.charAt(0).toUpperCase() + jsonFile.slice(1)} videos`;
        //to change title of page
        document.title = `ReflectHub - ${jsonFile.charAt(0).toUpperCase() + jsonFile.slice(1)}`;
    
    

        // Show loading indicator
        videoContainer.innerHTML = "";
        loadingElement.style.display = "block";
    
        // Fetch videos
        const response = await fetch(`https://reflectserver.github.io/Content/${jsonFile}.json`);
        const videos = await response.json();
    
        // Hide loading indicator
        loadingElement.style.display = "none";
    
        // Display videos with animation
        videoContainer.innerHTML = videos.map((video, index) => `
            <div class="video-card hidden">
                <a href="${video.link}" target="_blank">
                    <img src="${video.thumbnail}" alt="Thumbnail" id="thumbnail">
                </a>
                <div class="video-info">
                    <a href="${video.link}" target="_blank" style="text-decoration: none; color: #222;">
                        <div class="video-title">${video.title}</div>
                        <div class="video-description">
                            ${video.description.length > 110 ? video.description.substring(0, 110) + '...' : video.description}
                        </div>
                    </a>
                    <div class="channel">
                        <img src="${video.channelImage}" alt="Channel">
                        <a href="${video.channelLink}" target="_blank">${video.channelName}</a>
                    </div>
                </div>
            </div>
        `).join('');
    
        // Trigger pop-out animation one by one
        setTimeout(() => {
            document.querySelectorAll('.video-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.remove('hidden');
                    card.classList.add('pop-out');
                }, index * 50);
            });
        }, 50);
    
    } catch (error) {
        console.error('Error loading videos:', error); 
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerHTML = `
            <div class="error-icon">🚨</div>
            <h2>Oops ! Server did not respond </h2>
            <p>Please try after sometime or explore other sections</p>
            <p style="background-color:white; color:red; display:inline-block;">${error}</p>
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
        document.getElementById('loading').innerHTML="";
        document.getElementById('loading').appendChild(errorMessage);
    }
    
    
    
    
}

// Load default "Rational" videos on page load
document.addEventListener('DOMContentLoaded', () => {
    loadVideos('rational', document.querySelector('.tab-btn'));
});
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
loadVideos('rational', document.querySelector('.sidebar ul li a'));
})

const chapters={
    "1": "Al-Fatihah - The Opening",
    "2": "Al-Baqarah - The Cow",
    "3": "Aal-E-Imran - The Family of Imran",
    "4": "An-Nisa - The Women",
    "5": "Al-Ma'idah - The Table Spread",
    "6": "Al-An'am - The Cattle",
    "7": "Al-A'raf - The Heights",
    "8": "Al-Anfal - The Spoils of War",
    "9": "At-Tawbah - The Repentance",
    "10": "Yunus - Jonah",
    "11": "Hud - Hud",
    "12": "Yusuf - Joseph",
    "13": "Ar-Ra'd - The Thunder",
    "14": "Ibrahim - Abraham",
    "15": "Al-Hijr - The Rocky Tract",
    "16": "An-Nahl - The Bee",
    "17": "Al-Isra - The Night Journey",
    "18": "Al-Kahf - The Cave",
    "19": "Maryam - Mary",
    "20": "Ta-Ha - Ta-Ha",
    "21": "Al-Anbiya - The Prophets",
    "22": "Al-Hajj - The Pilgrimage",
    "23": "Al-Mu’minun - The Believers",
    "24": "An-Nur - The Light",
    "25": "Al-Furqan - The Criterion",
    "26": "Ash-Shu'ara - The Poets",
    "27": "An-Naml - The Ant",
    "28": "Al-Qasas - The Stories",
    "29": "Al-Ankabut - The Spider",
    "30": "Ar-Rum - The Romans",
    "31": "Luqman - Luqman",
    "32": "As-Sajdah - The Prostration",
    "33": "Al-Ahzab - The Confederates",
    "34": "Saba - Sheba",
    "35": "Fatir - The Originator",
    "36": "Ya-Sin - Ya-Sin",
    "37": "As-Saffat - Those Who Set the Ranks",
    "38": "Sad - Sad",
    "39": "Az-Zumar - The Groups",
    "40": "Ghafir - The Forgiver",
    "41": "Fussilat - Explained in Detail",
    "42": "Ash-Shura - The Consultation",
    "43": "Az-Zukhruf - The Ornaments of Gold",
    "44": "Ad-Dukhan - The Smoke",
    "45": "Al-Jathiyah - The Crouching",
    "46": "Al-Ahqaf - The Wind-Curved Sandhills",
    "47": "Muhammad - Muhammad",
    "48": "Al-Fath - The Victory",
    "49": "Al-Hujurat - The Rooms",
    "50": "Qaf - Qaf",
    "51": "Adh-Dhariyat - The Winnowing Winds",
    "52": "At-Tur - The Mount",
    "53": "An-Najm - The Star",
    "54": "Al-Qamar - The Moon",
    "55": "Ar-Rahman - The Beneficent",
    "56": "Al-Waqi'ah - The Inevitable",
    "57": "Al-Hadid - The Iron",
    "58": "Al-Mujadila - The Pleading Woman",
    "59": "Al-Hashr - The Exile",
    "60": "Al-Mumtahanah - She That is to be Examined",
    "61": "As-Saff - The Ranks",
    "62": "Al-Jumu'ah - The Congregation",
    "63": "Al-Munafiqun - The Hypocrites",
    "64": "At-Taghabun - The Mutual Disillusion",
    "65": "At-Talaq - The Divorce",
    "66": "At-Tahrim - The Prohibition",
    "67": "Al-Mulk - The Sovereignty",
    "68": "Al-Qalam - The Pen",
    "69": "Al-Haqqah - The Reality",
    "70": "Al-Ma'arij - The Ascending Stairways",
    "71": "Nuh - Noah",
    "72": "Al-Jinn - The Jinn",
    "73": "Al-Muzzammil - The Enshrouded One",
    "74": "Al-Muddaththir - The Cloaked One",
    "75": "Al-Qiyamah - The Resurrection",
    "76": "Al-Insan - The Man",
    "77": "Al-Mursalat - The Emissaries",
    "78": "An-Naba - The Tidings",
    "79": "An-Nazi'at - Those Who Drag Forth",
    "80": "Abasa - He Frowned",
    "81": "At-Takwir - The Overthrowing",
    "82": "Al-Infitar - The Cleaving",
    "83": "Al-Mutaffifin - Defrauding",
    "84": "Al-Inshiqaq - The Splitting Open",
    "85": "Al-Buruj - The Mansions of the Stars",
    "86": "At-Tariq - The Morning Star",
    "87": "Al-A'la - The Most High",
    "88": "Al-Ghashiyah - The Overwhelming",
    "89": "Al-Fajr - The Dawn",
    "90": "Al-Balad - The City",
    "91": "Ash-Shams - The Sun",
    "92": "Al-Lail - The Night",
    "93": "Ad-Duha - The Morning Hours",
    "94": "Ash-Sharh - The Relief",
    "95": "At-Tin - The Fig",
    "96": "Al-Alaq - The Clot",
    "97": "Al-Qadr - The Power",
    "98": "Al-Bayyina - The Clear Proof",
    "99": "Az-Zalzalah - The Earthquake",
    "100": "Al-Adiyat - The Courser",
    "101": "Al-Qari'ah - The Calamity",
    "102": "At-Takathur - The Rivalry in World Increase",
    "103": "Al-Asr - The Declining Day",
    "104": "Al-Humazah - The Traducer",
    "105": "Al-Fil - The Elephant",
    "106": "Quraish - Quraish",
    "107": "Al-Ma'un - The Small Kindnesses",
    "108": "Al-Kawthar - The Abundance",
    "109": "Al-Kafirun - The Disbelievers",
    "110": "An-Nasr - The Divine Support",
    "111": "Al-Masad - The Palm Fiber",
    "112": "Al-Ikhlas - The Sincerity",
    "113": "Al-Falaq - The Daybreak",
    "114": "An-Nas - The Mankind"
  }
  
async function loadVerses(jsonFile, clickedButton) {
    try {
        // Highlight the active tab
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');

        const videoContainer = document.getElementById('videoContainer');
        const loadingElement = document.getElementById('loading');
        const verseContainer = document.createElement('div');
        verseContainer.className = 'verse-container';
        const dynamicContent = document.getElementById('dynamicContent');
        dynamicContent.style.display = "block";
        dynamicContent.innerHTML = `${jsonFile.charAt(0).toUpperCase() + jsonFile.slice(1)} from the Quran`;
        document.title = `ReflectHub - ${jsonFile.charAt(0).toUpperCase() + jsonFile.slice(1)}`;

  
        // Check if the file name display element exists; if not, create it
       

        // Show loading indicator
        videoContainer.innerHTML = "";
        loadingElement.style.display = "block";

        // Fetch verses
        const response = await fetch(`https://reflectserver.github.io/Content/${jsonFile}.json`);
        const verses = await response.json();

        // Hide loading indicator
        loadingElement.style.display = "none";

        // Display verses with animation
        verseContainer.innerHTML = verses.map((verseData, index) => `
            <div class="verse-card hidden">
            <a href='https://quran.com/${verseData.chapterNo}?startingVerse=${verseData.verseNo}' target="_blank" style="text-decoration: none; color: #222;">
                <div class="verse-text">${verseData.verse}</div>
                <div class="verse-ref">Chapter ${verseData.chapterNo}, Verse ${verseData.verseNo}<br>[${chapters[verseData.chapterNo]}]</div>
            </a>
            </div>
        `).join('');

        // Animate verse cards one by one
        setTimeout(() => {
            document.querySelectorAll('.verse-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.remove('hidden');
                    card.classList.add('pop-out');
                }, index * 20);
            });
        }, 20);
        videoContainer.appendChild(verseContainer);


    } catch (error) {
        console.error('Error loading verses:', error);
        document.getElementById('loading').innerText = "Failed to load verses.";
    }
}

async function DynamicLoader(payload, clickedButton) {
    try {
        // Highlight the active tab
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
        


        const videoContainer = document.getElementById('videoContainer');
        const loadingElement = document.getElementById('loading');
        document.title = `ReflectHub - ${payload.charAt(0).toUpperCase() + payload.slice(1)}`;
        

        // Clear previous content and show loading
        videoContainer.innerHTML = "";
        loadingElement.style.display = "block";

        // Insert faith content
        if(payload==="Faith"){
          const dynamicContent = document.getElementById('dynamicContent');
          dynamicContent.style.display = "block";
          dynamicContent.innerHTML = `Declaring the faith`;
          
        videoContainer.innerHTML = `
        <div id="div6" class="pop-up-animate" 
            style="height: fit-content !important; width: calc(100vw - 20px); max-width: 1200px;
            padding: 18px; text-align: center; border-radius: 12px; 
            background: rgba(255, 255, 255, 0.9); 
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); 
            margin: 10px auto; border: 2px solid #2ecc71; box-sizing: border-box;">
            
            <div style="font-family: 'Quicksand', sans-serif; font-weight:500; font-style: italic; 
            font-size: 1.4rem; color: #37474f; line-height: 1.5; 
            letter-spacing: 0.6px;">
                <h3 style="margin: 0; font-size: 1.6rem;">
                    <b>Entering into Islam is very simple</b><br><br>
                </h3>
                <h3 style="margin: 0; font-size: 1.2rem;">
                    You just need to <i>declare the faith</i>, known as the <b>Shahada</b> 
                    (<i>declaration of faith ☝️</i>)<br>
                </h3>
    
                <div style="font-size: 1rem; font-style: italic; color: #555; 
                margin-top: 10px; padding: 10px; 
                background: rgba(223, 222, 222, 0.9); 
                border-radius: 8px; display: inline-block; max-width: 90%;">
                    <b>Note:</b> Take your declaration of faith (Shahada) only after you have realized what Islam truly is and you are ready to embrace it. 
                    There is no hurry—take your time to learn about Islam and its teachings. Once you are ready, 
                    you can declare your faith by reciting the Shahada.
                </div>
    
                <div style="margin-top: 20px; padding: 10px; background-color:#eab8e4; 
                display: inline-block; border-radius: 8px; font-size: 1.1rem;">
                    <b>There is no compulsion in religion</b><br> 
                    [Quran <a href="https://quran.com/2?startingVerse=256" target="_blank" 
                    style="color: #2d7bb6; text-decoration: none;">2:256</a>]
                </div>
    
                <br><br>
    
                <div style="margin-top: 10px;">
                    <b>The Shahada in Arabic:</b><br>
                    <span style="background-color: #d4f7d4; padding: 5px 10px; 
                    border-radius: 8px; display: inline-block; font-size: 1.3rem;">
                        <b><i>أشهد أن لا إله إلا الله وأشهد أن محمداً رسول الله</i></b>
                    </span>
                </div>
    
                <br>
    
                <div style="margin-top: 10px;">
                    <b>Say in Arabic:</b><br>
                    <span style="background-color: #d4f7d4; padding: 5px 10px; 
                    border-radius: 8px; display: inline-block; font-size: 1.2rem;"> 
                        <b><i>Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadur rasulullah</i></b>
                    </span>
                </div>
    
                <br>
    
                <div style="margin-top: 10px;">
                    <b>Translation:</b><br>
                    <span style="background-color: #ccf2ff; padding: 5px 10px; 
                    border-radius: 8px; display: inline-block; font-size: 1.2rem;"> 
                        <b><i>I bear witness that there is no god but Allah, and I bear witness that Muhammad is the messenger of Allah.</i></b>
                    </span>
                </div>
    
                <br><br>
    
                <div style="font-size: 1rem; font-style: italic; color: #555; 
                margin-top: 10px; padding: 10px; 
                background: rgba(223, 222, 222, 0.9); border-radius: 8px; 
                display: inline-block; max-width: 90%;">
                    <b>Onboarding:</b> This declaration is the core of Islamic belief and affirms that there is no deity but Allah, 
                    and Muhammad is His messenger. By stating these words with sincere belief, a person embraces Islam 
                    and begins their journey as a Muslim.
                </div>
    
            </div>
        </div>
    `;
        }
        else if(payload==="Afterlife"){
          const dynamicContent = document.getElementById('dynamicContent');
              dynamicContent.style.display = "block";
              dynamicContent.innerHTML = `Why afterlife matters?`;
          videoContainer.innerHTML = `
            <?xml version="1.0" encoding="UTF-8"?>
    <!-- Do not edit this file with editors other than draw.io -->
            <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
            <div id="responsive-svg-container" class="pop-up-animate">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="740px" height="764px" viewBox="-0.5 -0.5 740 764" content="&lt;mxfile host=&quot;app.diagrams.net&quot; agent=&quot;Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36&quot; version=&quot;24.8.9&quot;&gt;&#10;  &lt;diagram name=&quot;Page-1&quot; id=&quot;8-aDURVAkAx0ODPZd4yA&quot;&gt;&#10;    &lt;mxGraphModel dx=&quot;1235&quot; dy=&quot;1714&quot; grid=&quot;1&quot; gridSize=&quot;10&quot; guides=&quot;1&quot; tooltips=&quot;1&quot; connect=&quot;1&quot; arrows=&quot;1&quot; fold=&quot;1&quot; page=&quot;1&quot; pageScale=&quot;1&quot; pageWidth=&quot;850&quot; pageHeight=&quot;1100&quot; math=&quot;0&quot; shadow=&quot;0&quot;&gt;&#10;      &lt;root&gt;&#10;        &lt;mxCell id=&quot;0&quot; /&gt;&#10;        &lt;mxCell id=&quot;1&quot; parent=&quot;0&quot; /&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-3&quot; value=&quot;&quot; style=&quot;strokeWidth=2;html=1;shape=mxgraph.flowchart.annotation_2;align=left;labelPosition=right;pointerEvents=1;rotation=90;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&#10;          &lt;mxGeometry x=&quot;389.38&quot; y=&quot;-20.000000000000004&quot; width=&quot;55&quot; height=&quot;218.75&quot; as=&quot;geometry&quot; /&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-4&quot; value=&quot;&amp;lt;font style=&amp;quot;&amp;quot;&amp;gt;&amp;lt;span style=&amp;quot;font-weight: bold; font-size: 15px;&amp;quot;&amp;gt;Muslim&amp;amp;nbsp;&amp;lt;/span&amp;gt;&amp;lt;br&amp;gt;&amp;lt;font style=&amp;quot;&amp;quot;&amp;gt;&amp;lt;i&amp;gt;[Submits his will to God]&amp;lt;/i&amp;gt;&amp;lt;/font&amp;gt;&amp;lt;/font&amp;gt;&quot; style=&quot;rounded=1;whiteSpace=wrap;html=1;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&#10;          &lt;mxGeometry x=&quot;250&quot; y=&quot;110&quot; width=&quot;120&quot; height=&quot;60&quot; as=&quot;geometry&quot; /&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-6&quot; value=&quot;&amp;lt;b&amp;gt;&amp;lt;font style=&amp;quot;font-size: 15px;&amp;quot;&amp;gt;Human Being&amp;lt;br&amp;gt;🤵&amp;lt;/font&amp;gt;&amp;lt;/b&amp;gt;&quot; style=&quot;rounded=1;whiteSpace=wrap;html=1;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&#10;          &lt;mxGeometry x=&quot;356.88&quot; width=&quot;120&quot; height=&quot;60&quot; as=&quot;geometry&quot; /&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-8&quot; value=&quot;&amp;lt;font style=&amp;quot;&amp;quot;&amp;gt;&amp;lt;span style=&amp;quot;font-weight: bold; font-size: 15px;&amp;quot;&amp;gt;Athiest&amp;lt;/span&amp;gt;&amp;lt;br&amp;gt;&amp;lt;font style=&amp;quot;font-size: 13px;&amp;quot;&amp;gt;&amp;lt;i style=&amp;quot;&amp;quot;&amp;gt;/Non-Muslim&amp;lt;/i&amp;gt;&amp;lt;/font&amp;gt;&amp;lt;/font&amp;gt;&quot; style=&quot;rounded=1;whiteSpace=wrap;html=1;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&#10;          &lt;mxGeometry x=&quot;460&quot; y=&quot;110&quot; width=&quot;120&quot; height=&quot;60&quot; as=&quot;geometry&quot; /&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-11&quot; value=&quot;&amp;lt;b&amp;gt;Believes in Hereafter&amp;lt;br&amp;gt;✅&amp;lt;/b&amp;gt;&quot; style=&quot;text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&#10;          &lt;mxGeometry x=&quot;170&quot; y=&quot;110&quot; width=&quot;60&quot; height=&quot;60&quot; as=&quot;geometry&quot; /&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-12&quot; value=&quot;&amp;lt;b&amp;gt;Does not believe in Hereafter&amp;lt;br&amp;gt;❌&amp;lt;/b&amp;gt;&quot; style=&quot;text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&#10;          &lt;mxGeometry x=&quot;590&quot; y=&quot;100&quot; width=&quot;110&quot; height=&quot;90&quot; as=&quot;geometry&quot; /&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-14&quot; value=&quot;&quot; style=&quot;endArrow=classic;html=1;rounded=0;&quot; edge=&quot;1&quot; parent=&quot;1&quot;&gt;&#10;          &lt;mxGeometry relative=&quot;1&quot; as=&quot;geometry&quot;&gt;&#10;            &lt;mxPoint x=&quot;309.88&quot; y=&quot;170&quot; as=&quot;sourcePoint&quot; /&gt;&#10;            &lt;mxPoint x=&quot;309.5&quot; y=&quot;270&quot; as=&quot;targetPoint&quot; /&gt;&#10;          &lt;/mxGeometry&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-15&quot; value=&quot;&amp;lt;font style=&amp;quot;font-size: 16px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Dies 🪦&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;&quot; style=&quot;edgeLabel;resizable=0;html=1;;align=center;verticalAlign=middle;&quot; connectable=&quot;0&quot; vertex=&quot;1&quot; parent=&quot;XzCmzyegnEFURFCZ5URi-14&quot;&gt;&#10;          &lt;mxGeometry relative=&quot;1&quot; as=&quot;geometry&quot; /&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-17&quot; value=&quot;&quot; style=&quot;endArrow=classic;html=1;rounded=0;&quot; edge=&quot;1&quot; parent=&quot;1&quot;&gt;&#10;          &lt;mxGeometry relative=&quot;1&quot; as=&quot;geometry&quot;&gt;&#10;            &lt;mxPoint x=&quot;519.88&quot; y=&quot;170&quot; as=&quot;sourcePoint&quot; /&gt;&#10;            &lt;mxPoint x=&quot;519.5&quot; y=&quot;270&quot; as=&quot;targetPoint&quot; /&gt;&#10;          &lt;/mxGeometry&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-18&quot; value=&quot;&amp;lt;font style=&amp;quot;font-size: 16px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Dies 🪦&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;&quot; style=&quot;edgeLabel;resizable=0;html=1;;align=center;verticalAlign=middle;&quot; connectable=&quot;0&quot; vertex=&quot;1&quot; parent=&quot;XzCmzyegnEFURFCZ5URi-17&quot;&gt;&#10;          &lt;mxGeometry relative=&quot;1&quot; as=&quot;geometry&quot; /&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-22&quot; value=&quot;&amp;lt;font style=&amp;quot;font-size: 15px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Finds out Hereafter does not exists&amp;lt;br&amp;gt;❌&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;&quot; style=&quot;rounded=1;whiteSpace=wrap;html=1;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&#10;          &lt;mxGeometry x=&quot;341.88&quot; y=&quot;320&quot; width=&quot;150&quot; height=&quot;70&quot; as=&quot;geometry&quot; /&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-30&quot; value=&quot;&quot; style=&quot;strokeWidth=2;html=1;shape=mxgraph.flowchart.annotation_2;align=left;labelPosition=right;pointerEvents=1;direction=south;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&#10;          &lt;mxGeometry x=&quot;240&quot; y=&quot;250&quot; width=&quot;140&quot; height=&quot;70&quot; as=&quot;geometry&quot; /&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-36&quot; value=&quot;&quot; style=&quot;strokeWidth=2;html=1;shape=mxgraph.flowchart.annotation_2;align=left;labelPosition=right;pointerEvents=1;direction=south;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&#10;          &lt;mxGeometry x=&quot;450&quot; y=&quot;250&quot; width=&quot;140&quot; height=&quot;70&quot; as=&quot;geometry&quot; /&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-37&quot; value=&quot;&amp;lt;div style=&amp;quot;&amp;quot;&amp;gt;&amp;lt;b style=&amp;quot;font-size: 14px; background-color: initial;&amp;quot;&amp;gt;&amp;lt;i&amp;gt;Both are Equal&amp;lt;/i&amp;gt;&amp;lt;/b&amp;gt;&amp;lt;/div&amp;gt;&amp;lt;font style=&amp;quot;&amp;quot;&amp;gt;&amp;lt;div style=&amp;quot;&amp;quot;&amp;gt;&amp;lt;span style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;&amp;lt;i&amp;gt;&amp;lt;br&amp;gt;&amp;lt;/i&amp;gt;&amp;lt;/b&amp;gt;&amp;lt;/span&amp;gt;&amp;lt;/div&amp;gt;&amp;lt;b style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;div style=&amp;quot;&amp;quot;&amp;gt;&amp;lt;b style=&amp;quot;background-color: initial;&amp;quot;&amp;gt;&amp;lt;i&amp;gt;🟡Muslim : 0&amp;lt;/i&amp;gt;&amp;lt;/b&amp;gt;&amp;lt;/div&amp;gt;&amp;lt;i&amp;gt;&amp;lt;div style=&amp;quot;&amp;quot;&amp;gt;&amp;lt;b style=&amp;quot;background-color: initial;&amp;quot;&amp;gt;&amp;lt;i&amp;gt;🟡Non-Muslim:0&amp;lt;/i&amp;gt;&amp;lt;/b&amp;gt;&amp;lt;/div&amp;gt;&amp;lt;/i&amp;gt;&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;&quot; style=&quot;text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&#10;          &lt;mxGeometry x=&quot;332.94&quot; y=&quot;390&quot; width=&quot;167.88&quot; height=&quot;80&quot; as=&quot;geometry&quot; /&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-38&quot; value=&quot;&amp;lt;font style=&amp;quot;font-size: 15px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Finds Hereafter exists&amp;lt;br&amp;gt;😁&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;&quot; style=&quot;rounded=1;whiteSpace=wrap;html=1;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&#10;          &lt;mxGeometry x=&quot;170&quot; y=&quot;320&quot; width=&quot;150&quot; height=&quot;70&quot; as=&quot;geometry&quot; /&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-39&quot; value=&quot;&amp;lt;font style=&amp;quot;font-size: 15px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;Finds Hereafter&amp;amp;nbsp; exists&amp;lt;br&amp;gt;😨&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;&quot; style=&quot;rounded=1;whiteSpace=wrap;html=1;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&#10;          &lt;mxGeometry x=&quot;527.88&quot; y=&quot;320&quot; width=&quot;150&quot; height=&quot;70&quot; as=&quot;geometry&quot; /&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-41&quot; value=&quot;&amp;lt;b&amp;gt;&amp;lt;font style=&amp;quot;&amp;quot;&amp;gt;&amp;lt;i style=&amp;quot;&amp;quot;&amp;gt;&amp;lt;font style=&amp;quot;font-size: 11px;&amp;quot;&amp;gt;&amp;lt;u&amp;gt;Advantageous&amp;lt;/u&amp;gt;&amp;lt;/font&amp;gt;&amp;lt;br&amp;gt;&amp;lt;span style=&amp;quot;font-size: 17px;&amp;quot;&amp;gt;🟢Muslim : 100&amp;lt;/span&amp;gt;&amp;lt;br&amp;gt;&amp;lt;br&amp;gt;&amp;lt;/i&amp;gt;&amp;lt;/font&amp;gt;&amp;lt;/b&amp;gt;&quot; style=&quot;text;html=1;align=center;verticalAlign=middle;resizable=0;points=[];autosize=1;strokeColor=none;fillColor=none;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&#10;          &lt;mxGeometry x=&quot;170&quot; y=&quot;390&quot; width=&quot;150&quot; height=&quot;60&quot; as=&quot;geometry&quot; /&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-42&quot; value=&quot;&amp;lt;b style=&amp;quot;text-wrap-mode: nowrap;&amp;quot;&amp;gt;&amp;lt;font style=&amp;quot;&amp;quot;&amp;gt;&amp;lt;i style=&amp;quot;&amp;quot;&amp;gt;&amp;lt;font style=&amp;quot;font-size: 13px;&amp;quot;&amp;gt;&amp;lt;u&amp;gt;Disadvantageous&amp;lt;/u&amp;gt;&amp;lt;/font&amp;gt;&amp;lt;br&amp;gt;&amp;lt;span style=&amp;quot;font-size: 17px;&amp;quot;&amp;gt;🔴Non-Muslim: -100&amp;lt;/span&amp;gt;&amp;lt;/i&amp;gt;&amp;lt;/font&amp;gt;&amp;lt;/b&amp;gt;&quot; style=&quot;text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&#10;          &lt;mxGeometry x=&quot;520&quot; y=&quot;400&quot; width=&quot;180&quot; height=&quot;30&quot; as=&quot;geometry&quot; /&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-49&quot; value=&quot;&amp;lt;h1 style=&amp;quot;margin-top: 0px;&amp;quot;&amp;gt;&amp;lt;font style=&amp;quot;font-size: 21px;&amp;quot;&amp;gt;Total Score🟰&amp;lt;/font&amp;gt;&amp;lt;/h1&amp;gt;&amp;lt;p&amp;gt;&amp;lt;/p&amp;gt;&amp;lt;div style=&amp;quot;&amp;quot;&amp;gt;&amp;lt;b style=&amp;quot;background-color: initial;&amp;quot;&amp;gt;&amp;lt;i style=&amp;quot;&amp;quot;&amp;gt;&amp;lt;span style=&amp;quot;font-size: 13px;&amp;quot;&amp;gt;Muslim : 100+0= &amp;lt;/span&amp;gt;&amp;lt;font style=&amp;quot;font-size: 17px;&amp;quot;&amp;gt;100&amp;lt;/font&amp;gt;&amp;lt;span style=&amp;quot;font-size: 13px;&amp;quot;&amp;gt; (✅)&amp;lt;/span&amp;gt;&amp;lt;/i&amp;gt;&amp;lt;/b&amp;gt;&amp;lt;/div&amp;gt;&amp;lt;font style=&amp;quot;&amp;quot;&amp;gt;&amp;lt;div style=&amp;quot;&amp;quot;&amp;gt;&amp;lt;b style=&amp;quot;background-color: initial;&amp;quot;&amp;gt;&amp;lt;i style=&amp;quot;&amp;quot;&amp;gt;&amp;lt;span style=&amp;quot;font-size: 13px;&amp;quot;&amp;gt;Athiest : 0 - 100 = &amp;lt;/span&amp;gt;&amp;lt;font style=&amp;quot;font-size: 17px;&amp;quot;&amp;gt;-100&amp;lt;/font&amp;gt;&amp;lt;span style=&amp;quot;font-size: 13px;&amp;quot;&amp;gt; (❌)&amp;lt;/span&amp;gt;&amp;lt;/i&amp;gt;&amp;lt;/b&amp;gt;&amp;lt;/div&amp;gt;&amp;lt;/font&amp;gt;&amp;lt;p&amp;gt;&amp;lt;/p&amp;gt;&quot; style=&quot;text;html=1;whiteSpace=wrap;overflow=hidden;rounded=0;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&#10;          &lt;mxGeometry x=&quot;341.88&quot; y=&quot;510&quot; width=&quot;180&quot; height=&quot;120&quot; as=&quot;geometry&quot; /&gt;&#10;        &lt;/mxCell&gt;&#10;        &lt;mxCell id=&quot;XzCmzyegnEFURFCZ5URi-51&quot; value=&quot;&amp;lt;div&amp;gt;&amp;lt;font style=&amp;quot;font-size: 16px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;This world is full of injustice!&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;&amp;lt;/div&amp;gt;&amp;lt;div&amp;gt;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;br&amp;gt;&amp;lt;/font&amp;gt;&amp;lt;/div&amp;gt;&amp;lt;div&amp;gt;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;i&amp;gt;What will happen to an innocent human being who was killed and the killer was never caught?&amp;lt;/i&amp;gt;&amp;lt;/font&amp;gt;&amp;lt;/div&amp;gt;&amp;lt;div&amp;gt;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;i&amp;gt;What will happen to a human being who spent his life in poverty and misery and died without getting any justice?&amp;lt;/i&amp;gt;&amp;lt;/font&amp;gt;&amp;lt;/div&amp;gt;&amp;lt;div&amp;gt;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;i&amp;gt;What will happen to a human being who spent his life in luxury and happiness and died without any accountability?&amp;lt;/i&amp;gt;&amp;lt;/font&amp;gt;&amp;lt;/div&amp;gt;&amp;lt;div&amp;gt;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;&amp;lt;br&amp;gt;&amp;lt;/font&amp;gt;&amp;lt;/div&amp;gt;&amp;lt;div&amp;gt;&amp;lt;font style=&amp;quot;font-size: 14px;&amp;quot;&amp;gt;The answer to these questions can only be found in the &amp;lt;/font&amp;gt;&amp;lt;font style=&amp;quot;font-size: 16px;&amp;quot;&amp;gt;&amp;lt;b&amp;gt;&amp;lt;i&amp;gt;concept of Hereafter.&amp;lt;/i&amp;gt;&amp;lt;/b&amp;gt;&amp;lt;/font&amp;gt;&amp;lt;/div&amp;gt;&quot; style=&quot;text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;&quot; vertex=&quot;1&quot; parent=&quot;1&quot;&gt;&#10;          &lt;mxGeometry x=&quot;55&quot; y=&quot;-90&quot; width=&quot;740&quot; height=&quot;40&quot; as=&quot;geometry&quot; /&gt;&#10;        &lt;/mxCell&gt;&#10;      &lt;/root&gt;&#10;    &lt;/mxGraphModel&gt;&#10;  &lt;/diagram&gt;&#10;&lt;/mxfile&gt;&#10;">
      <defs />
      <g>
        <g data-cell-id="0">
          <g data-cell-id="1">
            <g data-cell-id="XzCmzyegnEFURFCZ5URi-3">
              <g>
                <rect x="334.38" y="111" width="55" height="218.75" fill="none" stroke="none" transform="rotate(90,361.88,220.37)" pointer-events="all" />
                <path d="M 389.38 111 L 361.88 111 L 361.88 329.75 L 389.38 329.75" fill="none" stroke="rgb(0, 0, 0)" stroke-width="2" stroke-miterlimit="10" transform="rotate(90,361.88,220.37)" pointer-events="all" />
                <path d="M 334.38 220.37 L 361.88 220.37" fill="none" stroke="rgb(0, 0, 0)" stroke-width="2" stroke-miterlimit="10" transform="rotate(90,361.88,220.37)" pointer-events="all" />
              </g>
            </g>
            <g data-cell-id="XzCmzyegnEFURFCZ5URi-4">
              <g>
                <rect x="195" y="241" width="120" height="60" rx="9" ry="9" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all" />
              </g>
              <g>
                <g transform="translate(-0.5 -0.5)">
                  <switch>
                    <foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;">
                      <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 271px; margin-left: 196px;">
                        <div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;">
                          <div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; white-space: normal; overflow-wrap: normal;">
                            <font >
                              <span style="font-weight: bold; font-size: 15px;">Muslim </span>
                              <br />
                              <font >
                                <i>[Submits his will to God]</i>
                              </font>
                            </font>
                          </div>
                        </div>
                      </div>
                    </foreignObject>
                    <text x="255" y="275" fill="rgb(0, 0, 0)" font-family="&quot;Helvetica&quot;" font-size="12px" text-anchor="middle">Muslim...</text>
                  </switch>
                </g>
              </g>
            </g>
            <g data-cell-id="XzCmzyegnEFURFCZ5URi-6">
              <g>
                <rect x="301.88" y="131" width="120" height="60" rx="9" ry="9" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all" />
              </g>
              <g>
                <g transform="translate(-0.5 -0.5)">
                  <switch>
                    <foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;">
                      <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 161px; margin-left: 303px;">
                        <div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;">
                          <div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; white-space: normal; overflow-wrap: normal;">
                            <b>
                              <font style="font-size: 15px;">Human Being <br />🤵 </font>
                            </b>
                          </div>
                        </div>
                      </div>
                    </foreignObject>
                    <text x="362" y="165" fill="rgb(0, 0, 0)" font-family="&quot;Helvetica&quot;" font-size="12px" text-anchor="middle">Human Being...</text>
                  </switch>
                </g>
              </g>
            </g>
            <g data-cell-id="XzCmzyegnEFURFCZ5URi-8">
              <g>
                <rect x="405" y="241" width="120" height="60" rx="9" ry="9" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all" />
              </g>
              <g>
                <g transform="translate(-0.5 -0.5)">
                  <switch>
                    <foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;">
                      <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 118px; height: 1px; padding-top: 271px; margin-left: 406px;">
                        <div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;">
                          <div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; white-space: normal; overflow-wrap: normal;">
                            <font >
                              <span style="font-weight: bold; font-size: 15px;">Athiest</span>
                              <br />
                              <font style="font-size: 13px;">
                                <i >/Non-Muslim</i>
                              </font>
                            </font>
                          </div>
                        </div>
                      </div>
                    </foreignObject>
                    <text x="465" y="275" fill="rgb(0, 0, 0)" font-family="&quot;Helvetica&quot;" font-size="12px" text-anchor="middle">Athiest...</text>
                  </switch>
                </g>
              </g>
            </g>
            <g data-cell-id="XzCmzyegnEFURFCZ5URi-11">
              <g>
                <rect x="115" y="241" width="60" height="60" fill="none" stroke="none" pointer-events="all" />
              </g>
              <g>
                <g transform="translate(-0.5 -0.5)">
                  <switch>
                    <foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;">
                      <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 58px; height: 1px; padding-top: 271px; margin-left: 116px;">
                        <div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;">
                          <div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; white-space: normal; overflow-wrap: normal;">
                            <b>Believes in Hereafter <br />✅ </b>
                          </div>
                        </div>
                      </div>
                    </foreignObject>
                    <text x="145" y="275" fill="rgb(0, 0, 0)" font-family="&quot;Helvetica&quot;" font-size="12px" text-anchor="middle">Believes i...</text>
                  </switch>
                </g>
              </g>
            </g>
            <g data-cell-id="XzCmzyegnEFURFCZ5URi-12">
              <g>
                <rect x="535" y="231" width="110" height="90" fill="none" stroke="none" pointer-events="all" />
              </g>
              <g>
                <g transform="translate(-0.5 -0.5)">
                  <switch>
                    <foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;">
                      <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 108px; height: 1px; padding-top: 276px; margin-left: 536px;">
                        <div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;">
                          <div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; white-space: normal; overflow-wrap: normal;">
                            <b>Does not believe in Hereafter <br />❌ </b>
                          </div>
                        </div>
                      </div>
                    </foreignObject>
                    <text x="590" y="280" fill="rgb(0, 0, 0)" font-family="&quot;Helvetica&quot;" font-size="12px" text-anchor="middle">Does not believe i...</text>
                  </switch>
                </g>
              </g>
            </g>
            <g data-cell-id="XzCmzyegnEFURFCZ5URi-14">
              <g>
                <path d="M 254.88 301 L 254.52 394.63" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke" />
                <path d="M 254.5 399.88 L 251.03 392.87 L 254.52 394.63 L 258.03 392.9 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all" />
              </g>
              <g data-cell-id="XzCmzyegnEFURFCZ5URi-15">
                <g>
                  <g transform="translate(-0.5 -0.5)">
                    <switch>
                      <foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;">
                        <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 352px; margin-left: 255px;">
                          <div data-drawio-colors="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); " style="box-sizing: border-box; font-size: 0px; text-align: center;">
                            <div style="display: inline-block; font-size: 11px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; background-color: rgb(255, 255, 255); white-space: nowrap;">
                              <font style="font-size: 16px;">
                                <b>Dies 🪦</b>
                              </font>
                            </div>
                          </div>
                        </div>
                      </foreignObject>
                      <text x="255" y="355" fill="rgb(0, 0, 0)" font-family="&quot;Helvetica&quot;" font-size="11px" text-anchor="middle">Dies 🪦</text>
                    </switch>
                  </g>
                </g>
              </g>
            </g>
            <g data-cell-id="XzCmzyegnEFURFCZ5URi-17">
              <g>
                <path d="M 464.88 301 L 464.52 394.63" fill="none" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="stroke" />
                <path d="M 464.5 399.88 L 461.03 392.87 L 464.52 394.63 L 468.03 392.9 Z" fill="rgb(0, 0, 0)" stroke="rgb(0, 0, 0)" stroke-miterlimit="10" pointer-events="all" />
              </g>
              <g data-cell-id="XzCmzyegnEFURFCZ5URi-18">
                <g>
                  <g transform="translate(-0.5 -0.5)">
                    <switch>
                      <foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;">
                        <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 352px; margin-left: 465px;">
                          <div data-drawio-colors="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); " style="box-sizing: border-box; font-size: 0px; text-align: center;">
                            <div style="display: inline-block; font-size: 11px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; background-color: rgb(255, 255, 255); white-space: nowrap;">
                              <font style="font-size: 16px;">
                                <b>Dies 🪦</b>
                              </font>
                            </div>
                          </div>
                        </div>
                      </foreignObject>
                      <text x="465" y="355" fill="rgb(0, 0, 0)" font-family="&quot;Helvetica&quot;" font-size="11px" text-anchor="middle">Dies 🪦</text>
                    </switch>
                  </g>
                </g>
              </g>
            </g>
            <g data-cell-id="XzCmzyegnEFURFCZ5URi-22">
              <g>
                <rect x="286.88" y="451" width="150" height="70" rx="10.5" ry="10.5" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all" />
              </g>
              <g>
                <g transform="translate(-0.5 -0.5)">
                  <switch>
                    <foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;">
                      <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 148px; height: 1px; padding-top: 486px; margin-left: 288px;">
                        <div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;">
                          <div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; white-space: normal; overflow-wrap: normal;">
                            <font style="font-size: 15px;">
                              <b>Finds out Hereafter does not exists <br />❌ </b>
                            </font>
                          </div>
                        </div>
                      </div>
                    </foreignObject>
                    <text x="362" y="490" fill="rgb(0, 0, 0)" font-family="&quot;Helvetica&quot;" font-size="12px" text-anchor="middle">Finds out Hereafter does...</text>
                  </switch>
                </g>
              </g>
            </g>
            <g data-cell-id="XzCmzyegnEFURFCZ5URi-30">
              <g>
                <rect x="185" y="381" width="140" height="70" fill="none" stroke="none" transform="rotate(90,255,416)" pointer-events="all" />
                <path d="M 290 346 L 255 346 L 255 486 L 290 486" fill="none" stroke="rgb(0, 0, 0)" stroke-width="2" stroke-miterlimit="10" transform="rotate(90,255,416)" pointer-events="all" />
                <path d="M 220 416 L 255 416" fill="none" stroke="rgb(0, 0, 0)" stroke-width="2" stroke-miterlimit="10" transform="rotate(90,255,416)" pointer-events="all" />
              </g>
            </g>
            <g data-cell-id="XzCmzyegnEFURFCZ5URi-36">
              <g>
                <rect x="395" y="381" width="140" height="70" fill="none" stroke="none" transform="rotate(90,465,416)" pointer-events="all" />
                <path d="M 500 346 L 465 346 L 465 486 L 500 486" fill="none" stroke="rgb(0, 0, 0)" stroke-width="2" stroke-miterlimit="10" transform="rotate(90,465,416)" pointer-events="all" />
                <path d="M 430 416 L 465 416" fill="none" stroke="rgb(0, 0, 0)" stroke-width="2" stroke-miterlimit="10" transform="rotate(90,465,416)" pointer-events="all" />
              </g>
            </g>
            <g data-cell-id="XzCmzyegnEFURFCZ5URi-37">
              <g>
                <rect x="277.94" y="521" width="167.88" height="80" fill="none" stroke="none" pointer-events="all" />
              </g>
              <g>
                <g transform="translate(-0.5 -0.5)">
                  <switch>
                    <foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;">
                      <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 166px; height: 1px; padding-top: 561px; margin-left: 279px;">
                        <div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;">
                          <div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; white-space: normal; overflow-wrap: normal;">
                            <div >
                              <b style="font-size: 14px; background-color: initial;">
                                <i>Both are Equal</i>
                              </b>
                            </div>
                            <font >
                              <div >
                                <span style="font-size: 14px;">
                                  <b>
                                    <i>
                                      <br />
                                    </i>
                                  </b>
                                </span>
                              </div>
                              <b style="font-size: 14px;">
                                <div >
                                  <b style="background-color: initial;">
                                    <i>🟡Muslim : 0</i>
                                  </b>
                                </div>
                                <i>
                                  <div >
                                    <b style="background-color: initial;">
                                      <i>🟡Non-Muslim:0</i>
                                    </b>
                                  </div>
                                </i>
                              </b>
                            </font>
                          </div>
                        </div>
                      </div>
                    </foreignObject>
                    <text x="362" y="565" fill="rgb(0, 0, 0)" font-family="&quot;Helvetica&quot;" font-size="12px" text-anchor="middle">Both are Equal🟡Muslim : 0🟡Non-...</text>
                  </switch>
                </g>
              </g>
            </g>
            <g data-cell-id="XzCmzyegnEFURFCZ5URi-38">
              <g>
                <rect x="115" y="451" width="150" height="70" rx="10.5" ry="10.5" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all" />
              </g>
              <g>
                <g transform="translate(-0.5 -0.5)">
                  <switch>
                    <foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;">
                      <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 148px; height: 1px; padding-top: 486px; margin-left: 116px;">
                        <div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;">
                          <div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; white-space: normal; overflow-wrap: normal;">
                            <font style="font-size: 15px;">
                              <b>Finds Hereafter exists <br />😁 </b>
                            </font>
                          </div>
                        </div>
                      </div>
                    </foreignObject>
                    <text x="190" y="490" fill="rgb(0, 0, 0)" font-family="&quot;Helvetica&quot;" font-size="12px" text-anchor="middle">Finds Hereafter exists...</text>
                  </switch>
                </g>
              </g>
            </g>
            <g data-cell-id="XzCmzyegnEFURFCZ5URi-39">
              <g>
                <rect x="472.88" y="451" width="150" height="70" rx="10.5" ry="10.5" fill="rgb(255, 255, 255)" stroke="rgb(0, 0, 0)" pointer-events="all" />
              </g>
              <g>
                <g transform="translate(-0.5 -0.5)">
                  <switch>
                    <foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;">
                      <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 148px; height: 1px; padding-top: 486px; margin-left: 474px;">
                        <div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;">
                          <div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; white-space: normal; overflow-wrap: normal;">
                            <font style="font-size: 15px;">
                              <b>Finds Hereafter  exists <br />😨 </b>
                            </font>
                          </div>
                        </div>
                      </div>
                    </foreignObject>
                    <text x="548" y="490" fill="rgb(0, 0, 0)" font-family="&quot;Helvetica&quot;" font-size="12px" text-anchor="middle">Finds Hereafter  exists...</text>
                  </switch>
                </g>
              </g>
            </g>
            <g data-cell-id="XzCmzyegnEFURFCZ5URi-41">
              <g>
                <rect x="115" y="521" width="150" height="60" fill="none" stroke="none" pointer-events="all" />
              </g>
              <g>
                <g transform="translate(-0.5 -0.5)">
                  <switch>
                    <foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;">
                      <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 1px; height: 1px; padding-top: 551px; margin-left: 190px;">
                        <div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;">
                          <div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; white-space: nowrap;">
                            <b>
                              <font >
                                <i >
                                  <font style="font-size: 11px;">
                                    <u>Advantageous</u>
                                  </font>
                                  <br />
                                  <span style="font-size: 17px;">🟢Muslim : 100</span>
                                  <br />
                                  <br />
                                </i>
                              </font>
                            </b>
                          </div>
                        </div>
                      </div>
                    </foreignObject>
                    <text x="190" y="555" fill="rgb(0, 0, 0)" font-family="&quot;Helvetica&quot;" font-size="12px" text-anchor="middle">Advantageous...</text>
                  </switch>
                </g>
              </g>
            </g>
            <g data-cell-id="XzCmzyegnEFURFCZ5URi-42">
              <g>
                <rect x="465" y="531" width="180" height="30" fill="none" stroke="none" pointer-events="all" />
              </g>
              <g>
                <g transform="translate(-0.5 -0.5)">
                  <switch>
                    <foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;">
                      <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 178px; height: 1px; padding-top: 546px; margin-left: 466px;">
                        <div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;">
                          <div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; white-space: normal; overflow-wrap: normal;">
                            <b style="text-wrap-mode: nowrap;">
                              <font >
                                <i >
                                  <font style="font-size: 13px;">
                                    <u>Disadvantageous</u>
                                  </font>
                                  <br />
                                  <span style="font-size: 17px;">🔴Non-Muslim: -100</span>
                                </i>
                              </font>
                            </b>
                          </div>
                        </div>
                      </div>
                    </foreignObject>
                    <text x="555" y="550" fill="rgb(0, 0, 0)" font-family="&quot;Helvetica&quot;" font-size="12px" text-anchor="middle">Disadvantageous...</text>
                  </switch>
                </g>
              </g>
            </g>
            <g data-cell-id="XzCmzyegnEFURFCZ5URi-49">
              <g>
                <rect x="286.88" y="641" width="180" height="120" fill="none" stroke="none" pointer-events="all" />
              </g>
              <g>
                <g transform="translate(-0.5 -0.5)">
                  <switch>
                    <foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;">
                      <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe flex-start; justify-content: unsafe flex-start; width: 178px; height: 1px; padding-top: 648px; margin-left: 289px;">
                        <div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: left; max-height: 116px; overflow: hidden;">
                          <div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; white-space: normal; overflow-wrap: normal;">
                            <h1 style="margin-top: 0px;">
                              <font style="font-size: 21px;">Total Score🟰</font>
                            </h1>
                            <p></p>
                            <div >
                              <b style="background-color: initial;">
                                <i >
                                  <span style="font-size: 13px;">Muslim : 100+0= </span>
                                  <font style="font-size: 17px;">100</font>
                                  <span style="font-size: 13px;"> (✅)</span>
                                </i>
                              </b>
                            </div>
                            <font >
                              <div >
                                <b style="background-color: initial;">
                                  <i >
                                    <span style="font-size: 13px;">Athiest : 0 - 100 = </span>
                                    <font style="font-size: 17px;">-100</font>
                                    <span style="font-size: 13px;"> (❌)</span>
                                  </i>
                                </b>
                              </div>
                            </font>
                            <p></p>
                          </div>
                        </div>
                      </div>
                    </foreignObject>
                    <text x="289" y="660" fill="rgb(0, 0, 0)" font-family="&quot;Helvetica&quot;" font-size="12px">Total Score🟰...</text>
                  </switch>
                </g>
              </g>
            </g>
            <g data-cell-id="XzCmzyegnEFURFCZ5URi-51">
              <g>
                <rect x="0" y="41" width="740" height="40" fill="none" stroke="none" pointer-events="all" />
              </g>
              <g>
                <g transform="translate(-0.5 -0.5)">
                  <switch>
                    <foreignObject pointer-events="none" width="100%" height="100%" requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" style="overflow: visible; text-align: left;">
                      <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: unsafe center; justify-content: unsafe center; width: 738px; height: 1px; padding-top: 61px; margin-left: 1px;">
                        <div data-drawio-colors="color: rgb(0, 0, 0); " style="box-sizing: border-box; font-size: 0px; text-align: center;">
                          <div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; pointer-events: all; white-space: normal; overflow-wrap: normal;">
                            <div>
                              <font style="font-size: 16px;">
                                <b>This world is full of injustice!</b>
                              </font>
                            </div>
                            <div>
                              <font style="font-size: 14px;">
                                <br />
                              </font>
                            </div>
                            <div>
                              <font style="font-size: 14px;">
                                <i>What will happen to an innocent human being who was killed and the killer was never caught?</i>
                              </font>
                            </div>
                            <div>
                              <font style="font-size: 14px;">
                                <i>What will happen to a human being who spent his life in poverty and misery and died without getting any justice?</i>
                              </font>
                            </div>
                            <div>
                              <font style="font-size: 14px;">
                                <i>What will happen to a human being who spent his life in luxury and happiness and died without any accountability?</i>
                              </font>
                            </div>
                            <div>
                              <font style="font-size: 14px;">
                                <br />
                              </font>
                            </div>
                            <div>
                              <font style="font-size: 14px;">The answer to these questions can only be found in the </font>
                              <font style="font-size: 16px;">
                                <b>
                                  <i>concept of Hereafter.</i>
                                </b>
                              </font>
                            </div>
                          </div>
                        </div>
                      </div>
                    </foreignObject>
                    <text x="370" y="65" fill="rgb(0, 0, 0)" font-family="&quot;Helvetica&quot;" font-size="12px" text-anchor="middle">This world is full of injustice!...</text>
                  </switch>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
      <switch>
        <g requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" />
        <a transform="translate(0,-5)" xlink:href="https://www.drawio.com/doc/faq/svg-export-text-problems" target="_blank">
          <text text-anchor="middle" font-size="10px" x="50%" y="100%">Text is not SVG - cannot display</text>
        </a>
      </switch>
    </svg>
        
            <style>
                #responsive-svg-container {
                    background-color: #ffffff; color:black; font-family: Georgia, 'Times New Roman', Times, serif; font-style: italic; border: 5px solid rgb(46, 236, 198); border-radius: 45px;
            text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.25);
            margin: 0;
              
                
                max-width: fit-content; /* Limit container width */
                height: fit-content; /* Let height adjust to content */
                display: flex; /* Flexbox for alignment */
                justify-content: center; /* Center horizontally */
                align-items: center; /* Center vertically */
                margin: 0 auto; /* Center the container itself on the page */
          
            }

            /* Make SVG responsive */
            svg {
                width: 100%;
                height: auto; /* Maintain aspect ratio */
            }
        
                /* For screens smaller than 1200px */
                @media (max-width: 1200px) {
                    #responsive-svg-container {
                        max-width: 80%; /* Adjust for medium screens */
                    }
                }
        
                /* For screens smaller than 768px (tablets) */
                @media (max-width: 768px) {
                    #responsive-svg-container {
                        max-width: 90%; /* Adjust for smaller screens */
                    }
                }
        
                /* For screens smaller than 480px (mobile devices) */
                @media (max-width: 480px) {
                    #responsive-svg-container {
                        max-width: 100%; /* Full width for extra-small screens */
                    }
                }
            </style>
          </div>`}
        else if(payload==="Quran science"){
          const dynamicContent = document.getElementById('dynamicContent');
          dynamicContent.style.display = "block";
          dynamicContent.innerHTML = `Estimated reading time: 5 minutes`;
          videoContainer.innerHTML=`
          <div class="flex-container ">
        <div class="flex-card pop-out pop-up-animate1">
            <h2 class="flex-header"><span style="text-decoration: none !important; display: inline-block;">🧬&nbsp;</span> Origin of Life <span style="text-decoration: none !important; display: inline-block;">&nbsp;🧬</span> </h2>
            <p class="flex-text">The mystery of life’s origin has fascinated scientists and philosophers for centuries. The precise conditions that led to life on Earth remain a subject of deep study. Every cell, every molecule, and the delicate balance required for existence point to an intricate design. Life did not emerge by chance, but through a precise order set in motion.</p>
            <p class="flex-text">The Quran highlights this divine process:</p>
            <p class="flex-text"><i><b>“And We made from water every living thing. Then will they not believe?”</b></i></p>
            <p class="flex-text"><b>(Quran 21:30)</b> <br> [Al-Anbiya - The Prophets]</p>
            <p class="flex-text">Modern science confirms that water is essential for life, forming the basis of all biological systems. This reflection urges us to appreciate the divine precision in creation.</p>
        </div>

        <div class="flex-card pop-out pop-up-animate1">
            <h2 class="flex-header"><span style="text-decoration: none !important; display: inline-block;">🪨&nbsp;&nbsp;</span>Iron: A Gift from the Heavens <span style="text-decoration: none !important; display: inline-block;">&nbsp;&nbsp;🪨</span></h2>
            <p class="flex-text">Iron, an element fundamental to human civilization, has properties that make it indispensable in construction, tools, and even within our own blood. However, what makes iron truly fascinating is its celestial origin—formed in the heart of massive stars and delivered to Earth through meteorites.</p>
            <p class="flex-text">The Quran describes this unique phenomenon:</p>verse<h2 class="flex-header">
            <p class="flex-text"><i><b>“And We sent down iron, wherein is great military might and benefits for the people.”</b></i></p>
            <p class="flex-text"><b>(Quran 57:25)</b> <br> [Al-Hadid - The Iron]</p>
            <p class="flex-text">Science today affirms that iron was not formed on Earth but arrived from space, aligning with this profound revelation.</p>
        </div>

        <div class="flex-card pop-out pop-up-animate1">
            <h2 class="flex-header"><span style="text-decoration: none !important; display: inline-block;">🌠&nbsp; </span>Sky’s Protection<span style="text-decoration: none !important; display: inline-block;">&nbsp;🌠 </span> </h2>
            <p class="flex-text">Our planet is shielded by an atmosphere that blocks harmful radiation, maintains climate balance, and protects us from meteor impacts. Without this protective layer, life as we know it would be impossible.</p>
            <p class="flex-text">The Quran acknowledges this divine protection:</p>
            <p class="flex-text"><i><b>“And We made the sky a protected ceiling, but they turn away from its signs.”</b></i></p>
            <p class="flex-text"><b>(Quran 21:32)</b> <br> [Al-Anbiya - The Prophets]</p>
            <p class="flex-text">This verse encourages us to recognize the blessings of our environment and to safeguard it for future generations.</p>
        </div>
        <div class="flex-card pop-out pop-up-animate1">
        <h2 class="flex-header"><span style="text-decoration: none !important; display: inline-block;">🧠&nbsp; </span> Lying and Movement <span style="text-decoration: none !important; display: inline-block;">&nbsp;🧠 </span></h2>
        <p class="flex-text">The Quran makes a remarkable statement about the connection between lying and movement, long before neuroscience uncovered the role of the prefrontal cortex in decision-making and deception.</p>
        <p class="flex-text">The Quran describes this in the following verse:</p>
        <p class="flex-text"><i><b>“No! If he does not desist, We will surely drag him by the forelock – A lying, sinning forelock.”</b></i></p>
        <p class="flex-text"><b>(Quran 96:15-16)</b> <br> [Al-'Alaq - The Clot]</p>
        <p class="flex-text">Modern studies reveal that the prefrontal region of the brain, precisely where the forelock is located, is responsible for planning, decision-making, and moral judgment, aligning with the Quranic description.</p>
        </div>

        <div class="flex-card pop-out pop-up-animate1">
            <h2 class="flex-header"><span style="text-decoration: none !important; display: inline-block;">🗻&nbsp; </span>Mountains: The Earth's Stabilizers <span style="text-decoration: none !important; display: inline-block;">&nbsp;🗻 </span></h2>
            <p class="flex-text">Mountains are not just towering structures; they play a crucial role in stabilizing the Earth's crust. They act as pegs, preventing large-scale shifts in tectonic plates, ensuring balance on our planet.</p>
            <p class="flex-text">The Quran mentions this role:</p>
            <p class="flex-text"><i><b>“Have We not made the earth as a resting place? And the mountains as stakes?”</b></i></p>
            <p class="flex-text"><b>(Quran 78:6-7)</b> <br> [An-Naba - The Tidings]</p>
            <p class="flex-text">Modern geology has confirmed that mountains have deep roots that help stabilize the Earth’s crust, a fact stated in the Quran centuries ago.</p>
        </div>

        
        <div class="flex-card pop-out pop-up-animate1">
            <h2 class="flex-header"><span style="text-decoration: none !important; display: inline-block;">🌌&nbsp; </span>Expanding Universe <span style="text-decoration: none !important; display: inline-block;">&nbsp;🌌 </span></h2>
            <p class="flex-text">The cosmos is in constant motion, with galaxies moving away from each other in an ever-expanding universe. This discovery, credited to Edwin Hubble, revolutionized our understanding of the cosmos.</p>
            <p class="flex-text">The Quran mentioned this expansion long before modern science:</p>
            <p class="flex-text"><i><b>“And the heaven We constructed with strength, and indeed, We are [its] expander.”</b></i></p>
            <p class="flex-text"><b>(Quran 51:47)</b> <br> [Adh-Dhariyat - The Winnowing Winds]</p>
            <p class="flex-text">This realization humbles us, reminding us of our place in the grand design of creation.</p>
        </div>

    <div class="flex-card pop-out pop-up-animate1">
        <h2 class="flex-header"><span style="text-decoration: none !important; display: inline-block;">🔥&nbsp; </span>Pain Receptors <span style="text-decoration: none !important; display: inline-block;">&nbsp;🔥 </span></h2>
        <p class="flex-text">Centuries ago, it was believed that pain perception was limited to the brain. However, modern science has confirmed that pain receptors in the skin play a vital role in sensing pain.</p>
        <p class="flex-text">The Quran mentions this in a striking verse:</p>
        <p class="flex-text"><i><b>“Indeed, those who disbelieve in Our verses – We will drive them into a Fire. Every time their skins are roasted through, We will replace them with other skins so they may taste the punishment. Indeed, Allah is ever Exalted in Might and Wise.”</b></i></p>
        <p class="flex-text"><b>(Quran 4:56)</b> <br> [An-Nisa - The Women]</p>
        <p class="flex-text">This verse highlights that pain is felt through the skin, a fact confirmed by modern biology centuries later.</p>
    </div>

    <div class="flex-card pop-out pop-up-animate1">
        <h2 class="flex-header"><span style="text-decoration: none !important; display: inline-block;">🌠 &nbsp;</span> The Cosmos and Within Ourselves <span style="text-decoration: none !important; display: inline-block;">&nbsp;🌠 </span></h2>
        <p class="flex-text">The Quran invites humanity to reflect upon the vastness of the cosmos and their own existence, encouraging a journey of deep contemplation.</p>
        <p class="flex-text">The Quran beautifully expresses this:</p>
        <p class="flex-text"><i><b>“We will show them Our signs in the horizons and within themselves until it becomes clear to them that it is the truth.”</b></i></p>
        <p class="flex-text"><b>(Quran 41:53)</b> <br> [Fussilat - Explained in Detail]</p>
        <p class="flex-text">This verse calls us to explore the wonders of the universe and our own inner selves, leading to profound discoveries about existence and purpose.</p>
    </div>

    <div class="flex-card pop-out pop-up-animate1">
        <h2 class="flex-header"> <span style="text-decoration: none !important; display: inline-block;">👼</span> Embryology in the Quran  <span style="text-decoration: none !important; display: inline-block;">👼</span></h2>
        <p class="flex-text">The development of the human embryo is a subject of extensive study in modern embryology. The Quran, over 1400 years ago, described the stages of human creation with astonishing accuracy.</p>
        <p class="flex-text">The Quran states:</p>
        <p class="flex-text"><i><b>“And certainly did We create man from an extract of clay. Then We placed him as a sperm-drop in a firm lodging. Then We made the sperm-drop into a clinging clot, and We made the clot into a lump [of flesh], and We made [from] the lump, bones, and We covered the bones with flesh; then We developed him into another creation. So blessed is Allah, the best of creators.”</b></i></p>
        <p class="flex-text"><b>(Quran 23:12-14)</b> <br> [Al-Mu’minun - The Believers]</p>
        <p class="flex-text">This detailed description of embryonic development aligns with modern discoveries in anatomy and fetal growth, highlighting the profound wisdom of the Quran.</p>
    </div>

    </div>

        `
        }
        else if(payload==="Blog"){
          const dynamicContent = document.getElementById('dynamicContent');
          dynamicContent.style.display = "block";
          dynamicContent.innerHTML = `Blog`;
          videoContainer.innerHTML=`
          <div class="blog-container ">
          <div class="flex-card pop-out pop-up-animate1">
    <h2 class="flex-header">1. The Opening - Al-Fatiha</h2>
    <p class="flex-text blog-gray">
        Al-Fatiha, also known as "The Opening," is the first chapter of the Quran.<br> It holds immense significance in Islam as it is recited in every unit of the five daily prayers.<br>Considered the essence of the Quran, it serves as a supplication, a declaration of monotheism, and a guide for seeking Allah’s mercy and guidance.<br> Muslims recite it as a means of connecting with their Creator, seeking help and expressing gratitude.
    </p>
    <p class="flex-text blog-blue">
        <span style='font-size:30px;'>
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ<br>
        الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ<br>
        الرَّحْمَٰنِ الرَّحِيمِ<br>
        مَٰلِكِ يَوْمِ الدِّينِ<br>
        إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ<br>
        اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ<br>
        صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ<br>
        </span>
    </p><br>
    <span style='font-size:30px;'>▼</span><br>
    <p class="flex-text blog-violet">
       <b> <span style='font-size:23px;'>
        1. In the Name of Allah—the Most Compassionate, Most Merciful.<br>
        2. All praise is for Allah—Lord of all worlds.<br>
        3. the Most Compassionate, Most Merciful.<br>
        4. Master of the Day of Judgment.<br>
        5. You ˹alone˺ we worship and You ˹alone˺ we ask for help.<br>
        6. Guide us along the Straight Path,<br>
        7. the Path of those You have blessed—not those You are displeased with, or those who are astray<br>
        </span></b>
    </p>
    <p class="flex-text blog-gray">
        The depth and beauty of Al-Fatiha lie in its comprehensive message. It acknowledges the Lordship of Allah, expresses devotion, and seeks divine guidance. This chapter forms the core of every Muslim’s spiritual connection with Allah and is a powerful reminder of faith, dependence, and righteousness.
    </p>
</div>
<div class="flex-card pop-out pop-up-animate1">
    <h2 class="flex-header">2. The Oneness of God - Tawheed</h2>

    <p class="flex-text blog-violet">
         Tawheed, or the oneness of God, is the central and most fundamental belief in Islam.<br>
        Logical reasoning supports the oneness of God. If there were two or more gods, conflicts of will and authority would arise. <b>For instance, if one god wished to create and another wished to destroy, the universe would be in chaos. A true God must have absolute sovereignty, and if there were multiple, none would be truly supreme (failing to fulfill the criteria of god).</b>
    </p>
    <p class="flex-text blog-gray">
        This principle can be understood through everyday examples.
         <br><span style='font-size:30px;'>▼</span><br>
         A country cannot have <b>two kings</b> ruling simultaneously without resulting in confusion and instability.
         <br><span style='font-size:30px;'>▼</span><br>
          Similarly, a car cannot have <b>two drivers</b> trying to steer it in different directions at the same time—it would inevitably crash. 
          <br><span style='font-size:30px;'>▼</span><br>
          Just as unity in leadership is necessary for harmony, the oneness of God ensures order and balance in creation.
    </p>
    <br><p class="flex-text">References in Quran :</p>
    <p class="flex-text blog-blue">
       <span style='font-size:30px;'>
        لَوْ كَانَ فِيهِمَا آلِهَةٌ إِلَّا اللَّهُ لَفَسَدَتَا فَسُبْحَٰنَ اللَّهِ رَبِّ ٱلْعَرْشِ عَمَّا يَصِفُونَ<br>
        </span><br> <b>
         <span style='font-size:20px;'>
        "Had there been gods besides Allah in the heavens and the earth, both realms would have been corrupted. Exalted is Allah, Lord of the Throne, above what they describe."<br>
        [Quran 21:22]
        </span></b>
    </p>

    <p class="flex-text blog-blue">
       <span style='font-size:30px;'>
        وَمَا كَانَ مَعَهُۥ مِنْ إِلَٰهٍ إِذًۭا لَّذَهَبَ كُلُّ إِلَٰهٍۢ بِمَا خَلَقَ وَلَعَلَا بَعْضُهُمْ عَلَىٰ بَعْضٍۢ سُبْحَٰنَ ٱللَّهِ عَمَّا يَصِفُونَ<br>
        </span><br> <b>
        <span style='font-size:20px;'>
        "Nor is there any god with Him. Otherwise, each god would have taken away what he created, and some would have tried to dominate others. Glory be to Allah above what they describe."<br>
        [Quran 23:91]
        </span></b>
    </p>

    <p class="flex-text blog-gray">
        Tawheed is not just a theological doctrine but a way of life. It dictates that all worship, obedience, and reliance should be directed solely to Allah. The Quran repeatedly emphasizes His oneness and perfection, inviting humanity to reflect and acknowledge His supreme authority.
    </p>
</div>


              <div class="flex-card pop-out pop-up-animate1">
                   <h2 class="flex-header">3. Astonishing Linguistics in Quran</h2>
                    <p class="flex-text blog-blue">
                    <span style='font-size:30px;'>لَا ٱلشَّمْسُ يَنۢبَغِى لَهَآ أَن تُدْرِكَ ٱلْقَمَرَ وَلَا ٱلَّيْلُ سَابِقُ ٱلنَّهَارِ وَكُلٌّ فِى فَلَكٍ يَسْبَحُونَ (٤٠)<br></span>
                    <b>"It is not for the sun to catch up with the moon, nor does the night outrun the day. Each is travelling in an orbit of their own."<br>
                    [Quran chapter 36,verse 40]</b>
                    </p>
                   <p class="flex-text blog-gray"  >
                       This verse beautifully illustrates the precision and balance in Allah’s creation. It highlights the perfect order in the cosmos, where celestial bodies follow their designated paths without collision or disruption—each fulfilling its role in harmony.<br>
                       Also this verse demonstrates an astonishing linguistic feature: the arrangement of words mirrors the concept of celestial motion.
                    </p>
                    <p class="flex-text">
                    Below is a graphical-textual representation:
                    </p>
                    <p class="flex-text blog-violet">
                    <span style='font-size:25px;'> كُلٌّ فِي فَلَكٍ</span><br>
                    
                     <span style='font-size:30px;'>▼</span><br>
                    <span style='font-size:30px;' class="mirror">
                  ك → ل → ف → ي → ف → ل → ك
                    </span> 
                    </p>
                    <p class="flex-text">
                       <br>The words are circular in sound, mimicking the idea of rotation.<br>

                       The root فلك (falak) means "orbit" and itself has a rounded phonetic quality, symbolizing circular motion.
                  </p>
            </div>
            <div class="flex-card pop-out pop-up-animate1">
        <h2 class="flex-header">4. Ring Composition in Chapter-2 of Quran</h2>
        <p class="flex-text blog-blue">
            Chapter-2 Surah Al-Baqarah, the Quran's longest chapter, exemplifies this ring composition. Despite covering a wide array of topics, from legal injunctions to narratives of past prophets, it is meticulously organized into a symmetrical framework.
        </p>
        <p class="flex-text">▶️<a href="https://www.youtube.com/watch?v=b5Y5gMc_XZo" target="_blank">Click for video explanation on youtube [via @mercifulServant]</a></p>
        <p class="flex-text blog-gray">
            The Quran's intricate structure has long fascinated scholars and believers alike. One of its most remarkable features is the ring composition, a literary form where themes and ideas are presented in a symmetrical pattern, leading to a central concept. This structure not only enhances the aesthetic appeal of the text but also underscores its profound coherence.
        </p>
        <p class="flex-text">
            Below is a sequential (Ring) representation:
        </p><br>
        <p class="flex-text ">
            <span style='font-size:25px;text-decoration:underline;'>Structure of Surah Al-Baqarah</span><br><br>
         
            <span style='font-size:18px;' class="mirror">
                <span class="blog-violet">A. Faith vs. Unbelief (Verses 1–20)<br></span><br>
                 <span style='font-size:30px;'>▼</span><br>
                <span class="blog-blue">B. Allah’s Creation and Knowledge (Verses 21–39)<br></span><br>
                 <span style='font-size:30px;'>▼</span><br>
                <span class="blog-green">C. Deliverance of Law to the Children of Israel (Verses 40–103)<br></span><br>
                 <span style='font-size:30px;'>▼</span><br>
                <span class="blog-pink">D. Abraham's Test (Verses 104–141)<br></span><br>
                 <span style='font-size:30px;'>▼</span><br>
                <span class="blog-gray">E. Change in the direction of prayer (Verses 142–152)<br></span><br>
                 <span style='font-size:30px;'>▼</span><br>
                <span class="blog-pink">D'. Muslims Will Be Tested (Verses 153–177)<br></span><br>
                 <span style='font-size:30px;'>▼</span><br>
                <span class="blog-green">C'. Deliverance of Law to Muslims (Verses 178–253)<br></span><br>
                 <span style='font-size:30px;'>▼</span><br>
                <span class="blog-blue">B'. Allah’s Creation and Knowledge (Verses 254–284)<br></span><br>
                 <span style='font-size:30px;'>▼</span><br>
                 <span class="blog-violet">A'. Faith vs. Unbelief (Verses 285–286)</span><br>
            </span>
            <br>
            This arrangement forms a chiastic structure, emphasizing the interconnectedness of the themes discussed.
        </p>
    </div>
        </div>


          `
        }
    
    
        // Hide loading indicator
        loadingElement.style.display = "none";

    } catch (error) {
        console.error('Error loading faith content:', error);
        document.getElementById('loading').innerText = "Failed to load content.";
    }
}
const tabs = document.querySelector('.tabs');
const FADE_UP_POSITION = 600;  // Scroll down threshold to hide
const SCROLL_UP_AMOUNT = 150;  // Amount to scroll up to show tabs again

let lastScrollPosition = 0;
let scrollingUp = false;
let scrollUpAmount = 0;

document.body.addEventListener('scroll', () => {
  //if device is tab or mobile then dont show the tabs

    const currentScroll = document.body.scrollTop;
    
    // Determine scroll direction
    scrollingUp = currentScroll < lastScrollPosition;
    
    // If scrolling up, accumulate the scroll amount
    if (scrollingUp) {
        scrollUpAmount += (lastScrollPosition - currentScroll);
    } else {
        // Reset scroll up amount if scrolling down
        scrollUpAmount = 0;
    }

    // Handle fade up when scrolling down past threshold
    if (currentScroll > FADE_UP_POSITION && !scrollingUp) {
        tabs.classList.add('fade-up');
        tabs.classList.remove('fade-down');
    }
    
    // Handle fade down when scrolled up enough
    if (scrollUpAmount > SCROLL_UP_AMOUNT) {
        tabs.classList.remove('fade-up');
        tabs.classList.add('fade-down');
        scrollUpAmount = 0;  // Reset the counter
    }
    
    // Always show at the top
    if (currentScroll === 0) {
        tabs.classList.remove('fade-up');
        tabs.classList.add('fade-down');
    }

    lastScrollPosition = currentScroll;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetSelector = this.getAttribute('href');
      const targetElement = document.querySelector(targetSelector);

      if (targetElement) {
          // Scroll into view if the target element exists
          targetElement.scrollIntoView({
              behavior: 'smooth'
          });
          // console.log("scrolled scrolled !")
      } 
      else{
        // console.log("scrolled not scrolled !")
      }
  });
});
document.querySelectorAll('button[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetSelector = this.getAttribute('href');
      const targetElement = document.querySelector(targetSelector);

      if (targetElement) {
          // Scroll into view if the target element exists
          targetElement.scrollIntoView({
              behavior: 'smooth'
          });
          // console.log("scrolled scrolled !")
      } 
      else{
        // console.log("scrolled not scrolled !")
      }
  });
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
