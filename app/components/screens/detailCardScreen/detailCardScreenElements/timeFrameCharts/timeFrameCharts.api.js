import Utils from "../../../../../api/utils/utils";

const countButtons = 6;
const containerkWidth = 0.9 // 90%;
const paddingLeftAndRight = 8 // padding 4*2
export const buttonWidth = ((Utils.size.width * containerkWidth - paddingLeftAndRight) / countButtons);