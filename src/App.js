import React, { useState } from "react";
import "./App.css";
import Geeraff from "./Geeraff";
import _ from "lodash";
import Handle from "./Handle";
import Connector from "./Connector";
import { phylogeny, integrationFlow } from "./test-data";
import CenteredText from './CenteredText';
import { flatten } from './Util';
import longestPathLayout from "./Layouts/LongestPath";
import forceDirectedLayout from "./Layouts/ForceDirected";
import treeLayout from "./Layouts/TreeLayout";
import { whileStatement } from "@babel/types";

function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const getTab = () => {
    switch (tabIndex) {
      case 1: { 
        return <Geeraff
          layout={treeLayout}
          data={flatten(phylogeny, node => node.children)}
        />
      }
      default: {
        const render = (label, data, node) => {
          return (
            <g>
              <g>
                <rect width="200" height="120" rx="5" ry="5" fill="white" stroke="grey" strokeWidth="0.4"/>
                <rect width="200" height="24" fill="white" stroke="orange" strokeWidth="0.4"/>
                <CenteredText style={{fill: "grey", fontSize: 12}}>{label}</CenteredText>
              </g>
              <Handle x={200} y={60} data={data}>
                <circle cx={0} cy={0} r={10} />
              </Handle>
            </g>
          );
        };
        const draw = (label, data) => {
          return {
            bounds: { width: 200, height: 120 },
            render: node => render(label, data, node),
            outputs: { x: 200, y: 60 },
            inputs: { x: 0, y: 60 },
            connector: (startNode, endNode, graph) => {
              return (
                <Connector
                  startX={startNode.x}
                  startY={startNode.y}
                  endX={endNode.x}
                  endY={endNode.y}
                  style={{ strokeWidth: "0.5", stroke: "grey" }}
                  onClick={() => console.debug(startNode, endNode, graph)}
                >
                  <circle cx={0} cy={0} r={10}/>
                </Connector>
              );
            }
          };
        };
        const drawProcessor = (label, data) => { 
          return {
            bounds: {
              width: 70, 
              height: 70,
            },
            outputs: { x: 70, y: 35 },
            inputs: { x: 0, y: 35 },
            render: node => { 
              return (
                <g>
                  <rect transform="rotate(45 35 35)" width="70" height="70" rx="5" ry="5" stroke="grey" strokeWidth="0.2" fill="white"/>
                </g>
              )
            },
            connector: (startNode, endNode, graph) => {
              return (
                <Connector
                  startX={startNode.x}
                  startY={startNode.y}
                  endX={endNode.x}
                  endY={endNode.y}
                  style={{ strokeWidth: "0.5", stroke: "grey" }}
                  onClick={() => console.debug(startNode, endNode, graph)}
                />
              );
            }
          }
        }
        return (
          <Geeraff
            data={integrationFlow}
            layout={treeLayout}
            nodes={[
              {
                accessor: "inputParameters",
                type: "inputParameter",
                children: (node, key, data) => {
                  return _.map(node.processors, processorId => {
                    return "processor-" + processorId;
                  });
                },
                key: (node, key) => "input-parameter-" + key,
                graphics: node => draw("Input Parameter " + node.id, node),
                drop: (dragData, dropData) => console.debug(dragData, dropData)
              },
              {
                accessor: "processors",
                type: "processor",
                children: (node, key, data) => {
                  return [
                    node.output ? "output-parameter-" + node.output : null
                  ];
                },
                key: (node, key) => "processor-" + key,
                //graphics: node => draw(node.className, node),
                graphics: node => drawProcessor(node.className, node),                
                drop: (dragData, dropData) => console.debug(dragData, dropData)
              },
              {
                accessor: "outputParameters",
                type: "outputParameter",
                children: () => null,
                key: (node, key) => "output-parameter-" + key,
                graphics: node => draw("Output Parameter " + node.id, node),
                drop: (dragData, dropData) => console.debug(dragData, dropData)
              }
            ]}
          />
        );
      }
    }
  };

  return (
    <div className="App" style={{ padding: "50px", margin: "50px" }}>
      <div className="menu">
        <div className="button" onClick={() => setTabIndex(0)}>
          Integration Flow
        </div>
        <div className="button" onClick={() => setTabIndex(1)}>
          Phylogeny
        </div>
      </div>
      <div className="content">{getTab()}</div>
    </div>
  );
}

export default App;
