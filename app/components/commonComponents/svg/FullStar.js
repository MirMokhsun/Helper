import React from "react";
import Svg, { Path } from "react-native-svg";

const FullStar = props => (
<Svg width={props.width || 24} height={props.height || 24} viewBox="0 0 24 24"><Path d="M12 18.074L18.18 22l-1.64-7.4L22 9.621l-7.19-.642L12 2 9.19 8.979 2 9.62 7.46 14.6 5.82 22 12 18.074z" fill="#1459D2"></Path></Svg>
);

export default FullStar;