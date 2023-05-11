const canvas = document.querySelector('.canvas');
const button = document.querySelector('button.tile-num');
const slider = document.querySelector('input.slider');
const sliderValue = document.querySelector('span.slider-value');

const canvasSize = 500;
canvas.style.width = canvasSize + "px";
canvas.style.height = canvasSize + "px";

let tiles = [];

createTiles(getTileNum());

slider.addEventListener("change", () => {
    removeTiles();
    createTiles(getTileNum());
});


button.addEventListener('click', () => {
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

        tiles[i].addEventListener( "mouseover", () => tiles[i].classList.add("filled"));
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