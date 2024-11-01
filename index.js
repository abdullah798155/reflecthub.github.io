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
        if(targetjsonFile=='faith') renderFaith();
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
function renderFaith() {

    const verseContainer = document.querySelector('.faith');

    // Clear existing content
    verseContainer.innerHTML = '';

    // Loop through the JSON data and create an h2 element for each verse

        // Create a new h2 element
        // const verseElement = document.createElement('h2');
        
        // Create an h4 element for the verse content
        const verseContent = document.createElement('h4');
        verseContent.classList.add('pop-up-animate'); // Add the verse-style class
        verseContent.innerHTML = `
<b>Entering into Islam is very simple</b><br><br>
You just need to <i>declare the faith</i>, known as the <b>Shahada</b> (<i>declaration of faith ☝️</i>).<br><br>

<div style="font-size: large; font-style: italic;">
   Take your declaration of faith (Shahada) only after you have realized what Islam truly is and you are ready to embrace it.<br>
   There is no hurry, take your time to learn about Islam and its teachings. Once you are ready, you can declare your faith by reciting the Shahada.<br>
   <h5 style="background-color:#eab8e4; display:inline">
   There is no compulsion in religion [Quran 
   <a href="https://quran.com/2?startingVerse=256" target="_blank">2:256</a>]</h5>
</div><br><br>
The Shahada in Arabic is as follows:<br><br>
<b>Arabic:</b> <span style="background-color: #d4f7d4;"><b><i>أشهد أن لا إله إلا الله وأشهد أن محمداً رسول الله</i></b></span><br><br>

<b>Say in Arabic:</b><span style="background-color: #d4f7d4;"> <b><i>Ash-hadu an la ilaha illallah, wa ash-hadu anna Muhammadur rasulullah</i></b></span><br><br>
<b>Translation:</b><span style="background-color: #ccf2ff;"> <b><i>I bear witness that there is no god but Allah, and I bear witness that Muhammad is the messenger of Allah.</i></b></span><br><br>

<div style="font-size: large; font-style: italic;">
    This declaration is the core of Islamic belief and affirms that there is no deity but Allah, and Muhammad is His messenger. By stating these words with sincere belief, a person embraces Islam and begins their journey as a Muslim.
</div>

           
        `;

        // Append the h4 element to the h2 element
        // verseElement.appendChild(verseContent);

        // Append the h2 element to the verse container
        verseContainer.appendChild(verseContent);
        verseContainer.appendChild(document.createElement('br'));
        verseContainer.appendChild(document.createElement('br'));
    
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

