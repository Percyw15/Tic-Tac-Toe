const nick = document.getElementById('input_name');
const next = document.getElementById('submit_input_name');
let PlayerOne = null;
let PlayerTwo = null;

let currentPlayers = 0

function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
    this.ButtonsSelected = [];
}

function takePlayerNames(){
    const player = document.querySelector('.player');
    console.log(currentPlayers)
    if (nick.value.length <= 15 && nick.value.length > 0){
        console.log(nick.value, 'é válido');
        currentPlayers += 1;

        if (currentPlayers === 1){
            PlayerOne = new Player(nick.value, 'X');
            player.innerHTML = "<h2>Player Two</h2> <img src='assets/O.svg' >";
            nick.value = ""
        }
        else if (currentPlayers === 2){
            PlayerTwo = new Player(nick.value, 'O');
            sessionStorage.setItem('Players',JSON.stringify({
                'PO':PlayerOne,
                'PT':PlayerTwo
            }));
            window.location.href = "game.html";
        };

    } 
    else {
        console.log('Nick inválido');
    }
};

next.addEventListener('mousedown',()=>{
    next.style.borderColor = "white";
    takePlayerNames();
});

next.addEventListener('mouseup',()=>{
    next.style.borderColor = "black"
});

nick.addEventListener('keydown',(event)=>{
    if (event.key === 'Enter'){
        event.preventDefault();
        next.style.borderColor = "white"
        takePlayerNames()
    };
});

nick.addEventListener('keyup',(event)=>{
    if (event.key === 'Enter'){
        event.preventDefault();
        next.style.borderColor = "black"
    };
});


