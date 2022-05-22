const questionsJSON = `
    [
    {
        "text": "Inside which HTML element do we put the JavaScript?",
        "id": 1,
        "choices": [
            "Scripting tag",
            "javascript tag",
            "js tag",
            "script tag"
        ],
        "answer": "script tag"
    },
    {
        "text": "JavaScript is a ___ -side programming language.",
        "id": 2,
        "choices": [
            "client",
            "server",
            "both",
            "none"
        ],
        "answer": "both"
    },
    {
        "text": "Which JavaScript label catches all the values, except for the ones specified?",
        "id": 3,
        "choices": [
            "catch",
            "label",
            "try",
            "default"
        ],
        "answer": "default"
    },
    {
        "text": "How do you find the minimum of x and y using JavaScript?",
        "id": 4,
        "choices": [
            "min(x,y);",
            "Math.min(x,y)",
            "Math.min(xy)",
            "min(xy);"
        ],
        "answer": "Math.min(x,y)"
    }
]
`;

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
}

Quiz.prototype.isEnded = function () {
    return this.currentQuestionIndex === this.questions.length ;
};

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.currentQuestionIndex];
};

Quiz.prototype.checkQuestionWithAnswer = function (userAnswer) {
    let question = this.getQuestionByIndex();
    if (question.isCorrectAnswer(userAnswer)) {
        this.score++;
    }
    this.currentQuestionIndex++;
};

// Quiz.prototype = quizProto Not recommended

function Question(text, answer, choices) {
    this.text = text;
    this.answer = answer;
    this.choices = choices;
}

Question.prototype.isCorrectAnswer = function (userAnswer) {
    return this.answer === userAnswer;
}

let questionsParsed = JSON.parse(questionsJSON);
let questions = [];
questionsParsed.forEach(function (questionObj) {
    questions.push(new Question(questionObj.text, questionObj.answer, questionObj.choices));
})

let quiz = new Quiz(questions);

let questionNode = document.getElementById("question");

let progressNode = document.getElementById("progress");

let resultNode = document.getElementById("result");
let topicNode = document.getElementById("topic");
let quizNode = document.getElementById("quiz");

loadQuestions();

function handleOnClick(id , choice) {
    console.log(id, choice);
    let btnNode = document.getElementById("btn" + id);
    btnNode.onclick = function (){
        quiz.checkQuestionWithAnswer(choice);
        console.log("Current score - " + quiz.score)
        loadQuestions();
    }
}


function loadQuestions() {
    // if ended show score
    //else
    //getQuestion from HTML and update the question text
    if (quiz.isEnded()) {
        showScore();
        return;
    }

    let question = quiz.getQuestionByIndex();
    console.log(question);
    questionNode.innerText = question.text;
    for (let i = 0; i < question.choices.length; i++) {
        let choiceNode = document.getElementById("choice" + i);
        choiceNode.innerText = question.choices[i];
        handleOnClick(i, choiceNode.innerText);
    }

    showProgress();
}

function showScore() {
    // calculate teh score and display the score
    let percentage = quiz.score / quiz.questions.length * 100;
    topicNode.innerText = "Result";
    resultNode.innerText = `Your score is ${quiz.score}. Your percentage is ${percentage.toFixed(2)}%`;

    quizNode.style.display = "none";
}

function showProgress() {
    // update the progress
    progressNode.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;
}


