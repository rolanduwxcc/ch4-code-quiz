//---------------------------------------------------------Variables
var questionAnswerList = {
    qCount: 5,

    Q1: "Commonly used data types DO NOT include:",
    A1: ["strings", "booleans", "alerts-1", "numbers"],
    
    Q2: "The condition in an if/else statement is enclosed with __________.",
    A2: ["quotes", "curly brackets", "parenthesis-1", "square brackets"],

    Q3: "Arrays in JavaScript can be used to store ____________.",
    A3: ["numbers and strings", "other arrays", "booleans", "all of the above-1"],

    Q4: "String values must be enclosed within ______________ when being assigned to avariables.",
    A4: ["commas", "curly brackets", "quotes-1", "parenthesis"],

    Q5: "A very useful tool used during development and debugging for printing content to the debugger is:",
    A5: ["JavaScript", "terminal/bash", "for loops", "console.log"],
};

var qaPage = document.querySelector(".question-wrapper");







//---------------------------------------------------------Functions
var startPage = function() {
    var questionEl = document.createElement("h2"); 
    questionEl.textContent = questionAnswerList.Q1;
    qaPage.appendChild(questionEl);

    var answersListEl = document.createElement("ol");
    for (let i = 0; i < questionAnswerList.A1.length; i++) {
        const element = questionAnswerList.A1[i];
        var answerEl = document.createElement("li");
        answerEl.innerHTML = "<li>" + element + "</li>";
        answersListEl.appendChild(answerEl);
    }    

    qaPage.appendChild(answersListEl);

};













//---------------------------------------------------------Listeners









////---------------------------------------------------------Calls
startPage();