import React from 'react';
import { View, processColor } from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';
import { styles } from './styles';

const increasColor = processColor('#1459D2');
const decreasColor = increasColor;
const rightIndentForCharts = 70;
const lineWidth = 2;
const textColorGreed = processColor('#C4C4C4');
const chartBackgroundColor = processColor('#F5F5F7');
const yOffset = 5;
const xAxisPosition = 'BOTTOM';
const average = 2;

class Line extends React.Component {
  constructor(props) {
    super(props);
    const dataLine = this.getLinesPositions(props.JSONCandle);
    this.state = {
      legend: {
        enabled: false,
      },
      data: {
        dataSets: [{
          values: dataLine,
          label: '',
          config: {
            lineWidth,
            drawCircles: false,
            highlightColor: increasColor,
            color: increasColor,
            drawFilled: false,
            fillColor: increasColor,
            drawValues: false,
          },
          xAxis: {},
          yAxis: {},
        }],
      },
    };
  }

  componentWillMount() {
    const { JSONCandle, dates } = this.props;
    const lastItem = JSONCandle[JSONCandle.length - 1];
    let color = decreasColor;
    const linePosition = parseFloat((lastItem.O + lastItem.C) / average)
    if (lastItem.O - lastItem.C > 0) {
      color = increasColor;
    }
    this.setState({
      xAxis: {
        drawLabels: true,
        drawGridLines: true,
        position: xAxisPosition,
        yOffset,
        textColor: textColorGreed,
        valueFormatter: dates,
        axisMaximum: JSONCandle.length + JSONCandle.length / rightIndentForCharts
      },
      yAxis: {
        right: {
          enabled: true,
          textColor: textColorGreed,
          limitLines: [{
            limit: linePosition,
            lineColor: color,
          }]
        },
        left: {
          enabled: true,
          drawLabels: false,
        },
      },
    })
  }

  componentWillReceiveProps({ JSONCandle }) {
    const lastItem = JSONCandle[JSONCandle.length - 1];
    const linePosition = parseFloat((lastItem.O + lastItem.C) / average);
    let color = decreasColor;
    if (lastItem.O - lastItem.C > 0) {
      color = increasColor;
    }
    const dataLine = this.getLinesPositions(JSONCandle);
    const { dates } = this.props;
    this.setState({
      data: {
        dataSets: [{
          values: dataLine,
          label: '',
          config: {
            lineWidth,
            drawCircles: false,
            highlightColor: increasColor,
            color: increasColor,
            drawFilled: false,
            fillColor: increasColor,
            drawValues: false,
          },
        }],
      },
      xAxis: {
        drawLabels: true,
        drawGridLines: true,
        position: xAxisPosition,
        yOffset,
        textColor: textColorGreed,
        valueFormatter: dates,
        axisMaximum: dataLine.length + dataLine.length / rightIndentForCharts
      },
      yAxis: {
        right: {
          enabled: true,
          textColor: textColorGreed,
          limitLines: [{
            limit: linePosition,
            lineColor: color,
          }]
        },
        left: {
          enabled: true,
          drawLabels: false,
        },
      },
    });
  }

  getLinesPositions = (data) => {
    if (data) {
      const result = data.map((item) => {
        if (item.O && item.C) {
          return { y: parseFloat((item.O + item.C) / average) };
        }
      });
      return result;
    }
  }

  render() {
    const { data, legend, marker, xAxis, yAxis } = this.state;
    const { zoom } = this.props;

    return (
      <View style={styles.container}>
        <LineChart
          style={styles.chart}
          data={data}
          chartDescription={{ text: '' }}
          legend={legend}
          marker={marker}
          xAxis={xAxis}
          yAxis={yAxis}
          chartBackgroundColor={chartBackgroundColor}
          zoom={zoom}
          scaleYEnabled={false}
          doubleTapToZoomEnabled={false}
          onChange={(event) => console.log(event.nativeEvent)}
        />
      </View>
    );
  }
}

export default Line;