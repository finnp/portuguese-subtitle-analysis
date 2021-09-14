

const request = (await fetch('https://raw.githubusercontent.com/stopwords-iso/stopwords-pt/master/stopwords-pt.json'))
const stopwords = await request.json()

const subtitles = []

for await (const dirEntry of Deno.readDir('./subtitles/pt')) {
    subtitles.push(await Deno.readTextFile('./subtitles/pt/' + dirEntry.name))
}

const text = subtitles.join('\n')

const completeText = text.split('\n\n').map(s => s.split('\n').slice(2)).flat().join(' ');

const tokens = completeText.toLowerCase().split(/\s+/)

const cleanedTokens = tokens.filter(isNotStopword).filter(hasALetter)

const tokenCounts = countTokens(cleanedTokens)

const tokensSorted = Object.entries(tokenCounts).sort((a, b) => b[1] - a[1])

console.log(tokensSorted.slice(0, 20))

function isNotStopword(token: string) {
    return !stopwords.includes(token)
}

function hasALetter(token: string) {
    return /[a-zA-Z]/.test(token)
}

function countTokens(tokens: string[]) {
    const tokenCounts: {[key: string]: number} = {}

    for (const token of tokens) {
        if (!tokenCounts[token]) {
            tokenCounts[token] = 1
        } else {
            tokenCounts[token] += 1
        }
    }

    return tokenCounts
}