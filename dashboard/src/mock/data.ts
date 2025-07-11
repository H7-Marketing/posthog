export function randomData(length = 10): number[] {
    return Array.from({ length }, () => Math.round(Math.random() * 100))
}
