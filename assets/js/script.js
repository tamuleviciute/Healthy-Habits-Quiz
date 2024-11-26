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
    question: "What is the recommended amount of water to drink daily?",
    options: ["1 liter", "2 liters", "3 liters", "4 liters"],
    correct: "2 liters"
}, {
    question: "What type of exercise improves flexibility?",
    options: ["Cardio", "Strength training", "Yoga", "Sprinting"],
    correct: "Yoga"
}, {
    question: "Which of these is considered a healthy source of fat?",
    options: ["Butter", "Avocado", "French fries", "Ice cream"],
    correct: "Avocado"
}, {
    question: "How many hours of sleep is recommended for adults per night?",
    options: ["4-5 hours", "6-7 hours", "7-8 hours", "10+ hours"],
    correct: "7-8 hours"
}, {
    question: "Which of these is the best way to reduce stress?",
    options: ["Watching TV for hours", "Drinking sugary beverages", "Practicing mindfulness or meditation", "Avoiding exercise"],
    correct: "Practicing mindfulness or meditation"
}, {
    question: "What is a good source of plant-based protein?",
    options: ["Chicken", "Almonds", "White bread", "Soda"],
    correct: "Almonds"
}, {
    question: "Which vitamin is primarily obtained from sunlight?",
    options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"],
    correct: "Vitamin D"
}, {
    question: "What food is rich in probiotics and good for gut health?",
    options: ["Chocolate", "Fermented vegetables (e.g., kimchi or sauerkraut)", "Chips", "Steak"],
    correct: "Fermented vegetables (e.g., kimchi or sauerkraut"
}, {
    question: "What is the main benefit of regular exercise?",
    options: ["Only weight loss", "Improved mood and mental health", "Its a waste of time", "Decreases water retention"],
    correct: "Improved mood and mental health"
}, {
    question: "Which activity is best for mental wellness?",
    options: ["Reading a book", "Overeating", "Skipping meals", "Staying on social media all day"],
    correct: "Reading a book"
}];

// Functions area

/**
 * Starting quiz when a start quiz button is clicked and rules button, scores button,
 * introduction text is hidden.
 */

function startQuiz() {
    document.querySelector(".introduction-text").style.display = "none";
    document.querySelector(".buttons-container").style.display = "none";
    document.querySelector(".quiz-area").style.display = "block";
    displayQuestion(0)
}

function showRules() {

}

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

function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        alert("Correct Answer!");
        incrementScore();
    } else {
        alert(`Incorrect Answer! The correct answer is: ${correctAnswer}`);
    }

    // Moves to next question

    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion(currentQuestionIndex);
    } else {
        endQuiz();
    }
}

function incrementScore() {
    score++;
}

function endQuiz() {

}

function resetQuiz() {

}

function toggleSound() {

}