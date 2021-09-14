import { countTokens, getSubtitles, getTextFromSubtitle, hasALetter, isNotName, isNotStopword, sortTokens } from "./src/lib.ts";

const subtitles = await getSubtitles();

const allLines = subtitles.map(getTextFromSubtitle).flat()

const tokens = allLines.join('\n').toLowerCase().replace(/\,/g, '').split(/\s+/)

const cleanedTokens = tokens.filter(hasALetter)

const tokenCounts = countTokens(cleanedTokens)

const tokensSorted = sortTokens(tokenCounts)

const bestLines = allLines.map(line => [line, rateLine(line)]).sort(([, a], [, b]) => (b as number) - (a as number))

for (const [token,] of tokensSorted.slice(0, 100)) {
  if (isNotStopword(token) && isNotName(token)) {
    console.log(token, '\n', findLineForToken(token), '\n\n')
  }
}

function findLineForToken(token: string) {
  return (bestLines.find(([line]) => (getTokens(line as string)).includes(token)) || [])[0]
}

function rateLine(line: string): number {
  const tokens = getTokens(line)
  const cleanedTokens = tokens.filter(hasALetter)
  return (cleanedTokens.reduce((acc, token) => acc + rateToken(token), 0)) / cleanedTokens.length
}
 function rateToken(token: string): number {
  return Math.min(tokenCounts[token] || 0, 30)
}

function getTokens(line: string) {
  return line.toLowerCase().replace(/\,/g, '').split(/\s+/) 
}