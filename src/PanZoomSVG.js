import React, { Component } from 'react';
import {getTransformedPosition, getViewBox, bounds} from "./Util";

export default class PanZoomSVG extends Component{
    constructor(props){
        super(props);
        this.mouseMove = this.mouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onWheel = this.onWheel.bind(this);
        this.zoomFactor = props.zoomFactor || 0.1;
        this.state = {
            x: 0,
            y: 0,
            width: 1000,
            height: 1000,
            zoomLevel: 10,
            previousZoomLevel: 10
        };
        this.mousePosition = {
            x: 0,
            y: 0,
            startX: undefined,
            startY: undefined
        };
        this.mouse = {x:0, y:0};
    }

    mouseMove(event){
        if(this.svg) {
            this.mousePosition.x = event.clientX;
            this.mousePosition.y = event.clientY;
            if(this.mousePosition.startX === undefined) {
                this.mousePosition.startX = this.mousePosition.x;
                this.mousePosition.startY = this.mousePosition.y;
            }
            let position = {
                x: this.mousePosition.x,
                y: this.mousePosition.y
            };
            let oldPosition = {
                x: this.mousePosition.startX,
                y: this.mousePosition.startY
            }
            position = getTransformedPosition(position, this.svg, null, true);
            oldPosition = getTransformedPosition(oldPosition, this.svg, null, true);
            this.setState({
                x: this.state.x- (position.x - oldPosition.x),
                y: this.state.y- (position.y - oldPosition.y)
            });
            this.mousePosition.startX = this.mousePosition.x;
            this.mousePosition.startY = this.mousePosition.y;
        }
    }

    onMouseUp(event){
        document.removeEventListener("mousemove", this.mouseMove);
        document.removeEventListener("mouseup", this.onMouseUp);
        this.mousePosition.startX = undefined;
        this.mousePosition.startY = undefined;
    }

    onMouseDown(event){
        event.preventDefault();
        document.addEventListener("mousemove", this.mouseMove);
        document.addEventListener("mouseup", this.onMouseUp);
    }

    onWheel(event){
        event.preventDefault();
        let previousZoomLevel = this.state.zoomLevel;
        let zoomLevel = this.state.zoomLevel + Math.sign(event.deltaY);
        if(zoomLevel < 1) zoomLevel = 1;
        let mousePosition = {x: event.clientX, y: event.clientY};
        let boundingBox = this.svg.getBoundingClientRect();
        let viewBox = this.calculateZoomBox(zoomLevel, previousZoomLevel, mousePosition, boundingBox);
        let state = {
            previousZoomLevel: previousZoomLevel,
            zoomLevel: zoomLevel,
            x: viewBox.x,
            y: viewBox.y,
            width: viewBox.width,
            height: viewBox.height
        };
        this.setState(state);
    }

    calculateZoomBox(zoomLevel, previousZoomLevel, mousePosition, boundingBox){
        if(this.svg) {
            let previousWidth = this.state.width;
            let previousHeight = this.state.height;
            let width = zoomLevel * this.zoomFactor * 1000;
            let height = zoomLevel * this.zoomFactor * 1000;

            let transformedBounds = getTransformedPosition(boundingBox, this.svg, null, true);
            let transformedMouse = getTransformedPosition(mousePosition, this.svg, null, true);
            let mouseRatioX = (transformedMouse.x - transformedBounds.x) / previousWidth;
            let mouseRatioY = (transformedMouse.y - transformedBounds.y) / previousHeight;

            let x = (transformedMouse.x - (mouseRatioX * width));
            let y = (transformedMouse.y - (mouseRatioY * height));

            return bounds(x, y, width, height);
        }
        return bounds(this.state.x, this.state.y, this.state.width, this.state.height);
    }

    render(){
        let viewBox = getViewBox(this.state.x, this.state.y, this.state.width, this.state.height);
        return (
            <svg preserveAspectRatio={"xMinYMin meet"}  id={this.props.id} ref={svg => this.svg = svg} className={this.props.className} viewBox={viewBox} onMouseDown={this.onMouseDown} onWheel={this.onWheel}>
                {this.props.children}
            </svg>
        );
    }
}
