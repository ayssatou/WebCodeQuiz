var footerMessage = document.getElementById("message");

/*var participantName = document.getElementById("name");

var participantScore = document.getElementById("score");

 document.getElementById("clack").addEventListener("click", function () {
  displayMessage("wroooong!", 3000);
}); 

document.getElementById("hssub").addEventListener("click", function () {
  addHighScore(participantName.value, participantScore.value);
});

document.getElementById("hsclr").addEventListener("click", function () {
    localStorage.removeItem("highScores");
});

document.getElementById("hsdis").addEventListener("click", function () {
    localStorage.highScores && JSON.parse(localStorage.highScores).forEach(element => console.log(element.id + " :: " + element.name + " :: " + element.score));
});*/

function addHighScore(name, score) {
  //todo validate parameters
  var highScores = localStorage.highScores && localStorage.highScores !== undefined ? JSON.parse(localStorage.highScores) : [];
  highScores.push({
    id: highScores.length,
    name: name,
    score: score,
  });

  localStorage.highScores = JSON.stringify(highScores);

  JSON.parse(localStorage.highScores).forEach(element => console.log(element.id + " :: " + element.name + " :: " + element.score));

  
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
