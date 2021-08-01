import { getLanguage, getPlatform, setLanguageInStartApp } from '../../../../app/api/setLanguageInStartApp/setLanguageInStartApp';

describe('Test setLanguageInStartApp', () => {    
    
    test('getPlatform ios', () => {
        const wrapper = getPlatform('ios');
        expect(wrapper).toEqual(true);
    });
    test('getPlatform not ios', () => {
        const wrapper = getPlatform('not ios');
        expect(wrapper).toEqual(false);
    });

    test('getLanguage ios', () => {
        const wrapper = getLanguage('ios');
        expect(wrapper).toEqual('io');
    });
    test('getLanguage notios', () => {
        const wrapper = getLanguage('notios');
        expect(wrapper).toEqual('no');
    });
    
    test('getLanguage ios', () => {
        const wrapper = getLanguage('ios');
        expect(wrapper).toEqual('io');
    });
    test('getLanguage notios', () => {
        const wrapper = getLanguage('notios');
        expect(wrapper).toEqual('no');
    });       

});