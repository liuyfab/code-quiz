var questionList = [
    {
        title: "What operator is used to compare a value or variable?",
        choices: ["=","===","#", "<<"],
        answer: "==="
    },
    {
        title: "What operator is the AND operator?",
        choices: ["+","&","&&","||"],
        answer: "&&"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },
    {
        title: "What operator is the OR operator?",
        choices: ["+","&","&&", "||"],
        answer: "||"
    },
    {
        title: 'How do you call a function named "myFunction"?',
        choices: ["call function myFunction()","myFunction()","call myFunction()","call.myFunction()"],
        answer: "myFunction()"
    },
    {
        title: "What operator is used to assign a value to a vairable?",
        choices: [ "=", "===", "#", "<<"] ,
        answer: "="
    },
];

var score = 0;
var questionIndex = 0;
 
// select html elements.
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#StartTime");
var questions = document.querySelector("#questions");
var wrapper = document.querySelector("#wrapper");

var secondsLeft = 60;
var HoldInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

timer.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (HoldInterval === 0) {
        HoldInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(HoldInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

function render(questionIndex) {
    // Clears existing data 
    questions.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questionList.length; i++) {
        // Appends question title only
        var userQuestion = questionList[questionIndex].title;
        var userChoices = questionList[questionIndex].choices;
        questions.textContent = userQuestion;
    }
   
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questions.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questionList[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!";
            // Correct condition 
        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong!";
        }

    }
    if (questionIndex >= questionList.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questionList.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questions.appendChild(createDiv);

}   

// All done will append last page
function allDone() {
    questions.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questions.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questions.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(HoldInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questions.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questions.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questions.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questions.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./scores.html");
        }
    });

}
