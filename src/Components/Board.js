import React from 'react';
import Square from './Square';

class Board extends React.Component{

    renderSquare(i){
        return <Square
                 key={i}
                 value={this.props.squares[i]}
                 onClick={() => this.props.onClick(i)}
                />
    }

    renderRow(start){
        const rows = Array(3).fill(1);
        return (
            <div>
                {/* <div className="status"> {this.props.status} </div> */}
                <div className="board-row">
                    {rows.map( (row,index) => {
                        console.log(index)
                        return (
                        this.renderSquare(index+start)
                    )})}
                </div>
            </div>
        );
    }

    render(){
        console.log('Hi there');
        const rows =[0,1,2];
        return (
            <div>
                {/* <div className="status"> {this.props.status} </div> */}
                <div className="board-row">
                    {this.renderRow(0)}
                    { this.renderRow(3) }
                    { this.renderRow(6) }
                </div>
            </div>
        );
    }


}

export default Board;