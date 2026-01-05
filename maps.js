const EMPTY = "X";
const FLOOR = "O";
const PLAYER = "P";
const BOX = "B";
const GOAL = "G";

const maps = [];


function createMap(pos) {
    let size = 0;
    for(const index in pos) {
        size = pos[index].length;
        break;
    }
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


createMap({
    3: "XOBOOOGXXX",
    4: "XPBOOOOGOX",
    5: "XOOOXXXXXX"
});

createMap({
    0: "XPOOOOOOOXXXXX",
    1: "XOOOBOBOOXXXXX",
    2: "XXOXXXXOXXXXXX",
    3: "XXOXXXXOXXXXXX",
    4: "XOOXXXXOOXXXXX",
    5: "XOOOGGOOOXXXXX"
},);

createMap({
    3:  "XXXPOOOOOOOOOOXXX",
    4:  "XXXOBBOOOOOOOOOXXX",
    5:  "XXXOOOOOOOOOOOOXXX",
    6:  "XXXXXXXXOOXXXOOXXX",
    7:  "XGOOOOXXOOOOOOOXXX",
    8:  "XXXXGOXXXOXXXXXXXX",
    9:  "XXXXOOXXXOOXXXXXXX",
    10: "XXXXOOOOOOOXXXXXXX",
    11: "XXXXOOOXXXXXXXXXXX"
},);

