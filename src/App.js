import React from 'react';
import './App.css';
import Geeraff from './Geeraff';
import _ from 'lodash';
import flow from './flow';
import Handle from './Handle';
import Connector from './Connector';

function App() {
  let render = (label, data) => {
    return (
      <g>
        <rect width="150" height="100" rx="10" ry="10" />
        <text>{label}</text>
        <Handle x={150} y={50} data={data}>
          <circle cx={0} cy={0} r={20} />
        </Handle>
      </g>
    );
  }

  let draw = (label, data) => { 
    return {
      bounds: { width: 170, height: 120 },
      render: (node) => render(label, data),
      outputs: { x: 150, y: 50 },
      inputs: { x: 0, y: 50 },
      connector: (startNode, endNode, graph) => { 
        return (
          <Connector
            startX={startNode.x}
            startY={startNode.y}
            endX={endNode.x}
            endY={endNode.y}
            style={{strokeWidth: "2px", stroke: "blue"}}
            onClick={() => console.debug(startNode, endNode, graph)}
          />
        );
      }
    }
  }
  return (
    <div className="App" style={{padding: "50px", margin: "50px"}}>
      <Geeraff data={flow} nodes={[{
        accessor: "inputParameters",
        type: "inputParameter",
        children: (node, key, data) => {
          return _.map(node.processors, processorId => {
            return "processor-"+processorId
          });
        },
        key: (node, key) => "input-parameter-"+key,
        graphics: (node) => draw("Input Parameter " + node.id, node)
      }, {
        accessor: "processors",
        type: "processor",
        children: (node, key, data) => {
          return [
            node.output ? "output-parameter-"+node.output : null
          ]
        },
        key: (node, key) => "processor-"+key,
        graphics: node => draw(node.className, node)
      }, {
        accessor: "outputParameters",
        type: "outputParameter",
        children: () => null,
        key: (node, key) => "output-parameter-"+key,
        graphics: node => draw("Output Parameter " + node.id, node),
        drop: (dragData, dropData) => console.debug(dragData, dropData)
      }]}/>
    </div>
  );
}

export default App;
