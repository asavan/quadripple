export function hideElem(el) {
    if (el) {
        el.classList.add("hidden");
    }
}

export function showElem(el) {
    if (el) {
        el.classList.remove("hidden");
    }
}

export function install(window, document) {
    const btnAdd = document.querySelector(".butInstall");
    let beforeinstallpromptevent;
    btnAdd.addEventListener("click", (e) => {
        if (!beforeinstallpromptevent) {
            return;
        }
        e.preventDefault();
        hideElem(btnAdd);
        // Show the prompt
        beforeinstallpromptevent.prompt();
        // Wait for the user to respond to the prompt
        beforeinstallpromptevent.userChoice.then((resp) => {
            console.log(JSON.stringify(resp));
        });
    });

    window.addEventListener("beforeinstallprompt", (e) => {
        // Prevent the mini-info bar from appearing.
        e.preventDefault();
        // Stash the event so it can be triggered later.
        beforeinstallpromptevent = e;
        showElem(btnAdd);
    });
    return btnAdd;
}

function stringToBoolean(string) {
    switch (string?.toLowerCase()?.trim()) {
    case "true": case "yes": case "1": return true;
    case "false": case "no": case "0": case "": case null: return false;
    default: return Boolean(string);
    }
}

export function parseSettings(queryString, settings) {
    const urlParams = new URLSearchParams(queryString);
    const changed = [];
    for (const [key, value] of urlParams) {
        if (typeof settings[key] === "number") {
            settings[key] = Number.parseInt(value, 10);
        } else if (typeof settings[key] === "boolean") {
            settings[key] = stringToBoolean(value);
        } else {
            settings[key] = value;
        }
        changed.push(key);
    }
    return changed;
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
