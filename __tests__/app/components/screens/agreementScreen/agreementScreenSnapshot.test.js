import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { AgreementScreen } from '../../../../../app/components/screens/agreementScreen/agreementScreen';

it('create snapshot AgreementScreen', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<AgreementScreen
        setRegistrationCheckbox={() => { }}
    />);
    expect(toolbarSnapshot).toMatchSnapshot();
});