import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square is a "controlled component", controlled by Board
// Square doesn't keep its own state.
// It receives its value from its parent Board and informs its parent when it's clicked.
class Square extends React.Component {
  render() {
    // when button is clicked, call props.onClick()
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    // use slice to avoid mutating state.squares by copying it
    // then React can easily tell the data has changed, and so re-render it.
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    // use parentheses to prevent javascript from automatically inserting ; after return
    // pass handleClick closure from Board to Square
    return (
      <Square
       value={this.state.squares[i]}
       onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

