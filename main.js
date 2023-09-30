// 0 - One
// 1 - diagonal
// 2 - side

function main() {
    let counter = 0;

    const button = document.querySelector(".button");
    button.addEventListener("click", (e) => {
        e.preventDefault();
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

    let baseConditions = [true, true, true]

    const circle1 = document.querySelector(".circle1");
    circle1.addEventListener("click", (e) => {
        e.preventDefault();
        circle1.classList.toggle("flipped");
        onClick(0);
    });

    const circle2 = document.querySelector(".circle3");
    circle2.addEventListener("click", () => {
        circle2.classList.toggle("flipped");
        onClick(1);
    });

    const circle3 = document.querySelector(".circle4");
    circle3.addEventListener("click", () => {
        circle3.classList.toggle("flipped");
        onClick(2);
    });

    const circle4 = document.querySelector(".circle2");
    circle4.addEventListener("click", () => {
        circle4.classList.toggle("flipped");
        onClick(3);
    });

    function onClick(index) {
        userMove[index] = !userMove[index]
    }

    function moveType() {
        let counter = 0;
        for (const el of userMove) {
            if (el) ++counter;
        }

        if (counter === 0 || counter === 4) {
            return 'None';
        }

        if (counter === 1 || counter === 3) {
            return 'One';
        }

        if (counter === 2 && userMove[1] === userMove[3]) {
            return 'Diagonal';
        }
        return 'Side';
    }

    function makeCounterText(counter) {
        return "Move " + counter;
    }

    function resetMove() {
        for (let i = 0; i < 4; ++i) {
            userMove[i] = true;
        }
        document.querySelectorAll(".circle").forEach(el => el.classList.remove("flipped"));

        document.querySelector(".counter").innerHTML=makeCounterText(counter);
    }

    function transition(move, conditionNumber) {
        if (move === 'None') {
            const result = [false, false, false];
            result[conditionNumber] = true;
            return result;
        }

        if (move === 'One') {
            if (conditionNumber === 0) {
                return [false, true, true];
            }
            return [true, false, false];
        }

        if (move === 'Diagonal' && conditionNumber === 0) {
            return [true, false, false];
        }
        if (move === 'Diagonal' && conditionNumber === 1) {
            return [false, false, false];
        }
        if (move === 'Diagonal' && conditionNumber === 2) {
            return [false, false, true];
        }

        if (move === 'Side' && conditionNumber === 0) {
            return [true, false, false];
        }
        if (move === 'Side' && conditionNumber === 1) {
            return [false, false, true];
        }
        if (move === 'Side' && conditionNumber === 2) {
            return [false, true, false];
        }

        alert("Wrong combination " + move + " " + conditionNumber);
    }

    function merge(result, itr) {
        for (let i = 0; i < 3; ++i) {
            result[i] = result[i] || itr[i];
        }
    }

    function next() {
        const move = moveType();

        let result = [false, false, false];

        for (let i = 0; i < 3; ++i) {
            if (baseConditions[i]) {
                const it = transition(move, i);
                merge(result, it);
            }
        }
        baseConditions = result;
        ++counter;

        if (baseConditions == [false, false, false].toString()) {
            alert("You win in " + counter + " moves!");
        }
        resetMove();
    }

}

main();
