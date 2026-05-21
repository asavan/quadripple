function moveType(userMove) {
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

    throw new Error("Wrong combination " + move + " " + conditionNumber);
}

function merge(result, itr) {
    for (let i = 0; i < 3; ++i) {
        result[i] = result[i] || itr[i];
    }
}

const compareArrays = (a, b) =>
    a.length === b.length &&
    a.every((element, index) => element === b[index]);

export {compareArrays, merge, moveType, transition};
