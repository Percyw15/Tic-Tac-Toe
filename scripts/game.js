let currentPlayers = 0
window.addEventListener('beforeunload',()=>{
    sessionStorage.removeItem('Players');
});
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
        selectionElement.className = 'selection selection_section';
        
        Box.appendChild(selectionElement);
        return selectionElement;
    };

    board.forEach(item => {
        const element = configStyleElement(item);
        this.selections.push(element);
    });
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
            value.classList.remove('selection_section');

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
        selection.classList.remove('selection_section');
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
function startGame(){

    if (sessionStorage.getItem('Players') == null){
        window.location.href = "index.html"
    }
    else {
        const Players = JSON.parse(sessionStorage.getItem('Players'));
        const game = new GameHandler(Players.PO,Players.PT);
        game.Start();
        
    };
};

startGame()

