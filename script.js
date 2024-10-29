const clues = {
    across: [
        { number: 3, question: "Makanan pokok", answer: "NASI", row: 2, col: 7 },
        { number: 7, question: "Raja Hutan", answer: "HARIMAU", row: 4, col: 1},
        { number: 8, question: "Buah yang mirip leci", answer: "RAMBUTAN", row: 5, col: 7 },
        { number: 10, question: "Alat musik petik", answer: "GITAR", row: 13, col: 7 },
        { number: 11, question: "Obat menolak angin", answer: "ANTANGIN", row: 9, col: 1 }
    ],
    down: [
        { number: 1, question: "Binatang berkantung", answer: "KANGURU", row: 0, col: 7 },
        { number: 2, question: "Tempat menyimpan uang", answer: "BANK", row: 3, col: 14 },
        { number: 4, question: "Tempat masak", answer: "DAPUR", row: 0, col: 3 },
        { number: 5, question: "Sebelum Hujan", answer: "MENDUNG", row: 4, col: 5 },
        { number: 6, question: "Sifat benda cair", answer: "MENGALIR", row: 7, col: 8 },
        { number: 9, question: "Tempat hijau", answer: "HUTAN", row: 4, col: 11 }
    ]
};

function createGrid() {
    const crosswordContainer = document.querySelector(".crossword");
    for (let i = 0; i < 12; i++) { 
        for (let j = 0; j < 12; j++) {
        }
    }
}



let score = 0;

function createGrid() {
    const crosswordContainer = document.querySelector(".crossword");
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = i;
            cell.dataset.col = j;

            const cellNumber = getCellNumber(i, j);
            if (cellNumber) {
                const numberSpan = document.createElement("span");
                numberSpan.className = "cell-number";
                numberSpan.textContent = cellNumber;
                cell.appendChild(numberSpan);
            }

            if (isActiveCell(i, j)) {
                const input = document.createElement("input");
                input.maxLength = 1;
                cell.appendChild(input);
            } else {
                cell.classList.add("block");
            }
            crosswordContainer.appendChild(cell);
        }
    }
}

function getCellNumber(row, col) {
    const allClues = [...clues.across, ...clues.down];
    const clue = allClues.find(c => c.row === row && c.col === col);
    return clue ? clue.number : null;
}

function isActiveCell(row, col) {
    for (const clue of clues.across) {
        if (row === clue.row && col >= clue.col && col < clue.col + clue.answer.length) {
            return true;
        }
    }
    for (const clue of clues.down) {
        if (col === clue.col && row >= clue.row && row < clue.row + clue.answer.length) {
            return true;
        }
    }
    return false;
}

function populateQuestions() {
    const acrossQuestions = document.getElementById("across-questions");
    const downQuestions = document.getElementById("down-questions");

    clues.across.forEach(clue => {
        const li = document.createElement("li");
        li.textContent = `${clue.number}. ${clue.question}`;
        acrossQuestions.appendChild(li);
    });

    clues.down.forEach(clue => {
        const li = document.createElement("li");
        li.textContent = `${clue.number}. ${clue.question}`;
        downQuestions.appendChild(li);
    });
}

function checkAnswers() {
    score = 0;
    const maxScore = clues.across.reduce((sum, clue) => sum + clue.answer.length, 0) +
        clues.down.reduce((sum, clue) => sum + clue.answer.length, 0);

    clues.across.forEach(clue => checkClue(clue, "across"));
    clues.down.forEach(clue => checkClue(clue, "down"));

    const percentage = Math.round((score / maxScore) * 100);
    document.getElementById("score").textContent = `Skor: ${score} (${percentage}%)`;
}

function checkClue(clue, direction) {
    const { answer, row, col } = clue;
    let correct = true;

    for (let i = 0; i < answer.length; i++) {
        const cellRow = direction === "across" ? row : row + i;
        const cellCol = direction === "across" ? col + i : col;
        const cell = document.querySelector(`.cell[data-row="${cellRow}"][data-col="${cellCol}"] input`);

        if (cell && cell.value.toUpperCase() === answer[i]) {
            score++;
            cell.style.color = "#27ae60";
        } else if (cell) {
            cell.style.color = "#c0392b";
            correct = false;
        }
    }

    return correct;
}

document.addEventListener("DOMContentLoaded", () => {
    createGrid();
    populateQuestions();
});