import 'react-native';
import React from 'react';
import { RateAppPopUp } from '../../../../../app/components/commonComponents/rateAppPopUp/rateAppPopUp';
import { localization } from '../../../../../app/common/localization';
import ShallowRenderer from 'react-test-renderer/shallow';

describe('RateAppPopUp', () => {
    it('create snapshot rateAppPopUp', () => {
        const renderer = new ShallowRenderer();
        let rateAppPopUp = renderer.render(<RateAppPopUp CurrentLanguage={localization.ru} />);
        expect(rateAppPopUp).toMatchSnapshot();
    });
});
