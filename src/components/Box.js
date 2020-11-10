import React from "react";

/**
 * Box Component
 */
class Box extends React.Component {

    /**
     * Select Box
     */
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col);
    }

    /**
     *
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div
                className={this.props.boxClass}
                id={this.props.id}
                onClick={this.selectBox}
            />
        );
    }
}

export default Box;