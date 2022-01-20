const ongoingGames = document.getElementById("ongoingGames");
const socket = new WebSocket("wss://bad-api-assignment.reaktor.com/rps/live");

socket.onopen = (e) => {
	console.log(e.data);
};


socket.onmessage = (e) => {

	let result = e.data.replaceAll("\\", "").split(",");
	let game = JSON.parse(JSON.parse(e.data));

	
  if (game && game.type == "GAME_BEGIN") {
    let p = document.createElement("p");
    p.innerText = game.playerA.name + " vs. " + game.playerB.name;
		p.id = game.gameId;
		p.classList.add("game");
    ongoingGames.appendChild(p);

		
  } else if (game && game.type == "GAME_RESULT") {
		let oldLi = document.getElementById(game.gameId);
		if (oldLi) oldLi.remove();
	}
};