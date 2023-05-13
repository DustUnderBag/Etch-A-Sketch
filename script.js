const canvas = document.querySelector('.canvas');
const colorInput = document.querySelector('input.color-input');
const rainbowToggle = document.querySelector('button.rainbow-toggle');
const eraseToggle =document.querySelector('button.erase-toggle');

const slider = document.querySelector('input.slider');
const sliderValue = document.querySelector('span.slider-value');

let drawMode = "customColor";

const canvasSize = 500;
canvas.style.width = canvasSize + "px";
canvas.style.height = canvasSize + "px";

let tiles = [];

createTiles(getTileNum());

slider.addEventListener("input", () => {
    removeTiles();
    createTiles(getTileNum());
});

colorInput.addEventListener('input',() => {
    drawMode = "customColor";
    rainbowToggle.classList.remove("toggled");
    eraseToggle.classList.remove("toggled");
});

rainbowToggle.addEventListener('click', () => {
    rainbowToggle.classList.toggle("toggled");
    eraseToggle.classList.remove("toggled");

    if(drawMode !== "rainbow") {
        drawMode = "rainbow";
    }else {
        drawMode = "customColor";
    }
});

eraseToggle.addEventListener('click', () => {
    eraseToggle.classList.add("toggled");
    rainbowToggle.classList.remove("toggled");
    drawMode = "erase";
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
    switch(drawMode) {
        case "customColor":
            color = pickColor();
            break;
        case "rainbow":
            color = randomizeColor();
            break;
        case "erase":
            color = "transparent";
    }
    this.style.backgroundColor = color;
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