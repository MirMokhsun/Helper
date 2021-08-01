
import { mapFromFileArgs, mapFromFile } from '../../../../__mocks__/data/quotetiondata';
import { renderCards } from '../../../../app/api/renderCards/renderCards';

const stateCards = [],
    language = 'ru',
    setCardItem = (() => { }),
    indicator = 'buy',
    navigation = (() => { });
    
    describe('renderCards', () => {
        describe('renderCards with correct data', () => {
            test('renderCards 167 cards ', () => {
                let map = renderCards(mapFromFileArgs, stateCards, language, setCardItem, navigation, indicator,)
                expect(map.length).toEqual(167);
            });
            test('renderCards 76 currency ', () => {
                let map = renderCards(mapFromFile.currency, stateCards, language, setCardItem, navigation, indicator,)
                expect(map.length).toEqual(76);
            });
            test('renderCards 7 commodity ', () => {
                let map = renderCards(mapFromFile.commodity, stateCards, language, setCardItem, navigation, indicator, )
                expect(map.length).toEqual(7);
            });
            test('renderCards 11 index ', () => {
                let map = renderCards(mapFromFile.index, stateCards, language, setCardItem, navigation, indicator,)
                expect(map.length).toEqual(11);
            });
            test('renderCards 73 stock ', () => {
                let map = renderCards(mapFromFile.stock, stateCards, language, setCardItem, navigation, indicator,)
                expect(map.length).toEqual(73);
            });
        });
        
        describe('renderCards with uncorrect data', () => {
            test('renderCards 167 cards ', () => {
                let map = renderCards([], stateCards, language, setCardItem, navigation, indicator,)
                expect(map.length).toEqual(0);
            });   
        });

    })

