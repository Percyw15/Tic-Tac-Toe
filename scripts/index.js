
function GameBoard(){
    const Box = document.getElementById('game');
    const board = [
    'top-left','top-mid','top-right',
    'mid-left','mid-mid','mid-right',
    'bottom-left','bottom-mid','bottom-right'
    ];
   
    
    const configStyleElement = function(item){
        
        const selectionElement = document.createElement('div');
        selectionElement.className = `${item} selection_section`;
        Box.appendChild(selectionElement);
        return selectionElement;
    };

    const selections = []
    board.forEach(item=>{
        const element = configStyleElement(item)
        selections.push(element);
    });
    return selections;
};
function Player(name,symbol){
    this.name = name;
    this.symbol = symbol;
};


function GameHandler(PlayerOne,PlayerTwo){
    this.Start = function(){
        var CurrentPlayer = PlayerOne 
        const Board = GameBoard();
        Board.forEach(selection=>{
            selection.addEventListener('click',()=>{

            const toMark = function(selection){
                const marker = "marker_"+CurrentPlayer.symbol
                selection.classList.add(marker)
                CurrentPlayer = CurrentPlayer === PlayerOne ? PlayerTwo : PlayerOne;
                console.log('Removendo, player atual: ',CurrentPlayer)
            };
            toMark(selection)
            },{once:true});
            
        });
    };
};

const PO = new Player("Percy","X");
const PT = new Player("Frank","O");


const Game = new GameHandler(PO,PT);
Game.Start()


