import React from "react";
import Svg, { Path } from "react-native-svg";
import Utils from "../../../api/utils/utils";

const width = Utils.size.width;

const Background = props => (
    <Svg width={props.width || width} height={props.height || width} viewBox="0 0 360 360"><Path d="M0 0v244l180 103 180-103V0H0z" fill="#000756"></Path></Svg>
);

export default Background;
