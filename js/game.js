(function () { var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame; window.requestAnimationFrame = requestAnimationFrame; })();

class Object {
    constructor(posX, posY, width, height, sprite) {
        this.posX = posX;
        this.posY = posY;
        this.wdth = width;
        this.height = height;
        this.sprite = document.getElementById(sprite);
    }

    move(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }

    draw(viewport) {
        viewport.drawImage(this.sprite, this.posX, this.posY, this.width, this.height);
    }
}

class Player extends Object {
    constructor() {
        this.speedX = 4;
        this.speedY = 4;
        this.jumpMaxHeight = 150;
        this.jumpSpeed = 10;
        this.jumping = false;
        this.walking = false;
    }
}

class Scene {
    constructor() {

    }

    draw(viewport) {

    }
}

class Viewport {
    constructor(width, height, id) {
        this.width = width;
        this.height = height;
        this.id = id;
        this.fps = 0;
        this.latency = 0;
        this.previousDelta = 0;
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');

        this.canvas.width = width;
        this.canvas.height = height;
    }

    setFramerateHtmlElement(id) {
        this.fpsElement = document.getElementById(id);
    }

    updateFramerateHtmlElement() {
        this.fpsElement.innerHTML = this.fps + " (" + this.ms + "ms)";
    }

    getFramerate() {
        return this.fps;
    }

    getLatency() {
        return this.latency;
    }

    update(delta) {
        // Store Latency(dt - d0)
        this.latency = (delta - this.previousDelta).toFixed(2);

        // Store Framerate of viewport
        this.fps = Math.floor((1 / this.latency) * 1000);

        // TODO: Draw Scene

        // Store previous Delta
        this.previousDelta = delta;
    }
}

class Application {
    constructor() {
        // Initialize Viewport
        this.viewport = new Viewport(600, 400, 'viewport');
 
        // Set HTML Element to display Viewport framerate
        this.viewport.setFramerateHtmlElement('framerate');

        // Set HTML Element to display Last Key pressed
        this.setLastKeyHtmlElement('lastkey');
    }

    keyEvent(key, pressed) {

    }

    setLastKeyHtmlElement(id) {
        this.keyElement = document.getElementById(id);
    }

    start() {
        // Initialize Application.update()
        this.update(this.previousDelta);

        // Bind Key event listener
        document.body.addEventListener('keydown', (e) => { this.keyEvent(e, true); });
        document.body.addEventListener('keyup', (e) => { this.keyEvent(e, false); });
    }

    update(delta) {
        // Update Viewport
        this.viewport.update(delta);

        // Tells the browser that there are frames to update in the current window
        requestAnimationFrame((delta) => { this.update(delta); });
    }
}

(new Application()).start();