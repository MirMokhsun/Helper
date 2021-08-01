import { isEqualNumb,  getCamelPos, getArrayWithCamelCase  } from '../../../../app/api/cardQuotation.api/cardquotation.api';

describe('CardQuotation Card', () => {

    describe("Testing component method setCamelPos(str, colorNumbers)", () => {
        describe("Testing component method getCamelPos(str)", () => {
            it('Testing component method getCamelPos(str) with 00.0000', () => {
                expect(getCamelPos("25.5574")).toEqual(4);
            })
            it('Testing component method getCamelPos(str)  with 00.000', () => {
                expect(getCamelPos("12.514")).toEqual(3);
            })
            it('Testing component method getCamelPos(str)  with 00.0', () => {
                expect(getCamelPos("25.5")).toEqual(0);
            })
            it('Testing component method getCamelPos(str)  with 000.00', () => {
                expect(getCamelPos("205.55")).toEqual(4);
            })
            it('Testing component method getCamelPos(str)  is empty', () => {
                expect(getCamelPos("")).toEqual(0);
            })
            it('Testing component method getCamelPos(str)  with wrong amount', () => {
                let wrongText = 'sadadasddwdscas';
                expect(getCamelPos(wrongText)).toEqual(wrongText.length - 3);
            })
        })

        describe("Testing component method getArrayWithCamelCase(_arrayChars, posStartCamelCase, posEndCamelCase)", () => {
            it('Testing component method with 00.0000', () => {
                let mockNumber = "57.9573";
                let posStartCamelCase = getCamelPos(mockNumber);
                let posEndCamelCase = posStartCamelCase + 2;
                expect(getArrayWithCamelCase(mockNumber, posStartCamelCase, posEndCamelCase)).toEqual({ "large": "57", "smallTo": "57.9", "smalllater": "3" });
            })
            it('Testing component method with 00.000', () => {
                let mockNumber = "57.957";
                let posStartCamelCase = getCamelPos(mockNumber);
                let posEndCamelCase = posStartCamelCase + 2;
                expect(getArrayWithCamelCase(mockNumber, posStartCamelCase, posEndCamelCase)).toEqual({ "large": "95", "smallTo": "57.", "smalllater": "7" });
            })
            it('Testing component method with 00.0', () => {
                let mockNumber = "57.9";
                let posStartCamelCase = getCamelPos(mockNumber);
                let posEndCamelCase = posStartCamelCase + 2;
                expect(getArrayWithCamelCase(mockNumber, posStartCamelCase, posEndCamelCase)).toEqual({ "large": "57", "smallTo": "", "smalllater": ".9" });
            })
            it('Testing component method with 000.00', () => {
                let mockNumber = "157.97";
                let posStartCamelCase = getCamelPos(mockNumber);
                let posEndCamelCase = posStartCamelCase + 2;
                expect(getArrayWithCamelCase(mockNumber, posStartCamelCase, posEndCamelCase)).toEqual({ "large": "97", "smallTo": "157." });
            })
        })
       
    })

    describe("Testing component method isEqualNumb(currentNumb, nextNumb)", () => {

        it('Testing component method with diferent params currentNumb < nextNumb', () => {
            let mockCurrentNumb = "1234.14657";
            let mockNextNumb = "4145.156";
            expect(isEqualNumb(mockCurrentNumb, mockNextNumb)).toEqual(true);
        })
        it('Testing component method with equal params ', () => {
            let mockCurrentNumb = "12.146";
            let mockNextNumb = "12.146";
            expect(isEqualNumb(mockCurrentNumb, mockNextNumb)).toEqual(false);
        })
        it('Testing component method with diferent params currentNumb > nextNumb', () => {
            let mockCurrentNumb = "14.14";
            let mockNextNumb = "11.46";
            expect(isEqualNumb(mockCurrentNumb, mockNextNumb)).toEqual(false);
        })
        it('Testing component method with uncorrect params', () => {
            let mockCurrentNumb = "s14.14";
            let mockNextNumb = "11.46";
            expect(isEqualNumb(mockCurrentNumb, mockNextNumb)).toEqual(false);
        })
    })
});