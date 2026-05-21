import settings from "./settings.js";
import {parseSettings} from "./helper.js";
import {detectLangByBrowser, translator} from "./translation.js";
import {localeLoader} from "./translations.js";
import main from "./main.js";

export function starter(window, document) {
    parseSettings(window.location.search, settings);
    settings.lang = settings.lang || detectLangByBrowser(window);

    const trans = translator(settings.lang, localeLoader());

    trans.warmUp().then(async () => {
        const rulesEl = document.querySelector(".rules");
        rulesEl.innerHTML = (await trans.t("rules")).replaceAll("\n", "<br>");
        document.title = await trans.t("game");
    });
    document.documentElement.lang = trans.getLang();


    const g = main(document, settings, trans);
    return g;
}
