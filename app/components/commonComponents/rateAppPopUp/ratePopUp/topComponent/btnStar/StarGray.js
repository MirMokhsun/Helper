import React from "react";
import Svg, { Path } from "react-native-svg";

const StarGray = props => (
    <Svg width={props.width || 24} height={props.height || 24} viewBox="0 0 24 24"><Path d="M22 9.621l-7.19-.653L12 2 9.19 8.979 2 9.62 7.46 14.6 5.82 22 12 18.074 18.18 22l-1.63-7.4L22 9.621zm-10 6.484l-3.76 2.39 1-4.506-3.32-3.031 4.38-.4L12 6.316l1.71 4.252 4.38.4L14.77 14l1 4.505-3.77-2.4z" fill={props.color ? props.color : "#5A6772"} ></Path></Svg>
);

export default StarGray;
