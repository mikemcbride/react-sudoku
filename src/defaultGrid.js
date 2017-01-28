import range from './cellRange'
import values from './valueRange'

const defaultCell = {
  value: null,
  solved: false,
  possibleValues: values
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