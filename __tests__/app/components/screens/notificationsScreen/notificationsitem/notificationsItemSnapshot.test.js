import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { NotificationsItem } from '../../../../../../app/components/screens/notificationsScreen/notificationsitem/notificationsitem';
jest.mock('react-navigation');
it('create snapshot NotificationsItem', () => {
    let  textDate = "Feb 25, 2018", body = "Hello" , isRead =true;
   let  notification = {
        MsgText:"Hello"
    };
    const renderer = new ShallowRenderer()
    let notificationsItem = renderer.render(<NotificationsItem notification={notification} textDate ={ textDate } MsgText ={body} isRead = { isRead }/>);
    expect(notificationsItem).toMatchSnapshot();
});