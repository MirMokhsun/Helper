import React, { Component } from 'react';
import { isEqual } from 'lodash';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import UpArrow from '../../../../commonComponents/svg/UpArrow';
import RightArrow from '../../../../commonComponents/svg/RightArrow';
import DownArrow from '../../../../commonComponents/svg/DownArrow';
import { QuotationItem } from '../quotationItem/quotationItem';
import StarSVG from '../../../../commonComponents/svg/starSVG';
import FullStar from '../../../../commonComponents/svg/FullStar';
import { withNavigation } from 'react-navigation';
import { localization } from '../../../../../common/localization';
import { returnObjectLength } from '../../../../../api/funcWithObject/funcWithObject';

export class CardItem extends Component {
    constructor(props) {
        super(props)
        const { pageName, navigation, setQuotationFavorites, cardID, removeFromCatalogDetailScreenCard, getQuotationMap, showToast, titleName } = this.props;
        this.pageName = pageName;
        this.titleName = titleName;
        this.setQuotationFavorites = setQuotationFavorites;
        this.cardID = cardID;
        this.removeFromCatalogDetailScreenCard = removeFromCatalogDetailScreenCard;
        this.getQuotationMap = getQuotationMap;
        this.showToast = showToast;
        this.svgWithBool = { favoriteSvg: <FullStar />, isCardFavorite: true };
        this.choiseId = { key: this.cardID, id: this.cardID };
        this.state = {
            borderColor: '#9FA0B2',
            arrow: <RightArrow />,
            favoriteSvg: <StarSVG />,
            isCardFavorite: false,
            inFocus: true,
            showCard: true
        }
        this.recimendation = {
            'Buy': { borderColor: '#1459D2', arrow: <UpArrow /> },
            'Sell': { borderColor: '#F86F6F', arrow: <DownArrow /> },
            'Neutral': { borderColor: '#9FA0B2', arrow: <RightArrow /> }
        }
        this.addListenerWillFocus = navigation.addListener('willFocus', () => { this.setState({ inFocus: true, }); })
        this.addListenerDidBlur = navigation.addListener('didBlur', () => { this.setState({ inFocus: false, }); })
    }
    
    componentWillMount() {
        const { indicator, isCardFavorite } = this.props;
        this.setColor(indicator);
        if (isCardFavorite) {
            this.setState({ isCardFavorite, favoriteSvg: <FullStar /> });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { indicator } = nextProps;
        this.setColor(indicator);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { item } = this.props;
        const { isCardFavorite, inFocus } = this.state;
        const isItemChanged = !isEqual(nextProps.item, item);
        const isStateChanged = !isEqual(this.state, nextState);
        const isFavoritesChanged = !isEqual(isCardFavorite, nextState.isCardFavorite)
        return ((isItemChanged || isStateChanged) && inFocus) || isFavoritesChanged;
    }

    componentWillUnmount() {
        this.addListenerWillFocus.remove();
        this.addListenerDidBlur.remove();
    }

    setColor = (indicator) => {
        this.setState(this.recimendation[indicator])
    }

    choseCardFaforite = () => {
        try {
            const { isCardFavorite: isCardFavoriteState } = this.state;
            if (isCardFavoriteState) {
                this.ifCardFavoriteStateTrueFunction();
            } else {
                this.svgWithBool.favoriteSvg = <FullStar />;
                this.svgWithBool.isCardFavorite = true;
                this.choiseId.id = this.cardID; // add
            }
            this.setState(this.svgWithBool);
            this.setQuotationFavorites(this.choiseId);
        } catch (error) {
        }
    }

    ifCardFavoriteStateTrueFunction = () => {
        const quotationMap = this.getQuotationMap();
        const favoritesObjLenght = returnObjectLength(quotationMap.favoritesObj);

        if (favoritesObjLenght > 1) {
            this.svgWithBool.favoriteSvg = <StarSVG />;
            this.svgWithBool.isCardFavorite = false;
            this.choiseId.id = ''; // delete
            this.hideCard();
        } else {
            const { language } = this.props;
            const currenLanguage = localization[language];
            this.showToast(currenLanguage['Last tool cannot be removed from favorites']);
        }
    }

    hideCard = () => {
        if (this.pageName === 'favorites') {
            this.removeFromCatalogDetailScreenCard(this.cardID);
        }
    }

    routeToDetailCardScreen = () => {
        const { navigation, setCardItem, item } = this.props;
        const { isCardFavorite } = this.state;
        setCardItem(item);
        navigation.navigate('DetailCardScreen', { choseCardFaforite: this.choseCardFaforite, isCardFavorite, getQuotationMap: this.getQuotationMap, title: this.titleName });
    }

    render() {
        const { item: { Ask, Bid, FullName } } = this.props;
        const { borderColor, arrow, favoriteSvg, showCard } = this.state;

        return (
            <TouchableOpacity onPress={this.routeToDetailCardScreen} testID={`CardItem${FullName}`} accessibilityLabel={`CardItem${FullName}`}>
                {showCard ? (
                    <View style={styles.container}>
                        <View style={[styles.wrapper, { borderLeftColor: borderColor }]}>
                            <View style={styles.arrowWrapper}>
                                {arrow}
                            </View>
                            <Text style={styles.fullNameText} numberOfLines={1}>{FullName}</Text>
                            <View style={styles.quotationContainer}>
                                <QuotationItem text="Ask" number={(Ask == 0) ? '--' : Ask} />
                                <QuotationItem text="Bid" number={(Bid == 0) ? '--' : Bid} />
                            </View>
                            <TouchableOpacity onPress={this.choseCardFaforite} style={styles.starWrapper} testID={`CardItemFavorit${FullName}`} accessibilityLabel={`CardItemFavorit${FullName}`}>
                                {favoriteSvg}
                            </TouchableOpacity>
                        </View>
                    </View >
                ) : null}
            </TouchableOpacity>
        );
    }
}

export default withNavigation(CardItem);