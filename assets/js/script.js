// Wait for the page to fully load before running the quiz

document.addEventListener("DOMContentLoaded", function () {
    const rulesButton = document.getElementById("rules");
    const scoresButton = document.getElementById("scores");
    const startButton = document.getElementById("start");

    // Add an event (click) to each button

    rulesButton.addEventListener("click", function () {
        alert("Rules for the Quiz!");
    });

    scoresButton.addEventListener("click", function () {
        alert("Your Scores!");
    });

    startButton.addEventListener("click", function() {
        alert("Starting the Quiz!");
    });

});


function startQuiz() {

}

function showRules() {

}

function displayQuestion() {

}

function checkAnswer() {

}

function incrementScore() {

}

function endQuiz() {

}

function resetQuiz() {

}

function toggleSound() {

}