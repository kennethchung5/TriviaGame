//represent each question as an object ("question-object")
    //Notes for question-object formatting: 
        // consistent property names (so that they can recognized by processQuestion function)
        // list the correct answer choice as the 0th element of choices array
        // the imgUrl is from the perspective of index.html, not app.js
    
// test question-object
// var questionTest = {
//     questionText: "What is the answer?",
//     choices: ["CORRECT CHOICE", "Wrong choice #1", "Wrong choice #2", "Wrong choice #3", "Wrong choice #4", "Wrong choice #5"], 
//     imgUrl: "assets/images/abstract-q-c-200-200-9.jpg"
// }


//questionSet will be the array of question-objects
var questionSet = [
    {
        questionText: "What do the two Ms in \"M&M's\" stand for?",
        choices: ["Mars and Murrie", "Mars and Masterson", "Mars and Mars", "Mars and Masterfoods"],
        imgUrl: "assets/images/M&Ms.jpg"
    },
    {
        questionText: "What candy bar was named after the inventor's family horse?",
        choices: ["Snickers", "Butterfinger", "Milky Way", "Baby Ruth"],
        imgUrl: "assets/images/Snickers.jpg"
    },
    {
        questionText: "What is the top-selling candy in the United States?",
        choices: ["M&M's", "Reese's Peanut Butter Cups", "Snickers", "Kit Kat"],
        imgUrl: "assets/images/M&Ms2.jpg"
    },
    {
        questionText: "What were the original flavors of the 3 Musketeers bar?",
        choices: ["Chocolate, Strawberry, and Vanilla", "Chocolate, Coconut, and Vanilla", "Chocolate, Mint, and Vanilla", "Banana, Chocolate, and Strawberry"],
        imgUrl: "assets/images/3Musketeers.jpg"
    },
    {
        questionText: "What candy bar was originally introduced in the UK as \"Rowntree's Chocolate Crisp\"?",
        choices: ["Kit Kat", "Heath Bar", "Butterfinger", "Milky Way"],
        imgUrl: "assets/images/KitKat.jpg"
    },
    {
        questionText: "What candy bar was called \"Raider\" in France and Germany until 1991?",
        choices: ["Twix", "Milky Way", "Baby Ruth", "Tracker"],
        imgUrl: "assets/images/TwixRaider.jpg"
    },
    {
        questionText: "Complete this slogan from the 1990s: \"There's no wrong way to eat a _____\"",
        choices: ["Reese's", "Hershey Bar", "Rolo", "PayDay"],
        imgUrl: "assets/images/Reeses.jpg"
    },
    {
        questionText: "What are the five primary ingredients in a Take 5?",
        choices: ["Caramel, Chocolate, Peanut Butter, Peanuts, and Pretzels", "Caramel, Chocolate, Nougat, Peanuts, and Pretzels", "Caramel, Chocolate, Crisped Rice, Peanuts, and Pretzels", "Almonds, Caramel, Chocolate, Peanut Butter, and Peanuts"],
        imgUrl: "assets/images/Take5.jpg"   
    },
    {
        questionText: "Which company refers to its chocolate bar as \"The Great American Chocolate Bar\"?",
        choices: ["Hershey", "Cadbury", "Mars", "Nestlé"],
        imgUrl: "assets/images/HersheyCompany.png"
    },
    {
        questionText: "What candy was marketed with the slogan \"Taste the Rainbow\"?",
        choices: ["Skittles", "M&M's", "Starburst", "Mike and Ike"],
        imgUrl: "assets/images/Skittles.jpg"
    }    
];

var remainingQuestions = [];

var correctChoice = "";
var correctChoiceImg = "";

//these variables are per-game; should be set to 0 when the game is (re)started
var countCorrect;
var countIncorrect;
var countUnanswered;

var timeRemaining;

var intervalID;



// called when start or restart game button is clicked
$("#startBtn").on("click", function() {

    $("#startBtn").hide();

    //this was not the way to make a copy of questionSet; it merely passes references to the same objects
        // make remainingQuestions a copy of questionSet;
        // for (i = 0; i < questionSet.length; i++) {
        //     remainingQuestions.push(questionSet[i]);
        // };

    //***/make a "deep" copy of questionSet (not just references)
    remainingQuestions = JSON.parse(JSON.stringify(questionSet));

    countCorrect = 0;
    countIncorrect = 0;
    countUnanswered = 0;


    $("#timerDisplayDiv").html("Time remaining: <span id=\"timerDisplay\"></span>");

    processQuestion();
});


function processQuestion() {
// check for end of game; if questions remain, then randomly choose the next question, display it and the answer choices, and set interval

    if (remainingQuestions.length === 0) {
        // end of game scenario
        $("#questionDiv").empty();
        $("#timerDisplayDiv").empty();
        $("#messageDisplay").html("Game over! Here's how you did:<br><br>");

        var summaryDiv = $("<div>").html("Correct responses: " + countCorrect + "<br>Incorrect responses: " + countIncorrect + "<br> Unanswered questions: " + countUnanswered);
        summaryDiv.addClass("centeredMsg");

        $("#centralDisplay").html(summaryDiv);

        $("#startBtn").text("Play again");
        $("#startBtn").show();
    }
    else {
        var randQIndex = Math.floor(Math.random() * remainingQuestions.length);

        var currentQuestion = remainingQuestions[randQIndex];

        remainingQuestions.splice(randQIndex, 1);

        //for the selected question, store the correct answer and img url
        correctChoice = currentQuestion.choices[0];
        correctChoiceImg = currentQuestion.imgUrl;

        //display the questionText in the questionDiv
        $("#questionDiv").text(currentQuestion.questionText);    
    
        $("#centralDisplay").empty();
        $("#messageDisplay").hide();

        // "shuffle" choices array;; here, work with a copy of the choices array, instead of calling methods on the original; preserving the original array allows the game to be replayed without reloading the page    
        // UPDATE: no need to make a copy of the choices array; we instead made a copy of the questionSet array     

        // each iteration of this for loop randomly selects a remaining element of currentQuestion.choices and creates and displays a div using the element's text
        for (var i = currentQuestion.choices.length; i > 0; i--) {
            var randCIndex = Math.floor(Math.random() * i);
            
            var choiceDiv = $("<div>").text(currentQuestion.choices[randCIndex]);
            choiceDiv.addClass("choice");
            $("#centralDisplay").append(choiceDiv);

            currentQuestion.choices.splice(randCIndex, 1);
        };

        // initialize timer
        timeRemaining = 10;
        $("#timerDisplay").text(timeRemaining);

        clearInterval(intervalID);
        intervalID = setInterval(decrement, 1000)
    };
};




// the displayAnswer() function is called by both checkAnswer() (whether correct or incorrect) and decrement() (when time is up)
function displayAnswer() {
    $("#messageDisplay").show();

    $("#centralDisplay").empty();

    var correctChoiceDiv = $("<div>").text(correctChoice);
    correctChoiceDiv.addClass("centeredMsg");
    $("#centralDisplay").append(correctChoiceDiv);

    var correctChoiceImgDisplay = $("<img>").attr("src", correctChoiceImg);
    correctChoiceImgDisplay.addClass("displayedImg");
    $("#centralDisplay").append(correctChoiceImgDisplay);

    // set a timer, then call processQuestion()
    setTimeout(processQuestion, 1000 * 3);
};

// checkAnswer() is called upon a click on a div with the .choice class (which represents the user's submission of an answer)
function checkAnswer() {
    
    //first, stop the timer
    clearInterval(intervalID);

    var userAnswer = $(this).text()
    
    if (userAnswer === correctChoice) {
        $("#messageDisplay").text("Correct!");
        countCorrect += 1;
    }
    else {
        $("#messageDisplay").text("Incorrect! The correct answer is: ");
        countIncorrect += 1;
    };

    displayAnswer();
};


//create click event listener for .choice; this calls checkAnswer
$(document).on("click", ".choice", checkAnswer);


// timing function
function decrement() {
    timeRemaining -= 1;

    // quick fix to zero-pad the time display to 2 digits; this assumes that timeRemaining is set to 10 (so that decrementing it immediately results in 1 digit)
    $("#timerDisplay").text("0" + timeRemaining);

    if (timeRemaining < 1) {
        clearInterval(intervalID);

        $("#messageDisplay").text("Time's up! The correct answer is: ");
        countUnanswered += 1;

        displayAnswer();
    };
};