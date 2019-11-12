import { InputState, Direction, KeyCode, KeyCodes, InputSource } from "../utils/definitions";


const mapKeyToDirection = (keyCode: KeyCode) => {
    switch (keyCode) {
        case KeyCodes.KeyW:
            return Direction.N;
        case KeyCodes.KeyD:
            return Direction.E;
        case KeyCodes.KeyS:
            return Direction.S;
        case KeyCodes.KeyA:
            return Direction.W;
    }
}

const isKeyBind = (keyCode: KeyCode) => {
    return Object.values(KeyCodes).some((code) => code === keyCode);
}

export class PlayerInputSource implements InputSource {
    inputState: InputState = {
        [Direction.N]: false,
        [Direction.E]: false,
        [Direction.S]: false,
        [Direction.W]: false
    }

    constructor() {
        document.addEventListener("keydown", (e: KeyboardEvent) => {
            if (isKeyBind(e.code as KeyCode)) {
                this.inputState[mapKeyToDirection(e.code as KeyCode)] = true;
            }
        });

        document.addEventListener("keyup", (e: KeyboardEvent) => {
            if (isKeyBind(e.code as KeyCode)) {
                this.inputState[mapKeyToDirection(e.code as KeyCode)] = false;
            }

        });
    }

    hasInput(): boolean {
        return Object.values(this.inputState).some((value) => value);
    }

    tick(delta: number) {
        // Nothing to do here, as
    }
}