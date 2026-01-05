const EMPTY = "X";
const FLOOR = "O";
const PLAYER = "P";
const BOX = "B";
const GOAL = "G";

const maps = [];


function createMap(size, pos) {
    const map = []
    for(let y = 0; y < size; y++) {
        const row = []
        for(let x = 0; x < size; x++) {
            if(pos[y]) {
                if(pos[y][x] == "O") {
                    row.push(["O"]);
                } else {
                    row.push([pos[y][x], "O"]);
                }
            } else {
                row.push(["X"]);
            }
        }
        map.push(row);
    }

    maps.push(map);
}


createMap(10, {
    3: "XOOOXXXXXX",
    4: "XPBOOOOOGX",
    5: "XOOOXXXXXX"
});

