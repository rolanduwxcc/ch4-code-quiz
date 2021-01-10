//---------------------------------------------------------------------------------VARIABLES
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
var scoreWrapEl = document.querySelector(".score-wrapper");
var mainPageEl = document.querySelector(".page-content");
var timeLeft = 60;
var quizTimer;
var quizLength = quizData.length; 
var questionNumber = 0;
var scores = [];

//---------------------------------------------------------------------------------FUNCTIONS
var startPage = function() {
    //Heading for the quiz 
    var welcomeTitleEl = document.createElement("h2");
    welcomeTitleEl.textContent = "Coding Quiz Challenge";

    //Instructions about how the quiz works.
    var welcomeInstructionsEl = document.createElement("p");
    welcomeInstructionsEl.textContent = "Try to answer the following code-related questions withing the time limit. \nKeep in mind that incorrect answers will penalize your score/time \nby ten seconds!";

    //Button that starts the quiz
    var startQuizBtn = document.createElement("button");
    startQuizBtn.setAttribute("class","start-btn");
    startQuizBtn.textContent = "Start Quiz";

    //Add all the elements to the page
    questionWrapEl.appendChild(welcomeTitleEl);
    questionWrapEl.appendChild(welcomeInstructionsEl);
    questionWrapEl.appendChild(startQuizBtn);
};

var scoreTimer = function() {
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
    return timeInterval;
};

var askQuestion = function(i) {
    //clear out the previous data on the page
    questionWrapEl.innerHTML = "";

    //element represents an object element from the quizData array
    //each object element stores a question and answer
    var element = quizData[i];

    //setup the h2/question element and set the textContent
    var questionEl = document.createElement("h2");
    questionEl.textContent = element.Q;
    questionWrapEl.appendChild(questionEl);

    //setup the ul/li/answers list element and and answers
    var answerChoicesEl = document.createElement("ul");
    var answerList = element.A;        
    for (let j = 0; j < answerList.length; j++) {
        const answer = answerList[j];
        var answerEl = document.createElement("li");
        answerEl.textContent =  answer;
        answerEl.innerHTML = "<button class='answer-btn' id='1'>" + answer + "</button>";
        answerChoicesEl.appendChild(answerEl);
    }
        questionWrapEl.appendChild(answerChoicesEl);
};

var submitScore = function() {
    //This is the results screen after taking the quiz
    //clear out the previous data on the page
    // questionWrapEl.innerHTML = "";
    // mainPageEl.removeChild(questionWrapEl);
    questionWrapEl.remove();
    scoreWrapEl.innerHTML = "";

    //stop the timer and set the final score, adding 1 to final result
    clearInterval(quizTimer);
    var score = timeLeft + 1;
    
    //setup the h2/title element and set the textContent
    var endTitleEl = document.createElement("h2");
    endTitleEl.textContent = "All done";
    scoreWrapEl.appendChild(endTitleEl);

    //setup the p/final message about score/instructions
    var endInstructionsEl = document.createElement("p");
    endInstructionsEl.textContent = "Your score is " + score;
    scoreWrapEl.appendChild(endInstructionsEl);

    //setup an input field to capture users initials
    var inputInitials = document.createElement("input");
    inputInitials.setAttribute("type","text");
    inputInitials.setAttribute("name","ini");
    inputInitials.setAttribute("placeholder","Enter your initials!");
    scoreWrapEl.appendChild(inputInitials);

    //setup a submit score button
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("class","submit-score-btn");
    submitBtn.textContent = "Submit Score";
    scoreWrapEl.appendChild(submitBtn);
};

var saveScores = function() {
    //local storage setItem
    // localStorage.setItem("tasks", tasks);
    var initialsEl = document.querySelector("input[name='ini']").value;

    var scoreDataObj = {
        initials: initialsEl,
        score: timeLeft+1,
    };
    scores.push(scoreDataObj);
    localStorage.setItem("scores", JSON.stringify(scores));
};

var viewHighScores = function() {
    //clear the screen and get ready for high scores screen!
    scoreWrapEl.innerHTML = "";
   
    //setup the h2/header for the high scores page
    var highScoresEl = document.createElement("h2");
    highScoresEl.textContent = "High Scores";
    scoreWrapEl.appendChild(highScoresEl);
    
    //setup an unordered list of the high scores(not sorted)
    var scoresListEl = document.createElement("ul");
    scoreWrapEl.appendChild(scoresListEl);
  
    if (!scores.length) {scoresListEl.innerHTML = "";}

    //get the buttons on the page
    var startOverBtn = document.createElement("button");
    startOverBtn.setAttribute("class","restart-btn");
    startOverBtn.textContent = "Go Back";
    scoreWrapEl.appendChild(startOverBtn);

    var clearScoresBtn = document.createElement("button");
    clearScoresBtn.setAttribute("class", "clear-scores-btn");
    clearScoresBtn.textContent = "Clear Scores";
    scoreWrapEl.appendChild(clearScoresBtn);

    // //reload tasks from localStorage
    // var savedScores = localStorage.getItem("scores");
    // if (!savedScores) {
    //     return false;
    // }
    // //convert scores to an array of objects
    // scores = JSON.parse(savedScores);

    //for loop over the object returned from getItem
    for (let i = 0; i < scores.length; i++) {
        const element = scores[i];
        var scoreStringEl = document.createElement("li");
        scoreStringEl.textContent =  element.initials + "  -  " + element.score;
        scoresListEl.appendChild(scoreStringEl);
    }

};

var loadScores = function() {
    //get scores and put in the scores array of objects from local storage and load back to tasks array
    var savedScores = localStorage.getItem("scores");
    
    if (!savedScores) {
        return false;
    }

    //convert tasks to an array object
    scores = JSON.parse(savedScores);

};

var deleteScores = function() {
    localStorage.removeItem("scores");
};

var reStart = function() {
    // console.log(document.querySelector(".page-content"));

    // scoreWrapEl.remove();
    // // questionWrapEl.append();

};

//--------------This will control everything about this game.
var answerButtonHandler = function(event) {
    //buttons will call relevant functions to create HMTL when clicked
    event.preventDefault();
    if (questionNumber >= quizLength) {
        submitScore();
        console.log("Did i make it here!" + "--submitscore");
    }
    else if (event.target.matches(".start-btn")) {
        questionNumber = 0; //always reset to 0 if the start button was clicked
        quizTimer = scoreTimer();
        loadScores();
        askQuestion(questionNumber);
        questionNumber++;
        console.log("Did i make it here!" + "--ask first question");

    }
    else if (event.target.matches(".answer-btn")) {
        askQuestion(questionNumber);
        questionNumber++;
        console.log("Did i make it here!" + "--ask question");
    }
};

var scoreHandler = function(event) {
    event.preventDefault();
    console.log(event.currentTarget);
    if (event.target.matches(".submit-score-btn")) {
        saveScores();
        viewHighScores();
    }
    else if (event.target.matches(".clear-scores-btn")){
        console.log("Clear scores");
        event.stopImmediatePropagation();
        deleteScores();
        reStart();
    }
    else if (event.target.matches(".restart-btn")); {
        console.log("Start Over!");
        reStart();
    }
};

//---------------------------------------------------------Listeners
questionWrapEl.addEventListener("click",answerButtonHandler);
scoreWrapEl.addEventListener("click",scoreHandler);
//---------------------------------------------------------Calls
startPage();
