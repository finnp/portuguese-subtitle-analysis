import { readData, writeData } from "./src/lib.ts";

const tokens: {token: string, lineId: number}[]= readData('tokens')

const tokenCounts = tokens.reduce((acc, {token, lineId}) => {
    if (!acc[token]) {
        acc[token] = [lineId]
    } else {
        acc[token].push(lineId)
    }
    return acc
}, {} as {[token: string]: number[]})

const sortedTokens = Object.entries(tokenCounts).sort((a, b) => b[1].length - a[1].length)

writeData('counts', sortedTokens)

console.log(sortedTokens.length, 'different tokens')