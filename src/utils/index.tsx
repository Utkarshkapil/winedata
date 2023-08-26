export const mean = (numbers: number[]): number => {
    const sum = numbers.reduce((a, b) => a + b, 0);
    return parseFloat((sum / numbers.length).toFixed(3));
};
export { wineData } from "./wineData";
export const median = (numbers: number[]): number => {
    numbers.sort((a, b) => a - b);
    const mid = Math.floor(numbers.length / 2);
    return numbers.length % 2 !== 0
        ? parseFloat(numbers[mid].toFixed(3))
        : parseFloat(((numbers[mid - 1] + numbers[mid]) / 2).toFixed(3));
};

export const mode = (numbers: number[]): number => {
    const counts = new Map<number, number>();
    numbers.forEach((n) => {
        counts.set(n, (counts.get(n) || 0) + 1);
    });
    const maxCount = Math.max(...Array.from(counts.values()));
    const modes = Array.from(counts.keys()).filter(
        (number) => counts.get(number) === maxCount
    );
    return parseFloat(modes[0].toFixed(3));
};