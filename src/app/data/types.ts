export type Item = {
    name: string;
    imageUrl: string;
    id: string;
}

export type Pair = {
    first: Item;
    second: Item
}

export type GuessResponse = {
    leftRating: number;
    rightRating: number;
    chosenRating: number;
    outcome: boolean
}

export type RevealState = {
  chosenId: string;
  outcome: boolean;
  leftRating: number;
  rightRating: number;
};
