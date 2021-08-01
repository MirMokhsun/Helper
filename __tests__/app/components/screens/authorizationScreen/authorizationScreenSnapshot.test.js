import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AuthorizationScreen } from '../../../../../app/components/screens/authorizationScreen/authorizationScreen';

it('create snapshot AuthorizationScreen', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<AuthorizationScreen
        setAuthorizationEmail={() => { }}
        setAuthorizationPassword={() => { }}
        authorizationSpiner = { true }
        authorizationData = { {password:'password', email:"email" } }
        forgotPasswordData= { {email:"email"} }
        language ={"ru"}
    />);
    expect(toolbarSnapshot).toMatchSnapshot();
});