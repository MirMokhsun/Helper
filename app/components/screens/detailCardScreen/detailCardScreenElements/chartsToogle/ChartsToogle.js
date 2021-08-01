import React, { PureComponent } from 'react';
import { View, Image, Animated, TouchableWithoutFeedback, Easing, I18nManager } from 'react-native';
import { styles } from './styles';

const lineChartBlue = <Image source={require('./iconPNG/blueLine.png')} style={{ width: 26, height: 18, marginRight: 4 }} />;
const candleChartGray = <Image source={require('./iconPNG/grayCandle.png')} style={{ width: 14, height: 18, marginLeft: 4 }} />;
const lineChartGray = <Image source={require('./iconPNG/grayLine.png')} style={{ width: 26, height: 18, marginRight: 4 }} />;
const candleChartBlue = <Image source={require('./iconPNG/blueCandle.png')} style={{ width: 14, height: 18, marginLeft: 4 }} />;

export class ChartsToogle extends PureComponent {
    constructor(props) {
        super(props);
        this.maxLeftDistance = I18nManager.isRTL ? -61 : 61;
        this.state = {
            leftDistance: new Animated.Value(this.maxLeftDistance),
            isCandleChartsChosen: false,
            lineChart: lineChartGray,
            candleChart: candleChartBlue,
        }
    }

    animation = (_toDistance, _fromDistane) => {
        const { leftDistance } = this.state;
        Animated.timing(
            leftDistance,
            {
                fromValue: _fromDistane,
                toValue: _toDistance,
                duration: 100,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start();
    }

    changeChart = async () => {
        const { changeCharts } = this.props;
        const { isCandleChartsChosen } = this.state;
        let lineChart; let candleChart = null;

        if (isCandleChartsChosen) {
            lineChart = lineChartGray;
            candleChart = candleChartBlue;
            this.animation(this.maxLeftDistance, 0);
        } else {
            lineChart = lineChartBlue;
            candleChart = candleChartGray;
            this.animation(0, this.maxLeftDistance);
        }
        this.setState({
            isCandleChartsChosen: !isCandleChartsChosen,
            lineChart,
            candleChart,
        });
        await changeCharts();
    };

    render() {
        const { lineChart, candleChart, leftDistance } = this.state;
        return (
            <TouchableWithoutFeedback onPress={this.changeChart} testID="ChartsToogleID" accessibilityLabel="ChartsToogleID">
                <View style={styles.containerToogle} >
                    <Animated.View style={[styles.sliderInToogle, { transform: [{ translateX: leftDistance }] }]} ></Animated.View>
                    <View style={styles.wrapperImageInToogle}>
                        <View style={styles.imageInToogle}>{lineChart}</View>
                        <View style={styles.imageInToogle}>{candleChart}</View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default ChartsToogle;