export function optimalCounter(eng, gap) {
    const optimal = 7;
    const isOptimal = () => eng.getCounter() <= optimal;
    const tooManyMoves = () => eng.getCounter() > optimal + gap;
    return {
        isOptimal,
        tooManyMoves
    };
}
