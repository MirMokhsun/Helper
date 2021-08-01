import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { QuotationItem } from '../../../../../../app/components/screens/catalogDetailsScreen/catalogScreenElements/quotationItem/quotationItem';

it('create snapshot QuotationItem', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<QuotationItem text={'local.cellItem.titleOfBuy'} number={"123456"} />);
    expect(toolbarSnapshot).toMatchSnapshot();
});
