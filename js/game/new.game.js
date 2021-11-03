//@gordanaIn 2020 october
// Page is for the player vs player

const choices = document.querySelectorAll('.choices');
const modal = document.querySelector('.modal');
let newGameUser = document.getElementById('newGameUser');
const rock = document.getElementById('ROCK');
const paper = document.getElementById('PAPER');
const scissors = document.getElementById('SCISSORS');
let user1Score = 0;
let user2Score = 0;

/////// Start  game button /////////////////////
function startGames() {
    let userName = newGameUser.value;
    sessionStorage.setItem('userName', userName);
    let name = sessionStorage.getItem('userName');
    rps_api.setName(name).then(response => {
        rps_api.newGame(name).then(gameStatus => {
            sessionStorage.setItem('joinGame', 'false')
            window.location.href = "../game/new.game.html";
        })
    })
}

refreshGamesEachSec()

///* Button play supplements a  - let userName= function -

function refreshGamesEachSec() {
    setInterval(refreshGameStatus, 1000);
}
/////////////////////////////////////////////////////////////////////////////////////

////// Winner//////////////////////////////////////////////////////
function WIN(player1Score, player2Score) {
    player1++;
    player1Score.innerHTML = player1Score.toString();
    player2Score.innerHTML = player2Score.toString();
    result.innerHTML = player1Score + " beats " + player2Score + ". You win!"

}
///// Loser //////////////////////////////////////////////////////
function LOSE(player1Score, player2Score) {
    player2++;
    player2Score.innerHTML = player2Score.toString();
    player1Score.innerHTML = player1Score.toString();
    result.innerHTML = player1Score + " loses to " + player2Score + ". You lost."

}
///// Draw /////////////////////////////////////////////////////////////////////
function DRAW(player1Score, player2Score) {
    result.innerHTML = player1Score + " equals " + player2Score + ". It's a tie."

}
/////// Refresh Games ////////////////////////////////////////////////
function gameStatus() {
    rps_api.allGames()  // It is one object function.
        .then(games => {
            if (games.length === null || games.length === 'null') {
                document.getElementById('list-group').innerHTML = "Game is not available";
            }
            document.getElementById('list-group').innerHTML = games.map(game => {
                return startRemoteGame(game.gameId, game.name);
            })

                .join("");
        });
}
////////// Join Game //////////////////////////////////////////////////////////
function joinGame (gameId) {
    console.log("JoinGame:", gameId);
    let name = prompt("Please enter your name", "Anonymous");
    rps_api.setName(name).then(response =>{
        rps_api.joinGame(gameId)
            .then(gameStatus => {
                sessionStorage.setItem('joinGame', 'true', gameStatus)
                window.location.href = "../game/new.game.html";
            })
    })
}
////// Make move //////////////
function move(player1Choice) {
    rps_api.playerMove(player1Choice)
        .then(gameStatus => {
            console.log('GameStatus: ', gameStatus)
            gameResult(gameStatus);
        })
}
////////////// Main ///////////////////////////////////////////////
function main() {
    rock.addEventListener('click', function () {
        move('ROCK');
    })
    paper.addEventListener('click', function () {
        move('PAPER');
    })
    scissors.addEventListener('click', function () {
        move('SCISSORS');
    })
}
main()
//////////////// Game result ////////////////////////////////////////////
function gameResult(gameStatus) {
    let joinGame = sessionStorage.getItem('joinGame');
    if (joinGame === 'true') {
        switch (gameStatus.game) {
            case 'WIN':
                WIN(gameStatus.opponentMove, gameStatus.move);
                break;
            case 'LOSE':
                LOSE(gameStatus.opponentMove, gameStatus.move);
                break;
            case 'DRAW':
                DRAW(gameStatus.opponentMove, gameStatus.move);
                break;
        }
    } else {
        switch (gameStatus.game) {
            case 'WIN':
                WIN(gameStatus.move, gameStatus.opponentMove);
                break;
            case 'LOSE':
                LOSE(gameStatus.move, gameStatus.opponentMove);
                break;
            case 'DRAW':
                DRAW(gameStatus.move, gameStatus.opponentMove);
                break;
        }
    }
    if (gameStatus.game === 'WIN'
        || gameStatus.game === 'LOSE'
        || gameStatus.game === 'DRAW') {
        clearInterval(refreshGameStatus);
    }
}


/////// Refresh Game Status /////////////////////////////////////////////////////////////////////////////
function refreshGameStatus() {
    rps_api.getGameStatus()
        .then(gameStatus => {
            if (gameStatus.move === '') {
                let joinGame = sessionStorage.getItem('joinGame');
                if (joinGame === 'true') {
                    document.getElementById('player2').innerHTML = gameStatus.name;
                    document.getElementById('player1').innerHTML = gameStatus.opponentName;
                } else {
                    document.getElementById('player1').innerHTML = gameStatus.name;
                    document.getElementById('player2').innerHTML = gameStatus.opponentName;
                }
            }
            gameResult(gameStatus);
        })
}
/////// Game Status ///////////////////////////////
function gameStatus(gameId, game) {
    return startGames;
}

/// Start for the remote game////////////////////////////////////////////
function startRemoteGame() {
    let userName = document.getElementById('newGameUser');
    sessionStorage.setItem('userName', userName);
    if (userName === '' || userName === '') {
        name = 'Anonymous';
    }
}
////////// Game List /////////////////////////////////////////////////
function gameList() {
    console.log('gameList');
    rps_api.allGames()
        .then(games => {
            console.log('games',games);
            let gamesHtml = games.map(game => {
                return '<button onclick="joinGame(\'' + game.gameId + '\')">' + game.name + ' </button>'
            })
                .join("");
            document.getElementById("gameList").innerHTML = gamesHtml;

        })
}



// Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click',  modal);
