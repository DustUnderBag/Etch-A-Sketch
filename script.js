const canvas = document.querySelector('.canvas');

//Color Modes
const colorInput = document.querySelector('input.color-input');
const rainbowToggle = document.querySelector('button.rainbow-toggle');

let colorMode = "customColor"; // "customColor" OR "rainbow"

//Draw Modes
const brush = document.querySelector('button.brush');
const eraser =document.querySelector('button.eraser');
const clearer = document.querySelector('button.clearer');

let drawMode = "draw"; // "draw" or "erase"
brush.classList.add("toggled");

//Set resolution
const slider = document.querySelector('input.slider');
const sliderValue = document.querySelector('span.slider-value');

//Initialze canvas Size
const canvasSize = 500;
canvas.style.width = canvasSize + "px";
canvas.style.height = canvasSize + "px";

//Initialize canvas and tiles
let tiles = [];
createTiles(getTileNum());

//Initialize color
colorInput.value = "#D6301F";
let color = colorInput.value;

//Set resolution
slider.addEventListener("input", () => {
    clearTiles();
    createTiles(getTileNum());
});

//Set drawMode
brush.addEventListener('click', () => {
    drawMode = "draw";
    brush.classList.add("toggled");

    eraser.classList.remove('toggled');
});

eraser.addEventListener('click', () => {
    drawMode = "erase";
    eraser.classList.add('toggled');

    brush.classList.remove('toggled');
});

clearer.addEventListener('click', () => {
    tiles.forEach(tile => {
        tile.style.backgroundColor = "transparent";
    })
});

//Pick custom color
colorInput.addEventListener('input',() => {
    colorMode = "customColor";
    rainbowToggle.classList.remove("toggled");
});

//Toggle rainbow mode
rainbowToggle.addEventListener('click', () => {
    if(colorMode !== "rainbow") {
        colorMode = "rainbow";
    }else {
        colorMode = "customColor";
    }
    rainbowToggle.classList.toggle("toggled");
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

        tiles[i].addEventListener( "mouseover", (e) => {
            if(drawMode === "draw") {
              drawTile(e);
            }else {
                eraseTile(e);
            }  
        });
    }
}

function clearTiles() {
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

//Draw
function drawTile(e) {
    switch(colorMode) {
        case "customColor":
            color = pickColor();
            break;
        case "rainbow":
            color = randomizeColor();
            break;
    }
    e.target.style.backgroundColor = color;
}

//Erase
function eraseTile(e) {
    e.target.style.backgroundColor = "transparent";
}

//Color Mode Functions
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