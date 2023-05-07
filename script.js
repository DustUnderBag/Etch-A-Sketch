const canvas = document.querySelector('.canvas');
let tiles = [];

const canvasSize = 500;
let tileNum = 16;
let tileSize = canvasSize / tileNum + "px";
console.log(tileSize);

canvas.style.width = canvasSize + "px";
canvas.style.height = canvasSize + "px";

for(let i = 0; i < tileNum * tileNum; i++) {
    let tileIndex = "tile" + i;
    tiles[i] = document.createElement('div');
    tiles[i].classList.add('tile');
    tiles[i].setAttribute("id", tileIndex);

    tiles[i].style.width = tileSize;
    tiles[i].style.height = tileSize;

    canvas.appendChild(tiles[i]);

    console.log(tileIndex);
}

tiles.forEach(tile => {
    tile.addEventListener('mouseover', e => {
        e.target.classList.add("filled");
    });
});