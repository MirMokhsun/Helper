import React from 'react';
import { View, processColor } from 'react-native';
import { styles } from './styles';
import { CandleStickChart } from 'react-native-charts-wrapper';

const increasColor = processColor('#1459D2');
const decreasColor = processColor('#F86F6F');
const textColorGreed = processColor('#C4C4C4');
const shadowColor = processColor('#000000');
const chartBackgroundColor = processColor('#F5F5F7');
const yOffset = 5;
const yAxisLineWidth = 1;
const shadowWidth = 1;
const xAxisPosition = 'BOTTOM';
const rightIndentForCharts = 70;

class CandleStick extends React.Component {
	constructor(props) {
		super(props);
		const { JSONCandle } = this.props;
		this.state = {
			legend: {
				enabled: false,
			},
			data: {
				dataSets: [{
					values: JSONCandle,
					label: '',
					config: {
						shadowWidth,
						shadowColorSameAsCandle: true,
						increasingColor: increasColor,
						// increasingPaintStyle: 'fill',
						increasColor: 'fill',
						decreasingColor: decreasColor,
						drawValues: false,
					},
				}],
			},
			marker: {
				enabled: false,
			},
		};
	}

	componentWillMount() {
		const { JSONCandle, dates } = this.props;
		const lastItem = JSONCandle[JSONCandle.length - 1];
		let color = decreasColor;
		if ((lastItem.C - lastItem.O) > 0) {
			color = increasColor;
		}
		this.setState({
			xAxis: {
				enabled: true,
				drawLabels: true,
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
						limit: lastItem.C,
						lineColor: color,
						lineWidth: yAxisLineWidth,
					}],
				},
				left: {
					enabled: true,
					drawLabels: false,
				},
			},
		});
	}

	componentWillReceiveProps(nextProps) {
		const { JSONCandle, dates } = nextProps;
		const lastItem = JSONCandle[JSONCandle.length - 1];
		let color = decreasColor;
		if ((lastItem.C - lastItem.O) > 0) {
			color = increasColor;
		}
		this.setState({
			data: {
				dataSets: [{
					values: JSONCandle,
					label: '',
					config: {
						highlightColor: decreasColor,
						shadowColor,
						shadowWidth,
						shadowColorSameAsCandle: true,
						increasingColor: increasColor,
						// increasingPaintStyle: 'fill',
						increasColor: 'fill',
						decreasingColor: decreasColor,
						drawValues: false
					},
				}],
			},
			xAxis: {
				enabled: true,
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
						limit: lastItem.C,
						lineColor: color,
						lineWidth: yAxisLineWidth,
					}],
				},
				left: {
					enabled: true,
					drawLabels: false,
				},
			},
		});
	}

	render() {
		const { data, legend, marker, xAxis, yAxis } = this.state;
		const { zoom } = this.props;
		return (
			<View style={styles.container}>
				<CandleStickChart
					style={styles.chart}
					data={data}
					marker={marker}
					chartDescription={{ text: '' }}
					legend={legend}
					xAxis={xAxis}
					yAxis={yAxis}
					xEntrySpace={false}
					maxVisibleValueCount={116}
					autoScaleMinMaxEnabled
					chartBackgroundColor={chartBackgroundColor}
					zoom={ zoom }
					scaleYEnabled={false}
					doubleTapToZoomEnabled={false}
				/>
			</View>
		);
	}
}

export default CandleStick;