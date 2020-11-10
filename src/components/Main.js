import React from "react";
import Buttons from "./Buttons";
import Grid from "./Grid";

/**
 * Main Component
 */
class Main extends React.Component {
    constructor() {
        super();

        this.speed = 100;
        this.rows = 30;
        this.cols = 40;

        this.state = {
            generation: 0,
            // 2 Dimensional array, toate valorile sunt setate false/0
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        }
    }

    /**
     * Select Box
     *
     * @param row
     * @param col
     */
    selectBox = (row, col) => {
        let gridCopy = arrayClone(this.state.gridFull);

        // pe pozitia row/col daca a fost True, va fi False iar daca a fost false, va fi true.
        gridCopy[row][col] = !gridCopy[row][col];
        this.setState({
            gridFull: gridCopy
        });
    }

    /**
     * Seed
     */
    seed = () => {
        let gridCopy = arrayClone(this.state.gridFull);
        for(let i =0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if(Math.floor(Math.random() * 4) === 1) {
                    gridCopy[i][j] = true;
                }
            }
        }

        this.setState({
            gridFull: gridCopy
        });
    }

    /**
     * Play Button
     */
    playButton = () => {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, this.speed);
    }

    /**
     * Pause Button
     */
    pauseButton = () => {
        clearInterval(this.intervalId);
    }

    /**
     * Slow
     */
    slow = () => {
        this.speed = 1000;
        this.playButton();
    }

    /**
     * Fast
     */
    fast = () => {
        this.speed = 100;
        this.playButton();
    }

    /**
     * Clear
     */
    clear = () => {
        var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));

        this.setState({
            gridFull: grid,
            generation: 0
        });
    }

    /**
     * Grid Size
     *
     * @param no_size
     */
    gridSize = (no_size) => {
        switch (no_size) {
            case "1":
                this.cols = 20;
                this.rows = 10;
                break;
            case "2":
                this.cols = 50;
                this.rows = 30;
                break;
            default:
                this.cols = 70;
                this.rows = 50;
        }
        this.clear();
    }

    /**
     * Play
     */
    play = () => {
        let g = this.state.gridFull;
        let g2 = arrayClone(this.state.gridFull);

        // RULES FOR GAME OF LIFE
        // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
        // Any live cell with two or three live neighbours lives on to the next generation.
        // Any live cell with more than three live neighbours dies, as if by overpopulation.
        // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.


        // we go through every element in grid
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {

                // here is where we are figuring out the rules

                // Count - how many neighbours it has
                // If there is a neighbor, we will increase our count with 1
                let count = 0;

                // each cell has 8 potential neighbour
                if (i > 0) if (g[i - 1][j]) count++;
                if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
                if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
                if (j < this.cols - 1) if (g[i][j + 1]) count++;
                if (j > 0) if (g[i][j - 1]) count++;
                if (i < this.rows - 1) if (g[i + 1][j]) count++;
                if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
                if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;

                // then we will decide, if it will die or live
                // if theres less then 2 or more then 3 it dies
                // if its dead and it has 3 neighbours, it becomes a live cell
                if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
                if (!g[i][j] && count === 3) g2[i][j] = true;
            }
        }
        this.setState({
            gridFull: g2,
            generation: this.state.generation + 1
        });
    }

    componentDidMount() {
        // this.seed();
        // this.playButton();
    }

    /**
     *
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div>
                <h1>The Game Of Life</h1>
                <Buttons
                    playButton={this.playButton}
                    pauseButton={this.pauseButton}
                    slow={this.slow}
                    fast={this.fast}
                    clear={this.clear}
                    seed={this.seed}
                    gridSize={this.gridSize}
                />
                <Grid
                    gridFull={this.state.gridFull}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                />
                <h2>Generation: {this.state.generation}</h2>
            </div>
        );
    }
}

/**
 * Array Clone
 * @param arr
 * @returns {any}
 */
function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}

export default Main;