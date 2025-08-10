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
    var outcome = null
    let chosenRating;
    const leftRating = left.rating
    const rightRating = right.rating
    if (chosenID === leftID) {
        chosenRating = leftRating
    }
    else {chosenRating = rightRating}
    if (Math.max(leftRating, rightRating) === chosenRating) {
        outcome = true
    }
    else {
        outcome = false
    }

    return Response.json(
        {
            leftRating: leftRating,
            rightRating: rightRating,
            outcome: outcome,
            chosenRating: chosenRating


        },
        {status: 200}
    )
    
}


    // const winRating = Math.max(leftRating, rightRating)
