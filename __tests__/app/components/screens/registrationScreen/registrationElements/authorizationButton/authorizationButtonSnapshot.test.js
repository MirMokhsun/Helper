import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AuthorizationButton } from '../../../../../../../app/components/screens/registrationScreen/registrationElements/authorizationButton/authorizationButton';

it('create snapshot AuthorizationButton', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<AuthorizationButton
        text={"Already have an account?"}
        textLogin={'login'}
        navigation={() => { }}
    />);
    expect(toolbarSnapshot).toMatchSnapshot();
});