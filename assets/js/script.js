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
var quizLength = quizData.length; 
var questionNumber = 0;

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

var submitScore = function() {
    questionWrapEl.innerHTML = ""; //clear last questions
    var score = timeLeft;
    clearInterval();
    
    var endTitleEl = document.createElement("h2");
    endTitleEl.textContent = "All done";
    var endInstructionsEl = document.createElement("p");
    endInstructionsEl.textContent = "Your score is " + score;

    var inputInitials = document.createElement("input");

    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("class","initials-btn");
    submitBtn.textContent = "Submit";

    questionWrapEl.appendChild(endTitleEl);
    questionWrapEl.appendChild(endInstructionsEl);
    questionWrapEl.appendChild(inputInitials);
    questionWrapEl.appendChild(submitBtn);

}

var storeScore = function() {
    //local storage setItem
}

var highScores = function() {
    //local storage getItem
    var savedScores = "";
    var score = timeLeft;
    questionWrapEl.innerHTML = ""; //clear last questions
  
    var highScoresEl = document.createElement("h2");
    highScoresEl.textContent = "High Scores";
    
    var scoresListEl = document.createElement("ul");
  
    //for loop over the object returned from getItem
    for (let i = 0; i < savedScores.length; j++) {
        const iniScore = savedScores[i];
        var scoreStringEl = document.createElement("li");
        scoreStringEl.textContent =  iniScore;
        scoreStringEl.innerHTML = "<button class='answer-btn' id='1'>" + answer + "</button>";
        scoresListEl.appendChild(answerEl);
    }

    var startOverBtn = document.createElement("button");
    startOverBtn.setAttribute("class","start-over-btn");
    startOverBtn.textContent = "Go Back";

    var clearScoresBtn = document.createElement("button");
    clearScoresBtn.setAttribute("class", "clear-scores");

    questionWrapEl.appendChild(highScoresEl);
    questionWrapEl.appendChild(scoresListEl);
    questionWrapEl.appendChild(startOverBtn);
    questionWrapEl.appendChild(clearScoresBtn);
}

var askQuestion = function(i) {
    questionWrapEl.innerHTML = ""; //clear out previous data

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
    //Start page for the quiz 

    var welcomeTitleEl = document.createElement("h2");
    welcomeTitleEl.textContent = "Coding Quiz Challenge";
    var welcomeInstructionsEl = document.createElement("p");
    welcomeInstructionsEl.textContent = "Try to answer the following code-related questions withing the time limit. \nKeep in mind that incorrect answers will penalize your score/time \nby ten seconds!";
    var startQuizBtn = document.createElement("button");
    startQuizBtn.setAttribute("class","start-btn");
    startQuizBtn.textContent = "Start Quiz";

    questionWrapEl.appendChild(welcomeTitleEl);
    questionWrapEl.appendChild(welcomeInstructionsEl);
    questionWrapEl.appendChild(startQuizBtn);

};

var answerButtonHandler = function(event) {
    // console.log(event.target); //logs what object triggered event
    if (questionNumber >= quizLength) {
        submitScore();
    }
    else if (event.target.matches(".start-btn")) {
        questionNumber = 0; //always reset to 0 if the start button was clicked
        scoreTimer();
        askQuestion(questionNumber);
        questionNumber++;
    }
    else if (event.target.matches(".answer-btn")) {
        askQuestion(questionNumber);
        questionNumber++;
    }
    else if (event.target.matches(".initials-btn")) {
        highScores();
    }
    else {
        return;
    }
};

//---------------------------------------------------------Listeners
questionWrapEl.addEventListener("click",answerButtonHandler);

//---------------------------------------------------------Calls
startPage();