import { Tickable } from "../utils/definitions";
import { AiInputSource } from "./ai";

/**
 * Manages AiInputSource instances.
 * @export
 * @class AiManager
 * @implements {Tickable}
 */
export class AiManager implements Tickable {
    private sources: Array<AiInputSource> = [];

    update(delta: number) {
        this.sources.forEach((source) => {
            source.tick(delta);
        });
    }

    getAiInputSource = () => {
        const aiInputSource = new AiInputSource();
        this.sources.push(aiInputSource);
        return aiInputSource;
    }
}