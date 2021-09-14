import { getTokens, hasALetter, isNotName, isNotStopword, readData, writeData } from "./src/lib.ts";

const lines = readData('lines')

const allTokens = []

for (const line of lines) {
    const tokens = getTokens(line.text)
    for (const token of tokens) {
        if ( hasALetter(token) && isNotName(token) && isNotStopword(token)) {
            allTokens.push({
                lineId: line.id,
                token
            })
        }
    }
}

writeData('tokens', allTokens)

console.log(allTokens.length, 'tokens')