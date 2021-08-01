import React from "react";
import Svg, { Path } from "react-native-svg";

const ArrowBack = props => (
<Svg width={props.width || 19} height={props.height || 12} viewBox="0 0 19 12"><Path d="M18.162 5H3.865l3.612-3.59L6.054 0 0 6l6.054 6 1.423-1.41L3.864 7h14.298V5z"  fill = {props.color}></Path></Svg>
);

export default ArrowBack;
