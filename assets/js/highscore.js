var scores = document.getElementById("scores");

document.addEventListener("DOMContentLoaded", function () {
    refreshHighScores();
});

function clearHighScores(){
    scores.innerHTML = "";
    localStorage.removeItem("highScores");
}

function refreshHighScores(){
    scores.innerHTML = "";
    localStorage.highScores 
    && JSON.parse(localStorage.highScores)
    .forEach(function(highscore){
        var scoreElement = document.createElement("li");
        scoreElement.classList.add("score");
        scoreElement.innerText = (highscore.id + 1) + ". " + highscore.name.toUpperCase() + ", Score : " + highscore.score;
        scores.appendChild(scoreElement);
    });
}