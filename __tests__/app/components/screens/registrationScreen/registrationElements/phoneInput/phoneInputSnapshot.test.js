import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { PhoneInput } from '../../../../../../../app/components/screens/registrationScreen/registrationElements/phoneInput/phoneinput';

it('create snapshot PhoneInput', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<PhoneInput
        phcode={380}
        maxWidth={240}
        placeholder={'phoneNumber'}
        errorText={'phoneNumber'}
        action={() => { }}
        isValid={true}
    />);
    expect(toolbarSnapshot).toMatchSnapshot();
});