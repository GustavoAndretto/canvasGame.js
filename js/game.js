(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var viewport = document.getElementById('viewport');
var context = viewport.getContext('2d');

var fps = document.getElementById('framerate');
var dbg = document.getElementById('debug');

var keys = [];

var previousDelta = 0;

var player = {
    posX: 0,
    posY: 0,
    speedX: 4,
    speedY: 4,
    maxJumpHeight: 50,
    jumpSpeed: 10,
    jumping: false,
    walking: false,
	spriteObj: document.getElementById('player')
}

function start() {
    viewport.width = 600;
    viewport.height = 400;

    player.posX = (viewport.width / 2) - (32 / 2);
    player.posY = (viewport.height - 32);

    window.addEventListener('load', update);

    document.body.addEventListener('keydown', function (e) {
        keys[e.keyCode] = true;
        document.getElementById('lastkey').innerHTML = e.key + "(down)";
    });
    
    document.body.addEventListener('keyup', function (e) {
        keys[e.keyCode] = false;
        document.getElementById('lastkey').innerHTML = e.key + "(up)";
    });
}

function update(currentDelta) {

    var deltaTime = currentDelta - previousDelta;

    // z button = 90
    if(keys[90] == true) { // jump
        player.jumping = true;
    }
    else if(keys[90] == false) {
        player.jumping = false;
    }

    if(player.jumping) {
        player.posY -= player.jumpSpeed;
    }
    else {
        player.posY += player.jumpSpeed;
    }

    // Horizontal Position
    if(keys[39] == true) { // arrow right
        player.posX += player.speedX;
    }
    else if(keys[37] == true) { // arrow left
        player.posX -= player.speedX;
    }

    // Lock object position inside viewport (Horizontal)
    if(player.posX < 0) {
        player.posX = 0;
    }
    else if(player.posX > viewport.width - 32) {
        player.posX = viewport.width - 32;
    }

    // Lock object position inside viewport (Vertical)
    if(player.posY < 0) {
        player.posY = 0;
    }
    else if(player.posY > viewport.height - 32) {
        player.posY = viewport.height - 32;
    }

	// Clears viewport before redraw
    context.clearRect(0, 0, viewport.width, viewport.height);

    // Draw player
    context.drawImage(player.spriteObj, player.posX, player.posY, 32, 32);

    dbg.innerHTML = player.posX;

    fps.innerHTML = Math.floor((1 / deltaTime) * 1000) + " ("+ deltaTime.toFixed(2) + "ms)";

    previousDelta = currentDelta;

    requestAnimationFrame(update);
}

start();
