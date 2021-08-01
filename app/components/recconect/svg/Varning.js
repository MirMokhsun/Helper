import React from "react";
import Svg, { Path } from "react-native-svg";

const Varning = ({width, height}) => (
<Svg width={ width || 20} height={height || 20} viewBox="0 0 20 20"><Path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z" fill="#fff"/></Svg>
);

export default Varning;
