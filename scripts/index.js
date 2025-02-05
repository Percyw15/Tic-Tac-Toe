
function BoardHandler(){
    this.WinningCombinations =[
    //Horizontal
    ['top-left','top-mid','top-right'],
    ['mid-left','mid-mid','mid-right'],
    ['bottom-left','bottom-mid','bottom-right'],

    //Vertical
    ['top-left','mid-left','bottom-left'],
    ['top-mid','mid-mid','bottom-mid'],
    ['top-right','mid-right','bottom-right'],
    
    //Diagonal
    ['top-left','mid-mid','bottom-right'],
    ['top-right','mid-mid','bottom-left']
];
    this.selections = [];

    const Box = document.getElementById('game');
    const board = [
    'top-left','top-mid','top-right',
    'mid-left','mid-mid','mid-right',
    'bottom-left','bottom-mid','bottom-right'
    ];

    const configStyleElement = function(item){
        const selectionElement = document.createElement('div');
        selectionElement.id = item;
        selectionElement.className = 'selection_section';
        Box.appendChild(selectionElement);
        return selectionElement;
    };

    board.forEach(item=>{
        const element = configStyleElement(item);
        this.selections.push(element);
    });
};

function Player(name,symbol){
    this.name = name;
    this.symbol = symbol;
    this.ButtonsSelected = [];
};

function GameHandler(PlayerOne,PlayerTwo){
    let CurrentPlayer = PlayerOne;

    function deactivateGame(){
        
    }

    function checkStatus(WinningCombinations){
        const numSequenceToWin = 3;
        WinningCombinations.forEach(item=>{
            let numSequenceOfPlayer = 0;

            Object.values(CurrentPlayer.ButtonsSelected).forEach(value=>{
                const result = item.includes(value);
                if (result === true){
                    numSequenceOfPlayer += 1
                };
                if (numSequenceOfPlayer === 3){
                    winner(CurrentPlayer);
                };
            });
        });
    };

    function toMark(selection) {
        const marker = "marker_"+CurrentPlayer.symbol
        selection.classList.add(marker)
        CurrentPlayer.ButtonsSelected.push(selection.id)
        console.log(CurrentPlayer.name+"="+CurrentPlayer.ButtonsSelected)
        selection.classList.add('no-hover');
    };

    function winner(plr){
        console.log(plr.name,"venceu")
    }

    this.Start = function(){
        const Board = new BoardHandler();
        const BoardSelections = Board.selections;
        const WinningCombinations = Board.WinningCombinations;

        BoardSelections.forEach(selection=>{
            selection.addEventListener('click',()=>{
                toMark(selection);
                checkStatus(WinningCombinations);
                CurrentPlayer = CurrentPlayer === PlayerOne ? PlayerTwo : PlayerOne;

            ;},
            {once:true});
        });
    };

    this.End = function(){
    };

    this.Restart = function(){

    };
    
    
};

const PO = new Player("Percy","X");
const PT = new Player("Frank","O");
const Game = new GameHandler(PO,PT);

Game.Start();

