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

    startButton.addEventListener("click", function () {
        startQuiz();
    });

});

// Global variables

let currentQuestionIndex = 0;
let score = 0;

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

/**
 * Starting quiz when a start quiz button is clicked and rules button, scores button,
 * introduction text is hidden.
 */

function startQuiz() {
    currentQuestionIndex = 0;
    document.querySelector(".introduction-text").style.display = "none";
    document.querySelector(".buttons-container").style.display = "none";
    document.querySelector(".quiz-area").style.display = "block";
    displayQuestion(currentQuestionIndex)
}

function showRules() {

}
/**
 * Display a question along with buttons for
 * answer options.
 */

function displayQuestion(questionIndex) {
    const currentQuestion = quizQuestions[questionIndex];
    document.getElementById("question-text").innerText = currentQuestion.question;

    const optionsContainer = document.getElementById("answer-options");
    optionsContainer.innerHTML = "";

    for (let option of currentQuestion.options) {
        const button = `<button class="answer-button"
    onclick = "checkAnswer('${option}', '${currentQuestion.correct}')">${option}</button>`;

        optionsContainer.innerHTML += button;

    }
}

/**
 * Checks answers and changes button
 * color according to answer (correct, incorrect).
 */

function checkAnswer(selectedOption, correctAnswer) {
    const buttons = document.querySelectorAll(".answer-button");

    buttons.forEach((button) => {

        if (button.innerText === correctAnswer) {
            button.classList.add("correct");
            if (selectedOption === correctAnswer) incrementScore();
        } else {
            button.classList.add("incorrect");
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
    }, 5000);
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
    quizArea.innerHTML =
        `<h2>Quiz Complete</h2>
    <p>Your score: ${score} out of ${quizQuestions.length}</p>
    <button onclick="resetQuiz()">Restart Quiz!</button>`;
}

function resetQuiz() {

}

function toggleSound() {

}