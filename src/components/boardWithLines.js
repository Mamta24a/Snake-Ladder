import React, { Component } from 'react';
import player from './assets/player_red.png';
import ladder from './assets/ladder.png';
import snk1 from './assets/snk1.png';
import snk2 from './assets/snk2.png';
import snk3 from './assets/snk3.png';
import snk4 from './assets/snk4.png';

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pointer: props.pointer,
            isComponentMounted: false
        }
        this.cubeSize = 57;
        this.arr = [...Array(10).keys(10)];
        this.myCanvasRef = React.createRef();
    }

    componentDidMount() {
        this.setState({
            isComponentMounted: true
        })

        this.arr.forEach(y => {
            this.arr.forEach(x => {
                console.log(x, y, (x + 1) + y * 10);
            });
        });
        // this.drawCanvas(snk4, 0, 0);
        // this.drawCanvas(snk1, 100, 100);
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            pointer: nextProps.pointer
        })
    }

    setBg = (isOdd) => {
        // const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        // return "#" + randomColor;
        return isOdd ? "#3c91e6" : "#fafffd" //blue:white
    }

    isLadder = (num) => {
        let laddersList = [
            { start: 5, end: 26 },
            { start: 13, end: 46 },
            { start: 18, end: 39 },
            { start: 37, end: 62 },
            { start: 48, end: 72 },
            { start: 60, end: 82 },
            { start: 65, end: 95 }
        ];
        return laddersList.filter(item =>
            (item.start === num)
        )[0];
        // laddersList.filter(item => {
        //     // if (item.start === num) {
        //     //     this.setState({
        //     //         pointer: item.end
        //     //     })
        //     // }
        //     return (item.start === num)
        // })[0];
    }

    isSnake = (num) => {
        let snakesList = [
            { start: 23, end: 7 },
            { start: 33, end: 9 },
            { start: 44, end: 13 },
            { start: 68, end: 25 },
            { start: 77, end: 41 },
            { start: 94, end: 70 },
            { start: 97, end: 66 }
        ];
        return snakesList.filter(item => (item.start === num))[0];
    }

    checkLuck = (num, xAxis, yAxis) => {
        let drawXaxis = this.findSquaresPixel(xAxis)["x-axis"].center;
        let drawYaxis = this.findSquaresPixel(yAxis)["y-axis"].center;
        // console.log(this.isLadder(num));
        let x2 = 0;
        let y2 = 0;
        if (this.isLadder(num)) {
            this.drawCanvas(ladder, (drawXaxis + 70), (drawYaxis + 15), x2, y2, "green"); //300, 1560
            // this.drawCanvas(ladder, (drawXaxis + 10), (drawYaxis - 105), x2, y2, "green"); //300, 1560
            return "#2ba84a" //green
        } else if (this.isSnake(num)) {
            this.drawCanvas(snk1, (drawXaxis + 60), (drawYaxis + 10), x2, y2, "red");
            // this.drawCanvas(snk1, (drawXaxis + 60), (drawYaxis - 20), x2, y2, "red");
            return "#d64933" //red
        } else {
            return this.setBg(num % 2 === 0)
        }
    }

    drawCanvas = (item, startPos, endPos, x2, y2, color) => {
        if (this.myCanvasRef.current !== null && this.state.isComponentMounted) {
            const ctx = this.myCanvasRef.current.getContext('2d');
            // var snkImg4 = new Image();
            // snkImg4.src = item;
            // snkImg4.width = '50px';
            // snkImg4.onload = function () {
            //     ctx.drawImage(snkImg4, startPos, endPos, 150, 150); // element, x-axis, y-axis, width, height
            // }
            ctx.beginPath();
            ctx.moveTo(x2, y2);
            ctx.lineTo(startPos, endPos);
            ctx.strokeStyle = color;
            ctx.stroke();
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

    render() {
        let { pointer } = this.state;
        this.countY = 9;
        this.countY1 = 11;
        return (
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
        );
    }
}

export default Board;