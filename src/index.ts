import * as PIXI from "pixi.js";
import "./resources/css/styles.css";
import { setupScreenReSize } from "./utils/screenUtils";
import { IMAGES } from "./utils/resources";
import { Viewport } from "./viewport";
import { PlayerInputSource } from "./input/inputManager";
import { Terrain } from "./terrain/terrain";
import { Character } from "./characters/character";
import { AiManager } from "./ai/aiManager";

// Load our sprites with pixi
const Loader: PIXI.Loader = PIXI.Loader.shared;
Loader.add(IMAGES).add("src/resources/images/character.json").load(setup);

// Create the application
const app = new PIXI.Application({
  antialias: false,
  resolution: 1,
});

// Enable interaction events: mouse, touch
app.stage.interactive = true;

document.body.appendChild(app.view);

function setup() {
  setupScreenReSize(app);

  const playerInputSource = new PlayerInputSource();
  const aiManager = new AiManager();

  const viewport = new Viewport(app);
  app.stage.addChild(viewport);

  // Setup the landscape
  const terrain = new Terrain(app, viewport);

  const player = new Character(terrain, viewport, playerInputSource, {
    speed: 3,
  });

  const ai = new Character(terrain, viewport, aiManager.getAiInputSource(), {
    speed: 3,
  });

  viewport.setFollowObject = player.followObject;

  app.ticker.add((delta) => {
    viewport.update(delta);
    player.update(delta);
  });
}
