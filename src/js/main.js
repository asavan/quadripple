"use strict";

// 0 - One
// 1 - diagonal
// 2 - side

export default function main(document, trans) {
    let counter = 0;
    let gameOver = false;

    const button = document.querySelector(".button");
    button.addEventListener("click", (e) => {
        e.preventDefault();
        if (gameOver) {
            onWin();
            return;
        }
        rotateTable();
        next();
    });

    const table = document.querySelector(".table");

    function rotateTable() {
        table.classList.add("spin");
        setTimeout(()=>{
            table.classList.remove("spin");
        }, 2000);
    }

    const userMove = [true, true, true, true];

    let baseConditions = [true, true, true];

    const handleClick = (item, index) => {
        if (gameOver) {
            return;
        }
        item.classList.toggle("flipped");
        onClick(index);
    };

    const addClickHandler = (item, index) => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            handleClick(item, index);
        });
    };

    const addClickHandlerByClass = (selector, index) => {
        const item = document.querySelector(selector);
        addClickHandler(item, index);
    };

    addClickHandlerByClass(".circle1", 0);
    addClickHandlerByClass(".circle3", 1);
    addClickHandlerByClass(".circle4", 2);
    addClickHandlerByClass(".circle2", 3);

    function onClick(index) {
        userMove[index] = !userMove[index];
    }

    function moveType() {
        let counter = 0;
        for (const el of userMove) {
            if (el) {
                ++counter;
            }
        }

        if (counter === 0 || counter === 4) {
            return "None";
        }

        if (counter === 1 || counter === 3) {
            return "One";
        }

        if (counter === 2 && userMove[1] === userMove[3]) {
            return "Diagonal";
        }
        return "Side";
    }

    function makeCounterText(counter) {
        return trans.pluralise("move", counter);
    }

    async function resetMove() {
        for (let i = 0; i < 4; ++i) {
            userMove[i] = true;
        }
        document.querySelectorAll(".circle").forEach(el => el.classList.remove("flipped"));

        const text = await makeCounterText(counter);

        document.querySelector(".counter").textContent = text;
    }

    function transition(move, conditionNumber) {
        if (move === "None") {
            const result = [false, false, false];
            result[conditionNumber] = true;
            return result;
        }

        if (move === "One") {
            if (conditionNumber === 0) {
                return [false, true, true];
            }
            return [true, false, false];
        }

        if (move === "Diagonal" && conditionNumber === 0) {
            return [true, false, false];
        }
        if (move === "Diagonal" && conditionNumber === 1) {
            return [false, false, false];
        }
        if (move === "Diagonal" && conditionNumber === 2) {
            return [false, false, true];
        }

        if (move === "Side" && conditionNumber === 0) {
            return [true, false, false];
        }
        if (move === "Side" && conditionNumber === 1) {
            return [false, false, true];
        }
        if (move === "Side" && conditionNumber === 2) {
            return [false, true, false];
        }

        alert("Wrong combination " + move + " " + conditionNumber);
    }

    function merge(result, itr) {
        for (let i = 0; i < 3; ++i) {
            result[i] = result[i] || itr[i];
        }
    }

    const compareArrays = (a, b) =>
        a.length === b.length &&
      a.every((element, index) => element === b[index]);

    function onWin() {
        const text = "You win in " + counter + " moves!";
        const pop = document.querySelector("#my-popover");
        const textHtml = pop.querySelector("p");
        textHtml.innerText = text;
        pop.showPopover();
        gameOver = true;
    }

    function next() {
        const move = moveType();

        const result = [false, false, false];

        for (let i = 0; i < 3; ++i) {
            if (baseConditions[i]) {
                const it = transition(move, i);
                merge(result, it);
            }
        }
        baseConditions = result;
        ++counter;

        if (compareArrays(baseConditions, [false, false, false])) {
            onWin();
        }
        resetMove();
    }
}
