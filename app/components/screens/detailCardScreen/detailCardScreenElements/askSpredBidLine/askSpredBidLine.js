import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { QuotationItemDetailCard } from '../quotationItemDetailCard/quotationItemDetailCard';
import { getSpred } from '../../../../../api/openCardLogic/openCardApi';

export class AskSpredBidLine extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            spred: 0
        }
    }

    componentWillMount() {
        const { bid, ask } = this.props;
        const spred = getSpred(ask, bid);
        this.setState({ spred });
    }

    render() {
        const { bid, ask } = this.props;
        const { spred } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.numberContainer}>
                    <Text style={styles.textTitle}>Ask</Text>
                    <QuotationItemDetailCard number={(ask == 0) ? '--' : ask} />
                </View>
                <View style={styles.spredContainer}>
                    <Text style={styles.textTitle}>Spred</Text>
                    <Text style={styles.spred}>{spred}</Text>
                </View>
                <View style={styles.numberContainer}>
                    <Text style={styles.textTitle}>Bid</Text>
                    <QuotationItemDetailCard number={(bid == 0) ? '--' : bid} />
                </View>
            </View >
        )
    }
}

export default AskSpredBidLine;