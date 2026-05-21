import {presenter} from "./presenter.js";
import {delay} from "./helper.js";
import {optimalCounter} from "./optimal-counter.js";

export default function main(document, settings, trans) {
    const eng = presenter(onWin);
    const op = optimalCounter(eng, settings.gap);
    let inMove = false;

    const helpBtn = document.querySelector(".help-btn");
    helpBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const rulesEl = document.querySelector(".rules");
        rulesEl.innerHTML = (await trans.t("rules")).replaceAll("\n", "<br>");
        const pop = document.querySelector("#my-popover");
        pop.showPopover();
    });

    const button = document.querySelector(".button");
    button.addEventListener("click", async (e) => {
        e.preventDefault();
        if (eng.isGameOver()) {
            return onWin();
        }
        if (inMove) {
            return;
        }
        inMove = true;
        const rtPromise = rotateTable();
        await delay(500);
        eng.next();
        await resetMove();
        await rtPromise;
        inMove = false;
    });

    const table = document.querySelector(".table");

    async function rotateTable() {
        table.classList.add("spin");
        await delay(2000);
        table.classList.remove("spin");
    }

    const handleClick = (item, index) => {
        if (eng.isGameOver() || inMove) {
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
        eng.select(index);
    }

    function makeCounterText(counter) {
        return trans.pluralise("move", counter);
    }

    async function resetMove() {
        document.querySelectorAll(".circle").forEach(el => el.classList.remove("flipped"));
        const text = await makeCounterText(eng.getCounter());
        const counterEl = document.querySelector(".counter");
        counterEl.textContent = text;
        if (op.isOptimal()) {
            counterEl.classList.add("optimal");
        } else {
            counterEl.classList.remove("optimal");
        }

        if (op.tooManyMoves()) {
            counterEl.classList.add("too-many");
        } else {
            counterEl.classList.remove("too-many");
        }
    }

    async function onWin() {
        const text1 = await trans.t("win");
        const text2 = await trans.pluralise("move", eng.getCounter());
        const pop = document.querySelector("#my-popover");
        const textHtml = pop.querySelector("p");
        textHtml.textContent = text1 + text2;
        pop.showPopover();
    }
}
