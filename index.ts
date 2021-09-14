import { countTokens, getSubtitles, getTextFromSubtitle, hasALetter, isNotStopword } from "./src/lib.ts";

const subtitles = await getSubtitles();

const allLines = subtitles.map(getTextFromSubtitle).flat()

const tokens = allLines.join('\n').toLowerCase().replace(/\,/g, '').split(/\s+/)

const cleanedTokens = tokens.filter(isNotStopword).filter(hasALetter)

const tokensSorted = countTokens(cleanedTokens)

console.log(tokensSorted.slice(0, 40))


