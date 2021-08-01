import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { ButtonForgotPassword } from '../../../../../../../app/components/screens/authorizationScreen/authoriztionElements/buttonForgotPassword/buttonForgotPassword';

it('create snapshot ButtonForgotPassword', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<ButtonForgotPassword text={"Forgot password?"} />);
    expect(toolbarSnapshot).toMatchSnapshot();
});