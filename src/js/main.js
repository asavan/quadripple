import {presenter} from "./presenter.js";

export default function main(document, trans) {
    const eng = presenter(onWin);

    const button = document.querySelector(".button");
    button.addEventListener("click", (e) => {
        e.preventDefault();
        if (eng.isGameOver()) {
            onWin();
            return;
        }
        rotateTable();
        eng.next();
        resetMove();
    });

    const table = document.querySelector(".table");

    function rotateTable() {
        table.classList.add("spin");
        setTimeout(()=>{
            table.classList.remove("spin");
        }, 2000);
    }

    const handleClick = (item, index) => {
        if (eng.isGameOver()) {
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
        document.querySelector(".counter").textContent = text;
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
