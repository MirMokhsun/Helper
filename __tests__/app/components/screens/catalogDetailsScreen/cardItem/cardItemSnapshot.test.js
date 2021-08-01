import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { CardItem } from '../../../../../../app/components/screens/catalogDetailsScreen/catalogScreenElements/cardItem/cardItem';

const mock = {
    "ID": 1,
    "baseCurrency": "AUD",
    "defaultQuantity": 10000000000,
    "keyName": "AUDCAD",
    "leverage": 200,
    "Market": "Currency",
    "maximumQuantity": 40000000000000,
    "minimumQuantity": 5000000000,
    "name": "AUD/CAD",
    "popular": false,
    "priceRounding": 100000,
    "quantityIncrement": 5000000000,
    "termCurrency": "CAD",
    "tickSize": 100,
    "Ask": "1.1430",
    "Bid": "0.0000",
    "Diff": "0.0000",
    "ESV": "0.0000",
    "FullName": "AUD/CAD",
    "Max": "0.0000",
    "Min": "0.0000",
    "Per": 0,
    "Rate": "0.0000",
    "SSV": "0.0000",
    "Sess": "---",
    "Timestamp": 0
};

const nav = {
    addListener: () => { }
}

it('create snapshot QuotationItem', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<CardItem indicator={'buy'} item={mock} language={'ru'} setCardItem={() => { }} navigation={nav} />);
    expect(toolbarSnapshot).toMatchSnapshot();
});