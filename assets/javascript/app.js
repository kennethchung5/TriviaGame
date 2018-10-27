//notes
    


//represent each question as an object
    // consistent property names (so that they can recognized by processQuestion function)
    // list the correct answer choice as the 0th element of choices array

    // note: the imgUrl is from the perspective of index.html
//? put the question objects into an array?
    //then, randomly select questions?

var questionTest = {
    questionText: "What is the answer?",
    choices: ["CORRECT CHOICE", "Wrong choice #1", "Wrong choice #2", "Wrong choice #3", "Wrong choice #4", "Wrong choice #5"], 
    imgUrl: "assets/images/abstract-q-c-200-200-9.jpg"
}

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
var countCorrect = 0;
var countIncorrect = 0;
var countUnanswered = 0;

var timeRemaining;

var intervalID;

// called when start or restart game button is clicked
// copies questionSet 
function startGame() {
    remainingQuestions = questionSet;

    processQuestion();
};


function processQuestion() {
// choosing the word, and checking for end-of-game

    if (remainingQuestions.length === 0) {
        // end of game scenario
        $("#questionDiv").empty();
        $("#timerDisplayDiv").empty();
        $("#messageDisplay").empty();
        $("#centralDisplay").html("Correct responses: " + countCorrect + "<br>Incorrect responses: " + countIncorrect + "<br> Unanswered questions: " + countUnanswered)
    }
    else {
        var randQIndex = Math.floor(Math.random() * remainingQuestions.length);

        var currentQuestion = remainingQuestions[randQIndex];

        remainingQuestions.splice(randQIndex, 1);

        // what to do with the selected word
            //store the correct answer
        correctChoice = currentQuestion.choices[0];
        correctChoiceImg = currentQuestion.imgUrl;

        //display the questionText in the questionDiv
        $("#questionDiv").text(currentQuestion.questionText);    
    
        $("#centralDisplay").empty();
        $("#messageDisplay").empty();
        //"shuffle" choices array;; here, work with a copy of the choices array, instead of calling methods on the original; preserving the original array allows the game to be replayed without reloading the page    
        //UPDATE: no need to make a copy of the choices array; we instead made a copy of the questionSet array
        
        // this for loop selects each element of currentQuestion.choices, in a random order, and creates a div using the elements' text
        for (var i = currentQuestion.choices.length; i > 0; i--) {
            var randCIndex = Math.floor(Math.random() * i);

            var choiceDiv = $("<div>").text(currentQuestion.choices[randCIndex]);
            choiceDiv.addClass("choice");
            $("#centralDisplay").append(choiceDiv);

            currentQuestion.choices.splice(randCIndex, 1);
        };

        timeRemaining = 10;
        $("#timerDisplay").text(timeRemaining);

        intervalID = setInterval(decrement, 1000)
    };
};









function displayAnswer() {
    $("#centralDisplay").empty();

    var correctChoiceDiv = $("<div>").text(correctChoice);
    $("#centralDisplay").append(correctChoiceDiv);

    console.log("The url is " + correctChoiceImg);

    var correctChoiceImgDisplay = $("<img>").attr("src", correctChoiceImg);
    $("#centralDisplay").append(correctChoiceImgDisplay);

    // set a timer, then call processQuestion()
    setTimeout(processQuestion, 1000 * 3);
};

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


//create click event listener for .choice; this should call a function that checks the answer
$(document).on("click", ".choice", checkAnswer);


// timing function(s)

function decrement() {
    timeRemaining -= 1;

    $("#timerDisplay").text(timeRemaining);

    if (timeRemaining < 1) {
        clearInterval(intervalID);

        $("#messageDisplay").text("Time's up! The correct answer is: ");
        countUnanswered += 1;

        displayAnswer();
    };
};