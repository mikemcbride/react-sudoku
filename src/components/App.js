import React from 'react'
import Grid from './Grid'
import defaultGrid from '../defaultGrid'

class App extends React.Component {
  constructor() {
    super()
    
    this.state = {
      solved: false,
      grid: []
    }
  }
  
  componentWillMount() {
    const grid = defaultGrid
    this.setState({ grid })
  }
  
  render() {
    return (
      <div className="sans-serif flex flex-column min-vh-100">
        <header className="pa3 ph3 ph4-ns bb b--black-10">
          <span className="f4">Sudoku Solver</span>
        </header>
        
        <p className="tc pt3 ph4-ns">Populate the grid with the starting values for your puzzle. When ready, click "Solve".</p>
        <p className="pa2 ph4-ns red tc"><strong>Warning:</strong> if you fill in an impossible puzzle, the app will continue trying to solve it and could crash your browser. Additionally, I have found that the strategy implemented to solve these frequently will not work to solve "Hard" or "Expert" level puzzles. You can try, but you may have to close the browser...</p>
        
        <div className="flex-auto pa3 ph4-ns overflow-x-auto">
          <Grid rows={this.state.grid} />
        </div>
        
        <footer className="bt b--black-10 pv3 tc black-40 f6">
          <span className="dib">
            Built by <a className="link dim dib blue" href="http://www.github.com/mmcbride1007" target="_blank">Mike McBride</a>
          </span>
        </footer>
      </div>
    );
  }
}

export default App;
