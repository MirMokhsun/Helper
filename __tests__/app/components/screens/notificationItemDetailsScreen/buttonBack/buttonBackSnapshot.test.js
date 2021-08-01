import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { ButtonBack } from '../../../../../../app/components/screens/notificationItemDetailsScreen/buttonBack/buttonBack';

it('create snapshot ButtonBack', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<ButtonBack
        language={"ru"}
    />);
    expect(toolbarSnapshot).toMatchSnapshot();
});

