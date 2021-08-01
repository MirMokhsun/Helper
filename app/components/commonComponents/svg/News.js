import React from "react";
import Svg, { Path } from "react-native-svg";

const News = props => (
<Svg width={props.width || 18} height={props.height || 16} viewBox="0 0 18 16"><Path d="M16.2 7.111H1.8V4.444h14.4v2.667zm0 3.556H9.9V8.889h6.3v1.778zm0 3.555H9.9v-1.778h6.3v1.778zm-8.1 0H1.8V8.89h6.3v5.333zm8.397-12.738L15.003 0 13.5 1.484 11.997 0l-1.494 1.484L9 0 7.497 1.484 6.003 0 4.5 1.484 2.997 0 1.503 1.484 0 0v14.222c0 .472.19.924.527 1.257.338.334.796.521 1.273.521h14.4c.477 0 .935-.187 1.273-.52.337-.334.527-.786.527-1.258V0l-1.503 1.484z" fill={props.color}></Path></Svg>
);

export default News;
