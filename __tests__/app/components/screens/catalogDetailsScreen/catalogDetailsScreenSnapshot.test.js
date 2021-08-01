import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { CatalogDetailsScreen } from '../../../../../app/components/screens/catalogDetailsScreen/catalogDetailsScreen';

describe('CatalogDetailsScreen', () => {
    test('create snapshot CatalogDetailsScreen', () => {
        const renderer = new ShallowRenderer()
        let toolbarSnapshot = renderer.render(<CatalogDetailsScreen
        setCardItem={() => { }}
        setFunctionNewQuotationMap={() => { }}
        getQuotationMap={() => { return { 1: {} } }}
        setCurrentCatalogScreen={() => { }}
        webSocketClient={{ webSocketClient: () => { }, }}
        navigation={{ navigate: () => { }, setParams: () => { }, state: { params: 'test' } }}
        screenName={'1'}
        language={'ru'}
        />);
        expect(toolbarSnapshot).toMatchSnapshot();
    });
});
