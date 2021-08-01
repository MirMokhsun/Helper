import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { CountrySearch } from '../../../../../../../app/components/screens/countryScreen/countryScreenElements/countrySearch/countrySearch';

it('create snapshot CountrySearch', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<CountrySearch
        setSearchCountryText={() => { }}
        language ={"ru"}
    />);
    expect(toolbarSnapshot).toMatchSnapshot();
});
