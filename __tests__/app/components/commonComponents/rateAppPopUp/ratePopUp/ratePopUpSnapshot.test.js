import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { RatePopup } from '../../../../../../app/components/commonComponents/rateAppPopUp/ratePopUp/ratePopUp';

it('create snapshot RatePopup', () => {
    const renderer = new ShallowRenderer()
    let listPicker = renderer.render(<RatePopup />);
    expect(listPicker).toMatchSnapshot();
});