import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { CountryPicker } from '../../../../../../../app/components/screens/registrationScreen/registrationElements/countryPicker/countryPicker';

it('create snapshot CountryPicker', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<CountryPicker
        value={'value'}
        isValid={false}
        navigation={() => { }}
    />);
    expect(toolbarSnapshot).toMatchSnapshot();
});