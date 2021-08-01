import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { OurAppPicker } from '../../../../../../app/components/screens/ourApps/ourAppPicker/ourAppPicker';

it('create snapshot OurAppPicker', () => {
    const renderer = new ShallowRenderer()
    let ourAppPicker = renderer.render(<OurAppPicker />);
    expect(ourAppPicker).toMatchSnapshot();
});