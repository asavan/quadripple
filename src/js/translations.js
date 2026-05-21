export function localeLoader() {
    return {
        "en": async () => {
            const module = await import("../locales/en.json", {
                with: {
                    type: "json"
                }
            });
            return module.default;
        },
        "ru": async () => {
            const module = await import("../locales/ru.json", {
                with: {
                    type: "json"
                }
            });
            return module.default;
        }
    };
}
