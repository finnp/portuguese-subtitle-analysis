

const request = (await fetch('https://raw.githubusercontent.com/stopwords-iso/stopwords-pt/master/stopwords-pt.json'))
const stopwords = await request.json()

const text = await Deno.readTextFile("./subtitles/episode_1_pt.vtt");


const completeText = text.split('\n\n').map(s => s.split('\n').slice(2)).flat().join(' ');

const tokens = completeText.toLowerCase().split(/\s+/)

const tokensWithoutStopwords = tokens.filter(token => !stopwords.includes(token))

const tokenCounts: {[key: string]: number} = {}

for (const token of tokensWithoutStopwords) {
    if (!tokenCounts[token]) {
        tokenCounts[token] = 1
    } else {
        tokenCounts[token] += 1
    }
}


const tokensSorted = Object.entries(tokenCounts).sort((a, b) => b[1] - a[1])

console.log(tokensSorted.slice(0, 20))

