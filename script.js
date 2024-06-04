const questions = [
    {
        question: "Who was the last team to win the Superbowl?",
        answers: [
            {text: "Jacksonville Jaguars", correct: false},
            {text: "Kansas City Cheifs", correct: true},
            {text: "New York Jets", correct: false},
            {text: "Houston Texans", correct: false},
        ]
    },
    {
        question: "Who was the first overall pick in the 2024 draft?",
        answers: [
            {text: "Bo nix", correct: false},
            {text: "Drake Maye", correct: false},
            {text: "Jayden Daniels", correct: false},
            {text: "Caleb Williams", correct: true},
        ]
    },
    {
        question: "What NFL team did Tom Brady play for the majority of his career?",
        answers: [
            {text: "New England", correct: true},
            {text: "Kansas City", correct: false},
            {text: "Tampa Bay", correct: false},
            {text: "Green Bay", correct: false},
        ]
    },
    {
        question: "Which of these teams hasn't won a Superbowl?",
        answers: [
            {text: "Jacksonville Jaguars", correct: true},
            {text: "New York Giants", correct: false},
            {text: "Chicago Bears", correct: false},
            {text: "Baltimore Ravens", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton(); 
    }else{
        startQuiz();
    }
});
startQuiz();

