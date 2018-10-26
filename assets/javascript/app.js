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

var correctChoice = "";
var correctChoiceImg = "";

function processQuestion(questionObj) {
    //store the correct answer
    correctChoice = questionObj.choices[0];
    correctChoiceImg = questionObj.imgUrl;

    // console.log("The url is " + correctChoiceImg);
    //display the questionText in the questionDiv
    $("#questionDiv").text(questionObj.questionText);    
    
    //"shuffle" choices array;; here, work with a copy of the choices array, instead of calling methods on the original; preserving the original array allows the game to be replayed without reloading the page    
    var choicesCopy = questionObj.choices;
    
    // this for loop selects each element of choicesCopy, in a random order, and creates a div using the elements' text
    for (var i = choicesCopy.length; i > 0; i--) {
        var randIndex = Math.floor(Math.random() * i);

        var choiceDiv = $("<div>").text(choicesCopy[randIndex]);
        choiceDiv.addClass("choice");
        $("#centralDisplay").append(choiceDiv);

        choicesCopy.splice(randIndex, 1);
    };
};




processQuestion(questionTest);




function displayAnswer() {
    $("#centralDisplay").empty();

    var correctChoiceDiv = $("<div>").text(correctChoice);
    $("#centralDisplay").append(correctChoiceDiv);

    console.log("The url is " + correctChoiceImg);

    var correctChoiceImgDisplay = $("<img>").attr("src", correctChoiceImg);
    $("#centralDisplay").append(correctChoiceImgDisplay);
};



//create click event listener for .choice; this should call a function that checks the answer
$(document).on("click", ".choice", displayAnswer);