const request = (await fetch('https://raw.githubusercontent.com/stopwords-iso/stopwords-pt/master/stopwords-pt.json'))
const stopwords = await request.json()

export function isNotStopword(token: string) {
    return !stopwords.includes(token)
}

export function hasALetter(token: string) {
    return /[a-zA-Z]/.test(token)
}

export function countTokens(tokens: string[]) {
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

export function sortTokens(tokenCounts:{[key: string]: number}) {
    return Object.entries(tokenCounts).sort((a, b) => b[1] - a[1])
}

export async function getSubtitles() {
    const subtitles = []

    for await (const dirEntry of Deno.readDir('./subtitles/pt')) {
        subtitles.push(await Deno.readTextFile('./subtitles/pt/' + dirEntry.name))
    }

    return subtitles
} 

export function getTextFromSubtitle(subtitle: string): string[] {
    return subtitle.split('\n\n').map(s => s.split('\n').slice(2).join('\n'))
 }

export function isNotName(token: string) {
    const names = [
        'lourenço', 'antónio', 'eduardo', 'matilde', 'cristina', 'rodrigo', 'testículo', 'pôr', 'maria', 'sol', 'madalena', 'simão'
      ]
      return !names.includes(token)
}

export function getTokens(line: string) {
    return line.toLowerCase().replace(/[,.:"]/g, ' ').split(/\s+/) 
  }

export function readData(file: string) {
    const text = Deno.readTextFileSync(`./data/${file}.json`)
    return JSON.parse(text)
}

export function writeData(file: string, data: any) {
    Deno.writeTextFileSync(`./data/${file}.json`, JSON.stringify(data, null, '  '))
}
