import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Square is a "functional component".
// A functional component can omit explicit render method and just return what should be rendered.
// Square doesn't keep its own state.
// Square is a "controlled component", controlled by parent Board.
function Square(props) {
  // If user clicks Square button, React calls Square props.onClick()
  // Since the Board passed closure onClick={() => this.handleClick(i)} to Square,
  // the Square calls the Game's handleClick(i)
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    // use parentheses to prevent javascript from automatically inserting ; after return
    return (
      <Square
       // Board passes two props to Square- value and onClick
       value={this.props.squares[i]}
       onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {

    return (
      <div>
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

/// Game manages game state, history and squares Array
/// Game render returns a Board.
/// "We may think that Game (or Board) should just ask each Square for the Square’s state.
/// Although this approach is possible in React, we discourage it because
/// the code becomes difficult to understand, susceptible to bugs, and hard to refactor.
/// Instead, the best approach is to store the game’s state in the parent component instead of in each Square.
/// The parent component can tell each Square what to display by passing a prop...
/// Lifting state into a parent component is common when React components are refactored"
class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    // use slice to avoid mutating state.squares by copying it
    // then React can easily tell the data has changed, and so re-render it.
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      // game is over, or this square has already been used
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
      squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true,
    });
  }

  /// returns a Board
  render() {
    const history = this.state.history
    // current game
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
       return (
         // within a dynamic list, assign each element a unique key
         // if user clicks on list element, reset board to that move
         <li key={move}>
           <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
         </li>
       );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            // set each Square.onClick to call Game's handleClick
            onClick={(i) => this.handleClick(i)}
           />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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

/// returns winning player as a single character string "O" or "X", else null
function calculateWinner(squares) {
  const lines = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

