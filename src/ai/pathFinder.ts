interface PathNode {
    x: number;
    y: number;
}

/**
 *
 * @class PathFinder
 */
class PathFinder {
    findPath(startNode: PathNode) {
        const openList = [startNode];
        const closedList = [];

        while (openList.length > 0) {
            // get the lowest value F node form the open list
            const q = openList.pop(); // TODO check value, not just pop

            // generate successors of the q node, set their parent as q

            // for each successor:
            // if the child is the goal - end search
            // if position is in the open list, with a lower F, skip
            // if position is in the closed list, with a lower F, skip it, otherwise put it in open

            // push q to the closed list
            closedList.push(startNode);
        }
    }

    getSuccesors = (node: PathNode) => {

    }
}

/*
    A node is picked by evaluating this formula:
    F = G + H
    G - movement cost (euclidean , manhattan)
    H - estimated movement cost, reffered as the heuristic
*/