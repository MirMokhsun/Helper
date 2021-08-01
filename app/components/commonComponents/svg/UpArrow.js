import React from "react";
import Svg, { Path } from "react-native-svg";

const UpArrow = props => (
<Svg width={props.width || 8} height={props.height || 8} viewBox="0 0 8 8"><Path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 8V1.9l2.8 2.8L8 4 4 0 0 4l.7.7 2.8-2.8V8h1z" fill="#1459D2"></Path></Svg>
);

export default UpArrow;
