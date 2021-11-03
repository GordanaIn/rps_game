let player1 = document.getElementById('player1');
let player2 = document.getElementById('player2');

function lboard(gameStatus){
    player1.innerHTML = gameStatus.name;

    if(gameStatus.opponentName){
        player2.innerHTML = gameStatus.opponentName;
    }
    else {
        player2.innerHTML = "Loading"
    }
}

function updateGameStatus(){
    rps_api.getGameStatus()
        .then(gameStatus =>lboard(gameStatus))
}
setInterval(updateGameStatus,4000)