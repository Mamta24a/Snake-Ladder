import React, { Component } from 'react';

class Dice extends Component {
    render() {
        return (
            <div className="dice">
                {[...Array(this.props.diceVal).keys()].map(count => (
                    <div className="diceDot" key={count}></div>
                ))}
            </div>
        );
    }
}

export default Dice;