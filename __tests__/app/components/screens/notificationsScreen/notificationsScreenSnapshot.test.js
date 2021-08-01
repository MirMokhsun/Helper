import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { NotificationsScreen } from '../../../../../app/components/screens/notificationsScreen/notificationsScreen';

describe('NotificationsScreen', () => {
    test('create snapshot NotificationsScreen with empty historyNotification', () => {
        const renderer = new ShallowRenderer()
        let notificationsItem = renderer.render(<NotificationsScreen
            historyNotification={{}}
            language={'ru'}
            navigation={{ navigate: () => { }, setParams: () => { }, state: { params: 'test' }, addListener: () => { } }}
        />);
        expect(notificationsItem).toMatchSnapshot();
    });
    test('create snapshot NotificationsScreen with historyNotification', () => {
        const renderer = new ShallowRenderer()
        let notificationsItem = renderer.render(<NotificationsScreen
            historyNotification={{ 0: { title: '', body: '', TimeSent: 0 } }}
            language={'ru'}
            navigation={{ navigate: () => { }, setParams: () => { }, state: { params: 'test' }, addListener: () => { } }}
        />);
        expect(notificationsItem).toMatchSnapshot();
    });
});