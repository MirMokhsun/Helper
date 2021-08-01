import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { CountryScreen } from '../../../../../app/components/screens/countryScreen/countryScreen';

it('create snapshot CountryScreen', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<CountryScreen
        setRegistrationCountry={() => { }}
        setRegistrationPhoneCode={() => { }}
    />);
    expect(toolbarSnapshot).toMatchSnapshot();
});
