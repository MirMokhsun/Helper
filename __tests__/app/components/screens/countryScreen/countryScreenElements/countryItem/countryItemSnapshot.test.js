import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { CountryItem } from '../../../../../../../app/components/screens/countryScreen/countryScreenElements/countryItem/countryItem';

describe('CountryItem', () => {
    it('create snapshot CountryItem', () => {
        const renderer = new ShallowRenderer()
        let countryItem = renderer.render(<CountryItem
            key={'key'}
            setRegistrationCountry={() => { }}
            setPhcode={() => { }}
            country={''}
            flag={''}
            testID={'ID'}
            countryKey={'key'}
            accessibilityLabel={'ID'}
        />);
        expect(countryItem).toMatchSnapshot();
    });
});