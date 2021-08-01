import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Popup } from '../../../../../app/components/commonComponents/popUP/popUp';

it('create snapshot Popup', () => {
    const renderer = new ShallowRenderer()
    let popup = renderer.render(<Popup />);
    expect(popup).toMatchSnapshot();
});