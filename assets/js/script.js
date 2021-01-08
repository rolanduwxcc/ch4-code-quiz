//---------------------------------------------------------Variables
var quizData = [
    // { 
    //     Q: "Welcome", 
    //     A: [ "Try to answer the following code-related questions withing the time limit. \nKeep in mind that incorrect answers will penalize your score/time \nby ten seconds!"],
    //     C: "1"
    // },
    { 
        Q: "Commonly used data types DO NOT include:", 
        A: ["strings", "booleans", "alerts-1", "numbers"]
    },
    {
        Q: "The condition in an if/else statement is enclosed with __________.",
        A: ["quotes", "curly brackets", "parenthesis-1", "square brackets"],
    },
    {
        Q: "Arrays in JavaScript can be used to store ____________.",
        A: ["numbers and strings", "other arrays", "booleans", "all of the above-1"],
    },
    {
        Q: "String values must be enclosed within ______________ when being assigned to avariables.",
        A: ["commas", "curly brackets", "quotes-1", "parenthesis"],
    },
    {
        Q: "A very useful tool used during development and debugging for printing content to the debugger is:",
        A: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    }
];
var timerEl = document.getElementById("quiz-timer");
var questionWrapEl = document.querySelector(".question-wrapper");
var timeLeft = 60;

//---------------------------------------------------------Functions
function scoreTimer() {
    

    var timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            timerEl.textContent = "Timer: " + timeLeft;
            timeLeft--;
        } 
        else {
            timerEl.textContent = "Timer: DONE";
            clearInterval(timeInterval);
        }
    },1000);
}

var startPage = function() {
    //set the timer
    //loop over questions
    scoreTimer();

    console.log(quizData.length);
    for (var i = 0; i < quizData.length; i++) {
        var element = quizData[i];
        var questionEl = document.createElement("h2");
        var answerChoicesEl = document.createElement("ul");
        questionEl.textContent = element.Q;

        var answerList = element.A;        
        for (let j = 0; j < answerList.length; j++) {
            const answer = answerList[j];
            var answerEl = document.createElement("li");
            answerEl.textContent =  answer;
            answerEl.innerHTML = "<button id='1'>" + answer + "</button>";
            answerChoicesEl.appendChild(answerEl);
        }
        questionWrapEl.appendChild(questionEl);
        questionWrapEl.appendChild(answerChoicesEl);
    }

    

};

//---------------------------------------------------------Listeners


//---------------------------------------------------------Calls
startPage();