//---------------------------------------------------------------------------------VARIABLES
var quizData = [
    { 
        Q: "Commonly used data types DO NOT include:", 
        A: ["strings", "booleans", "alerts", "numbers"],
        C: "2" //note this is the 3rd answer but 2 element of A array
    },
    {
        Q: "The condition in an if/else statement is enclosed with __________.",
        A: ["quotes", "curly brackets", "parenthesis-1", "square brackets"],
        C: "2"
    },
    {
        Q: "Arrays in JavaScript can be used to store ____________.",
        A: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        C: "3"
    },
    {
        Q: "String values must be enclosed within ______________ when being assigned to avariables.",
        A: ["commas", "curly brackets", "quotes", "parenthesis"],
        C: "2"
    },
    {
        Q: "A very useful tool used during development and debugging for printing content to the debugger is:",
        A: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        C: "3"
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
    startQuizBtn.setAttribute("onclick","startTheQuiz()");
    startQuizBtn.textContent = "Start Quiz";

    //Add all the elements to the page
    questionWrapEl.appendChild(welcomeTitleEl);
    questionWrapEl.appendChild(welcomeInstructionsEl);
    questionWrapEl.appendChild(startQuizBtn);

    //Show Timer set to 60
    timerEl.textContent = "Timer: " + timeLeft;
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
            submitScore();
        }
    },1000);
    return timeInterval;
};

var startTheQuiz = function() {
    quizTimer = scoreTimer();
    loadScores();
    askQuestion(questionNumber);
};

var askQuestion = function(number) {
    //clear out the previous data on the page
    questionWrapEl.innerHTML = "";

    //element represents an object element from the quizData array
    //each object element stores a question and answer
    var element = quizData[number];

    //setup the h2/question element and set the textContent
    var questionEl = document.createElement("h2");
    questionEl.textContent = element.Q;
    questionWrapEl.appendChild(questionEl);

    //setup the ul/li/answers list element and and answers
    var answerChoicesEl = document.createElement("ul");
    var answerList = element.A;        
    for (let j = 0; j < answerList.length; j++) {
        const answer = answerList[j];
        var answerListItemEl = document.createElement("li");
        var answerBtnEl = document.createElement("button")

        answerBtnEl.setAttribute("class","answer-btn");
        answerBtnEl.setAttribute("data-task-id",j);
        answerBtnEl.textContent = answer;

        answerListItemEl.appendChild(answerBtnEl);
        answerChoicesEl.appendChild(answerListItemEl);
    }
    //put all the answers under the question
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
    if (timeLeft > 0) {
        var score = timeLeft + 1;
    } 
    else {
        var score = 0;
    }
    timerEl.textContent = "Timer: " + score;

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
    if (!initialsEl) {
        initialsEl = "ANONYMOUS"
    }

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
    startOverBtn.setAttribute("onclick","startOver()");
    startOverBtn.textContent = "Start Over";
    scoreWrapEl.appendChild(startOverBtn);

    var clearScoresBtn = document.createElement("button");
    clearScoresBtn.setAttribute("class", "clear-scores-btn");
    clearScoresBtn.setAttribute("onclick","deleteScores()");
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

var startOver = function() {
    location.reload();
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
    startOver();
};

var checkAnswer = function(answer) {
    if (answer === null) {
        return;
    }
    if (!(answer === quizData[questionNumber].C)) {
        timeLeft = timeLeft - 10;
        console.log(answer + " is NOT the same as " + quizData[questionNumber].C);
    }
    else {
        console.log(answer + " is the same as " + quizData[questionNumber].C);
    }
    questionNumber++;
};

//--------------------------FOR WHEN YOU SELECT AN ANSWER TO A QUESTION
var answeredButtonHandler = function(event) {
    //when question is answered then those clicked buttons will call here
    //relevant functions to create HMTL for next question and
    //test if button just clicked is the correct one or not and update
    //timer accordingly
    // console.log(event.target);
    event.preventDefault();

    //get the answer id and see if it is same as the C value of the object
    var answerSelected = event.target.getAttribute("data-task-id");
    if (!(answerSelected === "")) {
        checkAnswer(answerSelected);
    }
    // questionNumber++; //increment the index to get the next question/answer to ask
    if (questionNumber >= quizLength) {
        submitScore();
        console.log("Did i make it here!" + "--submitscore");
    }
    // else if (event.target.matches(".answer-btn")) {
    else {
        askQuestion(questionNumber);
    }
};

var scoreHandler = function(event) {
    event.preventDefault();
    // console.log(event.currentTarget);
    if (event.target.matches(".submit-score-btn")) {
        saveScores();
        viewHighScores();
    }
};

//---------------------------------------------------------Listeners
questionWrapEl.addEventListener("click",answeredButtonHandler);
scoreWrapEl.addEventListener("click",scoreHandler);
//---------------------------------------------------------Calls
startPage();
