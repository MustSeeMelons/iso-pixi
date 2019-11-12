import * as PIXI from "pixi.js";
import { Tickable } from "./utils/definitions";

/**
 * The game world.
 * 
 *
 * @export
 * @class Viewport
 * @extends {PIXI.Container}
 */
export class Viewport extends PIXI.Container implements Tickable {
    private app: PIXI.Application;
    private followObject: PIXI.DisplayObject;

    constructor(
        app: PIXI.Application
    ) {
        super();
        this.app = app;
    }

    set setFollowObject(followObject: PIXI.DisplayObject) {
        this.followObject = followObject;
    }

    update(delta: number): void {
        this.children.sort((one, other) => {
            if (one.y < other.y) {
                return -1;
            } else {
                return 0;
            }
        });

        if (this.followObject) {
            this.x = this.followObject.x * -1 + this.app.renderer.width / 2;
            this.y = this.followObject.y * -1 + this.app.renderer.height / 2;
        }
    }
}