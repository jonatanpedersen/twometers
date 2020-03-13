const { Grid, AStarFinder} = require('pathfinding');
const express = require('express');

async function main () {
	const app = express();
	const port = process.env.PORT || 8080;

	const matrix = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	];
	
	const grid = new Grid(matrix);
	const finder = new AStarFinder({ allowDiagonal: true });

	app.set('view engine', 'pug')
	
	const items = [{
		id: 'foo',
		x: 1,
		y: 1
	}, {
		id: 'bar',
		x: 3,
		y: 3
	}, {
		id: 'baz',
		x: 10,
		y: 10
	}];

	app.get('/', (req, res, next) => {
		const distances = {};

		for (let idx1 = 0; idx1 < items.length; idx1++) {
			for (let idx2 = idx1 + 1; idx2 < items.length; idx2++) {
				if (idx1 !== idx2) {
					const item1 = items[idx1];
					const item2 = items[idx2];

					const distance = finder.findPath(item1.x, item1.y, item2.x, item2.y, grid).length;

					distances[item1.id] = distances[item1.id] || {};
					distances[item1.id][item2.id] = distance;
					distances[item2.id] = distances[item2.id] || {};
					distances[item2.id][item1.id] = distance;
				}
			}
		}

		res.render('index', { grid, items, distances })
	});

	app.use((err, req, res, next) => {
		console.error(err)
		res.json({ message: err.message, stack: err.stack });
	});

	app.listen(port, () => console.log('Listening', port));
}

main().catch(console.error);