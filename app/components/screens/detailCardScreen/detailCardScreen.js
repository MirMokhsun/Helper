import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Platform, I18nManager } from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setNullPivotPointCardItemRecomendation } from './redux/cardItemAction';
import StarSVG from '../../commonComponents/svg/starSVG';
import FullStar from '../../commonComponents/svg/FullStar';
import RightArrow from '../../commonComponents/svg/RightArrow';
import UpArrow from '../../commonComponents/svg/UpArrow';
import DownArrow from '../../commonComponents/svg/DownArrow';
import { AskSpredBidLine } from './detailCardScreenElements/askSpredBidLine/askSpredBidLine';
import { localization } from '../../../common/localization';
import { PivotPointAndChartsLine } from './detailCardScreenElements/pivotPointAndChartsLine/pivotPointAndChartsLine';
import TimeFrameCharts from './detailCardScreenElements/timeFrameCharts/timeFrameCharts';
import Chart from './detailCardScreenElements/chart/chart';
import { IndicatorApi } from '../../../api/indicatorApi/indicatorApi';
import { returnObjectLength } from '../../../api/funcWithObject/funcWithObject';
import { setZoomCharts } from './detailCardScreenElements/chart/redux/zoomChartsAction';

export class DetailCardScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#000756',
            headerBackTitleVisible: true,
            title: navigation.state.params ? navigation.state.params.title ? navigation.state.params.title : '' : '',
            headerTitleStyle: {
                color: "#000756",
                alignSelf: 'center',
                width: '100%',
                height: '100%',
                textAlign: "center",
                fontSize: 16,
                lineHeight: 40,
                ...Platform.select({
                    ios: {
                        paddingRight: 0,
                    },
                    android: {
                        paddingRight: I18nManager.isRTL ? 0 : 30,
                        paddingLeft: I18nManager.isRTL ? 30 : 0,
                    },
                }),
                fontFamily: 'Roboto-Regular',
                fontWeight: 'normal',
                backgroundColor: "#F5F5F7",
            },
            headerBackTitle: null,
            headerStyle: {
                backgroundColor: "#F5F5F7",
                paddingTop: Platform.OS === 'ios' ? 20 : 10,
                borderBottomColor: "transparent",
                shadowOpacity: 0,
                elevation: 0,
            },
            headerRight: (<View />),
        }
    };

    constructor(props) {
        super(props)
        const { navigation } = this.props;
        const { state: { params: { isCardFavorite: isCardFavoriteProps } } } = navigation;
        this.IndicatorApi = new IndicatorApi();
        this.state = {
            colorIndicator: '#9FA0B2',
            arrow: <RightArrow />,
            favoriteSvg: isCardFavoriteProps ? <FullStar /> : <StarSVG />,
            isCardFavorite: isCardFavoriteProps,
            isCandels: false,
        }
        this.svgWithBool = { favoriteSvg: isCardFavoriteProps ? <FullStar /> : <StarSVG />, isCardFavorite: isCardFavoriteProps };
    }

    componentDidMount = () => {
        const { recomendation } = this.state;
        this.setColor(recomendation);
    }

    componentWillReceiveProps(nextProps) {
        const { recomendation } = nextProps;
        this.setColor(recomendation.Summary);
    }

    componentWillUnmount() {
        const { setNullPivotPointCardItemRecomendation } = this.props;
        setNullPivotPointCardItemRecomendation();
    }

    choseCardFaforite = () => {
        const { isCardFavorite: isCardFavoriteState } = this.state;
        const { navigation: { state: { params: { choseCardFaforite: choseCardFaforiteProps } } } } = this.props;
        if (isCardFavoriteState) {
            this.ifCardFavoriteStateTrueFunction();
        } else {
            this.svgWithBool.favoriteSvg = <FullStar />;
            this.svgWithBool.isCardFavorite = true;
        }
        this.setState(this.svgWithBool);
        choseCardFaforiteProps();
    }

    ifCardFavoriteStateTrueFunction = () => {
        const { navigation: { state: { params: { getQuotationMap } } } } = this.props;
        const quotationMap = getQuotationMap();
        const favoritesObjLenght = returnObjectLength(quotationMap.favoritesObj);
        if (favoritesObjLenght > 1) {
            this.svgWithBool.favoriteSvg = <StarSVG />;
            this.svgWithBool.isCardFavorite = false;
        }
    }

    setColor = (recomendation) => {
        let result;
        switch (recomendation) {
            case 'Buy':
                result = { colorIndicator: '#1459D2', arrow: <UpArrow /> };
                break;
            case 'Sell':
                result = { colorIndicator: '#F86F6F', arrow: <DownArrow /> };
                break;
            case 'Neutral':
                result = { colorIndicator: '#9FA0B2', arrow: <RightArrow /> };
                break;
            default:
                /* code */
                break;
        }
        this.setState(result);
    }

    changeCharts = () => {
        const { isCandels } = this.state;
        this.setState({ isCandels: !isCandels });
    }

    render() {
        const { language, cardItem: { FullName, Ask, Bid, ID, Name }, cleanDatesArr, pivotPoint, recomendation, setZoomCharts } = this.props;
        const { favoriteSvg, arrow, colorIndicator, isCandels } = this.state;
        const local = localization[language];
        return (
            <View style={styles.container}>
                <View style={styles.indicatorContainer}>
                    <View style={styles.containerTitle}>
                        <Text style={styles.titleStyle}>{FullName}</Text>
                        <TouchableOpacity onPress={this.choseCardFaforite} style={styles.starWrapper} testID={`DetailCard${FullName}`} accessibilityLabel={`DetailCard${FullName}`}>
                            {favoriteSvg}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerIndicator}>
                        <Text style={[styles.idicatortextStyle, { color: colorIndicator }]}>{local[recomendation.Summary]}</Text>
                        {arrow}
                    </View>
                    <AskSpredBidLine ask={Ask} bid={Bid} language={language} />
                    <PivotPointAndChartsLine changeCharts={this.changeCharts} pivotPoint={pivotPoint.Pivot} />
                    <TimeFrameCharts {...{ ID, local, cleanDatesArr, Name, chengeTimeFrame: this.chengeTimeFrame, setZoomCharts }} />
                </View>
                <View style={styles.chartContainer}>
                    <Chart isCandels={isCandels} />
                </View>
            </View >
        )
    }
}

const mapStateToProps = state => ({
    language: state.currentLanguage.language,
    cardItem: state.cardItem.item,
    pivotPoint: state.cardItem.pivotPoint,
    recomendation: state.cardItem.recomendation,
    cleanDatesArr: state.candlesFunc.cleanDatesArr,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setNullPivotPointCardItemRecomendation,
    setZoomCharts,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DetailCardScreen);