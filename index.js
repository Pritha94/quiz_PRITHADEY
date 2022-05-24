function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

function Question(questionText, options, answer) {
    this.questionText = questionText;
    this.options = options;
    this.answer = answer;
}

let questions = [
    new Question("JavaScript supports", ["Functions", "XHTML", "HTML", "CSS"], "Functions"),
    new Question("CSS stands for", ["Casecading Style Sheet", "Casecading Style Script", "Class Style Sheet", "Color Style Sheet"], "Casecading Style Sheet"),
    new Question("What does the abbreviation HTML stand for", ["HyperText Markup Language", "HighText Markup Language ", "HyperText Markdown Language", "None of this"], "HyperText Markup Language"),
    new Question("What is Dependency Injection", [" A design pattern which implements Inversion of Control for software applications", "One of the spring module", "A technique to get dependencies of any project", "Used to promote tight coupling in code"], " A technique to get dependencies of any project"),
    new Question("Which of the following keyword is used to create a class inheritance", ["Create", "Inherits", "Extends", "This"], "Extends"),
]


let quiz = new Quiz(questions)

Quiz.prototype.getQuestionsByIndex = function() {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkUserAttempt = function(answer) {
    if (this.getQuestionsByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

Question.prototype.isCorrectAnswer = function(choice) {
    return choice === this.answer
}

Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length
}

function loadQuestions() {
    if (quiz.isEnded()) {
        showScore();
    } else {
        let elem = document.getElementById("question");
        elem.innerHTML = quiz.getQuestionsByIndex().questionText;
        let options = quiz.getQuestionsByIndex().options;
        for (let i = 0; i < options.length; i++) {
            let eachOption = document.getElementById("choice" + i);
            eachOption.innerText = options[i];
            handleOptionBtn("btn" + i, options[i]);

        }
        showProgress();
    }
}

function showScore() {
    let endResult = "<h1>Result</h1>";
    endResult += "<h2 id='score'>Your Score: " + quiz.score + ". and percentage is: " + (quiz.score / questions.length * 100) + "%</h2>";
    let elem = document.getElementById("quiz");
    elem.innerHTML = endResult;

}

function handleOptionBtn(id, currentOption) {

    let btn = document.getElementById(id);
    btn.onclick = function() {
        quiz.checkUserAttempt(currentOption);
        loadQuestions();
    }
}

function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let elem = document.getElementById("progress");
    elem.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length
}
loadQuestions();