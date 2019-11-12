import { InputSource, InputState, Direction } from "../utils/definitions";

export class AiInputSource implements InputSource {
    inputState: InputState = {
        [Direction.N]: false,
        [Direction.E]: false,
        [Direction.S]: false,
        [Direction.W]: false
    }

    hasInput(): boolean {
        // We could decide on a strategy here
        return false;
    }

    tick(delta: number) {
        // Execute strategy here
    }
}