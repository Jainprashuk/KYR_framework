const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const submitButton = document.getElementById("submit-button");

let currentQuestion = 0;
const questions = [
    "1-regarding what you are facing issues",
    "2-what type of solution you are looking for",
    "3-its related to which department like health, finance, and all"
];
let userResponses = [];
let searchTheseKeys = new Set();

function askQuestion() {
    chatMessages.innerHTML += `<div class="bot-message">${questions[currentQuestion]}</div>`;
}

function processUserInput() {
    const answer = userInput.value.trim();
    if (answer !== "") {
        userResponses.push(answer);
        extractKeywords(answer);
        currentQuestion++;

        if (currentQuestion < questions.length) {
            askQuestion();
        } else {
            displayKeywords();
        }

        userInput.value = "";
    }
}

function extractKeywords(answer) {
    // Tokenize the answer and extract unique keywords
    const words = answer.toLowerCase().split(/\s+/);
    words.forEach(word => {
        // Filter out common words (stop words)
        if (!isCommonWord(word)) {
            searchTheseKeys.add(word);
        }
    });
}

function isCommonWord(word) {
    const commonWords = ["a", "an", "the", "in", "on", "at", "to", "for", "with", "by", "and", "but", "or", "of", "is", "was", "were"];
    return commonWords.includes(word);
}

function displayKeywords() {
    // chatMessages.innerHTML += `<div class="bot-message"><strong>User Responses:</strong></div>`;
    // userResponses.forEach((response, index) => {
    //     chatMessages.innerHTML += `<div class="bot-message"><strong>${questions[index]}:</strong> ${response}</div>`;
    // });

    chatMessages.innerHTML += `<div class="bot-message"><strong>Important Keywords:</strong> ${Array.from(searchTheseKeys).join(", ")}</div>`;
}

submitButton.addEventListener("click", processUserInput);

userInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        processUserInput();
    }
});

// Start the conversation by asking the first question
askQuestion();


