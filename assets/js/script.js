// Wait for the page to fully load before running the quiz

    document.addEventListener("DOMContentLoaded", function () {
        
    const rulesButton = document.getElementById("rules");
    const scoresButton = document.getElementById("scores");
    const startButton = document.getElementById("start");
    const homeButton = document.getElementById("home");
    const soundOnIcon = document.getElementById("sound-on");
    const soundOffIcon = document.getElementById("sound-off");

    // Add an event (click) to each button

    rulesButton.addEventListener("click", function () {
        showRules();
    });

    scoresButton.addEventListener("click", function () {
        showScores();
    });

    startButton.addEventListener("click", function () {
        startQuiz();
    });
    homeButton.addEventListener("click", function () {
        goToHome();
    });
    soundOnIcon.addEventListener("click", function () {
        toggleSound();
    });
    soundOffIcon.addEventListener("click", function () {
        toggleSound();
    });
    
    let clickSound = new Audio("assets/sounds/button_click.wav");
    const buttons = document.querySelectorAll("#home, #rules, #score, #start");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            if (!isMuted) {
            clickSound.currentTime = 0;
            clickSound.play();
            }
        });
    });
});

// Global variables

let currentQuestionIndex = 0;
let score = 0;
let isMuted = false;

// Questions area

const quizQuestions = [{
    question: "1. What is the recommended amount of water to drink daily?",
    options: ["1 liter", "2 liters", "3 liters", "4 liters"],
    correct: "2 liters"
}, {
    question: "2. What type of exercise improves flexibility?",
    options: ["Cardio", "Strength training", "Yoga", "Sprinting"],
    correct: "Yoga"
}, {
    question: "3. Which of these is considered a healthy source of fat?",
    options: ["Butter", "Avocado", "French fries", "Ice cream"],
    correct: "Avocado"
}, {
    question: "4. How many hours of sleep is recommended for adults per night?",
    options: ["4-5 hours", "6-7 hours", "7-8 hours", "10+ hours"],
    correct: "7-8 hours"
}, {
    question: "5. Which of these is the best way to reduce stress?",
    options: ["Watching TV for hours", "Drinking sugary beverages", "Practicing mindfulness or meditation", "Avoiding exercise"],
    correct: "Practicing mindfulness or meditation"
}, {
    question: "6. What is a good source of plant-based protein?",
    options: ["Chicken", "Almonds", "White bread", "Soda"],
    correct: "Almonds"
}, {
    question: "7. Which vitamin is primarily obtained from sunlight?",
    options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"],
    correct: "Vitamin D"
}, {
    question: "8. What food is rich in probiotics and good for gut health?",
    options: ["Chocolate", "Fermented vegetables (e.g., kimchi or sauerkraut)", "Chips", "Steak"],
    correct: "Fermented vegetables (e.g., kimchi or sauerkraut)"
}, {
    question: "9. What is the main benefit of regular exercise?",
    options: ["Only weight loss", "Improved mood and mental health", "Its a waste of time", "Decreases water retention"],
    correct: "Improved mood and mental health"
}, {
    question: "10. Which activity is best for mental wellness?",
    options: ["Reading a book", "Overeating", "Skipping meals", "Staying on social media all day"],
    correct: "Reading a book"
}];

// Functions area

function toggleSound() {
    isMuted = !isMuted;

    const soundOnIcon = document.getElementById("sound-on");
    const soundOffIcon = document.getElementById("sound-off");

    if (isMuted) {
        soundOnIcon.style.display = "none";
        soundOffIcon.style.display = "flex";
    } else {
        soundOnIcon.style.display = "flex";
        soundOffIcon.style.display = "none";
    };

}

/**
 * Starting quiz when a start quiz button is clicked and rules button, scores button,
 * introduction text is hidden.
 */

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.querySelector(".introduction-text").style.display = "none";
    document.querySelector(".buttons-container").style.display = "none";
    document.querySelector(".quiz-area").style.display = "block";
    document.querySelector(".scores-box").style.display = "none";
    displayQuestion(currentQuestionIndex);
}

/** Display rules page when 
 * rules button is clicked.
 */

function showRules() {
    document.querySelector(".introduction-text").style.display = "none";
    document.querySelector(".buttons-container").style.display = "none";
    document.querySelector(".rules-box").style.display = "block";
    document.querySelector(".scores-box").style.display = "none";
}
/**
 * Display a question along with buttons for
 * answer options.
 */

function displayQuestion(questionIndex) {
    const currentQuestion = quizQuestions[questionIndex];
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("answer-options");
    questionText.innerText = currentQuestion.question;
    optionsContainer.innerHTML = "";

    for (let option of currentQuestion.options) {
        const button = `<button class="answer-button"
    onclick = "checkAnswer('${option}', '${currentQuestion.correct}')">${option}</button>`;

        optionsContainer.innerHTML += button;

    };
}

/**
 * Checks answers and changes button
 * color according to answer (correct, incorrect).
 */

function checkAnswer(selectedOption, correctAnswer) {
    const buttons = document.querySelectorAll(".answer-button");
    let correctSound = new Audio("assets/sounds/success-alert.wav");
    let incorrectSound = new Audio("assets/sounds/error-alert-1.wav");

    buttons.forEach((button) => {

        if (button.innerText === correctAnswer) {
            button.classList.add("correct");
            if (selectedOption === correctAnswer) {
                if (!isMuted) {
                correctSound.currentTime = 0;
                correctSound.play();
                }
                incrementScore();
            }

        } else {
            button.classList.add("incorrect");
            if (button.innerText === selectedOption) {
                if (!isMuted) {
                incorrectSound.currentTime = 0;
                incorrectSound.play();
                }
            }
        }
        button.disabled = true;
    });

    /**Moves to the next question and ends if the quiz is finished. 
     * Sets time to show next question after click.
     */
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            displayQuestion(currentQuestionIndex);
        } else {
            endQuiz();
        }
    }, 3000);
}

// Counts score

function incrementScore() {
    score++;
}

/** Ends quiz and displays score to the player.
 * Shows a restart button to stat quiz again.
 */

function endQuiz() {
    const quizArea = document.querySelector(".quiz-area");
    let restartSound = new Audio("assets/sounds/button_click.wav");

    saveScore(score);

    quizArea.innerHTML =
        `<h2>Quiz Complete</h2>
    <p>Your score: ${score} out of ${quizQuestions.length}</p>
    <button id="restart-button" onclick="resetQuiz()">Restart Quiz!</button>`;

    const restartButton = document.getElementById("restart-button");
    restartButton.addEventListener("click", () => {
        if (!isMuted) {
        restartSound.currentTime = 0;
        restartSound.play();
        }
        resetQuiz();
    });

}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    const quizArea = document.querySelector(".quiz-area");
    quizArea.innerHTML = `<div class="questions-container">
                <h3 id="question-text"></h3>
                <div id="answer-options"></div>
            </div>`;

    document.querySelector(".introduction-text").style.display = "block";
    document.querySelector(".buttons-container").style.display = "flex";
    document.querySelector(".quiz-area").style.display = "none";
    document.querySelector(".scores-box").style.display = "none";
}

function goToHome() {
    document.querySelector(".introduction-text").style.display = "block";
    document.querySelector(".buttons-container").style.display = "flex";
    document.querySelector(".rules-box").style.display = "none";
    document.querySelector(".quiz-area").style.display = "none";
    document.querySelector(".scores-box").style.display = "none";
    
}

function saveScore(score) {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function getHighScores() {
    return JSON.parse(localStorage.getItem("highScores")) || [];
}

function showScores() {
    const scoresBox = document.querySelector(".scores-box");
    const scoresList = document.getElementById("scores-list");

    const highScores = getHighScores();

    scoresList.innerHTML = highScores
    .map(score => `<li>Score: ${score}</li>`)
    .join("");

    document.querySelector(".introduction-text").style.display = "none";
    document.querySelector(".buttons-container").style.display = "none";
    document.querySelector(".rules-box").style.display = "none";
    document.querySelector(".quiz-area").style.display = "none";
    document.querySelector(".scores-box").style.display = "block";
}