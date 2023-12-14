let playerO = true;
let playerX = false;

// Define the winning combinations
const winningCombinations = [
    // Rows
    ["0_0", "0_1", "0_2"],
    ["1_0", "1_1", "1_2"],
    ["2_0", "2_1", "2_2"],
    // Columns
    ["0_0", "1_0", "2_0"],
    ["0_1", "1_1", "2_1"],
    ["0_2", "1_2", "2_2"],
    // Diagonals
    ["0_0", "1_1", "2_2"],
    ["0_2", "1_1", "2_0"],
];

let moves = 0;

function playMove(box) {
    if (box.value === "") {
        const currentPlayer = playerO ? "O" : "X";
        box.value = currentPlayer;
        document.getElementById('stateTurn').textContent = currentPlayer + "'s Turn";

        moves++;

        if (checkForWin(currentPlayer)) {
            document.getElementById('stateTurn').textContent = `Player ${currentPlayer} Wins!`;
            endGame();
        } else if (moves === 9) {
            document.getElementById('stateTurn').textContent = 'It\'s a Draw!';
            endGame();
        } else {
            if (currentPlayer === "X") {
                move();
            } else {
                togglePlayerTurn();
            }
        }
    }
}

function move() {
    let availableBoxes = [];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const box = document.getElementById(`${i}_${j}`);
                if (box.value === "") {
                    availableBoxes.push(box);
                }
            }
        }
        togglePlayerTurn();
}

function checkForWin(player) {
    for (const combination of winningCombinations) {
        const boxValues = combination.map((boxId) => getBoxValue(boxId));
        if (boxValues.every((value) => value === player && value !== "")) {
            return true;
        }
    }
    return false;
}

function togglePlayerTurn() {
    playerO = !playerO;
    playerX = !playerX;
}

function endGame() {
    console.log("Game Over");
}

function getBoxValue(boxId) {
    const box = document.getElementById(boxId);
    return box ? box.value : "";
}
