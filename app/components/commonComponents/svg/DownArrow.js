import React from "react";
import Svg, { Path } from "react-native-svg";

const DownArrow = props => (
<Svg width={props.width || 8} height={props.height || 8} viewBox="0 0 8 8"><Path fill-rule="evenodd" clip-rule="evenodd" d="M3.5 0v6.1L.7 3.3 0 4l4 4 4-4-.7-.7-2.8 2.8V0h-1z" fill="#F86F6F"></Path></Svg>
);

export default DownArrow;
