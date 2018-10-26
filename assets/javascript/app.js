//represent each question as an object
    // consistent property names (so that they can recognized by displayQuestion function)
    // list the correct answer choice as the 0th element of choices array


var questionTest = {
    questionText: "What is the answer?",
    choices: ["CORRECT CHOICE", "Wrong choice #1", "Wrong choice #2", "Wrong choice #3", "Wrong choice #4", "Wrong choice #5"], 
    correctGifUrl: "asset/images/abstract-q-c-200-200-9.jpg"
}



function displayQuestion(questionObj) {

    //display the questionText in the questionDiv
    $("#questionDiv").text(questionObj.questionText);    

    //store the correct answer
        //?where should this be declared?
    var correctChoice = questionObj.choices[0];
    
    //"shuffle" choices array 
        //here, work with a copy of the choices array, instead of calling methods on the original; preserving the original array allows the game to be replayed without reloading the page    
    var choicesCopy = questionObj.choices;
    
    // this for loop selects each element of choicesCopy, in a random order, and creates a div using the elements' text
    for (var i = choicesCopy.length; i > 0; i--) {
        var randIndex = Math.floor(Math.random() * i);

        var choiceDiv = $("<div>").text(choicesCopy[randIndex]);
        choiceDiv.addClass("choice");
        $("#centralDisplay").append(choiceDiv);

        choicesCopy.splice(randIndex, 1);
    };


}


// console.log("Before the function, the array is: " + questionTest.choices);

displayQuestion(questionTest);

// console.log("After the function, the array is : " + questionTest.choices);

