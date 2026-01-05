const boardNode = document.querySelector("#board");
const rootNode = document.documentElement;
const boardNodeSize = 500;

let currentMap = [...maps[0]];
let playerPos = {y: 0,x: 0};
let boxesPos = [];
let goalsPos = [];


// initializations
rootNode.style.setProperty("--board-size", boardNodeSize + "px");
draw();
setPositions();
window.addEventListener("keydown", (e) => {
    const direction = e.key.slice(5).toLowerCase();
    move(direction);
    checkForGoals();
})


function draw() {
    boardNode.innerHTML = "";
    currentMap.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            const sqr = document.createElement("div");
            rootNode.style.setProperty("--sqr-size", boardNodeSize / currentMap.length + "px");       
            boardNode.appendChild(sqr);

            const items = currentMap[rowIndex][columnIndex];
            displayItems(items, sqr);
            
        });
    });
}

function checkForGoals() {
    let goals = 0;
    goalsPos.forEach((g) => {
        const itemsInGoalPos = currentMap[g.y][g.x];
        if(itemsInGoalPos[0] == BOX && itemsInGoalPos[1] == GOAL) {
            goals += 1;
        }
    });

    if(goals == goalsPos.length) {
        // ALL GOALS ARE REACHED
        console.log("GOAL");
    }
}

function setPositions() {
    currentMap.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {    
            // set the positions of the main items (boxes, player, goals)
            const items = column;
            if(items[0] === PLAYER) {
                playerPos = {y: rowIndex, x: columnIndex};
            } else if(items[0] === BOX) {
                boxesPos.push({y: rowIndex, x:columnIndex});
            } else if(items[0] === GOAL) {
                goalsPos.push({y: rowIndex, x: columnIndex});
            }
            
        });
        });
}

function move(direction) {
    const player = currentMap[playerPos.y][playerPos.x][0];

    let y = 0;
    let x = 0;
    switch(direction) {
        case "right":
            x = 1;
            break;
        case "left":
            x = -1;
            break;
        case "up":
            y = -1
            break;
        case "down":
            y = 1;
            break;
    }

    const nextY = playerPos.y + y;
    const nextX = playerPos.x + x;

    // prevent the player from moving out of bounds
    if (
        playerPos.y + y < 0 || 
        playerPos.x + x < 0 || 
        playerPos.y > currentMap.length || 
        playerPos.x > currentMap[0].length ||
        currentMap[nextY][nextX][0] == EMPTY
    ) {
        return;
    };
    

   
    // if the player bumps to a box
    // the box moves in the same direction as the player
    const itemInfront = currentMap[nextY][nextX];
    const box = itemInfront[0];

  

    if(itemInfront[0] == BOX) {
        const itemInfrontOfBox = currentMap[nextY + y][nextX + x];

        if(itemInfrontOfBox[0] == EMPTY) return;

        // if there's a box in front of the player
        // remove the box from the box's current position before moving
        // only then we remove the player from the player's current position before moving
        currentMap[nextY][nextX].shift();
        currentMap[nextY + y][nextX + x].unshift(box);
        currentMap[playerPos.y][playerPos.x].shift(); 
    } else {
        // if no box in front of the player
        // only remove the player from the player's current position before moving
        currentMap[playerPos.y][playerPos.x].shift(); 
    }



    currentMap[nextY][nextX].unshift(player);
    playerPos = {y: nextY, x: nextX};

    draw();
}




function displayItems(items, sqr) {
    let bgColor;
    switch(items[0]) {
        case EMPTY:
            bgColor = "#000";
            break;
        case FLOOR:
            bgColor = "#333";
            break;
        case PLAYER:
            bgColor = "#55F";
            break;
        case BOX:
            bgColor = "#F55";
            break;
        case GOAL:
            bgColor = "#5F5";
    }

    sqr.style.setProperty("background-color", bgColor);
}

