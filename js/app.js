const questionBin = document.getElementById('question-bin');
const questionElement = document.getElementById('question');
const choicesBin = document.getElementById('choices');
const nextButton = document.getElementById('next-button');
const scoreBin = document.getElementById('score');
const messageBin = document.getElementById('message');
const resultBox = document.getElementById('result-box');
const resultMessage = document.getElementById('result-message');
const closeResultBoxButton = document.getElementById('close-result-box');
const rulesBin = document.getElementById('rules-bin');
const startButton = document.getElementById('start-button');


let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreBin.textContent = `Score: ${score}`;
    messageBin.textContent = '';
    nextButton.disabled = true;
    questionBin.style.display = 'block';
    scoreBin.style.display = 'block';
    nextButton.style.display = 'block';
    resultBox.classList.add('hidden'); 
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
    });
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
        showResultMessage("You did it!")

    } else {
        showResultMessage("Incorrect");
    }

    Array.from(choicesBin.children).forEach(child => {
        child.disabled = true;
    });
    nextButton.disabled = false
}

function showResultMessage(message) {
    resultMessage.textContent = message;
    resultBox.style.display = 'block';
    resultBox.classList.remove('hidden');
}

closeResultBoxButton.addEventListener('click', () => {
    resultBox.classList.add('hidden')
    resultBox.style.display = 'none';
    nextButton.disabled = false;
});

nextButton.addEventListener('click', () => {
    resultBox.classList.add('hidden');
    resultBox.style.display = 'none';
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
});

function endGame() {
    questionBin.style.display = 'none';
    nextButton.style.display = 'none';
    if (score === questions.length) {
        messageBin.textContent = 'You did it! You know your Bridgerton Trivia!';
    } else {
        messageBin.textContent = 'You Lost! Watch the show and try again.'
    }

 const restartButton = document.createElement('button');
 restartButton.textContent = 'Restart';
 restartButton.classList.add('restart-button');
 restartButton.addEventListener('click', () => {
    messageBin.removeChild(restartButton);
    startGame();
 });
 messageBin.appendChild(restartButton);
}

questionBin.style.display = 'none';
scoreBin.style.display = 'none';
nextButton.style.display = 'none';
messageBin.style.display = 'none';
rulesBin.style.display = 'block';
resultBox.classList.add('hidden');

startButton.addEventListener('click', () => {
    rulesBin.style.display = 'none';
    questionBin.style.display = 'block';
    scoreBin.style.display = 'block';
    messageBin.style.display = 'block';
        
startGame ();
    
    });