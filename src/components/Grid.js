import React from "react";
import Box from "./Box";

/**
 * Grid Component
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Grid = props => {

    // 14 - Number of columns by size of the box in pixels.
    const width = props.cols * 14;

    let boxClass = "";

    const rowsArr = props.gridFull.map((rowArr, rowIdx) =>
        rowArr.map((item, colIdx) => {

            // ID - which goes to each box element 0_0,0_1 and so on
            const boxId = `${rowIdx}_${colIdx}`;

            // ternary operator, daca pe pozitie [i][j] este true/1 atunci clasa pt box-ul respectiv va fi box on in caz contrar box off
            boxClass = props.gridFull[rowIdx][colIdx] ? "box on" : "box off";

            return (
                <Box
                    boxClass={boxClass}
                    key={boxId}
                    boxId={boxId}
                    row={rowIdx}
                    col={colIdx}
                    selectBox={props.selectBox}
                />
            );
        })
    );

    return (
        <div className="grid" style={{ width }}>
            {rowsArr}
        </div>
    );
};

export default Grid;