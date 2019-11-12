import * as PIXI from "pixi.js";
import { Viewport } from "../viewport";
import { DIRT_E } from "../utils/resources";

/**
 * Tile based terrain container.
 * 
 * @export
 * @class Terrain
 */
export class Terrain {
    private viewport: Viewport;
    private tileWidth: number = 256;
    private tileHeight: number = 128;
    private app: PIXI.Application;
    private debug: boolean;

    // Attention! X acts like anchor is 0.5, while y is 0.0
    // -8 because the tile is not perfect, it has some thickness
    private hitAreaPoints = [
        new PIXI.Point(0, 128 - 8),
        new PIXI.Point(128, 192 - 8),
        new PIXI.Point(0, 256 - 8),
        new PIXI.Point(-128, 192 - 8)
    ];

    constructor(app: PIXI.Application, viewport: Viewport, debug: boolean = false) {
        this.app = app;
        this.viewport = viewport;
        this.debug = debug;

        this.setupTiles();
    }

    setupTiles() {
        const terrain = new PIXI.Container();
        const tileTexture = PIXI.Loader.shared.resources[DIRT_E].texture;

        const halfTileWidth = this.tileWidth / 2;
        const halfTileHeight = this.tileHeight / 2;

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const sprite = new PIXI.Sprite(tileTexture);
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;
                sprite.x = i * halfTileWidth - (j * halfTileWidth);
                sprite.y = j * halfTileHeight + (i * halfTileHeight);

                sprite.interactive = true;

                sprite.hitArea = new PIXI.Polygon(this.hitAreaPoints);

                if (this.debug) {
                    const g = new PIXI.Graphics();
                    g.beginFill(0x000000, 0.2);
                    g.drawShape(new PIXI.Polygon(this.hitAreaPoints));
                    g.endFill();

                    const hArea = this.app.renderer.generateTexture(g, 1, 1);
                    const hSprite = new PIXI.Sprite(hArea);
                    hSprite.y = -8;
                    hSprite.anchor.x = 0.5;
                    hSprite.anchor.y = -1;

                    sprite.addChild(hSprite);
                }

                sprite.addListener("pointerdown", () => {
                    if (this.debug) {
                        console.log(`Tile: X:${sprite.x} Y:${sprite.y}`);
                    }
                });

                terrain.addChild(sprite);
            }
        }

        this.viewport.addChild(terrain);
    }
}