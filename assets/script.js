var dataArr = []
var body = document.body
var questionIndex = 0
var score = 0
var timerEl = document.getElementById('time');
var message = "Time's up!"
var words = message.split('+');
var timeLeft = 60;
var timerId;
var currentQ;
var resultEl = document.getElementById("result")
var questionEl = document.getElementById("questions")
var scoreEl = document.getElementById("score");
var submitScore = document.getElementById("btn")
var scoreIdCounter =0

function countDown() {
    timeLeft--
    timerEl.textContent = timeLeft
    if (timeLeft == 0) {
        clearInterval(timerId)
        timerEl.textContent = message;
        // console.log(message);
        endGame();
        return timeLeft
    }
}

function startQuiz() {
    var startEl = document.getElementById('startScreen')
    startEl.setAttribute("class", "hide")
    // var questionEl = document.getElementById("questions")
    questionEl.removeAttribute("class")
    timerId = setInterval(countDown, 1000)
    timerEl.textContent = timeLeft
    getQuestion();
}

var start = document.getElementById('start')
start.onclick = startQuiz

var saveScore = document.getElementById('save-score')
saveScore.onclick = enterScore


var questions = [
    {
        text: "What is the correct way to declare an array in JavaScript?",
        choice1: 'var colors = "red", "green", "blue"',
        choice2: 'var colors = ["red", "green", "blue"]',
        choice3: 'var colors = (1:"red", 2:"green", 3:"blue")',
        choice4: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
        answer: "2"
    },
    {
        text: "What operator is used to compare a value or variable?",
        choice1: "=",
        choice2: "===",
        choice3: "#",
        choice4: "<<",
        answer: "2"
    },
    {
        text: 'How do you write "Hello World" in an alert box?',
        choice1: 'alert("Hello World");',
        choice2: 'msgBox("Hello World");',
        choice3: 'msg("Hello World");',
        choice4: 'alertBox("Hello World");',
        answer: "1"
    },
    {
        text: "What operator is the AND operator?",
        choice1: "+",
        choice2: "&",
        choice3: "&&",
        choice4: "||",
        answer: "3"
    },
    {
        text: "What type of event occurs when an HTML element is clicked on?",
        choice1: "onchange",
        choice2: "onmouseclick",
        choice3: "onmouseover",
        choice4: "onclick",
        answer: "4"
    },
    {
        text: "What operator is the OR operator?",
        choice1: "+",
        choice2: "&",
        choice3: "&&",
        choice4: "||",
        answer: "4"
    },
    {
        text: 'How do you call a function named "myFunction"?',
        choice1: "call function myFunction()",
        choice2: "myFunction()",
        choice3: "call myFunction()",
        choice4: "call.myFunction()",
        answer: "2"
    },
    {
        text: "What operator is used to assign a value to a vairable?",
        choice1: "=",
        choice2: "===",
        choice3: "#",
        choice4: "<<",
        answer: "1"
    },
];

function getQuestion() {
    currentQ = questions[questionIndex]
    var questions = document.getElementById("questions")
    questions.textContent = currentQ.question

    for (var i = 0; i < currentQ.questions.length; i++) {
        var button = document.createElement("button")
        button.setAttribute("id", [i]);
        button.textContent = currentQ.questions[i]
        button.onclick = function () {

            if (currentQ.answer == event.target.id) {
                // var result = document.getElementById("result")
                resultEl.textContent = "Correct" ;
                // resultEl.appendChild(result)
                buttonClick()
            }
            else {
                resultEl.textContent = "Wrong";
                timeLeft -= 10;
            }
        }
        // console.log(button)
        choices.appendChild(button)
        // questions[i].question
    }
   
}

// we want to check to see if button value is correct, increment question index, call get question function to retrieve next question, 
// check for end condition
function buttonClick() {
    if (questionIndex < questions.length-1) {
        questionIndex++
        var choices = document.getElementById("choices")
        choices.innerHTML = ""
        getQuestion();

    } else {
        endGame();
        enterScore();
    }
}
function endGame() {
    clearInterval(timerId)
    timerEl.textContent = timeLeft
    score = timeLeft
    // scoreEl.textContent += score;
    scoreEl.removeAttribute("class")
    console.log(scoreEl.textContent)
    questionEl.setAttribute("class", "hide")
    enterScore();
}

// not sure how to connect this to scores
// need to connect it with high scores

function enterScore(){
    var scoreInitials = document.getElementById("initials").value.trim ();
    var localStorageData = JSON.parse(localStorage.getItem("highScores"));
    var scoreDataObj = {
        initials: scoreInitials,
        quizScore: timeLeft
    }
    scoreDataObj.id = scoreIdCounter;

    dataArr.push(scoreDataObj);
    localStorage.setItem("dataArr", JSON.stringify(dataArr))
    scoreIdCounter++;
}

var loadScores = function () {
    var existingScoreEl = localStorage.getItem("dataArr");
    existingScoreEl = JSON.parse(existingScoreEl);
    for (var i = 0; i < existingScoreEl.length; i++) {
        dataArr.push(existingScoreEl[i]);
        scoreIdCounter++
    }
}
var createScoreEl = function(){
    var listItemEl =document.createElement("li");
    listItemEl.classname = "score-item";
    listItemEl.setAttribute("data-score-id", scoreIdCounter);
    
}
loadScores();
