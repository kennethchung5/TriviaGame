# TriviaGame

https://kennethchung5.github.io/TriviaGame/

This is a simple game written in JavaScript with jQuery. The app presents timed multiple-choice trivia questions, one at a time, proceeding through the set of questions with only the user's answer choice as input. At the end of a playthrough, the user is able to restart the game without reloading the app. Random number generation is used in both the question selection and the distribution of answer choices per question, so each playthrough will be different (probably). 

One noteworthy point is this line of code (line 97 in app.js) executed when the user clicks the "Start Game"/"Play again" button:  

    remainingQuestions = JSON.parse(JSON.stringify(questionSet));

Note: questionSet is the array holding the question-objects (where a question-object contains all the data associated with a question: {the question text, an array of choices, and an image url}). remainingQuestions is a working copy of questionSet that is restored when the game is restarted. 

The technique used to randomly order the questions and the answer choices relies on the .splice() method, which changes an array. This above line of code sets remainingQuestions equal to an independent copy of questionSet instead of to an array referencing the same objects. This allows the app to manipulate remainingQuestions as needed while preserving questionSet, which in turn allows the game to be replayed with the full original content (without reloading the app). Otherwise, the question/choice selection would remove data from questionSet, and the original content would no longer be available after the first playthrough. 
