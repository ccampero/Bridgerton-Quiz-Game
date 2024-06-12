const questionBin = document.getElementById('question-bin');
const questionElement = document.getElementById('question');
const choicesBin = document.getElementById('choices');
const nextButton = document.getElementById('next-button');
const scoreBin = document.getElementById('score');
const messageBin = document.getElementById('message')

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreBin.textContent = `Score: ${score}`;
    messageBin.textContent = '';
    nextButton.disabled = true;
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    currentQuestion.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice-button');
        button.addEventListener('click', () => selectAnswer(button, currentQuestion.correct));
        choicesBin.appendChild(button);
    })
}

function resetState() {
    nextButton.disabled = true;
    while (choicesBin.firstChild) {
        choicesBin.removeChild(choicesBin.firstChild);
    }
}

function selectAnswer(button, correctAnswer) {
    if (button.textContent === correctAnswer) {
        score++;
        scoreBin.textContent = `Score: ${score}`;

    }
    Array.from(choicesBin.children).forEach(child => {
        child.disabled = true;
    });
    nextButton.disabled = false
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
});

function endGame() {
    questionBin.style.display = 'none';
    if (score === questions.length) {
        messageBin.textContent = 'You did it! You know your Bridgerton Trivia!';
    } else {
        messageBin.textContent = 'You Lost! Watch the show and try again.'
    }
}

startGame ();