import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { ForgotPasswordScreen } from '../../../../../app/components/screens/forgotPasswordScreen/forgotPasswordScreen';

it('create snapshot ForgotPasswordScreen', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<ForgotPasswordScreen
        setForgotPasswordEmail={() => { }}
        showForgotPasswordSpiner={() => { }}
        forgotPasswordData= { {email:"test@com.ua"} }
        language ={"ru"}
    />);
    expect(toolbarSnapshot).toMatchSnapshot();
});
