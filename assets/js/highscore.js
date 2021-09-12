var scores = document.getElementById("scores");

//on page load, refresh the score (display them)
document.addEventListener("DOMContentLoaded", function () {
    refreshHighScores();
});

//clear the list of highscore by clearing the localStorage entry
function clearHighScores(){
    scores.innerHTML = "";
    localStorage.removeItem("highScores");
}

//refresh the score (display them)
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