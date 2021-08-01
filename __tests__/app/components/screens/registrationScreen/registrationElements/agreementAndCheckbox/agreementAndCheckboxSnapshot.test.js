import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AgreementAndCheckbox } from '../../../../../../../app/components/screens/registrationScreen/registrationElements/agreementAndCheckbox/agreementAndCheckbox';

it('create snapshot AgreementAndCheckbox', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<AgreementAndCheckbox
        navigation={() => { }}
        isChecked={true}
        setCheckedBox={() => { }}
        textWithClick={"user agreement"}
        text={"I have read and agree with"}
    />);
    expect(toolbarSnapshot).toMatchSnapshot();
});