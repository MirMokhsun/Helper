import React from 'react';
import { View, Text, I18nManager } from 'react-native';
import { styles } from './styles';
import { isEqualNumb, setCamelPos } from '../../../../../api/cardQuotation.api/cardquotation.api';

export class QuotationItemDetailCard extends React.PureComponent {
    constructor(props) {
        super(props)

        this.countUperNambers = 2;
        this.rendersNumb = setCamelPos(props.number, styles.whiteNumbers, this.countUperNambers, styles);
        this.rendersNumbWithRtl = I18nManager.isRTL ? this.rendersNumb.reverse() : this.rendersNumb;
        this.state = {
            rendersNumb: this.rendersNumbWithRtl,
        }
    }

    componentWillReceiveProps({ number }) {
        const { number: thisNumber } = this.props;
        const compare = isEqualNumb(thisNumber, number);
        const colorNumbers = compare ? styles.greenNumbers : styles.redNumbers;
        let rendersNumb = setCamelPos(number, colorNumbers, this.countUperNambers, styles);
        rendersNumb = I18nManager.isRTL ? rendersNumb.reverse() : rendersNumb;

        this.setState({
            rendersNumb,
        });
    }


    render() {
        const { rendersNumb } = this.state;

        return (
            <View style={styles.container}>
                {rendersNumb}
            </View >
        )
    }
}

export default QuotationItemDetailCard;