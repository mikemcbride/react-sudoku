import range from './cellRange'

const defaultCell = {
  value: null,
  solved: false,
  possibleValues: []
}

function buildRow(index) {
  return range.map(column => ({
      ...defaultCell,
      row: index,
      column
    })
  )
}

function buildGrid() {
  return range.map(it => buildRow(it))
}

const grid = buildGrid()
export default grid