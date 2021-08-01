import React from "react";
import Svg, { Path } from "react-native-svg";

const RightArrow = props => (
<Svg width={props.width || 8} height={props.height || 8} viewBox="0 0 8 8"><Path fill-rule="evenodd" clip-rule="evenodd" d="M0 4.5h6.1L3.3 7.3 4 8l4-4-4-4-.7.7 2.8 2.8H0v1z" fill="#9FA0B2"></Path></Svg>
);

export default RightArrow;
