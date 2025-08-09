import { shows } from "../../data/shows"


// Expects { leftId, rightId, chosenId }
export async function POST(req: Request) {
    const body = await req.json()
    const {leftID, rightID, chosenID} = body

    if (
        typeof leftID != "string" ||
        typeof rightID != "string" ||
        typeof chosenID != "string" ||
        !leftID.trim() ||
        !rightID.trim() ||
        !chosenID.trim()
    )   {
        return new Response("Invalid input", {status: 400});
    }
    if (chosenID !== leftID && chosenID !== rightID) {
        return new Response("chosenID does not match options", {status: 400});
    }


    const left = shows.find(show => show.id === leftID);
    const right = shows.find(show => show.id === rightID);

    if (!(left && right)) {
        return new Response("chosenID does not match options", {status: 400});
    }


    const leftRating = left.rating
    const rightRating = right.rating
    if (chosenID === leftID) {
        const chosenRating = leftRating
    }
    else {const chosenRating = rightRating}
    const winRating = Math.max(leftRating, rightRating)

    //return left and right rating, return win rating (maybe return the left/right object cuz i need to show it won)
    
}