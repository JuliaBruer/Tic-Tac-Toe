let fields = [];
let currentShape = 'cross';
let gameOver = false;
let AUDIO_GAMEOVER = new Audio('audio/game-over-audio.mp3');
let undecidedEnd = 0;
let winner;

function fillShape(id) {
    if (!fields[id] && !gameOver) {
        if (currentShape == 'cross') {
            currentShape = 'circle';
            document.getElementById('player-1').classList.add('inactive-player');
            document.getElementById('player-2').classList.remove('inactive-player');
            undecidedEnd++;
        } else {
            currentShape = 'cross';
            document.getElementById('player-1').classList.remove('inactive-player');
            document.getElementById('player-2').classList.add('inactive-player');
            undecidedEnd++;
        }
        fields[id] = currentShape;
        draw();
        win();
    }
}

function draw() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            document.getElementById(`circle-${i}`).classList.remove('d-none');
        }
        if (fields[i] == 'cross') {
            document.getElementById(`cross-${i}`).classList.remove('d-none');
        }     
    }
}

function win() { 
    horizontalLines();
    verticalLines();
    diagonalLines();
}

function horizontalLines() {
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-0').style.transform = 'scaleX(1)';
    }
    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        document.getElementById('line-1').style.transform = 'scaleX(1)';
    }
    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        document.getElementById('line-2').style.transform = 'scaleX(1)';
    }
    if (winner) {
        endOfGame();
    }
}

function verticalLines() {
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-3').style.transform = 'rotate(90deg) scaleX(1)';
    }
    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        document.getElementById('line-4').style.transform = 'rotate(90deg) scaleX(1)';
    }
    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-5').style.transform = 'rotate(90deg) scaleX(1)';
    }
    if (winner) {
        endOfGame();
    }
}

function diagonalLines() {
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-6').style.transform = 'rotate(45deg) scaleX(1)';
    }

    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-7').style.transform = 'rotate(-45deg) scaleX(1)';
    }
    if (winner) {
        endOfGame();
    }
}

function endOfGame() {
    winner = null;
    undecidedEnd = 9;
    gameOver = true;

    setTimeout(function() {
        document.getElementById('game-over-img').classList.remove('d-none');
        document.getElementById('restart-btn').classList.remove('d-none');
    }, 1000);
    AUDIO_GAMEOVER.play();
}

function restart() {
    gameOver = false;
    fields = [];
    undecidedEnd = 0;

    document.getElementById('game-over-img').classList.add('d-none');
    document.getElementById('restart-btn').classList.add('d-none');
    
    for (let i = 0; i < 8; i++) {
        document.getElementById(`line-${i}`).style.transform = 'scaleX(0)';
    }

    for (let i = 0; i < 9; i++) {
        document.getElementById(`circle-${i}`).classList.add('d-none');
        document.getElementById(`cross-${i}`).classList.add('d-none');
    }
}