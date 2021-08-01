import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { ThanksTextAndSVG } from '../../../../../../app/components/commonComponents/contentWrapper/contentWrapperElements/thanksTextAndSVG';

describe('ThanksTextAndSVG', () => {
    it('create snapshot ThanksTextAndSVG with text', () => {
        const renderer = new ShallowRenderer()
        let toast = renderer.render(<ThanksTextAndSVG text={'text'} />);
        expect(toast).toMatchSnapshot();
    });

    it('create snapshot ThanksTextAndSVG', () => {
        const renderer = new ShallowRenderer()
        let toast = renderer.render(<ThanksTextAndSVG />);
        expect(toast).toMatchSnapshot();
    });
});