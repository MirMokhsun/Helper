import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { ChartsToogle } from '../chartsToogle/ChartsToogle';
import { setCamelPos } from '../../../../../api/cardQuotation.api/cardquotation.api';

export class PivotPointAndChartsLine extends PureComponent {
    constructor(props) {
        super(props)
        this.countUperNambers = 2;
        this.rendersNumb = setCamelPos(props.pivotPoint, styles.whiteNumbers, this.countUperNambers, styles);
        this.state = {
            rendersNumb: this.rendersNumb,
        }
    }

    componentWillReceiveProps({ pivotPoint }) {
        const rendersNumb = setCamelPos(pivotPoint, styles.whiteNumbers, this.countUperNambers, styles);
        this.setState({
            rendersNumb,
        });
    }

    render() {
        const { changeCharts } = this.props;
        const { rendersNumb } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.piwotPointWrapper}>
                    <Text style={styles.text}>Pivot Points: { rendersNumb }</Text>
                </View>
                <View style={styles.toogleWrapper}>
                    <ChartsToogle changeCharts={changeCharts} />
                </View>
            </View >
        )
    }
}

export default PivotPointAndChartsLine;