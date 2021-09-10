var appQuiz = document.getElementById("app");
var footerMessage = document.getElementById("message");
var quizTimer = document.getElementById("timer");
var highscoreInitials;

var quizInterval;
var quizState = 0;


var StartQuizElement = document.createElement("div");
var QuizQuestionElements = [];
var SubmitScoreElement = document.createElement("div");

document.addEventListener("DOMContentLoaded", function () {
  quizQuestions = [
    "<h2>Commonly used data types do NOT include: </h2><ul><li><button class='btn quiz' onclick='submitAnswer(false)'>1. strings</button></li><li><button class='btn quiz' onclick='submitAnswer(false)'>2. booleans</button></li><li><button class='btn quiz' onclick='submitAnswer(true)'>3. alerts</button></li><li><button class='btn quiz' onclick='submitAnswer(false)'>4. numbers</button></li></ul>",
    "<h2>The condition in an if/else statement is enclosed with _____.</h2><ul><li><button class='btn quiz' onclick='submitAnswer(false)'>1. quotes</button></li><li><button class='btn quiz' onclick='submitAnswer(false)'>2. curly brackets</button></li><li><button class='btn quiz' onclick='submitAnswer(true)'>3. parenthesis</button></li><li><button class='btn quiz' onclick='submitAnswer(false)'>4. square brackets</button></li></ul>",
    "<h2>Arrays in JavaScript can be used to store _____.</h2><ul><li><button class='btn quiz' onclick='submitAnswer(false)'>1. numbers and strings</button></li><li><button class='btn quiz' onclick='submitAnswer(false)'>2. other arrays</button></li><li><button class='btn quiz' onclick='submitAnswer(false)'>3. booleans</button></li><li><button class='btn quiz' onclick='submitAnswer(true)'>4. all of the above</button></li></ul>",
    "<h2>String values must be enclosed within _____ when being assigned to variables.</h2><ul><li><button class='btn quiz' onclick='submitAnswer(false)'>1. commas</button></li><li><button class='btn quiz' onclick='submitAnswer(false)'>2. curly brackets</button></li><li><button class='btn quiz' onclick='submitAnswer(true)'>3. quotes</button></li><li><button class='btn quiz' onclick='submitAnswer(false)'>4. parenthesis</button></li></ul>",
    "<h2>A very useful tool used during development and debugging for printing content to the debugger is: </h2><ul><li><button class='btn quiz' onclick='submitAnswer(false)'>1. JavaScript</button></li><li><button class='btn quiz' onclick='submitAnswer(false)'>2. terminal/bash</button></li><li><button class='btn quiz' onclick='submitAnswer(false)'>3. for loops</button></li><li><button class='btn quiz' onclick='submitAnswer(true)'>4. console.log</button></li></ul>",
  ];
  StartQuizElement.innerHTML =
    "<h1>Coding Quiz Challenge</h1><p>Try to answer the following code-related questions withing the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!</p><nav><button class='btn' id='start' onclick='startQuiz(75)'>Start Quiz</button></nav>";
  SubmitScoreElement.innerHTML =
    "<h1>All done!</h1><p>Your final score is <span id='score'></span>.</p><nav><div><label for='highscore-initials'>Enter initials: </label><input type='text' id='highscore-initials'></div><button class='btn' onclick='submitScore()'>Submit</button></nav>";
  quizQuestions.forEach(function (quizQuestion) {
    var QuizQuestionElement = document.createElement("div");
    QuizQuestionElement.innerHTML = quizQuestion;
    QuizQuestionElements.push(QuizQuestionElement);
  });

  appQuiz.appendChild(StartQuizElement);
});

function startQuiz(time) {
  var quizTime = parseInt(quizTimer.innerText);
  if (quizTime <= 0) {
    quizTimer.innerText = time;

    appQuiz.innerHTML = "";
    appQuiz.appendChild(QuizQuestionElements[quizState++]);

    quizInterval = setInterval(function () {
      var quizTime = parseInt(quizTimer.innerHTML);
      quizTime && (quizTimer.innerText = --quizTime);
      if (quizTime <= 0) {
        clearInterval(quizInterval);
        finishQuiz(0);
      }
    }, 1000);
  }
}

function finishQuiz(score) {
  clearInterval(quizInterval);
  appQuiz.innerHTML = "";
  appQuiz.appendChild(SubmitScoreElement);
  document.getElementById("score").innerText = score;
  highscoreInitials = document.getElementById("highscore-initials");
}

function submitAnswer(correct) {
  var quizTime = parseInt(quizTimer.innerText);
  if (!correct) {
    quizTime = quizTime > 10 ? quizTime - 10 : 0;
    quizTimer.innerHTML = quizTime;
    displayMessage("Wrong!", 3000);
  }
  else{
    displayMessage("Correct!", 3000);
  }
  if (quizState >= QuizQuestionElements.length) {
    finishQuiz(quizTime);
  } else {
    appQuiz.innerHTML = "";
    appQuiz.appendChild(QuizQuestionElements[quizState++]);
  }
}

function submitScore() {
  if (highscoreInitials.value.length !== 2) {
    displayMessage("Initials must be 2 characters!", 3000);
    return;
  }
  addHighScore(highscoreInitials.value, score.innerText);
  resetQuiz();
}

function resetQuiz(){
    quizTimer.innerText = 0;
    quizState = 0;
    appQuiz.innerHTML = "";
    appQuiz.appendChild(StartQuizElement);
}

function addHighScore(name, score) {
  //todo validate parameters
  var highScores =
    localStorage.highScores && localStorage.highScores !== undefined
      ? JSON.parse(localStorage.highScores)
      : [];
  highScores.push({
    id: highScores.length,
    name: name,
    score: score,
  });

  localStorage.highScores = JSON.stringify(highScores);

  JSON.parse(localStorage.highScores).forEach((element) =>
    console.log(element.id + " :: " + element.name + " :: " + element.score)
  );
}

function displayMessage(message, time) {
  //todo validate parameters
  clearTimeout(this.footerMessageTimeout);

  this.footerMessageTimeout = setTimeout(function () {
    footerMessage.innerHTML = "";
    footerMessage.style.display = "none";
  }, time);

  footerMessage.innerHTML = message;
  footerMessage.style.display = "block";
}
