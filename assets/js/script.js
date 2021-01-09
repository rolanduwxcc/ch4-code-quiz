//---------------------------------------------------------Variables
var quizData = [
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

var askQuestion = function(i) {
    var element = quizData[i];
    var questionEl = document.createElement("h2");
    var answerChoicesEl = document.createElement("ul");
    questionEl.textContent = element.Q;

    var answerList = element.A;        
    for (let j = 0; j < answerList.length; j++) {
        const answer = answerList[j];
        var answerEl = document.createElement("li");
        answerEl.textContent =  answer;
        answerEl.innerHTML = "<button class='answer-btn' id='1'>" + answer + "</button>";
        answerChoicesEl.appendChild(answerEl);
    }
    questionWrapEl.appendChild(questionEl);
    questionWrapEl.appendChild(answerChoicesEl);

}

var startPage = function() {
    //set the timer
    //loop over questions
    var quizLength = quizData.length; 
    var questionNumber = 0;
    scoreTimer();
    askQuestion(questionNumber);

    var welcomeTitleEl = document.createElement("h2");
    welcomeTitleEl.textContent = "Coding Quiz Challenge";
    var welcomeInstructionsEl = document.createElement("p");
    welcomeInstructionsEl.textContent = "Try to answer the following code-related questions withing the time limit. \nKeep in mind that incorrect answers will penalize your score/time \nby ten seconds!";
    var startQuizBtn = document.createElement("button");
    startQuizBtn.textContent = "Start Quiz";

    questionWrapEl.appendChild(welcomeTitleEl);
    questionWrapEl.appendChild(welcomeInstructionsEl);
    questionWrapEl.appendChild(startQuizBtn);

    // for (var i = 0; i < quizData.length; i++) {
    //     var element = quizData[i];
    //     var questionEl = document.createElement("h2");
    //     var answerChoicesEl = document.createElement("ul");
    //     questionEl.textContent = element.Q;

    //     var answerList = element.A;        
    //     for (let j = 0; j < answerList.length; j++) {
    //         const answer = answerList[j];
    //         var answerEl = document.createElement("li");
    //         answerEl.textContent =  answer;
    //         answerEl.innerHTML = "<button id='1'>" + answer + "</button>";
    //         answerChoicesEl.appendChild(answerEl);
    //     }
    //     questionWrapEl.appendChild(questionEl);
    //     questionWrapEl.appendChild(answerChoicesEl);
    //}

    

};

var answerButtonHandler = function(event) {
    // console.log(event.target); //logs what object triggered event

    if (event.target.matches(".answer-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    }
    else if (event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

//---------------------------------------------------------Listeners
questionWrapEl.addEventListener("click",answerButtonHandler);

//---------------------------------------------------------Calls
startPage();