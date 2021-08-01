import React from "react";
import Svg, { Path } from "react-native-svg";

const Catalog = props => (
<Svg width={props.width || 18} height={props.height || 18} viewBox="0 0 18 18"><Path fill-rule="evenodd" clip-rule="evenodd" d="M1.76 15.84h14.08V9.68h-3.168l-1.32 2.2c-.176.264-.44.44-.792.44H7.04c-.352 0-.616-.176-.792-.44l-1.32-2.2H1.76v6.16zM11.792 1.76H5.808L2.376 7.92h3.08c.352 0 .616.176.792.44l1.32 2.2h2.464l1.32-2.2c.176-.264.44-.44.792-.44h3.08l-3.432-6.16zm1.32-1.32l4.4 7.92c.088.176.088.264.088.44v7.04c0 .968-.792 1.76-1.76 1.76H1.76C.792 17.6 0 16.808 0 15.84V8.8c0-.176 0-.264.088-.44l4.4-7.92c.176-.264.44-.44.792-.44h7.04c.352 0 .616.176.792.44zM5.28 7.04h7.04v-.88H5.28v.88zm6.16-1.76H6.16V4.4h5.28v.88zm-4.4-1.76h3.52v-.88H7.04v.88z" fill={props.color}></Path></Svg>
);

export default Catalog;
