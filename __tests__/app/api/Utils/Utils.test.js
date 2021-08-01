import Utils from "../../../../app/api/utils/utils";
import { I18nManager } from 'react-native';

const isRTL = I18nManager.isRTL;


describe('Test Utils', () => {
    describe('Test setTextAlign', () => {

        it('Utils.setTextAlign("ru")', () => {
            if (isRTL) {
                expect(Utils.setTextAlign("ru")).toEqual("right");
            } else {
                expect(Utils.setTextAlign("ru")).toEqual("left");
            }
        });

        it('Utils.setTextAlign("ar")', () => {
            if (isRTL) {
                expect(Utils.setTextAlign("ar")).toEqual("left");
            } else {
                expect(Utils.setTextAlign("ar")).toEqual("right");
            }
        });

        it('Utils.setTextAlign(null)', () => {
            if (isRTL) {
                expect(Utils.setTextAlign(null)).toEqual("right");
            } else {
                expect(Utils.setTextAlign(null)).toEqual("left");
            }
        });
    });
    describe('Test chackIsObjectEmpty', () => {
        it('Utils.chackIsObjectEmpty(null)', () => {
            expect(Utils.chackIsObjectEmpty(null)).toEqual(true);
        });
        it('Utils.chackIsObjectEmpty({})', () => {
            expect(Utils.chackIsObjectEmpty({})).toEqual(true);
        });
        it('Utils.chackIsObjectEmpty(null)', () => {
            expect(Utils.chackIsObjectEmpty({1:'test'})).toEqual(false);
        });
        it('Utils.chackIsObjectEmpty(null)', () => {
            expect(Utils.chackIsObjectEmpty()).toEqual(true);
        });
    });

});

