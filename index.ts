import { countTokens, getSubtitles, getTextFromSubtitle, hasALetter, isNotStopword, sortTokens } from "./src/lib.ts";

const subtitles = await getSubtitles();

const allLines = subtitles.map(getTextFromSubtitle).flat()

const tokens = allLines.join('\n').toLowerCase().replace(/\,/g, '').split(/\s+/)

const cleanedTokens = tokens.filter(isNotStopword).filter(hasALetter)

const tokenCounts = countTokens(cleanedTokens)

const tokensSorted = sortTokens(tokenCounts)

const bestLines = allLines.map(line => [line, rateLine(line)]).sort(([, a], [, b]) => (b as number) - (a as number))
console.log(bestLines.slice(0, 60))

console.log(tokensSorted.slice(0, 40))

function rateLine(line: string): number {
  const tokens = getTokens(line)
  const cleanedTokens = tokens.filter(isNotStopword).filter(hasALetter)
  return (cleanedTokens.reduce((acc, token) => acc + rateToken(token), 0)) / cleanedTokens.length
}

function rateToken(token: string): number {
    return Math.min(tokenCounts[token] || 0, 30)
}

function getTokens(line: string) {
  return line.toLowerCase().replace(/\,/g, '').split(/\s+/) 
}