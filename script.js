function showHistory() {
        if (document.getElementById("history").style.display === "") {
                document.getElementById("history").style.display = "block";
                document.getElementById("fa-history").classList.add('active');
                document.getElementById("history-content").classList.add('selected');

                document.getElementById("instructions").style.display = "";
                document.getElementById("fa-book-open").classList.remove('active');
                document.getElementById("howTo-content").classList.remove('selected');

                document.getElementById("calculator").style.display = "";
                document.getElementById("fa-calculator").classList.remove('active');
                document.getElementById("calculator-content").classList.remove('selected');
                
                document.getElementById("settings").style.display = "";
                document.getElementById("fa-cogs").classList.remove('active');
                document.getElementById("settings-content").classList.remove('selected');
                
        } else {
                document.getElementById("history").style.display= "";
                document.getElementById("fa-history").classList.remove('active');
                document.getElementById("history-content").classList.remove('selected');
                
        }
}

function showSettings() {
        if (document.getElementById("settings").style.display === "") {
                document.getElementById("settings").style.display = "block";
                document.getElementById("fa-cogs").classList.add('active');
                document.getElementById("settings-content").classList.add('selected');
                document.getElementById("dots").style.display = "";

                document.getElementById("instructions").style.display = "";
                document.getElementById("fa-book-open").classList.remove('active');
                document.getElementById("howTo-content").classList.remove('selected');

                document.getElementById("history").style.display = "";
                document.getElementById("fa-history").classList.remove('active');
                document.getElementById("history-content").classList.remove('selected');
                
                document.getElementById("calculator").style.display = "";
                document.getElementById("fa-calculator").classList.remove('active');
                document.getElementById("calculator-content").classList.remove('selected');
        } else {
                document.getElementById("settings").style.display= "";
                document.getElementById("fa-cogs").classList.remove('active');
                document.getElementById("settings-content").classList.remove('selected');
        }
}
function showInstructions() {
        if (document.getElementById("instructions").style.display === "") {
                document.getElementById("instructions").style.display = "block";
                document.getElementById("fa-book-open").classList.add('active');
                document.getElementById("howTo-content").classList.add('selected');

                document.getElementById("calculator").style.display = "";
                document.getElementById("fa-calculator").classList.remove('active');
                document.getElementById("calculator-content").classList.remove('selected');

                document.getElementById("history").style.display = "";
                document.getElementById("fa-history").classList.remove('active');
                document.getElementById("history-content").classList.remove('selected');
                
                document.getElementById("settings").style.display = "";
                document.getElementById("fa-cogs").classList.remove('active');
                document.getElementById("settings-content").classList.remove('selected');
        } else {
                document.getElementById("instructions").style.display= "";
                document.getElementById("fa-book-open").classList.remove('active');
                document.getElementById("howTo-content").classList.remove('selected');
        }
}

function showCalculator() {
        if (document.getElementById("calculator").style.display === "" ) {
                document.getElementById("calculator").style.display = "block";
                document.getElementById("fa-calculator").classList.add('active');
                document.getElementById("calculator-content").classList.add('selected');
                
                document.getElementById("instructions").style.display = "";
                document.getElementById("fa-book-open").classList.remove('active');
                document.getElementById("howTo-content").classList.remove('selected');

                document.getElementById("history").style.display = "";
                document.getElementById("fa-history").classList.remove('active');
                document.getElementById("history-content").classList.remove('selected');
                
                document.getElementById("settings").style.display = "";
                document.getElementById("fa-cogs").classList.remove('active');
                document.getElementById("settings-content").classList.remove('selected');
        } else {
                document.getElementById("calculator").style.display= "";
                document.getElementById("fa-calculator").classList.remove('active');
                document.getElementById("calculator-content").classList.remove('selected');
        }
}

function showAdditionalSettings() {
        if (document.getElementById("dots").style.display === "") {
                document.getElementById("dots").style.display = "block";
        } else {
                document.getElementById("dots").style.display = "";
        }
}

document.addEventListener('DOMContentLoaded', (event) => {
        let display = '';
        const displayElement = document.getElementById('calculator-display');
    
        function updateDisplay() {
            if (displayElement) {
                displayElement.textContent = display || '0';
            } else {
                console.error('Display element not found');
            }
        }
    
        function clearDisplay() {
            display = '';
            updateDisplay();
        }
    
        function deleteLast() {
            display = display.slice(0, -1);
            updateDisplay();
        }
    
        function appendNumber(number) {
            display += number;
            updateDisplay();
        }
    
        function appendOperator(operator) {
            if (display && !isOperator(display[display.length - 1])) {
                display += ` ${operator} `;
                updateDisplay();
            }
        }
    
        function isOperator(char) {
            return ['+', '-', '*', '/'].includes(char);
        }
    
        function appendDecimal() {
            const parts = display.split(' ');
            const lastPart = parts[parts.length - 1];
            if (!lastPart.includes('.')) {
                display += '.';
                updateDisplay();
            }
        }
    
        function calculateResult() {
            try {
                const sanitizedDisplay = display.replace(/[^-()\d/*+.]/g, '');
                const result = eval(sanitizedDisplay);
                display = result.toString();
                updateDisplay();
            } catch (e) {
                display = 'Error';
                updateDisplay();
            }
        }
    
        // Initialize display on page load
        updateDisplay();
    
        // Attach functions to window to make them accessible from HTML
        window.clearDisplay = clearDisplay;
        window.deleteLast = deleteLast;
        window.appendNumber = appendNumber;
        window.appendOperator = appendOperator;
        window.appendDecimal = appendDecimal;
        window.calculateResult = calculateResult;
    });

    let videoStream;

document.addEventListener('DOMContentLoaded', (event) => {
    openCamera();
});

async function openCamera() {
    const video = document.getElementById('video');
    try {
        videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = videoStream;
    } catch (error) {
        console.error('Error accessing camera: ', error);
    }
}

function captureImage() {
    const video = document.getElementById('video');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imgDataUrl = canvas.toDataURL('image/png');
    addImageToHistory(imgDataUrl);
}

function addImageToHistory(imgDataUrl) {
    const history = document.getElementById('history');
    const img = document.createElement('img');
    img.src = imgDataUrl;
    history.appendChild(img);
}