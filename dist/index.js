import World from './world';
function main() {
    const container = document.querySelector('#root');
    const world = new World(container);
    world.render();
}
main();
