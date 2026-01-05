const EMPTY = "X";
const FLOOR = "O";
const PLAYER = "P";
const BOX = "B";
const GOAL = "G";

const maps = [];


createMap({
    5: "XOOOOXXXXXXXXX",
    6: "XPOBOOOOGOXXXX",
    7: "XOOOOXXXXXXXXX",
});

createMap({
    3: "XXPOOOOOOOXXXX",
    4: "XXOOOBOBOOXXXX",
    5: "XXXOXXXXOXXXXX",
    6: "XXXOXXXXOXXXXX",
    7: "XXOOXXXXOOXXXX",
    8: "XXOOOGGOOOXXXX",
});

createMap({
    3:  "XXXPOOOOOOOOOOXXX",
    4:  "XXXOBBOOOOOOOOOXXX",
    5:  "XXXOOOOOOOOOOOOXXX",
    6:  "XXXXXXXXOOXXXOOXXX",
    7:  "XGOOOOXXOOOOOOOXXX",
    8:  "XXXXGOXXXOXXXXXXXX",
    9:  "XXXXOOXXXOOXXXXXXX",
    10: "XXXXOOOOOOOXXXXXXX",
    11: "XXXXOOOXXXXXXXXXXX",
},);

createMap({
    3:  "XXPOOOOOOOOOOOOXXX",
    4:  "XXOOBOOOOOOOOOOXXX",
    5:  "XXOOOXOXXXXXXOOOOX",
    6:  "XXOXXOOOXOOOXOOOXX",
    7:  "XXOXGOBOOOOOXXOOXX",
    8:  "XXOXXXOXXXOXXXXOXX",
    9:  "XXOXXXOXXXOXXXXOXX",
    10:  "XXOOXXOOXXOXXXXGXX",
    11: "XXXOBOOXXXOXXXXXXX",
    12: "XXXXXOOXXXOXXXXXXX",
    13: "XXXXXXXXXXGXXXXXXX",
});




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


