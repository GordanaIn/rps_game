// @gordanaIn 2020 october

// Connect whit token for game
// newToken is for responding of token
//  is for to get answer of getItem
rps_api = {
    newToken: () => {
        fetch('https://java19.sensera.se/auth/token') // Working
            .then(response => response.text())
            .then(text => sessionStorage.setItem('token', text))
    },

//// It is to se all games in the project
    allGames: () => {
        return fetch('https://java19.sensera.se/games', //Working
            {headers: {'token': sessionStorage.getItem('token')}})
            .then(response => response.json())

    },

/// It is to the start a new game
    newGame: () => {
        return fetch('https://java19.sensera.se/games/start', // Working
            {headers: {'token': sessionStorage.getItem('token')}})
            .then(response => response.json())
        },

//// It is to set name of the player
    setName: (name) => {
        return fetch('https://java19.sensera.se/user/name', //Working
            {method: 'POST',
            body: JSON.stringify({"name": name}),
            headers: {'token':sessionStorage.getItem('token'), 'Content-Type': 'application/json;charset=UTF-8'}})
            .then(response => response.text())
    },

/// It is to join on the game
    joinGame: (gameId) => {
        return fetch('https://java19.sensera.se/games/join/'+ gameId, //Working
            {headers: {'token':sessionStorage.getItem('token')}})
            .then(response => response.json(gameId))
    },
    playerMove: (move) => {
        return fetch('https://java19.sensera.se/games/move/'+ move, //Working
            {headers: {'token': sessionStorage.getItem('token')}})
            .then(response => response.json())
    },
    getGameStatus: () => {
        return fetch('https://java19.sensera.se/games/status',
            {headers: {'token': sessionStorage.getItem('token')}}) //Working
            .then(response => response.json())
    }}

if (sessionStorage.getItem('token' ) == null) {
    rps_api.newToken();//
}
