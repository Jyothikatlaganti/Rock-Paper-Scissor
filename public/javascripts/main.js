
var playerName = "";
function showGames() {

    
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        
        let games = JSON.parse(xhttp.responseText);
        games.sort((a, b) => {
          return b.t-a.t;
        });

        
        let historyDiv = document.getElementById("gamehistory");
        while (historyDiv.firstChild) {
          historyDiv.removeChild(historyDiv.lastChild);
        }

        
        let infodiv = document.getElementById("playerinfo");
        while (infodiv.firstChild) {
          infodiv.removeChild(infodiv.lastChild);
        }

        
        if (games.length == 0) {
          let p = document.createElement("p");
          p.classList.add("nonefound");
          p.innerText = "Player " + playerName + " was not found.";
          infodiv.appendChild(p);
          return;
        }
        let moves = [0, 0, 0];
        let wins = 0;
        for (let i = 0; i < games.length; i++) {
          let player = playerName == games[i].playerA.name ? games[i].playerA : games[i].playerB;
          switch (player.played) {
            case "ROCK":
              moves[0] = moves[0]+1;
              break;
            case "PAPER":
              moves[1] = moves[1]+1;
              break;
            case "SCISSORS":
              moves[2] = moves[2]+1;
              break;
          }

          if (games[i].winner == playerName) wins++;
          let p = document.createElement("p");
          let class_ = (i % 2 == 0) ? "history1" : "history2";
          p.classList.add(class_);
          
          let date = new Date(games[i].t);
          let minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
          p.innerText = date.getDate() + "." + String(date.getMonth()+1) + "." + date.getFullYear() + " "
           + date.getHours() + ":" + minutes + ": \n" + games[i].playerA.name + " [" + games[i].playerA.played + "] vs. \n"
            + games[i].playerB.name + " [" + games[i].playerB.played + "]\n\nWinner: ";

         
          let span = document.createElement("span");
          switch (games[i].winner) {
            case playerName:
              class_ = "green";
              break;
            case "DRAW":
              class_ = "blue";
              break;
            default:
              class_ = "red";
          }

          
          span.classList.add(class_);
          span.innerText = games[i].winner;
          p.appendChild(span);
          historyDiv.appendChild(p);
        }

        
        let favhand = "NONE";
        switch (moves.indexOf(max(moves))) {
          case 0:
            favhand = "ROCK";
            break;
          case 1:
            favhand = "PAPER";
            break;
          case 2:
            favhand = "SCISSORS";
            break;
        }

        
        let namep = document.createElement("p");
        let totalp = document.createElement("p");
        let favhandp = document.createElement("p");
        let winratiop = document.createElement("p");
        let namespan = document.createElement("span");
        let totalspan = document.createElement("span");
        let favhandspan = document.createElement("span");
        let winratiospan = document.createElement("span");
  
        namep.classList.add("info");
        totalp.classList.add("info");
        favhandp.classList.add("info");
        winratiop.classList.add("info");
        namespan.classList.add("info2");
        totalspan.classList.add("info2");
        favhandspan.classList.add("info2");
        winratiospan.classList.add("info2");
        
        namep.innerText = "Name: ";
        totalp.innerText = "Games played: ";
        favhandp.innerText = "Most played hand: ";
        winratiop.innerText = "Win ratio: ";
        namespan.innerText = playerName;
        totalspan.innerText = games.length;
        favhandspan.innerText = favhand;
        winratiospan.innerText = String(Math.round((wins/games.length)*10000)/100) + "%";

        
        namep.appendChild(namespan);
        totalp.appendChild(totalspan);
        favhandp.appendChild(favhandspan);
        winratiop.appendChild(winratiospan);
        infodiv.appendChild(namep);
        infodiv.appendChild(totalp);
        infodiv.appendChild(favhandp);
        infodiv.appendChild(winratiop);

      }
    };
    
    let firstname = document.getElementById("firstname").value;
    let lastname = document.getElementById("lastname").value;
    let name = "player=" + firstname + "_" + lastname;
    playerName = firstname + " " + lastname;
    document.getElementById("gametitle").innerText = String(playerName);
    firstname = "";
    lastname = "";
    xhttp.open("GET", name);
    xhttp.send();
}


function keyPressed(event) {
  if (event.code == "Enter") {
    showGames();
  }
}


function max(array) {
  if (array.length == 0) return -1;
  let max = array[0];
  for (let i = 0; i < array.length; i++) {
    if (array[i] > max) max = array[i];
  }
  return max;
}


document.getElementById("searchbutton").addEventListener("click", showGames);
document.getElementById("firstname").addEventListener("keypress", keyPressed);
document.getElementById("lastname").addEventListener("keypress", keyPressed);