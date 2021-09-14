import { getTokens, hasALetter, isNotName, isNotStopword } from "./src/lib.ts";

const text = await Deno.readTextFileSync("./data/lines.json")
const lines = JSON.parse(text)

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

Deno.writeTextFileSync('./data/tokens.json', JSON.stringify(allTokens, null, '  '))

console.log(allTokens.length, 'tokens')