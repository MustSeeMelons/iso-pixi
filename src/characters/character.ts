import * as PIXI from "pixi.js";
import { Viewport } from "../viewport";
import { Tickable, Direction, InputState, InputSource } from "../utils/definitions";
import { getDirectionFromInput, directionAnimationSwitch } from "../utils/utils";
import { Terrain } from "../terrain/terrain";

export interface ICharacterOptions {
    speed: number;
}

/**
 * Character container.
 * @export
 * @class Character
 */
export class Character implements Tickable {
    private terrain: Terrain;
    private direction: Direction;
    private currAnimKey: string = "swidle";
    private inputSource: InputSource;
    private options: ICharacterOptions;

    private sprite: PIXI.AnimatedSprite;
    private sheet: PIXI.Spritesheet; // TODO move this to a character manager

    private runAnimKeys: Array<string> = ["nrun", "nerun", "erun", "serun", "srun", "swrun", "wrun", "nwrun"];
    private idleAnimKeys: Array<string> = ["nidle", "neidle", "eidle", "seidle", "sidle", "swidle", "widle", "nwidle"];

    app: PIXI.Application;

    constructor(terrain: Terrain, viewport: Viewport, inputSource: InputSource, options: ICharacterOptions) {
        this.terrain = terrain;
        this.inputSource = inputSource;
        this.options = options;
        this.direction = Direction.SW;
        this.sheet = PIXI.Loader.shared.resources["src/resources/images/character.json"].spritesheet;

        this.sprite = new PIXI.AnimatedSprite(this.sheet.animations[this.currAnimKey]);
        this.sprite.animationSpeed = 0.2;
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.y = 0;
        this.sprite.x = 0;

        viewport.addChild(this.sprite);

        this.sprite.play();
    }

    /**
     * Process movement for a frame. N,S seem a bit too slow, but 0.5 seems to be the correct number
     * @memberof Character
     */
    processMovement = (direction: Direction, delta: number) => {
        switch (direction) {
            case Direction.N:
                this.sprite.y -= (this.options.speed * 0.5) * delta;
                break;
            case Direction.NE:
                this.sprite.y -= (this.options.speed * 0.5) * delta;
                this.sprite.x += this.options.speed * delta;
                break;
            case Direction.E:
                this.sprite.x += this.options.speed * delta;
                break;
            case Direction.SE:
                this.sprite.y += (this.options.speed * 0.5) * delta;
                this.sprite.x += this.options.speed * delta;
                break;
            case Direction.S:
                this.sprite.y += (this.options.speed * 0.5) * delta;
                break;
            case Direction.SW:
                this.sprite.y += (this.options.speed * 0.5) * delta;
                this.sprite.x -= this.options.speed * delta;
                break;
            case Direction.W:
                this.sprite.x -= this.options.speed * delta;
                break;
            case Direction.NW:
                this.sprite.y -= (this.options.speed * 0.5) * delta;
                this.sprite.x -= this.options.speed * delta;
                break;
        }
    }

    update(delta: number) {
        const hasInput = this.inputSource.hasInput();

        // If we stopped moving, switch to idle animation
        if (!hasInput) {
            if (!this.currAnimKey.includes("idle")) {
                this.currAnimKey = directionAnimationSwitch(this.direction, this.idleAnimKeys);
                this.sprite.textures = this.sheet.animations[this.currAnimKey];
                this.sprite.play();
            }
            return;
        }

        const inputState: InputState = this.inputSource.inputState;
        const newDirection = getDirectionFromInput(inputState);

        this.processMovement(newDirection, delta);

        // If we continue to run in the same direction, do nothing
        if (this.direction === newDirection) {
            // Need to change to run if we are idle with input
            if (this.currAnimKey.includes("idle")) {
                this.currAnimKey = directionAnimationSwitch(this.direction, this.runAnimKeys);
                this.sprite.textures = this.sheet.animations[this.currAnimKey];
                this.sprite.play();
            }
            return;
        }

        this.direction = newDirection;
        this.currAnimKey = directionAnimationSwitch(this.direction, this.runAnimKeys);
        this.sprite.textures = this.sheet.animations[this.currAnimKey];

        this.sprite.play();
    }

    get followObject() {
        return this.sprite;
    }
}