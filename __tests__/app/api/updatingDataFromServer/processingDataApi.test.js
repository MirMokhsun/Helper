
import { mapFromFileArgs, mapFromFile } from '../../../../__mocks__/data/quotetiondata';
import { updatingDataFromServer } from '../../../../app/api/processingWebsocket/processingDataApi';

describe('processingDataApi with correct data', () => {

    test('updatingDataFromServer carete 4 maps', () => {
        let map = updatingDataFromServer(mapFromFileArgs);
        expect(Object.keys(map).length).toEqual(4);
    });

    test('updatingDataFromServer carete map commodity with 7 object', () => {
        let map = updatingDataFromServer(mapFromFileArgs);
        expect(Object.keys(map.commodity).length).toEqual(7);
    });

    test('updatingDataFromServer carete map currency with 76 object', () => {
        let map = updatingDataFromServer(mapFromFileArgs);
        expect(Object.keys(map.currency).length).toEqual(76);
    });

    test('updatingDataFromServer carete map index with 11 object', () => {
        let map = updatingDataFromServer(mapFromFileArgs);
        expect(Object.keys(map.index).length).toEqual(11);
    });

    test('updatingDataFromServer carete map stock with 73 object', () => {
        let map = updatingDataFromServer(mapFromFileArgs);
        expect(Object.keys(map.stock).length).toEqual(73);
    });
});



describe('processingDataApi with uncorrect data', () => {

    test('updatingDataFromServer carete 4 maps', () => {
        let map = updatingDataFromServer(mapFromFile);
        expect(Object.keys(map).length).toEqual(4);
    });

    test('updatingDataFromServer carete map commodity with 0 object', () => {
        let map = updatingDataFromServer(mapFromFile);
        expect(Object.keys(map.commodity).length).toEqual(0);
    });

    test('updatingDataFromServer carete map currency with 0 object', () => {
        let map = updatingDataFromServer(mapFromFile);
        expect(Object.keys(map.currency).length).toEqual(0);
    });

    test('updatingDataFromServer carete map index with 0 object', () => {
        let map = updatingDataFromServer(mapFromFile);
        expect(Object.keys(map.index).length).toEqual(0);
    });

    test('updatingDataFromServer carete map stock with 0 object', () => {
        let map = updatingDataFromServer(mapFromFile);
        expect(Object.keys(map.stock).length).toEqual(0);
    });
});