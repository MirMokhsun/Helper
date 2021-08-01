import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { InputPasswordWithSVG } from '../../../../../../../app/components/screens/authorizationScreen/authoriztionElements/inputPasswordWithSVG/inputPasswordWithSVG';

it('create snapshot InputPasswordWithSVG', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<InputPasswordWithSVG
        placeholder={'password'}
        errorText={"Password failed"}
        filter={/$/}
        action={()=>{}}
        isValid={true}
        value={'value'}
        currentLanguageName={'ru'}
    />);
    expect(toolbarSnapshot).toMatchSnapshot();
});