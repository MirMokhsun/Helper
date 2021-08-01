import CandleUpdater from "../../../../app/api/updateLastCandleApi/updateLastCandleApi";

describe('Test setValueCurrentItem', () => {
    describe('Test setValueCurrentItem ', () => {
        let candleUpdater = new CandleUpdater();
        let mockCandleItem = { Bid: 1.25, Per: 158700000 };
        let mockCurrentCandleDraw = { C: 0, H: 0, L: 0, O: 0, T: 0 };
        it('setValueCurrentItem make first candle', () => {
            expect(candleUpdater.setValueCurrentItem(mockCurrentCandleDraw, mockCandleItem)).toEqual({ "C": 1.25, "H": 1.25, "L": 1.25, "O": 1.25, "T": 158700000 });
        });
        let mockCandleItem2 = { Bid: 1.45, Per: 158700000 };
        let mockCurrentCandleDraw2 = { "C": 1.25, "H": 1.25, "L": 1.25, "O": 1.25, "T": 158700000 };
        it('setValueCurrentItem make first candle', () => {
            expect(candleUpdater.setValueCurrentItem(mockCurrentCandleDraw2, mockCandleItem2)).toEqual({ "C": 1.45, "H": 1.45, "L": 1.25, "O": 1.25, "T": 158700000 });
        });
        let mockCandleItem3 = { Bid: 1.15, Per: 158700000 };
        let mockCurrentCandleDraw3 = { "C": 1.45, "H": 1.45, "L": 1.25, "O": 1.25, "T": 158700000 };
        it('setValueCurrentItem make first candle', () => {
            expect(candleUpdater.setValueCurrentItem(mockCurrentCandleDraw3, mockCandleItem3)).toEqual({ "C": 1.15, "H": 1.45, "L": 1.15, "O": 1.25, "T": 158700000 });
        });
        let mockCandleItem4 = { Bid: 1.75, Per: 158700000 };
        let mockCurrentCandleDraw4 = { "C": 1.15, "H": 1.45, "L": 1.15, "O": 1.25, "T": 158700000 };
        it('setValueCurrentItem make first candle', () => {
            expect(candleUpdater.setValueCurrentItem(mockCurrentCandleDraw4, mockCandleItem4)).toEqual({ "C": 1.75, "H": 1.75, "L": 1.15, "O": 1.25, "T": 158700000 });
        });
        let mockCandleItem5 = { Bid: 1.63, Per: 158700000 };
        let mockCurrentCandleDraw5 = { "C": 1.75, "H": 1.75, "L": 1.15, "O": 1.25, "T": 158700000 };
        it('setValueCurrentItem make first candle', () => {
            expect(candleUpdater.setValueCurrentItem(mockCurrentCandleDraw5, mockCandleItem5)).toEqual({ "C": 1.63, "H": 1.75, "L": 1.15, "O": 1.25, "T": 158700000 });
        });
    });

    describe('Test dateFormaterToArr ', () => {
        let candleUpdater = new CandleUpdater();

        let mockDataCandels = [{ T: 1538464500 }, { T: 1536464500 }, { T: 1538564500 }];
        it('dateFormaterToArr make arr with date', () => {
            expect(candleUpdater.dateFormaterToArr(mockDataCandels)).toEqual(["10:15\n 02/10", "06:41\n 09/09", "14:01\n 03/10"]);
        });

    });
});


