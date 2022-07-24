export default function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min))
}

export function getGradient(firstColor, lastColor, interval) {
    const colors = []
    // let tempColor = lastColor
    colors[0] = firstColor
    const first = firstColor.replace(/[^\d,]/g, '').split(',')
    const last = lastColor.replace(/[^\d,]/g, '').split(',')
    let fR = first[0]
    let fG = first[1]
    let fB = first[2]
    let lR = last[0]
    let lG = last[1]
    let lB = last[2]
    for (let i = 1; i < interval + 1; i++) {
        const newR = Math.abs(fR - (Math.abs(lR - fR) / (interval + 1) * i))
        const newG = Math.abs(fG - (Math.abs(lG - fG) / (interval + 1) * i))
        const newB = Math.abs(fB - (Math.abs(lB - fB) / (interval + 1) * i))
        colors[i] = `rgb(${newR},${newG},${newB})`
    }
    colors.push(lastColor)
    return colors
}
