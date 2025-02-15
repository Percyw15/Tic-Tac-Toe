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
    const reset_button = document.getElementById('reset_button');
    const finished_button = document.getElementById('finished_button');
    const overlay = document.querySelector('.overlay');
    const outcome = document.querySelector('.outcome');
    let CurrentPlayer = PlayerOne;
    let Board;
    let contButtonsClicked;
    let numSequenceOfPlayer;

    function updateStatus() {

    };

    function updateStatusNames() {
        document.getElementById('player_one').textContent = PlayerOne.name;
        document.getElementById('player_two').textContent = PlayerTwo.name;
    };

    function handleClick() {
        toMark(this);
        requestAnimationFrame(()=>{
            setTimeout(() => {
                checkVitory(Board.WinningCombinations); 
                CurrentPlayer = CurrentPlayer === PlayerOne ? PlayerTwo : PlayerOne;
            }, 0);
        });
        
    };

    function activateGame() {
        overlay.style.display = 'none';
        contButtonsClicked = 0;
        CurrentPlayer = PlayerOne;
        updateStatusNames();
        Board = new BoardHandler();  
        const BoardSelections = Board.selections;

        BoardSelections.forEach((selection) => {
            selection.addEventListener('click', handleClick, { once: true });
        });
    };
    function restart(){
        const Selections = document.getElementsByClassName('selection');
        Object.values(Selections).forEach((value) => {
            value.remove();
        });
        PlayerOne.ButtonsSelected = [];
        PlayerTwo.ButtonsSelected = [];
        
        activateGame()
    };
    function deactivateGame() {
        const Selections = document.getElementsByClassName('selection_section');
        
        overlay.style.display = 'flex';
        overlay.style.backgroundImage = 'none';
        overlay.style.backgroundColor = 'white'
        document.querySelector('#game_checkout').style.display='flex';
        
        Object.values(Selections).forEach((value) => {
            value.classList.remove('selection_section');
            value.removeEventListener('click', handleClick);
        });
    };
    

    function checkVitory(WinningCombinations) {  
        contButtonsClicked += 1;
        let hasWinner = false;
        WinningCombinations.forEach(item => {
            numSequenceOfPlayer = 0;

            Object.values(CurrentPlayer.ButtonsSelected).forEach(value => {
                const result = item.includes(value);

                if (result === true) {
                    numSequenceOfPlayer += 1;
                };
                if (numSequenceOfPlayer === 3){
                    winner(CurrentPlayer);
                    hasWinner = true
                    deactivateGame();
                };
            });
        });

        if (!hasWinner && contButtonsClicked === 9){
            draw();
        };
        
    };
   

    function toMark(selection) {
        const marker = "marker_" + CurrentPlayer.symbol;
        selection.classList.add(marker);
        CurrentPlayer.ButtonsSelected.push(selection.id);
        console.log(CurrentPlayer.name + "=" + CurrentPlayer.ButtonsSelected);
        selection.classList.remove('selection_section');
    };

    function winner(plr) {
        outcome.innerHTML = `${plr.name} venceu!`
        deactivateGame();
    };
    function draw(){
        outcome.innerHTML = 'Draw'
        deactivateGame();
    };

    this.Start = function () {
        activateGame();
    };

    this.End = function () {
        deactivateGame();
    };

    
    
    reset_button.addEventListener('mousedown',()=>{
        reset_button.style.borderColor = "white";
    });

    reset_button.addEventListener('mouseup',()=>{
        reset_button.style.borderColor = 'black';
        restart()
    });
    finished_button.addEventListener('mousedown',()=>{
        finished_button.style.borderColor = "white";
    });

    finished_button.addEventListener('mouseup',()=>{
        finished_button.style.borderColor = 'black';
        location.reload()
    });
};
export function startGame(){

    if (sessionStorage.getItem('Players') == null){
        window.location.href = "index.html"
    }
    else {
        const Players = JSON.parse(sessionStorage.getItem('Players'));
        const game = new GameHandler(Players.PO,Players.PT);
        game.Start();
        
    };
};

