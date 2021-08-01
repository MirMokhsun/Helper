/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-prototype-builtins */
import React from 'react';
import { CardItem } from '../../components/screens/catalogDetailsScreen/catalogScreenElements/cardItem/cardItem';

export const renderCards = (
  mapCards,
  stateCards,
  language,
  setCardItem,
  navigation,
  indicators,
  favoritesObj,
  pageName,
  setQuotationFavorites,
  removeFromCatalogDetailScreenCard,
  getQuotationMap,
  showToast,
  searchCardText = '',
  titleName,
) => {
  let cards = null;
  if (mapCards) {
    cards = [];
    for (const key in mapCards) {
      let isFavorite = false;
      if (favoritesObj && favoritesObj.hasOwnProperty(key)) {
        isFavorite = true;
      }
      let indicator = 'neutral';
      const nameCard = mapCards[key].Name;
      const fullNameCard = mapCards[key].FullName;
      if (indicators && indicators.hasOwnProperty(nameCard)) {
        indicator = indicators[nameCard];
      }
      if (fullNameCard.toLowerCase().includes(searchCardText.toLowerCase())) {
        cards.push(
          <CardItem
            {...{
              indicator,
              item: mapCards[key],
              language,
              setCardItem,
              key,
              cardID: key,
              navigation,
              isCardFavorite: isFavorite,
              pageName,
              setQuotationFavorites,
              removeFromCatalogDetailScreenCard,
              getQuotationMap,
              showToast,
              titleName,
            }}
          />
        );
      }
    }
  }
  return cards || stateCards;
}