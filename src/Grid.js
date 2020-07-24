import React from "react";
import _ from "lodash";

const defaults = {
  spacing: { x: 20, y: 20 },
  emphasis: { x: 100, y: 100 },
  style: {
      minor: {
          stroke: "gray",
          strokeWidth: "0.5"
      },
      major: {
          stroke: "gray",
          strokeWidth: "1"
      }
  }
};

export default (props) => {
  let options = _.defaultsDeep(props.options, defaults);
  return (
    <g>
      <defs>
        <pattern
          id="minorGrid"
          width={options.spacing.x}
          height={options.spacing.y}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${options.spacing.x} 0 L 0 0 0 ${options.spacing.y}`}
            fill="none"
            style={options.style.minor}
          />
        </pattern>
        <pattern
          id="majorGrid"
          width={options.emphasis.x}
          height={options.emphasis.y}
          patternUnits="userSpaceOnUse"
        >
          <rect width={options.emphasis.x} height={options.emphasis.y} fill="url(#minorGrid)" />
          <path
            d={`M ${options.emphasis.x} 0 L 0 0 0 ${options.emphasis.y}`}
            fill="none"
            style={options.style.major}
          />
        </pattern>
      </defs>
      <rect width="2000" height="1000" fill="url(#majorGrid)" />
    </g>
  );
};
