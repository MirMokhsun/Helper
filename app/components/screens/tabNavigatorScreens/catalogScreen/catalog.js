import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Catalog from '../../../commonComponents/svg/Catalog';
import { CatalogAndOtherButton } from '../../../commonComponents/catalogAndOtherButton/catalogAndOtherButton';
import CurrenciesSVG from '../../../commonComponents/svg/currenciesSVG';
import StarSVG from '../../../commonComponents/svg/starSVG';
import DiamondSVG from '../../../commonComponents/svg/diamondSVG';
import IndexesTabbarSVG from '../../../commonComponents/svg/indexesTabbarSVG';
import StockTabbarSVG from '../../../commonComponents/svg/stockTabbarSVG';
import { withNavigation } from 'react-navigation';
import { styles } from './style';
import { localization } from '../../../../common/localization';
import FreeServer from '../../../../api/processingWithServer/getfreesrver';
import { setFuncGetQuotationMap, setFuncSetQuotationMap, setFuncSetQuotationFavorites } from './redux/functionAddQuotationMapAction';
import { setCurrentCatalogScreen } from '../../catalogDetailsScreen/redux/currentScreenAction';
import { isUndefinedReturnSecondParam } from '../../../../api/isUndefinedReturnSecondParam/isundefinedreturnsecondparam';
import { writeInAsyncStorage, getFromAsyncStorage } from '../../../../api/writeInAsyncStorage/writeInAsyncStorage';
import { IndicatorApi } from '../../../../api/indicatorApi/indicatorApi';

export class CatalogScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: isUndefinedReturnSecondParam(navigation.state.params, 'pageTitle', 'Catalog'),
    tabBarIcon: ({ focused }) => {
      return focused ? <Catalog color="#1459D2" /> : <Catalog color="#000756" />;
    },
  });

  constructor(props) {
    super(props);
    this.freeServer = new FreeServer();
    this.freeServer.getFreeServer();
    this.IndicatorApi = new IndicatorApi();
    this.state = {
      currency: null,
      commodity: null,
      index: null,
      stock: null,
      favoritesObj: { 1: 1, 2: 2, 3: 3 },
    }
  }

  componentWillMount() {
    const { setFuncSetQuotationMap, setFuncGetQuotationMap, setFuncSetQuotationFavorites, navigation, language } = this.props;
    setFuncGetQuotationMap(this.getQuotationMap);
    setFuncSetQuotationMap(this.setNewQuotationMap);
    setFuncSetQuotationFavorites(this.setFavoritesState);
    navigation.setParams({ pageTitle: localization[language]['Catalog'] });
  }

  componentDidMount = async () => {
    getFromAsyncStorage('@quotationFavorites:key')
      .then((result) => {
        if (result) {
          const favoritesObj = JSON.parse(result);
          this.setState({ favoritesObj });
        }
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { currency } = this.state;
    const { webSocketClient, navigation, language } = this.props;
    if (currency && !prevState.currency && webSocketClient) {
      webSocketClient.webSocketClient.closeWebSocketConnection();
    }
    if (language !== prevProps.language) {
      navigation.setParams({ pageTitle: localization[language]['Catalog'] });
    }
  }

  getQuotationMap = () => {
    return this.state;
  }

  setNewQuotationMap = async (data) => {
    const { currency, commodity, index, stock } = this.state;
    if (data) {
      this.setState({
        currency: { ...currency, ...data.currency },
        commodity: { ...commodity, ...data.commodity },
        index: { ...index, ...data.index },
        stock: { ...stock, ...data.stock },
      });
    }
  }

  setFavoritesState = (data) => {
    try {
      const { favoritesObj } = this.state;
      let newFavorites;
      if (data.key === data.id) {
        newFavorites = {
          ...favoritesObj,
          ...{ [data.key]: data.id }
        }
      } else {
        newFavorites = favoritesObj;
        delete newFavorites[data.key];
      }
      this.setState({ favoritesObj: newFavorites }, () => {
        const newFavoritesJSON = JSON.stringify(newFavorites);
        writeInAsyncStorage('@quotationFavorites:key', newFavoritesJSON);
      });
    } catch (error) {

    }
  }

  goToCatalog = (screenName, titleName) => {
    const { favoritesObj } = this.state;
    const { navigation, setCurrentCatalogScreen } = this.props;
    navigation.navigate("CatalogDetailsScreen", { screenName, favoritesObj, titleName });
    setCurrentCatalogScreen(screenName);
  }

  render() {
    const { language } = this.props;
    const tabbarLanguage = localization[language].tabbar;
    return (
      <View style={styles.container}>
        <View style={styles.flex4}>
          <View style={styles.rowWith2Buttons}>
            <CatalogAndOtherButton id="Currency" title={tabbarLanguage.currency} svg={<CurrenciesSVG />} color="#219653" onPress={() => { this.goToCatalog('currency', tabbarLanguage.currency) }} />
            <CatalogAndOtherButton id="Commodity" title={tabbarLanguage.commodity} svg={<DiamondSVG />} color="#F2C94C" onPress={() => { this.goToCatalog('commodity', tabbarLanguage.commodity) }} />
          </View>
          <View style={styles.rowWith2Buttons}>
            <CatalogAndOtherButton id="Index" title={tabbarLanguage.index} svg={<IndexesTabbarSVG />} color="#F2994A" onPress={() => { this.goToCatalog('index', tabbarLanguage.index) }} />
            <CatalogAndOtherButton id="Stock" title={tabbarLanguage.stock} svg={<StockTabbarSVG />} color="#EB5757" onPress={() => { this.goToCatalog('stock', tabbarLanguage.stock) }} />
          </View>
        </View>
        <View style={styles.flex1}>
          <View style={styles.flex1}>
            <CatalogAndOtherButton id="Favorites" title={localization[language]['Favorites']} svg={<StarSVG />} color="#1459D2" onPress={() => { this.goToCatalog('favorites', localization[language]['Favorites']) }} longWidth />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  language: state.currentLanguage.language,
  webSocketClient: state.webSocketClient.webSocketClient,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setFuncGetQuotationMap,
  setFuncSetQuotationMap,
  setCurrentCatalogScreen,
  setFuncSetQuotationFavorites,
}, dispatch);

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(CatalogScreen));