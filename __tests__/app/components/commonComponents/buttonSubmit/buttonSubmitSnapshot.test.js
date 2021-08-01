import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { ButtonSubmit } from '../../../../../app/components/commonComponents/buttonSubmit/buttonSubmit';

it('create snapshot ButtonSubmit', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<ButtonSubmit
        text={'Registration'}
        testID={'ButtonSubmitRegistrationID'}
        isDisabled={false}
        isShowSpiner={true}
        onPress={() => { }}
    />);
    expect(toolbarSnapshot).toMatchSnapshot();
});