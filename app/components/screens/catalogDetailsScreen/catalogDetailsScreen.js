/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setCardItem } from '../detailCardScreen/redux/cardItemAction';
import { styles } from './styles';
import { setCurrentCatalogScreen, setFunctionNewQuotationMap } from './redux/currentScreenAction';
import { renderCards } from '../../../api/renderCards/renderCards';
import { localization } from '../../../common/localization';
import FreeServer from '../../../api/processingWithServer/getfreesrver';
import { showToast } from '../../commonComponents/contentWrapper/redux/showPopUpAction';
import { removeFromCurrentCards, copyCurrentMapWithoutOne, getAllNames, makeObjectWithManeKeys } from './catalogDetailsScreen.api';
import { IndicatorApi } from '../../../api/indicatorApi/indicatorApi';
import SearchToolBar from '../tabNavigatorScreens/tabBarScreen/toolbarInTabbar/searchToolBar/searchToolBar';

export class CatalogDetailsScreen extends Component {

    static navigationOptions = () => {
        return {
            header: null,
        }
    };

    constructor(props) {
        super(props)
        this.freeServer = new FreeServer();
        this.IndicatorApi = new IndicatorApi;
        this.state = {
            currentMap: {},
            currentCards: [],
            recomendationsForCards: {},
            searchCardText: '',
            // titleName: '',
            // screenName: '',
        }
        const { screenName, favoritesObj, titleName } = this.props.navigation.state.params;
        this.favoritesObj = favoritesObj;
        this.screenName = screenName;
        this.titleName = titleName;
    }

    componentDidMount = async () => {
        try {
            const { navigation, language, webSocketClient, getQuotationMap, setFunctionNewQuotationMap } = this.props;
            const { state: { routeName, params: { titleName } } } = navigation;
            let currentCards = [];
            currentCards = this.filterCards(this.props, '');
            this.setState({ currentCards, titleName });
            setFunctionNewQuotationMap(this.setNewQuotationMap);
            if (webSocketClient) {
                webSocketClient.webSocketClient.createWebSocketConnection();
            } else {
                this.freeServer.getFreeServer();
            }
            navigation.setParams({ title: localization[language]['Catalog'] });

            const allNames = getAllNames(getQuotationMap()[routeName]);
            await this.IndicatorApi.getTechAnalysis(allNames, ['DAY'])
                .then((responce) => {
                    if (responce.techAnalysis) {
                        const recomendations = makeObjectWithManeKeys(responce.techAnalysis);
                        this.setState({
                            recomendationsForCards: recomendations,
                        })
                    }
                });
        } catch (error) {

        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { navigation } = nextProps;
        const { state: { params: { titleName } } } = navigation;
        this.setState({ titleName });
    }

    UNSAFE_componentWillUnmount() {
        const { setCurrentCatalogScreen, setFunctionNewQuotationMap, webSocketClient } = this.props;
        if (webSocketClient) {
            webSocketClient.webSocketClient.closeWebSocketConnection();
        }
        setCurrentCatalogScreen('');
        setFunctionNewQuotationMap(null);
    };

    setTextRenderCards = (text) => {
        this.setState({ searchCardText: text });
    }

    filterCards = (props, searchCardText) => {
        const { getQuotationMap,
            language,
            setCardItem,
            navigation,
            setQuotationFavorites,
            showToast,
        } = props;
        const { state: { routeName, params: { titleName, screenName } } } = navigation;
        const { currentCards, recomendationsForCards } = this.state;
        let newCurrentCards = [];
        const { favoritesObj, removeFromCatalogDetailScreenCard } = this;
        newCurrentCards = renderCards(
            getQuotationMap()[routeName],
            currentCards,
            language,
            setCardItem,
            navigation,
            recomendationsForCards,
            favoritesObj,
            // titleName,
            this.screenName,
            setQuotationFavorites,
            removeFromCatalogDetailScreenCard,
            getQuotationMap,
            showToast,
            searchCardText,
            this.titleName
        );
        return newCurrentCards;
    }

    removeFromCatalogDetailScreenCard = (id) => {
        const { currentCards, currentMap } = this.state;
        const newCurrentCards = removeFromCurrentCards(currentCards, id);
        const newCurrentMap = copyCurrentMapWithoutOne(currentMap, id);
        this.setState({ currentCards: newCurrentCards, currentMap: newCurrentMap });
    }

    setNewQuotationMap = (data) => {
        const { currentMap, currentCards, recomendationsForCards, searchCardText } = this.state;
        const { language, setCardItem, navigation, setQuotationFavorites, showToast, getQuotationMap } = this.props;
        const { state: { params: { titleName, screenName } } } = navigation;
        const newMap = { ...currentMap, ...data };
        const newCurrentCards = renderCards(
            newMap,
            currentCards,
            language,
            setCardItem,
            navigation,
            recomendationsForCards,
            this.favoritesObj,
            // titleName,
            this.screenName,
            setQuotationFavorites,
            this.removeFromCatalogDetailScreenCard,
            getQuotationMap,
            showToast,
            searchCardText,
            this.titleName,
        );
        if (data) {
            this.setState({
                currentMap: newMap,
                currentCards: newCurrentCards
            });
        }
    }

    render() {
        const { currentCards } = this.state;
        return (
            <View style={styles.wrapper}>
                <SearchToolBar title={this.titleName} setTextRenderCards={this.setTextRenderCards} />
                <FlatList data={currentCards} renderItem={({ item }) => item} />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    getQuotationMap: state.functionAddQuotationMap.getQuotationMap,
    setQuotationFavorites: state.functionAddQuotationMap.setQuotationFavorites,
    language: state.currentLanguage.language,
    webSocketClient: state.webSocketClient.webSocketClient,
    filterCatalogText: state.searchCatalog.filterCatalogText,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    setCardItem,
    setCurrentCatalogScreen,
    setFunctionNewQuotationMap,
    showToast,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CatalogDetailsScreen);