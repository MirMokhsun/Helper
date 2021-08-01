
import NotificationApi from '../../../../app/api/notification.api/notification.api';
import { mockDataNotification } from '../../../../__mocks__/data/mockDataNotification';

describe('test NotificationApi', () => {
    test('count = 10', () => { 
        let api = new NotificationApi();
        let count = api.getCountReadNotification(mockDataNotification);
        expect(count).toEqual(10);
    });
    test('no params', () => {
        let api = new NotificationApi();
        let count = api.getCountReadNotification();
        expect(count).toEqual(0);
    });
    test('params = null', () => {
        let api = new NotificationApi();
        let count = api.getCountReadNotification(null);
        expect(count).toEqual(0);
    });
});

