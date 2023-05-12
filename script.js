const canvas = document.querySelector('.canvas');

const colorInput = document.querySelector('input.color-input');

const slider = document.querySelector('input.slider');
const sliderValue = document.querySelector('span.slider-value');

const canvasSize = 500;
canvas.style.width = canvasSize + "px";
canvas.style.height = canvasSize + "px";

let tiles = [];

createTiles(getTileNum());

slider.addEventListener("input", () => {
    removeTiles();
    createTiles(getTileNum());
});

function createTiles(tileNum) {
    let tileSize = canvasSize / tileNum + "px";
    for(let i = 0; i < tileNum * tileNum; i++) {
        tiles[i] = document.createElement('div');
        tiles[i].classList.add('tile');

        let tileIndex = "tile" + i;
        tiles[i].setAttribute("id", tileIndex);

        tiles[i].style.width = tileSize;
        tiles[i].style.height = tileSize;
    
        canvas.appendChild(tiles[i]);

        tiles[i].addEventListener( "mouseover", draw);
    }
}

function removeTiles() {
    tiles.forEach(tile => canvas.removeChild(tile) );
    tiles = []; //clear array list of tiles.
}

function getTileNum() {
    let tileNum = slider.value;
    if(tileNum > 100) tileNum = 100;
    console.log(tileNum);
    sliderValue.textContent = tileNum + "x";
    return tileNum;
}

function draw() {
    let colorMode = randomizeColor();
    this.style.backgroundColor = colorMode;
}

function randomizeColor() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let color = `rgb(${r},${g},${b})`;
    return color;
}

function pickColor() {
    let color = colorInput.value;
    return color;
}