import React from "react";
import Svg, { Path } from "react-native-svg";

const Rest = props => (
<Svg width={props.width || 20} height={props.height || 20} viewBox="0 0 20 20"><Path d="M9.99 0C4.47 0 0 4.48 0 10s4.47 10 9.99 10C15.52 20 20 15.52 20 10S15.52 0 9.99 0zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 16.92 6zM10 2.04c.83 1.2 1.48 2.53 1.91 3.96H8.09C8.52 4.57 9.17 3.24 10 2.04zM2.26 12C2.1 11.36 2 10.69 2 10s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H2.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 0 1 3.08 14zm2.95-8H3.08a7.987 7.987 0 0 1 4.33-3.56A15.65 15.65 0 0 0 6.03 6zM10 17.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM12.34 12H7.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM14.36 12c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" fill={props.color}></Path></Svg>
);

export default Rest;
