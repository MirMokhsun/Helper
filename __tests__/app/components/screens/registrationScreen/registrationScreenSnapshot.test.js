import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { RegistrationScreen } from '../../../../../app/components/screens/registrationScreen/registrationScreen';

const mock = { 
    phoneCode:true,
    email:true,
    firstName:true,
    lastName:true,
    country:true,
    phone:true,
    agreementCheckbox:true 
}

it('create snapshot RegistrationScreen', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<RegistrationScreen
        setRegistrationLastName={() => { }}
        setRegistrationFirstName={() => { }}
        setRegistrationEmail={() => { }}
        setRegistrationCountry={() => { }}
        setRegistrationPhone={() => { }}
        language={"ru"}
        registrationData = {mock}
        firstName={{ isValid:false }}
        isValid ={false}
    />);
    expect(toolbarSnapshot).toMatchSnapshot();
});