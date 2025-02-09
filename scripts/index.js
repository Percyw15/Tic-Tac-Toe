const nick = document.getElementById('input-name');
const next = document.getElementById('submit-input-name');
let PlayerOne = null;
let PlayerTwo = null;

let currentPlayers = 0
function BoardHandler() {
    this.WinningCombinations = [
        //Horizontal
        ['top-left', 'top-mid', 'top-right'],
        ['mid-left', 'mid-mid', 'mid-right'],
        ['bottom-left', 'bottom-mid', 'bottom-right'],

        //Vertical
        ['top-left', 'mid-left', 'bottom-left'],
        ['top-mid', 'mid-mid', 'bottom-mid'],
        ['top-right', 'mid-right', 'bottom-right'],

        //Diagonal
        ['top-left', 'mid-mid', 'bottom-right'],
        ['top-right', 'mid-mid', 'bottom-left']
    ];
    this.selections = [];

    const Box = document.getElementById('game');

    const board = [
        'top-left', 'top-mid', 'top-right',
        'mid-left', 'mid-mid', 'mid-right',
        'bottom-left', 'bottom-mid', 'bottom-right'
    ];

    const configStyleElement = function (item) {
        const selectionElement = document.createElement('div');
        selectionElement.id = item;
        selectionElement.className = 'selection_section';
        Box.appendChild(selectionElement);
        return selectionElement;
    };

    board.forEach(item => {
        const element = configStyleElement(item);
        this.selections.push(element);
    });
}

function Player(name, symbol) {
    this.name = name;
    this.symbol = symbol;
    this.ButtonsSelected = [];
}

function GameHandler(PlayerOne, PlayerTwo) {
    let CurrentPlayer = PlayerOne;
    let Board; 

    function updateStatus() {

    };

    function updateStatusNames() {
        document.getElementById('player_one').textContent = PlayerOne.name;
        document.getElementById('player_two').textContent = PlayerTwo.name;
    };

    function handleClick() {
        toMark(this);
        setTimeout(() => {
            checkVitory(Board.WinningCombinations); 
            CurrentPlayer = CurrentPlayer === PlayerOne ? PlayerTwo : PlayerOne;
        }, 0);
    };

    function activateGame() {
        updateStatusNames();

        Board = new BoardHandler();  
        const BoardSelections = Board.selections;

        BoardSelections.forEach((selection) => {
            selection.addEventListener('click', handleClick, { once: true });
        });
    };

    function deactivateGame() {
        const elements = document.getElementsByClassName('selection_section');
        Object.values(elements).forEach((value) => {
            value.classList.add('no-hover');

            value.removeEventListener('click', handleClick);
        });
    };

    function checkVitory(WinningCombinations) {  
        WinningCombinations.forEach(item => {

            let numSequenceOfPlayer = 0;
            Object.values(CurrentPlayer.ButtonsSelected).forEach(value => {
                const result = item.includes(value);
                if (result === true) {
                    numSequenceOfPlayer += 1;
                };
                if (numSequenceOfPlayer === 3) {
                    winner(CurrentPlayer);
                    deactivateGame();
                };
            });
        });
    };

    function toMark(selection) {
        const marker = "marker_" + CurrentPlayer.symbol;
        selection.classList.add(marker);
        CurrentPlayer.ButtonsSelected.push(selection.id);
        console.log(CurrentPlayer.name + "=" + CurrentPlayer.ButtonsSelected);
        selection.classList.add('no-hover');
    };

    function winner(plr) {
        alert(plr.name + " venceu");
    };

    this.Start = function () {
        activateGame();
    };

    this.End = function () {
        deactivateGame();
    };

    this.Restart = function () {
        deactivateGame();
        setTimeout(() => { activateGame() }, 1); 
    };
};

function takePlayerNames(){
    const maxPlayers = 2

    if (nick.length <= 15 && nick.length > 0 ){
        console.log(nick,'e valido');

    }
    else {
        console.log('nick invalido');
    };

};

next.addEventListener('click',()=>{
    
    takePlayerNames();
    currentPlayers+= 1
        if (currentPlayers ===1){
            PlayerOne = new Player(nick.value,'X');

        }
        else if (currentPlayers ===2){
            PlayerTwo = new Player(nick.value,'O');
            
        };
});

nick.addEventListener('keydown',(event)=>{
    if (event.key === 'Enter'){
        event.preventDefault();
        next.click();
    };
});


