import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * 这个类用于创建 按钮对象
 */
class Square extends React.Component {

  render() {
    return (
      /**
       * {this.props.value} 获取 调用此类时传入的参数 value 并渲染到页面
       * onClick 后面的 {} 中 包含的是 函数等处理逻辑 如果需使用当前对象的this 需要使用箭头函数
       * onClick 后面的 {} 中 假如我们写的是 onClick={alert('click')} 警示框是会立即弹出的
       */
      <button className="square" onClick={() => {this.props.onClick()}}>
       {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {

  /**
   * 在 React 组件的构造方法 constructor 当中，你可以通过 this.state 为该组件设置自身的状态数据
   * 在使用 JavaScript classes 时，你必须调用 super(); 方法才能在继承父类的子类中正确获取到类型的 this
   */
  constructor() { 
    super();
    this.state = {
      squareArr: Array(9).fill(null),
      nextIs: true,
      winner: null
    }
  }

  handClick(i) { 
    const arr = this.state.squareArr.slice();
    if (arr[i] == null && this.checkWinner() == null) {
      arr[i] = this.state.nextIs ? 'X' : 'Y';
      this.setState({
        squareArr: arr,
        nextIs:!this.state.nextIs
      });
    }
  }

  checkWinner() { 
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    var squareArr = this.state.squareArr;
    for (let i = 0; i < lines.length; i++) {
      const [a,b,c] = lines[i];
      if (squareArr[a] != null && squareArr[a] === squareArr[b] && squareArr[a] === squareArr[c]) {
        return squareArr[a];
      }
    }
    return null;
  }

  creatSquare(props) {
    return (<button className="square" onClick={() => { this.handClick(props); }}>
      {this.state.squareArr[props]}
    </button>);
  }

  /**这是一个方法
   * 
   * @param {*} i 
   * @return 返回 class--Square 节点对象
   */
  renderSquare(i) {

    //传递一个名为 value 的 prop 到 Square 当中
    //调用当前class得方法 必须使用 this 指向
    return (<button className="square" onClick={() => { this.handClick(i); }}>
      {this.state.squareArr[i]}
    </button>);
  }

  render() {
    /**
     * 似乎 render 中调用的方法中为保证不出现死循环 其中无法包含 setState
     */
    let str = this.checkWinner();
    let status = str == null ?  this.state.nextIs ? 'Next player: X' : 'Next player: Y' : 'Winner: ' + str;

    //此处调用方法 创建button节点
    //this 会指向当前 class对象
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
