import React from "react";
import Svg, { Path } from "react-native-svg";

const Polygon = props => (
<Svg width={props.width || 8} height={props.height || 6} viewBox="0 0 8 6"><Path d="M4 6L.536 0h6.928L4 6z" fill="#666"></Path></Svg>
);

export default Polygon;
