import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { NotificationsItemDetailsScreen } from '../../../../../app/components/screens/notificationItemDetailsScreen/notificationItemDetailsScreen';

it('create snapshot NotificationsItemDetailsScreen', () => {
    const renderer = new ShallowRenderer()
    let toolbarSnapshot = renderer.render(<NotificationsItemDetailsScreen
        language={"ru"}
        notificationObj={{
            ID: 1,
            MsgText: "MsgText",
            TimeExpiration: 0,
            TimeSent: 1547827677,
            Title: "Title",
            WasRead: false
        }}
    />);
    expect(toolbarSnapshot).toMatchSnapshot();
});

