import React, { Component } from 'react';

export default class CenteredText extends Component {
    componentDidMount() {
        let bbox = this.textElement.getBBox();
        let parentBbox = this.textElement.parentElement.getBBox();
        let x = (this.props.horizontal === undefined || this.props.horizontal) ? (parentBbox.width / 2) - (bbox.width / 2) : 0;
        let y = this.props.vertical ? (parentBbox.height / 2) - (bbox.height / 2) : bbox.height;
        this.textElement.setAttribute("x", x);
        this.textElement.setAttribute("y", y);
    }

    render() {
        let className = this.props.className;
        return (
            <text style={this.props.style} className={className} ref={textElement => {
                this.textElement = textElement;
            }}>{this.props.children}</text>
        );
    }
}
