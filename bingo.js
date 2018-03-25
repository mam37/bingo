var bingo = new function(options) {   
    "use strict";

    if(!(typeof(options) == "object" && options !== null)) {
        options = {};
    }

    var id = "conference-call-bingo-" + Math.random().toString().replace('0.', '');
    var container = null;

    if('freeSpace' in options) {
        var freeSpace = options.freeSpace;
    }

    var numSquares = 25;
   
    var texts = [
        '"Can everyone see my screen?"',
        '"Next slide."', 
        'Talking on mute',
        'Angry tone',
        'Trying to get out of work',
        '"Can you see my screen?"',
        'Pet noises',
        '"views"',
        '"DTL"',
        '"discuss internally"',
        'meeting length exceeds 15 minutes',
        '"test environment"',
        'Connection issue',
        'Incomprehensible accent',
        '"table this discussion"',
        'Ask to repeat',
        'Assign blame',
        'Talking over someone',
        'Fulfill <50% action items',
        'Talking in the car',
        'Late arrival',
        'No-show',
        'Personal photos',
        'Last-minute agenda amendment',
        '"RCR"'
    ];
    
    this.show = function() {
        if(container === null) {
            container = createContainer();
            refreshBoardSquares();
            document.body.appendChild(container);
            addEventListeners();
        }
        container.style.display = "block";

    }

    this.hide = function() {
        container.style.display = "none";
    }

    this.remove = function() {
        container.remove();
        container = null;
    }

    function createContainer() {
        var container = document.createElement('div');
        container.id = id;
        var background = renderBackground();
        var gameSpace = renderGameSpace();
        gameSpace.appendChild(renderTable());
        container.appendChild(background);
        container.appendChild(gameSpace);
        return container;
    }
      
    function renderBackground() {
        var background = document.createElement('div');
        background.style.position = 'fixed';
        background.style.width = '100%';
        background.style.height = '100%';
        background.style.backgroundColor = 'gray';
        background.style.opacity = '0.5';
        background.style.top = '0';
        background.style.zIndex = '5000';
        return background;
    }
    
    function renderGameSpace() {
        var board = document.createElement('div');
        board.style.position = 'fixed';
        board.style.width = '90%';
        board.style.top = '5%';
        board.style.height = '90%';
        board.style.left = '5%';
        board.style.zIndex = '9999';
        board.style.backgroundColor = 'white';
        return board;
    }

    function renderTable() {
        var tbl = document.createElement("table");
        tbl.style.width = '100%';
        tbl.style.height = '100%';

        for(var i=0; i<5; i++) {
            var row = document.createElement("tr");
         
            for(var j=i*5; j<(i+1)*5; j++) {
                var cell = document.createElement("td");
                cell.className = "square square-" + j;
                cell.style.border = 'thin black solid';
                cell.style.width = "20%";
                cell.style.height = "20%";
                cell.style.textAlign = "center";
                row.appendChild(cell);
             } 
             
             tbl.appendChild(row);
        }

        return tbl;
    }   
     
    this.refresh = function() {
        refreshBoardSquares();
    }

    function refreshBoardSquares() {

        var _texts = texts.slice();
      

        function randomText() {
            var position = Math.floor(Math.random()*_texts.length);
            return _texts.splice(position, 1).pop();
         
        }
      
        for(var i=0; i<numSquares; i++) {
            var square = container.querySelector(".square-" + i);
            square.innerHTML = randomText();
            deHighlightSquare(square);
        }
        if(freeSpace !== undefined) {
            var square = container.querySelector(".square-12");
            square.innerHTML = freeSpace;
            highlightSquare(square);
        }
         
    }

    function highlightSquare(square) {
        square.style.backgroundColor = "#dee2e6";
        //square.style.fontSize = "150%";
        square.style.fontWeight = "bold";
        square.classList.add("highlight");

    }

    function deHighlightSquare(square) {
        square.style.backgroundColor = "white";
        //square.style.fontSize = "150%";
        square.style.fontWeight = "normal";
        square.classList.remove("highlight");
    }

    function toggleHighlight(square) {
        square.classList.toggle("highlight");
        
        if(square.classList.contains("highlight")) {
            highlightSquare(square);
        }
        else {
            deHighlightSquare(square);
        }

    }

    function addEventListeners() {
        container.querySelectorAll(".square").forEach(function(square) {
            square.onclick = function() {
                toggleHighlight(this); 
            };
        });

    }

}();
