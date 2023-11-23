// Elements from the HTML
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const salaryInput = document.getElementById('salary-input');
const salaryType = document.getElementById('salary-type');
const earnedAmountSpan = document.getElementById('earned-amount');
const displayArea = document.getElementById('display-area');
const pooAgainButton = document.createElement('button');
const pooingIndicator = document.getElementById('pooing-indicator');
const pooingText = document.getElementById('pooing-text');
const pooComplete = document.getElementById('poo-complete');

// Variables to track time and earnings
let startTime;
let endTime;
let earnedAmount;

// Initial setup
displayArea.style.display = 'none';
pooAgainButton.style.display = 'none';
startButton.disabled = true; 
stopButton.disabled = true; 

salaryInput.addEventListener('input', function() {
    if (salaryInput.value) {
        startButton.disabled = false; 
    } else {
        startButton.disabled = true; 
    }
});

startButton.addEventListener('click', function() {
    startTime = new Date();
    displayArea.style.display = 'none'; 
    startButton.disabled = true; 
    stopButton.disabled = false; 
    pooingIndicator.style.display = 'inline-block'; 
    
    pooingText.textContent = 'Pooing';
});

stopButton.addEventListener('click', function() {
    endTime = new Date();
    const elapsedTime = (endTime - startTime) / 1000; 
    calculateEarnings(elapsedTime);
    displayArea.style.display = 'block'; 
    addPooAgainButton(); 
    stopButton.disabled = true; 
    pooingIndicator.style.display = 'none'; 
    pooComplete.style.display = 'block'; 
    startButton.disabled = true; 
});

// Function to calculate earnings
function calculateEarnings(elapsedTimeInSeconds) {
    const salary = parseFloat(salaryInput.value);
    if (salaryType.value === 'hourly') {
        earnedAmount = salary * (elapsedTimeInSeconds / 3600); // Convert seconds to hours
    } else { // Annual salary
        const yearlyWorkingHours = 2080; // Approximation (40 hours/week * 52 weeks)
        earnedAmount = salary * (elapsedTimeInSeconds / (yearlyWorkingHours * 3600));
    }
    earnedAmountSpan.textContent = `£${earnedAmount.toFixed(2)}`;
}

function addPooAgainButton() {
    pooAgainButton.textContent = 'Poo Again?';
    pooAgainButton.id = 'poo-again-button';
    document.body.appendChild(pooAgainButton);
    pooAgainButton.style.display = 'block';
    pooAgainButton.addEventListener('click', resetTimer);
}

function resetTimer() {
    displayArea.style.display = 'none';
    pooAgainButton.style.display = 'none';
    earnedAmountSpan.textContent = '£0.00';
    pooingIndicator.style.display = 'none';
    pooComplete.style.display = 'none'; 
    startButton.disabled = false; 
}

// Initial setup
displayArea.style.display = 'none';
pooAgainButton.style.display = 'none';
