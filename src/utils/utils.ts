import { Direction, InputState } from "./definitions";

export const getDirectionFromInput = (inputState: InputState): Direction => {
    const { N, E, S, W } = inputState;

    if (N && E) {
        return Direction.NE;
    }

    if (E && S) {
        return Direction.SE;
    }

    if (S && W) {
        return Direction.SW;
    }

    if (W && N) {
        return Direction.NW;
    }

    if (N) {
        return Direction.N;
    }

    if (E) {
        return Direction.E;
    }

    if (S) {
        return Direction.S;
    }

    if (W) {
        return Direction.W;
    }
}

/**
 * Helper for switching to a animation depending on the current direction.
 * Animation names must be clockwise starting from north: N, NE, E, SE..7
 */
export const directionAnimationSwitch = (direction: Direction, anims: Array<string>) => {
    switch (direction) {
        case Direction.N:
            return anims[0];
        case Direction.NE:
            return anims[1];
        case Direction.E:
            return anims[2];
        case Direction.SE:
            return anims[3];
        case Direction.S:
            return anims[4];
        case Direction.SW:
            return anims[5];
        case Direction.W:
            return anims[6];
        case Direction.NW:
            return anims[7];
    }
}