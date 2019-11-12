// TODO use this somewhere?
export interface Vector {
    x: number;
    y: number;
}

/**
 * Base interface for objects which should be updated every frame.
 * @export
 * @interface Tickable
 */
export interface Tickable {
    update(delta: number): void;
}

export enum Direction {
    N = "N",
    NE = "NE",
    E = "E",
    SE = "SE",
    S = "S",
    SW = "SW",
    W = "W",
    NW = "NW"
}

export interface InputState {
    [Direction.N]: boolean;
    [Direction.E]: boolean;
    [Direction.S]: boolean;
    [Direction.W]: boolean;
}

export interface InputSource {
    inputState: InputState;
    hasInput(): boolean;
    tick(delta: number): void;
}

export enum KeyCodes {
    KeyW = "KeyW",
    KeyD = "KeyD",
    KeyS = "KeyS",
    KeyA = "KeyA"
}

export type KeyCode = KeyCodes.KeyW | KeyCodes.KeyD | KeyCodes.KeyS | KeyCodes.KeyA;
