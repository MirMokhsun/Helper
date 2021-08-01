import { checkNumbLessTen, getDataWithNeedFormat, getSpred, getCountNumbersAftersPoint } from "../../../../app/api/openCardLogic/openCardApi";

describe('TEST checkNumbLessTen ', () => {
    test('checkNumbLessTen(9)) ', () => {
        let numb = checkNumbLessTen(9);
        expect("09").toEqual(numb);
    });
    test('checkNumbLessTen (0)) ', () => {
        let numb = checkNumbLessTen(0);
        expect("00").toEqual(numb);
    });
    test('checkNumbLessTen (10)) ', () => {
        let numb = checkNumbLessTen(10);
        expect(10).toEqual(numb);
    });
});
describe('TEST getCountNumbersAftersPoint ', () => {
    test('getCountNumbersAftersPoint(0.93103)) ', () => {
        let numb = getCountNumbersAftersPoint(0.93103);
        expect(5).toEqual(numb);
    });
    test('getCountNumbersAftersPoint (null)) ', () => {
        let numb = getCountNumbersAftersPoint(null);
        expect(0).toEqual(numb);
    });

});

describe('TEST getDataWithNeedFormat ', () => {
    test('getDataWithNeedFormat(1536643396402)) ', () => {
        let numb = getDataWithNeedFormat(1536643396402);
        expect("11.09.2018 | 08:23:16").toEqual(numb);
    });
    test('getDataWithNeedFormat(null)) ', () => {
        let numb = getDataWithNeedFormat(null);
        expect("").toEqual(numb);
    });
});

describe('TEST getSpred ', () => {
    test('getSpred("0.912323", "0.900003")', () => {
        let numb = getSpred("0.912323", "0.900003");
        expect("1232.0").toEqual(numb);
    });

    test('getSpred(null, "0.900003") ', () => {
        let numb = getSpred(null, "0.900003");
        expect("-90000.3").toEqual(numb);
    });

    test('getSpred("0.912323", null)', () => {
        let numb = getSpred("0.912323", null);
        expect("0.0").toEqual(numb);
    });
});