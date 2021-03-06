import React from "react";
import Svg, { Path } from "react-native-svg";

const Checked = props => (
<Svg width={props.width || 18} height={props.height || 18} viewBox="0 0 26 26"><Path d="M.3 14c-.2-.2-.3-.5-.3-.7s.1-.5.3-.7l1.4-1.4c.4-.4 1-.4 1.4 0l.1.1 5.5 5.9c.2.2.5.2.7 0L22.8 3.3h.1c.4-.4 1-.4 1.4 0l1.4 1.4c.4.4.4 1 0 1.4l-16 16.6c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3L.5 14.3.3 14z" fill={props.color || '#000000'}></Path></Svg>
);

export default Checked;
