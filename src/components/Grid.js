import React from 'react'
import range from '../cellRange'
import values from '../valueRange'

class Grid extends React.Component {
  constructor() {
    super()
    
    this.gridValues = {}
    
    this.solvePuzzle = this.solvePuzzle.bind(this)
    this.doInitialPass = this.doInitialPass.bind(this)
    this.makeAnotherPass = this.makeAnotherPass.bind(this)
    this.isSolved = this.isSolved.bind(this)
    this.getCellsInRow = this.getCellsInRow.bind(this)
    this.getCellsInColumn = this.getCellsInColumn.bind(this)
    this.getCellsInSquare = this.getCellsInSquare.bind(this)
    this.getPossibleCellValues = this.getPossibleCellValues.bind(this)
    this.setInputValue = this.setInputValue.bind(this)
  }
  
  componentDidMount() {
    this.rows = [...this.props.rows]
  }
  
  solvePuzzle(event) {
    event.preventDefault()
    this.doInitialPass()
    
    while (this.isSolved() === false) {
      this.makeAnotherPass()
    }
    return
  }
  
  isSolved() {
    for (let row = 0; row < this.rows.length; row++) {
      const len = this.rows[row].filter(cell => !cell.solved).length // length of array of unsolved cells in this row
      if (len > 0) {
        // we have unsolved cells, bail now
        return false
      }
    }
    
    // we made it! all cells are solved!
    return true
  }
  
  doInitialPass() {
    // initial pass, update any cells that have values and set them to "solved", since our starter cells are given.
    this.rows.forEach(row => {
      // row is an array of cells
      row.forEach(cell => {
        const inputRef = `${cell.row}.${cell.column}`
        const input = this.gridValues[inputRef]
        const val = parseInt(input.value, 10)
        
        if (!isNaN(val)) {
          cell.solved = true
          cell.value = val
        }
      })
    })
  }
  
  makeAnotherPass() {
    // naively pass through each cell and check for possible values
    // if it only has one possible, set it and mark it solved
    // otherwise, just update possible values and move on
    this.rows.forEach(row => {
      // row is an array of cells
      row.forEach(cell => {
        if (cell.solved === false) {
          cell.possibleValues = this.getPossibleCellValues(cell)
          if (cell.possibleValues.length === 1) {
            cell.solved = true
            cell.value = cell.possibleValues[0]
            this.setInputValue(cell.row, cell.column, cell.value)
          }
        }
      })
    })
  }
  
  getPossibleCellValues(cell) {
    // brain dump here cause i'm going to bed
    // make calls to each of the following functions (cells in Row/Col/Square)
    // they all return an array of cells
    // filter out any unsolved cells from those results (that will include the current cell)
    // combine all arrays into an array of the solved values
    // get the diff of that and valueRange
    // something like:
    // const vals = new Set([...row, ...column, ...square])
    // const pvals = values.filter(x => !vals.has(x))
    // pvals should be the filtered list of values ([1...9]) with values removed that it found in row/col/square
    // that should get us close.
    const rowVals = this.getCellsInRow(cell.row).filter(it => it.solved).map(it => it.value)
    const columnVals = this.getCellsInColumn(cell.column).filter(it => it.solved).map(it => it.value)
    const squareVals = this.getCellsInSquare(cell).filter(it => it.solved).map(it => it.value)
    
    const allVals = new Set([...rowVals, ...columnVals, ...squareVals])
    const pVals = values.filter(it => allVals.has(it) === false)
    return pVals
  }
  
  getCellsInRow(row) {
    return range.map(column => this.rows[row][column])
  }
  
  getCellsInColumn(column) {
    return range.map(row => this.rows[row][column])
  }
  
  getCellsInSquare(cell) {
    // trickier
    const cells = []
    let rowz = []
    let cols = []
    
    if (cell.row < 3) {
      rowz = [0,1,2]
    } else if (cell.row < 6) {
      rowz = [3,4,5]
    } else {
      rowz = [6,7,8]
    }
    
    if (cell.column < 3) {
      cols = [0,1,2]
    } else if (cell.column < 6) {
      cols = [3,4,5]
    } else {
      cols = [6,7,8]
    }
    
    rowz.forEach(row => {
      cols.forEach(col => {
        cells.push(this.rows[row][col])
      })
    })
    
    return cells
  }
  
  setInputValue(row, column, val) {
    const inputRef = `${row}.${column}`
    const input = this.gridValues[inputRef]
    input.value = val
  }
  
  render() {
    return (
      <form className="tc" onSubmit={(e) => this.solvePuzzle(e)}>
        {
          this.props.rows.map(row => {
            return (
              <div key={row[0].row} className="grid-row-wrap flex justify-center">
                <span className="grid-row flex mw-100">
                {
                  row.map(cell => {
                    return (
                      <span className="grid-cell pa1 dib w2 h2" key={`${row[0].row}.${cell.column}`}>
                        <input ref={(input) => this.gridValues[`${cell.row}.${cell.column}`] = input} className="pl1 pl2-ns w-100 h2 ba b--transparent" type="number" min="1" max="9" />
                      </span>
                    )
                  })
                }
                </span>
              </div>
            )
          })
        }
        <button type="submit" className="outline-0 mt4 f6 f5-ns fw6 db w-100 w-auto-ns dib-ns ba b--blue bg-blue white ph3 ph4-ns pv3 br2 grow pointer">Solve!</button>
      </form>
    )
  }
}

export default Grid