import {compareArrays, merge, moveType, transition} from "./engine.js";

export function presenter(onWin) {
    let counter = 0;
    let gameOver = false;

    const userMove = [true, true, true, true];

    let baseConditions = [true, true, true];

    const select = (index) => {
        userMove[index] = !userMove[index];
    };

    const getCounter = () => counter;
    const isGameOver = () => gameOver;

    const resetMove = () => {
        for (let i = 0; i < 4; ++i) {
            userMove[i] = true;
        }
    };

    function next() {
        const move = moveType(userMove);

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
            gameOver = true;
            onWin();
        }
        resetMove();
    }

    return {
        getCounter,
        select,
        isGameOver,
        next
    };
}
