export function randomData(length = 5, max = 100): number[] {
    return Array.from({ length }, () => Math.round(Math.random() * max))
}
