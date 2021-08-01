import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { QuotationItemDetailCard } from '../../../../../../../app/components/screens/detailCardScreen/detailCardScreenElements/quotationItemDetailCard/quotationItemDetailCard';

it('create snapshot PivotPointAndChartsLine', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<QuotationItemDetailCard number={'0.987465'} />    );
    expect(toolbarSnapshot).toMatchSnapshot();
});