import { shows } from "../../data/shows"


export async function GET() {
    const indexFirst = Math.floor(Math.random()*shows.length);
    let indexSecond;
    do {
        indexSecond = Math.floor(Math.random()*shows.length)
    } while (indexSecond === indexFirst)


    
    const pairShows = [shows[indexFirst], shows[indexSecond]];

    const filteredPair = pairShows.map(({id, name, imageUrl}) => ({
        id, name, imageUrl
    }));

    return Response.json({
        first: filteredPair[0],
        second: filteredPair[1]
    });
}

