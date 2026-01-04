const grid = document.querySelector("#grid");
const movesNode = document.querySelector(".moves");

// test map
const map = [
    ["0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0"],
    ["0","1","1","1","0","1","1","0"],
    ["0","3","2","1","1","1","1","0"],
    ["0","1","1","1","0","0","1","0"],
    ["0","0","0","0","0","0","1","1"],
    ["0","0","0","4","1","1","1","1"],
    ["0","0","0","0","0","0","0","0"],
]

const map_2 = [
    ["3","1","1","0","0","0","0","0"],
    ["1","2","1","0","0","0","0","0"],
    ["1","2","1","1","0","1","1","0"],
    ["1","1","1","1","1","1","1","0"],
    ["0","4","1","1","0","0","1","0"],
    ["0","0","0","0","0","0","1","1"],
    ["0","0","0","4","1","1","1","1"],
    ["0","0","0","0","0","0","0","0"],
]

const map_3 = [
    ["3","1","1","0","1","1","1","4"],
    ["1","2","1","0","1","1","0","0"],
    ["1","2","1","1","0","1","1","0"],
    ["1","1","2","1","1","1","1","0"],
    ["0","4","1","1","0","0","1","0"],
    ["0","0","0","0","0","0","1","1"],
    ["0","0","0","4","1","1","1","1"],
    ["0","0","0","0","0","0","0","0"],
]
const maps = [map, map_2, map_3]

let currentMap = maps[1];
let level = 1;
let moves = 0;
let destinations = 1;
let destinationsReached = 0;

draw(currentMap);
setDestinationsCount(currentMap)

window.addEventListener("keydown", (e) => {
    const playerPos = getPlayerPos(currentMap);
    switch(e.key) {
        case "ArrowRight":
            move(currentMap, playerPos, "right");       
            break;
        case "ArrowLeft":
            move(currentMap, playerPos, "left");
            break;
        case "ArrowUp":
            move(currentMap, playerPos, "up");
            break;
        case "ArrowDown":
            move(currentMap, playerPos, "down");
            break;
    }

    draw(currentMap)
});

function getPlayerPos(map) {
    let pos = {};
    map.forEach((r, ri) => {
        r.forEach((c , ci) => {
            if(c == "3") {
                pos.y = ri;
                pos.x = ci;
            }
        });
    });

    return pos
}

function draw(map) {
    grid.innerHTML = "";
    for(let y = 0; y < map.length; y++) {
        for(let x = 0; x < map.length; x++) {
            const cell = document.createElement("div");
            const item = map[y][x];
            const gridRect = grid.getBoundingClientRect();
            const gridWidth = gridRect.width;
            const gridHeight = gridRect.height;
            cell.style.width = gridWidth / map.length + "px";
            cell.style.height = gridHeight / map.length + "px";
            displayItem(cell, item);
            grid.appendChild(cell);
        }
    }

    movesNode.innerText = moves;

}

function setDestinationsCount(map){
    destinations = 0;
    for(let y = 0; y < map.length; y++) {
        for(let x = 0; x < map.length; x++) {
            const item = map[y][x];
            if(item == "4") {
                destinations++
            }
        }
    }
}

function displayItem(cell, item) {
    // set the text for the meant time;
    switch(item) {
        case "0":
            cell.style.backgroundColor = "#000";
            break;
        case "1":
            cell.style.backgroundColor = "#333";
            break;
        case "2":
            cell.style.backgroundColor = "#9a631cff";
            break;
        case "3":
            cell.style.backgroundColor = "#3d97b8ff";
            break;    
        case "4":
            cell.style.backgroundColor = "#4eb83dff";
            break; 
    }
}

function move(map, itemPos, direction) {
    const item = map[itemPos.y][itemPos.x];

    let posY = 0;
    let posX = 0

    switch(direction) {
        case "right":
            posX = 1;
            break;
        case "left":
            posX = -1;
            break;
        case "up":
            posY = -1;
            break;
        case "down":
            posY = 1;
            break;
    }

    
    // prevent from moving out of bounds

    let cellInFrontX = itemPos.x + posX < 0 ? 0 : itemPos.x + posX;
    let cellInFrontY = itemPos.y + posY < 0 ? 0 : itemPos.y + posY;
    let cellInFront = map[cellInFrontY][cellInFrontX];
    if(cellInFront == "0" || cellInFront == undefined) return;

    // if the cell in front of the player is a box, move the box
    if(cellInFront == "2") {
        let boxCellInFrontY = itemPos.y + (posY * 2);
        let boxCellInFrontX = itemPos.x + (posX * 2);
        boxCellInFrontY = boxCellInFrontY < 0 ? 0 : boxCellInFrontY;
        boxCellInFrontX = boxCellInFrontX < 0 ? 0 : boxCellInFrontX;
        const boxCellInFront = map[boxCellInFrontY][boxCellInFrontX]

        // prevent the box from moving out of bounds
        if(boxCellInFront == "0" || boxCellInFront === undefined || boxCellInFront == "2") return;
        
        // if the cell in front of the box is 4 it means the box reaches its desitination
        // hence the round complete alert
        // TODO: improve the round complete state
        if(boxCellInFront == "4") {
           destinationsReached++;
           if(destinationsReached === destinations) {
                level += 1;
                moves = 0;
                currentMap = maps[level - 1];
                destinationsReached = 0;
                draw(currentMap);
                setDestinationsCount(currentMap);
                return;
           }
        }

        map[boxCellInFrontY][boxCellInFrontX] = "2";
    }

    // changes the item on the previous location to be a floor
    // explicitly changing it to "1" cause we only move on floors anyway
    map[itemPos.y][itemPos.x] = "1";


    // move the item depending the on value of the posY & posX
    // if posX == 1, it'll move 1 cell to the right, -1 moves to the left
    // if posY == 1, it'll move 1 cell down, -1 moves up
    map[cellInFrontY][cellInFrontX] = item;
    moves += 1;
}



