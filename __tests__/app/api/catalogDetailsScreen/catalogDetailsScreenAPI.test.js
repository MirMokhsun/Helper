import { removeFromCurrentCards, 
         copyCurrentMapWithoutOne, 
         getAllNames,  
         makeObjectWithManeKeys 
       } from "../../../../app/components/screens/catalogDetailsScreen/catalogDetailsScreen.api";    
import {mockCurrentCards1, 
        mockCurrentCards2, 
        mockCurrentCards3, 
        mockCurrentMap1
       } from '../../../../__mocks__/catalogDetailsScreenApi/mockCurrent';
import {getAllNamesObj} from '../../../../__mocks__/catalogDetailsScreenApi/getAllNamesObj';
import {makeObjectWithManeKeysObj} from '../../../../__mocks__/catalogDetailsScreenApi/makeObjectWithManeKeysObj';
 

describe('catalogDetailsApi', () => {
    describe('test removeFromCurrentCards', () => {
        test('removeFromCurrentCards(mockCurrentCards, 1) ', () => {
            let result = removeFromCurrentCards(mockCurrentCards1, 1);
            expect(result).toEqual([{ "key": 2, "name": "asd2" }, { "key": 3, "name": "asd3" }, { "key": 4, "name": "asd4" }]);
        });
        test('removeFromCurrentCards(mockCurrentCards, 2) ', () => {
            let result = removeFromCurrentCards(mockCurrentCards2, 2);
            expect(result).toEqual([{ "key": 1, "name": "asd1" }, { "key": 3, "name": "asd3" }, { "key": 4, "name": "asd4" }]);
        });
        test('removeFromCurrentCards(mockCurrentCards, 3) ', () => {
            let result = removeFromCurrentCards(mockCurrentCards3, 3);
            expect(result).toEqual([{ "key": 1, "name": "asd1" }, { "key": 2, "name": "asd2" }, { "key": 4, "name": "asd4" }]);
        });
    });
    describe('test copyCurrentMapWithoutOne', () => {
        test('copyCurrentMapWithoutOne(mockCurrentMap1, 1) ', () => {
            let result = copyCurrentMapWithoutOne(mockCurrentMap1, 1);
            expect(result).toEqual({ "2": { "key": 2, "name": "asd2" }, "3": { "key": 3, "name": "asd3" }, "4": { "key": 4, "name": "asd4" } });
        });
        test('copyCurrentMapWithoutOne(mockCurrentMap1, 2) ', () => {
            let result = copyCurrentMapWithoutOne(mockCurrentMap1, 2);
            expect(result).toEqual({ "1": { "key": 1, "name": "asd1" }, "3": { "key": 3, "name": "asd3" }, "4": { "key": 4, "name": "asd4" } });
        });
        test('copyCurrentMapWithoutOne(mockCurrentMap1, 3) ', () => {
            let result = copyCurrentMapWithoutOne(mockCurrentMap1, 3);
            expect(result).toEqual({ "1": { "key": 1, "name": "asd1" }, "2": { "key": 2, "name": "asd2" }, "4": { "key": 4, "name": "asd4" } });
        });
    });
    describe('test sortNames', () => {
        test('sortNames(sortNameObf) ', () => {
            let result = makeObjectWithManeKeys(makeObjectWithManeKeysObj);
            expect(result).toEqual({ "XAGUSD": "Buy", "XAUUSD": "Buy", "XPDUSD": "Buy", "XPTUSD": "Neutral", "USOUSD": "Buy", "UKOUSD": "Buy", "XNGUSD": "Neutral" });
        });
        test('sortNames(null) ', () => {
            let result = makeObjectWithManeKeys(null);
            expect(result).toEqual( {});
        });
    });
    describe('test getAllNames', () => {
        test('getAllNames(getAllNamesObf) ', () => {
            let result = getAllNames(getAllNamesObj);
            expect(result).toEqual(["XAGUSD", "XAUUSD", "XPDUSD", "XPTUSD", "USOUSD", "UKOUSD", "XNGUSD"]);
        });
        test('getAllNames(null) ', () => {
            let result = getAllNames(null);
            expect(result).toEqual([]);
        });
    });
})