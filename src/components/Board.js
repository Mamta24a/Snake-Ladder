import React, { Component } from 'react';
import player from './imgs/player_red.png';
import ladder from './imgs/ladder.png';
import snk1 from './imgs/snk1.png';
// import snk2 from './assets/snk2.png';
// import snk3 from './assets/snk3.png';
// import snk4 from './assets/snk4.png';
import Dice from './Dice';

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pointer: 0,
            isComponentMounted: false,
            diceVal: 0,
            gotLadder: false,
            gotSnake: false
        }
        this.cubeSize = 57;
        this.myCanvasRef = React.createRef();
    }

    restart = () => {
        this.setState({
            pointer: 0,
            isComponentMounted: false,
            diceVal: 0,
            gotLadder: false,
            gotSnake: false
        })
    }

    componentDidMount() {
        this.setState({
            isComponentMounted: true
        })
    }

    getRandomDiceVal = () => {
        let possibleDiceVals = [1, 2, 3, 4, 5, 6];
        let result = possibleDiceVals[parseInt(Math.random() * possibleDiceVals.length)];

        this.setState({
            diceVal: result
        }, () => {
            this.setState({
                pointer: this.state.pointer + this.state.diceVal
            }, () => {
                setTimeout(() => {
                    this.checkPointerLuck(this.state.pointer)
                }, 2000);
            })
        })
    }

    checkPointerLuck = (pointer) => {
        if (this.isLadder(pointer)) {
            this.setState({
                pointer: this.isLadder(pointer).end,
                gotLadder: true
            })
        } else if (this.isSnake(pointer)) {
            this.setState({
                pointer: this.isSnake(pointer).end,
                gotSnake: true
            })
        } else {
            this.setState({
                gotLadder: false,
                gotSnake: false
            })
        }
    }

    setBg = (isOdd) => {
        // const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        // return "#" + randomColor;
        return isOdd ? "#3c91e6" : "#fafffd" //blue:white
    }

    isLadder = (num) => {
        let laddersList = [
            { start: 5, end: 26 },
            { start: 13, end: 32 },
            { start: 48, end: 69 },
            { start: 60, end: 79 },
            { start: 65, end: 86 }
        ];
        return laddersList.filter(item =>
            (item.start === num)
        )[0];
    }

    isSnake = (num) => {
        let snakesList = [
            { start: 21, end: 18 },
            { start: 44, end: 35 },
            { start: 68, end: 51 },
            { start: 94, end: 72 },
            { start: 97, end: 75 }
        ];
        return snakesList.filter(item => (item.start === num))[0];
    }

    checkLuck = (num, xAxis, yAxis) => {
        let drawXaxis = this.findSquaresPixel(xAxis)["x-axis"].center;
        let drawYaxis = this.findSquaresPixel(yAxis)["y-axis"].center;
        if (this.isLadder(num)) {
            this.drawCanvas(ladder, (drawXaxis + 10), (drawYaxis - 105)); //300, 1560
            return "#2ba84a" //green
        } else if (this.isSnake(num)) {
            this.drawCanvas(snk1, (drawXaxis + 60), (drawYaxis - 20));
            return "#d64933" //red
        } else {
            return this.setBg(num % 2 === 0)
        }
    }

    drawCanvas = (item, startPos, endPos) => {
        if (this.myCanvasRef.current !== null && this.state.isComponentMounted) {
            const ctx = this.myCanvasRef.current.getContext('2d');
            var snkImg4 = new Image();
            snkImg4.src = item;
            snkImg4.width = '50px';
            snkImg4.onload = function () {
                ctx.drawImage(snkImg4, startPos, endPos, 150, 150); // element, x-axis, y-axis, width, height
            }
        }
    }

    findSquaresPixel = (num) => {
        let result = {
            "x-axis": {
                "start": (num * this.cubeSize),
                "center": (num * this.cubeSize) - (this.cubeSize / 2),
                "end": (num * this.cubeSize) + this.cubeSize
            },
            "y-axis": {
                "start": (num * this.cubeSize),
                "center": (num * this.cubeSize) - (this.cubeSize / 2),
                "end": (num * this.cubeSize) + this.cubeSize
            }
        }
        return result;
    }


    rollDice = () => {
        this.getRandomDiceVal()
    }


    render() {
        let { diceVal, pointer, gotLadder, gotSnake } = this.state;
        this.countY = 9;
        this.countY1 = 11;
        return (
            <>
                <div className="boardContainer">
                    <div className="board">
                        <canvas
                            ref={this.myCanvasRef}
                            width="600"
                            height="600"
                            style={{ border: '1px solid #d3d3d3', position: 'absolute', top: '98px' }}
                        >
                            Your browser does not support the HTML5 canvas tag.
                </canvas>
                        <table>
                            <tbody>
                                {[...Array(10).keys(10)].reverse().map(num1 => {
                                    this.countX = 9;
                                    let b = (num1 + 1) - this.countY;
                                    this.countY = this.countY - 2;
                                    this.countY1 = this.countY1 - 2;
                                    return (<tr key={num1}>
                                        {num1 % 2 === 0 ?
                                            [...Array(10).keys(10)].map((num, i) => (
                                                <td
                                                    key={i}
                                                    style={{
                                                        background: this.checkLuck(
                                                            (num + 1) + num1 * 10,
                                                            num,
                                                            b
                                                        )
                                                    }}
                                                >
                                                    {(num + 1) + num1 * 10}<br />

                                                    {/* ({this.findSquaresPixel(num)["x-axis"].center}, {this.findSquaresPixel(b)["y-axis"].center}) */}

                                                    {/* {this.findSquaresPixel(num)["x-axis"].start},
                                            {this.findSquaresPixel(num)["x-axis"].center},
                                            {this.findSquaresPixel(num)["x-axis"].end} */}

                                                    {/* {this.findSquaresPixel(num1 + 1)["y-axis"].start},
                                            {this.findSquaresPixel(num1 + 1)["y-axis"].center},
                                            {this.findSquaresPixel(num1 + 1)["y-axis"].end} */}

                                                    {((num + 1) + num1 * 10) === pointer &&
                                                        <img src={player} className="player" alt="player" />
                                                    }
                                                </td>
                                            )) :
                                            [...Array(10).keys(10)].reverse().map(num => {
                                                let a = num - this.countX;
                                                let b = (num1 + 1) - this.countY1;
                                                this.countX = this.countX - 2;
                                                return (<td
                                                    key={num}
                                                    style={{
                                                        background: this.checkLuck(
                                                            (num + 1) + num1 * 10,
                                                            a,
                                                            b
                                                        )
                                                    }}
                                                >
                                                    {(num + 1) + num1 * 10}<br />

                                                    {/* ({this.findSquaresPixel(a)["x-axis"].center},{this.findSquaresPixel(b)["y-axis"].center}) */}

                                                    {/* {this.findSquaresPixel(a)["x-axis"].start},
                                            {this.findSquaresPixel(a)["x-axis"].center},
                                            {this.findSquaresPixel(a)["x-axis"].end} */}

                                                    {/* {this.findSquaresPixel(num1 + 1)["y-axis"].start},
                                            {this.findSquaresPixel(num1 + 1)["y-axis"].center},
                                            {this.findSquaresPixel(num1 + 1)["y-axis"].end} */}

                                                    {((num + 1) + num1 * 10) === pointer &&
                                                        <img src={player} className="player" alt="player" />
                                                    }
                                                </td>)
                                            })
                                        }
                                    </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="diceContainer">
                    <button className="btn" onClick={this.rollDice}>Roll Dice</button>
                    {diceVal !== 0 && <h3>You got {diceVal}!</h3>}
                    {gotLadder && <h3>Yeppi...ladder!</h3>}
                    {gotSnake && <h3>Ouch...Snake!</h3>}
                    {pointer > 100 && <h3>Game Finished!! <button onClick={this.restart}>RESTART AGAIN</button></h3>}
                    <Dice diceVal={diceVal} />
                </div>
            </>
        );
    }
}

export default Board;