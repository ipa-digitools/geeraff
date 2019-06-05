import React from 'react';
import './App.css';
import Geeraff from './Geeraff';
import _ from 'lodash';
import flow from './flow';

function App() {
  let render = label => {
    return <g>
      <rect width="100" height="30" />
      <text>{label}</text>
    </g>
  }
  return (
    <div className="App">
      <Geeraff data={flow} nodes={[{
        accessor: "inputParameters",
        children: (node, key, data) => {
          return _.map(node.processors, processorId => {
            return "processor-"+processorId
          });
        },
        key: (node, key) => "input-parameter-"+key,
        render: (node) => render("Input Parameter " + node.id) 
      }, {
        accessor: "processors",
        children: (node, key, data) => {
          return [
            node.output ? "output-parameter-"+node.output : null
          ]
        },
        key: (node, key) => "processor-"+key,
        render: (node) => render(node.className) 
      }, {
        accessor: "outputParameters",
        children: () => null,
        key: (node, key) => "output-parameter-"+key,
        render: (node) => render("Output Paramter " + node.id) 
      }]}/>
    </div>
  );
}

export default App;
