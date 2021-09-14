import { getSubtitles } from "./src/lib.ts";

let id = 0

const subtitles = await getSubtitles();

const lines = subtitles.map((subtitle, index) => parseSubtitles(subtitle, Number(index) + 1)).flat()

await Deno.writeTextFileSync('./data/lines.json', JSON.stringify(lines, null, '  '))


function parseSubtitles(subtitle: string, episode: number){
    return subtitle.split('\n\n').slice(1, -1).map(parseLine).map(line => ({episode, id: id++, ...line}))
}

function parseLine(line: string) {
    const [_index, timestamp, ...texts] = line.split('\n')

    const [start, end] = timestamp.split(' --> ').map(timeToMilliseconds)

    return {
        text: texts.join('\n'),
        start,
        end
    }
}

function timeToMilliseconds(time: string){
    const [hours, minutes, seconds] = time.split(':').map(Number)
    return (hours * 60 * 60 + minutes * 60 + seconds) * 1000
}