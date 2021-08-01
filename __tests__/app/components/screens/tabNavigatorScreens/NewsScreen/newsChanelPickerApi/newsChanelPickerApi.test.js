import { getMaxHeightDependOnLanguage, setTitleInConstructor } from "../../../../../../../app/components/screens/tabNavigatorScreens/newsScreen/newsChanelPicker/newsChanelPickerApi";


describe('getMaxHeightDependOnLanguage with correct data', () => {

    test('getMaxHeightDependOnLanguage ru ', () => {
        let height = getMaxHeightDependOnLanguage('ru')
        expect(height).toEqual(165);
    });

    test('getMaxHeightDependOnLanguage es ', () => {
        let height = getMaxHeightDependOnLanguage('es')
        expect(height).toEqual(120);
    });

    test('getMaxHeightDependOnLanguage en ', () => {
        let height = getMaxHeightDependOnLanguage('en')
        expect(height).toEqual(120);
    });

    test('getMaxHeightDependOnLanguage ar ', () => {
        let height = getMaxHeightDependOnLanguage('ar')
        expect(height).toEqual(90);
    });

});

describe('setTitleInConstructor with correct data', () => {
    test('setTitleInConstructor  umarkets', () => {
        let title = setTitleInConstructor('umarkets')
        expect(title).toEqual('UMarketsnews.com');
    });

    test('setTitleInConstructor finversia ', () => {
        let title = setTitleInConstructor('finversia')
        expect(title).toEqual('MSNfinance.com');
    });

    test('setTitleInConstructor analytics ', () => {
        let title = setTitleInConstructor('analytics')
        expect(title).toEqual('Investing.com');
    });

});

describe('getMaxHeightDependOnLanguage with uncorrect data', () => {
    test('getMaxHeightDependOnLanguage  ', () => {
        let height = getMaxHeightDependOnLanguage('')
        expect(height).toEqual(null);
    });

    test('getMaxHeightDependOnLanguage test ', () => {
        let height = getMaxHeightDependOnLanguage('test')
        expect(height).toEqual(null);
    });
});

describe('setTitleInConstructor with uncorrect data', () => {
    test('setTitleInConstructor  ---', () => {
        let title = setTitleInConstructor('---')
        expect(title).toEqual(null);
    });

    test('setTitleInConstructor  ', () => {
        let title = setTitleInConstructor('')
        expect(title).toEqual(null);
    });
});