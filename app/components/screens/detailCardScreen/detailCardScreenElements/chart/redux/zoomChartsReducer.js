const initialState = {
  zoom: { scaleX: 20, scaleY: 1, xValue: 300, yValue:1, axisDependency: 'RIGHT' }
};

export default function zoomCharts(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case "SET_ZOOM_CHARTS":
      return {
        ...state,
        zoom:data,
      };
    default:
      return state;
  }
}