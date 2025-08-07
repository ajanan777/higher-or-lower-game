import { shows } from "../../data/shows"


export async function GET() {
    const indexFirst = Math.floor(Math.random()*shows.length);
    let indexSecond;
    do {
        indexSecond = Math.floor(Math.random()*shows.length)
    } while (indexSecond === indexFirst)

    const pairShows = [shows[indexFirst], shows[indexSecond]];

    return Response.json({
        first: pairShows[0],
        second: pairShows[1]
    });
}

