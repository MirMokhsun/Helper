import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { EmptyNotification } from '../../../../../../app/components/screens/notificationsScreen/emptyNotification/emptyNotification';

describe('EmptyNotification', () => {
    test('Create snapshot EmptyNotification', () => {
        const renderer = new ShallowRenderer()
        let emptyNotification = renderer.render(<EmptyNotification text={'test'}/>);
        expect(emptyNotification).toMatchSnapshot();
    });
});