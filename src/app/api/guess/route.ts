import { shows } from "../../data/shows"


export async function POST(req: Request) {
    const body = await req.json()
    const {leftID, rightID, chosenID, score, highScore} = body

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
    //Score calculations + outcome determination
    let newScore = score
    let newHighScore = highScore
    if (Math.max(leftRating, rightRating) === chosenRating) {
        outcome = true //win
        newScore = score + 1
        newHighScore = Math.max(newHighScore, newScore)
    }
    else {
        outcome = false //lose
        newHighScore = Math.max(newHighScore, newScore)
        newScore = 0
    }

    


    return Response.json(
        {
            leftRating: leftRating,
            rightRating: rightRating,
            outcome: outcome,
            chosenRating: chosenRating,
            newScore: newScore,
            newHighScore: newHighScore


        },
        {status: 200}
    )
    
}


    // const winRating = Math.max(leftRating, rightRating)
