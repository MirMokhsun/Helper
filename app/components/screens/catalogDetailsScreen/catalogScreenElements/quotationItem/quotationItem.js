import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { isEqualNumb, setCamelPos } from '../../../../../api/cardQuotation.api/cardquotation.api';

export class QuotationItem extends React.PureComponent {
    constructor(props) {
        super(props)
        this.countUperNambers = 2;
        this.rendersNumb = setCamelPos(props.number, styles.whiteNumbers, this.countUperNambers, styles);
        this.state = {
            rendersNumb: this.rendersNumb,
        }
    }

    UNSAFE_componentWillReceiveProps({ number }) {
        const { number: thisNumber } = this.props;
        if (thisNumber !== number) {
            const compare = isEqualNumb(thisNumber, number);
            const colorNumbers = compare ? styles.greenNumbers : styles.redNumbers;
            const rendersNumb = setCamelPos(number, colorNumbers, this.countUperNambers, styles);
            this.setState({
                rendersNumb,
            });
        }
    }

    render() {
        const { text } = this.props;
        const { rendersNumb } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.textWrapper}>
                    <Text style={styles.text}>{text}</Text>
                </View>
                <View style={styles.rendersNumbWrapper}>
                    {rendersNumb}
                </View>
            </View >
        )
    }
}

export default QuotationItem;