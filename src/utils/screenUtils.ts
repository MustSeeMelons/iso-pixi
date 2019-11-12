
/**
 * Utility function which resizes the renderer to fit the clients screen.
 * @param app
 */
export const setupScreenReSize = (app: PIXI.Application) => {
    const resize = () => {
        const parent = app.view.parentElement;
        app.renderer.resize(parent.clientWidth, parent.clientHeight);
    }

    window.addEventListener('resize', resize);

    resize();
}