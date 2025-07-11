export function randomSeries(length: number): number[] {
    return Array.from({ length }, () => Math.round(Math.random() * 100))
}
