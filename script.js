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
startButton.disabled = true; // Start button disabled initially
stopButton.disabled = true; // Stop button always starts disabled

// Event listener for salary input
salaryInput.addEventListener('input', function() {
    if (salaryInput.value) {
        startButton.disabled = false; // Enable start button if input is not empty
    } else {
        startButton.disabled = true; // Disable if input is empty
    }
});

// Event listener for the Start button
startButton.addEventListener('click', function() {
    startTime = new Date();
    displayArea.style.display = 'none'; // Hide the display area
    startButton.disabled = true; // Disable the start button
    stopButton.disabled = false; // Enable the stop button
    pooingIndicator.style.display = 'inline-block'; // Show the pooing indicator
    
    pooingText.textContent = 'Pooing';
});

// Event listener for the Stop button
stopButton.addEventListener('click', function() {
    endTime = new Date();
    const elapsedTime = (endTime - startTime) / 1000; // Time in seconds
    calculateEarnings(elapsedTime);
    displayArea.style.display = 'block'; // Show the display area
    addPooAgainButton(); // Add the Poo Again? button
    stopButton.disabled = true; // Disable the stop button after use
    pooingIndicator.style.display = 'none'; // Hide the pooing indicator
    pooComplete.style.display = 'block'; // Show "Poo Complete!" text
    startButton.disabled = true; // Disable the start button
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

// Function to add the Poo Again? button
function addPooAgainButton() {
    pooAgainButton.textContent = 'Poo Again?';
    pooAgainButton.id = 'poo-again-button';
    document.body.appendChild(pooAgainButton);
    pooAgainButton.style.display = 'block';
    pooAgainButton.addEventListener('click', resetTimer);
}


// Function to reset the timer
function resetTimer() {
    displayArea.style.display = 'none';
    pooAgainButton.style.display = 'none';
    earnedAmountSpan.textContent = '£0.00';
    pooingIndicator.style.display = 'none';
    pooComplete.style.display = 'none'; // Hide "Poo Complete!" text
    startButton.disabled = false; // Enable the start button for a new session
}


// Initial setup
displayArea.style.display = 'none';
pooAgainButton.style.display = 'none';
