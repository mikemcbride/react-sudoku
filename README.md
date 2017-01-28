react-sudoku
============

A sudoku solver written in React. Head over to mmcbride1007.github.io/react-sudoku to play.

## Strategy

This takes a fairly naive/brute-force approach to solving the puzzle. Once you load the data into the puzzle and click "Solve", it makes an initial pass through all cells and stores values where they exist. From there, it will move through each remaining cell that does not contain a value and store an array of possible values (1-9) that it can be by checking cells in the same square, row, and column. Then it moves on to the next cell. When only one value remains in the array of possible values, it stores the value and marks that cell as solved. This process continues until each cell is filled.

### Enhancement Ideas

- When a cell is populated, stop going through cells sequentially and do some context-aware checking. When you populate a cell when doing a real-life puzzle, you don't move on to the next cell, you check to see if that afforded you any chance to solve another cell in that same square, column, or row.
- Prevent the app from crashing the browser. If it makes a full pass and is not able to reduce the list of possible values on any remaining cell, then the next time it tries to make a pass, it should bail. Otherwise it will just keep running. This shouldn't happen with a solvable puzzle, but human error... that's another story.
- Add a way to import a puzzle using a file upload API or something of the sorts. Plain text with `x`'s for blank cells and spaces as the separator for parsing?

## Data Structure

Data is stored in a two-dimensional array, which looks something like this:

```js
const cells = [
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}, {}]
]
```

Each line in the cells array represents a row. Each row (also an array) contains nine items (cells). The cells can be cross-referenced quite easily using a coordinate system. I put empty objects at each point in the array to represent where the data will be, but each item will be an object with a few properties: `solved` (boolean), `possibleValues` (array), and `value` (integer). The way to reference a particular cell is by targeting the coordinates, like so:

```js
const myCell = cells[2][4]
```


## License

MIT
